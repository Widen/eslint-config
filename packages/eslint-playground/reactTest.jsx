import React from 'react'

export function test(unused, unused) {
  console.log('wow')
  return (
    <div>
      <div children="Children" />
      <button autoFocus={true}>Test</button>
    </div>
  )
}
