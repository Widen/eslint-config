import globals from 'globals'

// delete an invalid global that causes error because of the trailing space
const browser = globals.browser
delete browser['AudioWorkletGlobalScope ']

const sharedGlobals = {
  ...browser,
  ...globals.es6,
  ...globals.node,
  ...globals.jest,
}

export default sharedGlobals
