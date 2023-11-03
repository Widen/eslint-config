import { Rule, SourceCode } from 'eslint'
import * as ESTree from 'estree'
import * as ESTreeJSX from 'estree-jsx'
import { docsURL } from '../utils'

const JSX_ANNOTATION_REGEX = /\*?\s*@jsx\s+([^\s]+)/

type Specifier =
  | ESTree.ImportSpecifier
  | ESTree.ImportDefaultSpecifier
  | ESTree.ImportNamespaceSpecifier

function isImportSpecifier(node: Specifier): node is ESTree.ImportSpecifier {
  return node.type === 'ImportSpecifier'
}

function addJsxImport(fixer: Rule.RuleFixer, node: ESTree.ImportDeclaration) {
  const specifier = node.specifiers[0]

  return fixer.insertTextAfter(
    specifier,
    specifier.type === 'ImportSpecifier' ? ', jsx' : ', { jsx }',
  )
}

function removeReactImport(
  source: SourceCode,
  fixer: Rule.RuleFixer,
  node: ESTree.ImportDeclaration,
) {
  const specifier = node.specifiers.find((spec) => spec.local.name === 'React')
  if (!specifier) return []

  if (node.specifiers.length === 1) {
    const [start, end] = node.range!

    // To remove the newline that follows after the import, we have to increment
    // the end of the range by 1 otherwise we will leave extra newlines behind.
    return [fixer.removeRange([start, end + 1])]
  }

  const comma = source.getTokenAfter(specifier)!
  const bracket = source.getTokenAfter(comma)!

  return [
    fixer.remove(specifier),
    fixer.removeRange([comma.range[0], bracket.range[0]]),
  ]
}

function applyRemainingFix(
  source: SourceCode,
  fixer: Rule.RuleFixer,
  hasPragma: boolean,
  emotionReactImport: ESTree.ImportDeclaration | null,
) {
  const fix =
    (hasPragma ? '' : '/** @jsx jsx */\n') +
    (emotionReactImport ? '' : "import { jsx } from '@emotion/react'\n")

  return fixer.insertTextBefore(source.ast.body[0], fix)
}

export default {
  create(context) {
    let cssAttrNode: ESTree.Node | null = null
    let emotionReactImport: ESTree.ImportDeclaration | null = null
    let reactImport: ESTree.ImportDeclaration | null = null
    let hasJsxImport = false
    let reactUsed = false

    const source = context.getSourceCode()
    const hasPragma = source
      .getAllComments()
      .some((node) => JSX_ANNOTATION_REGEX.test(node.value))

    return {
      ImportDeclaration(node) {
        if (node.source.value === 'react') {
          reactImport = node
        }

        if (node.source.value === '@emotion/react') {
          emotionReactImport = node
          hasJsxImport = node.specifiers
            .filter(isImportSpecifier)
            .some((spec) => spec.imported.name === 'jsx')
        }
      },
      JSXAttribute(node: ESTree.Node) {
        if (cssAttrNode || (hasJsxImport && hasPragma)) return
        const attr = node as unknown as ESTreeJSX.JSXAttribute

        if (attr.name.type === 'JSXIdentifier' && attr.name.name === 'css') {
          cssAttrNode = node
        }
      },
      JSXMemberExpression(node: ESTree.Node) {
        const expression = node as unknown as ESTreeJSX.JSXMemberExpression

        if (
          expression.object.type === 'JSXIdentifier' &&
          expression.object.name === 'React'
        ) {
          reactUsed = true
        }
      },
      MemberExpression(node) {
        if (node.object.type === 'Identifier' && node.object.name === 'React') {
          reactUsed = true
        }
      },
      'Program:exit'() {
        if (cssAttrNode) {
          context.report({
            fix(fixer) {
              const fixes: Rule.Fix[] = []

              if (emotionReactImport && !hasJsxImport) {
                fixes.push(addJsxImport(fixer, emotionReactImport))
              }

              if (!reactUsed && reactImport) {
                fixes.push(...removeReactImport(source, fixer, reactImport))
              }

              return [
                ...fixes,
                applyRemainingFix(source, fixer, hasPragma, emotionReactImport),
              ]
            },
            messageId: 'missingPragma',
            node: cssAttrNode,
          })
        }
      },
    }
  },
  meta: {
    docs: {
      url: docsURL('jsx-import'),
    },
    fixable: 'code',
    messages: {
      missingPragma: `The css prop can only be used if jsx from @emotion/react is imported and it is set as the jsx pragma.`,
    },
    type: 'problem',
  },
} as Rule.RuleModule
