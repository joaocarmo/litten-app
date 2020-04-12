/**
 * @format
 * @flow strict-local
 */

export function timeout(ms = 0) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

export async function sleep(s = 0, ...args) {
  await timeout(s * 1000)
}

export async function asyncTimeout(fn, ms = 0, ...args) {
  await timeout(ms)
  return fn(...args)
}

export function iterateTimes(n, offset = 1) {
  if (n < 0) {
    return []
  }
  return [...Array(n)].map((v, i) => i + offset)
}

export function mapCountriesToSelector(item) {
  if (typeof item === 'object') {
    return {
      key: item.cca2,
      label: item.name?.common,
      value: item.cca2,
    }
  }
}
