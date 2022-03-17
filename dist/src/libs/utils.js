'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUrlRegExp = void 0;
const getUrlRegExp = (url) => new RegExp(`^${url}${url.endsWith('/') ? '' : '/'}?$`);
exports.getUrlRegExp = getUrlRegExp;
//# sourceMappingURL=utils.js.map