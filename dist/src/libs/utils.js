'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
exports.isPathExcluded = exports.getURLRegExp = void 0;
const getURLRegExp = (url) => new RegExp(`^${url}${url.endsWith('/') ? '' : '/'}?$`);
exports.getURLRegExp = getURLRegExp;
const isPathExcluded = (excludePaths, path) => {
    return excludePaths.some((pathToExclude) => {
        const regexp = (0, exports.getURLRegExp)(pathToExclude);
        return regexp.test(path);
    });
};
exports.isPathExcluded = isPathExcluded;
//# sourceMappingURL=utils.js.map