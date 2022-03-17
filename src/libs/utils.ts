'use strict'
export const getUrlRegExp = (url: string): RegExp => new RegExp(`^${url}${url.endsWith('/') ? '' : '/'}?$`)
