'use strict'
export const getUrlRegExp = (url: string): RegExp => new RegExp(`^${url}${url.endsWith('/') ? '' : '/'}?$`)

export const isPathExcluded = (excludePaths: string[], path: string): boolean => {
  return excludePaths.some((pathToExclude: string) => {
    const regexp: RegExp = getUrlRegExp(pathToExclude)
    return regexp.test(path)
  })
}
