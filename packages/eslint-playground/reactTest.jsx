import React from 'react'

export function test(unused, unused, ...props) {
  console.log('wow')

  try {
    console.log('try something')
  } catch (_) {
    console.log('catch error')
  }

  return (
    <div {...props}>
      <div children="Children" />
      <button autoFocus={true}>Test</button>
    </div>
  )
}
