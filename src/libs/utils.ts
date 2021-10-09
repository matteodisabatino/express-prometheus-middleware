'use strict'
export const getURLRegExp = (url: string): RegExp => new RegExp(`^${url}${url.endsWith('/') ? '' : '/'}?$`)

export const isPathExcluded = (excludePaths: string[], path: string): boolean => {
  return excludePaths.some((pathToExclude: string) => {
    const regexp = getURLRegExp(pathToExclude)
    return regexp.test(path)
  })
}
