'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
exports.isPathExcluded = exports.getUrlRegExp = void 0;
const getUrlRegExp = (url) => new RegExp(`^${url}${url.endsWith('/') ? '' : '/'}?$`);
exports.getUrlRegExp = getUrlRegExp;
const isPathExcluded = (excludePaths, path) => {
    return excludePaths.some((pathToExclude) => {
        const regexp = (0, exports.getUrlRegExp)(pathToExclude);
        return regexp.test(path);
    });
};
exports.isPathExcluded = isPathExcluded;
//# sourceMappingURL=utils.js.map