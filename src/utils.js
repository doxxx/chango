export function sum(array) {
  return array.reduce((a,b) => a+b)
}

export function flatten(arrays) {
  return [].concat(...arrays)
}

