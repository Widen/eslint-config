import { Rule } from 'eslint'

export default {
  create(context) {
    return {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      JSXAttribute(node: any) {
        if (
          node.name.name === 'css' &&
          node.value &&
          node.value.type === 'JSXExpressionContainer' &&
          (node.value.expression.type === 'ConditionalExpression' ||
            (node.value.expression.type === 'LogicalExpression' &&
              (node.value.expression.operator === '&&' ||
                node.value.expression.operator === '||')))
        ) {
          context.report({
            message:
              'Avoid using conditionals within the css prop, move them to style.',
            node,
          })
        }
      },
    }
  },
  meta: {
    docs: {
      category: 'Best Practices',
      description: 'Disallow conditionals within the css prop in components',
      recommended: false,
    },
    schema: [],
    type: 'suggestion',
  },
} as Rule.RuleModule
