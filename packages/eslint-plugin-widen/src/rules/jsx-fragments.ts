import { Rule } from 'eslint'
import * as ESTree from 'estree'
import { JSXFragment } from 'estree-jsx'
import { docsURL } from '../utils'

const isImportDeclaration = (
  node: ESTree.Node
): node is ESTree.ImportDeclaration => node.type === 'ImportDeclaration'

export default {
  create(context) {
    let fragmentName = ''
    let hasFragments = false
    let hasReactImport = false

    return {
      ImportDeclaration(node) {
        if (node.source.value === 'react') {
          hasReactImport = true

          node.specifiers.forEach((specifier) => {
            if (
              specifier.type === 'ImportSpecifier' &&
              specifier.imported.name === 'Fragment'
            ) {
              fragmentName = specifier.local.name
            }

            if (
              specifier.type === 'ImportDefaultSpecifier' ||
              specifier.type === 'ImportNamespaceSpecifier'
            ) {
              fragmentName = 'React.Fragment'
            }
          })
        }
      },
      JSXFragment(node: ESTree.Node) {
        const fragment = node as unknown as JSXFragment
        hasFragments = true

        context.report({
          fix(fixer) {
            const tag = fragmentName || 'Fragment'

            return [
              fixer.replaceText(
                fragment.openingFragment as unknown as ESTree.Node,
                `<${tag}>`
              ),
              fixer.replaceText(
                fragment.closingFragment as unknown as ESTree.Node,
                `</${tag}>`
              ),
            ]
          },
          messageId: 'longForm',
          node,
        })
      },
      'Program:exit'(program: ESTree.Program) {
        if (fragmentName || !hasFragments) return

        // Auto import Fragment from react if react isn't imported
        const imports = program.body.filter(isImportDeclaration)

        if (hasReactImport) {
          return imports
            .filter((node) => node.source.value === 'react')
            .forEach((node) => {
              // If the import is a non-default import and Fragment wasn't
              // imported let's auto import it to make our lives easier as a user.
              context.report({
                fix(fixer) {
                  return fixer.insertTextAfter(
                    node.specifiers[node.specifiers.length - 1],
                    ', Fragment'
                  )
                },
                messageId: 'missingImport',
                node,
              })
            })
        }

        const statement = "import { Fragment } from 'react';"
        const node = imports.length
          ? imports[imports.length - 1]
          : program.body[0]

        context.report({
          fix(fixer) {
            return node.type === 'ImportDeclaration'
              ? fixer.insertTextAfter(node, '\n' + statement)
              : fixer.insertTextBefore(node, statement + '\n')
          },
          messageId: 'missingImport',
          node,
        })
      },
    }
  },
  meta: {
    docs: {
      url: docsURL('jsx-fragments'),
    },
    fixable: 'code',
    messages: {
      longForm: 'Prefer React.Fragment over fragment shorthand',
      missingImport: 'Missing React.Fragment import',
    },
    type: 'problem',
  },
} as Rule.RuleModule
