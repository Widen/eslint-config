import { Rule } from 'eslint'
import * as ESTree from 'estree'
import * as ESTreeJSX from 'estree-jsx'

const oldColors = new Set([
  'gray15',
  'gray30',
  'gray50',
  'gray75',
  'gray85',
  'gray90',
  'white',
  'red30',
  'red50',
  'red80',
  'yellow30',
  'yellow50',
  'yellow80',
  'green30',
  'green50',
  'green80',
  'blue20',
  'blue30',
  'blue40',
  'blue60',
  'blue80',
  'blue90',
  'purple20',
  'purple30',
  'purple40',
  'purple60',
  'purple80',
  'purple90',
  'grayBackgroundLighter',
  'grayBackgroundDarker',
  'backgroundRedLighter',
  'backgroundGreenLighter',
  'backgroundBlueLighter',
  'backgroundPurpleLighter',
  'borderColor',
  'borderColorDark',
  'borderColorActive',
  'borderColorError',
  'borderColorHover',
  'iconColor',
  'iconColorActive',
  'iconColorHover',
  'iconColorLight',
  'iconColorError',
  'iconColorSuccess',
  'nightIcon',
  'nightIconActive',
  'nightIconHover',
  'nightTextLight',
  'grayText',
  'grayTextDisabled',
  'grayTextLight',
  'textError',
  'textSuccess',
  'hoverColor',
  'selectedColor',
  'activeColor',
  'focusColor',
])

const oldVariables = new Set([
  '--color-blue-lightest',
  '--color-blue-light',
  '--color-blue-light-alt',
  '--color-blue-medium',
  '--color-blue-medium-alt',
  '--color-blue-dark',
  '--color-gray-lightest',
  '--color-gray-light',
  '--color-gray-light-alt',
  '--color-gray-medium',
  '--color-gray-medium-alt',
  '--color-gray-dark',
  '--color-purple-lightest',
  '--color-purple-light',
  '--color-purple-light-alt',
  '--color-purple-medium',
  '--color-purple-medium-alt',
  '--color-purple-dark',
  '--color-theme-lightest',
  '--color-theme-light',
  '--color-theme-light-alt',
  '--color-theme-medium',
  '--color-theme-medium-alt',
  '--color-theme-dark',
  '--color-green-light',
  '--color-green-medium',
  '--color-green-dark',
  '--color-red-light',
  '--color-red-medium',
  '--color-red-dark',
  '--color-yellow-light',
  '--color-yellow-medium',
  '--color-yellow-dark',
])

function reportCssVariable(
  context: Rule.RuleContext,
  node: ESTree.Node,
  value: string
) {
  const regex = /var\((--[a-z-]+)(,.*)?\)/g
  const matches = value.matchAll(regex)

  for (const match of matches) {
    const variable = match[1]

    if (oldVariables.has(variable)) {
      const start = context
        .getSourceCode()
        .getLocFromIndex(node.range![0] + match.index! + 4)

      context.report({
        loc: {
          end: {
            column: start.column + variable.length,
            line: start.line,
          },
          start,
        },
        messageId: 'cssColor',
      })
    }
  }
}

const statusMap: Record<string, string> = {
  blue: 'info',
  gray: 'inactive',
  green: 'success',
  purple: 'info',
  red: 'error',
  yellow: 'warning',
}

export default {
  create(context) {
    const reportedNodes = new WeakMap()

    return {
      Identifier(node) {
        if (oldColors.has(node.name) && !reportedNodes.has(node)) {
          context.report({ messageId: 'jsColor', node })
          reportedNodes.set(node, true)
        }
      },
      JSXAttribute(node: ESTree.Node & Rule.NodeParentExtension) {
        if ((node.parent.type as string) !== 'JSXOpeningElement') return

        const element = node.parent as unknown as ESTreeJSX.JSXOpeningElement
        if (element.name.type !== 'JSXIdentifier') return

        const attribute = node as unknown as ESTreeJSX.JSXAttribute
        if (attribute.name.name !== 'color') return

        const elementName = element.name.name
        const { value } = attribute

        if (elementName === 'Badge' || elementName === 'Callout') {
          if (value?.type !== 'Literal') return
          const color = value.value ?? ''

          if (typeof color === 'string' && color in statusMap) {
            context.report({
              fix: (fixer) =>
                fixer.replaceText(
                  attribute as unknown as ESTree.Node,
                  'status="' + statusMap[color] + '"'
                ),
              messageId: 'statusProp',
              node,
            })
          }
        } else if (elementName === 'ColorPanel') {
          const range = attribute.range!

          context.report({
            fix: (fixer) => fixer.removeRange([range[0] - 1, range[1]]),
            messageId: 'colorPanelColor',
            node,
          })
        }
      },
      Literal(node) {
        if (typeof node.value === 'string') {
          reportCssVariable(context, node, node.value)
        }
      },
      TemplateElement(node) {
        reportCssVariable(context, node, node.value.raw)
      },
    }
  },
  meta: {
    fixable: 'code',
    messages: {
      colorPanelColor: 'Color panels no longer accept a color.',
      cssColor: 'Unexpected use of CSS color variable.',
      jsColor: 'Unexpected use of JS color variable.',
      statusProp: 'This prop has been renamed to status.',
    },
    type: 'problem',
  },
} as Rule.RuleModule
