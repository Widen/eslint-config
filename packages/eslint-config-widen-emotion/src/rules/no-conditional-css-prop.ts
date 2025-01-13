/* eslint-disable @typescript-eslint/no-explicit-any */
import { Rule } from 'eslint'

function detectConditionalExpression(
  expression: any,
  context: Rule.RuleContext,
  node: any,
) {
  if (expression) {
    if (
      expression.type === 'ConditionalExpression' ||
      (expression.type === 'LogicalExpression' &&
        (expression.operator === '&&' || expression.operator === '||'))
    ) {
      context.report({
        message:
          'Avoid using conditionals within the css prop, move them to style.',
        node: node,
      })
    }
  }
}

const noConditionalCssProp: Rule.RuleModule = {
  create(context) {
    return {
      JSXAttribute(node: any) {
        if (node.name.name === 'css') {
          if (node.value && node.value.type === 'JSXExpressionContainer') {
            const expression = node.value.expression

            // Check if it's an array
            if (expression.type === 'ArrayExpression') {
              expression.elements.forEach((element: any) => {
                detectConditionalExpression(element, context, node)
              })
            } else {
              // Check single expressions
              detectConditionalExpression(expression, context, node)
            }
          }
        }
      },
    }
  },
  meta: {
    docs: {
      category: 'Best Practices',
      description: `Disallow conditionals within the css prop, move them to the style prop. This increases the render performance.,

      // Before
      <div css={[randomDivStyle, isRed ? {color: "red"} : null]} />

      // After
      <div css={randomDivStyle} style={isRed ? {color: "red"}} />
      `,
      recommended: false,
    },
    schema: [],
    type: 'suggestion',
  },
}

export default noConditionalCssProp
