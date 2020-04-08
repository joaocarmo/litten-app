/**
 * @format
 * @flow strict-local
 */

function timeout(ms = 0) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

export async function sleep(s = 0, ...args) {
  await timeout(s * 1000)
}

export async function asyncTimeout(fn, ms = 0, ...args) {
  await timeout(ms)
  return fn(...args)
}