"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addPathMapping = void 0;
const devkit_1 = require("@nrwl/devkit");
function addPathMapping(tree, options) {
    const rootTsConfigPath = getRootTsConfigPath(tree);
    if (!rootTsConfigPath) {
        return;
    }
    (0, devkit_1.updateJson)(tree, rootTsConfigPath, (json) => {
        var _a;
        const c = json.compilerOptions;
        c.paths = (_a = c.paths) !== null && _a !== void 0 ? _a : {};
        c.paths[options.importPath] = [
            (0, devkit_1.joinPathFragments)(options.projectRoot, 'src/index.js'),
        ];
        return json;
    });
}
exports.addPathMapping = addPathMapping;
function getRootTsConfigPath(tree) {
    const possiblePaths = ['tsconfig.base.json', 'tsconfig.json'];
    for (const path of possiblePaths) {
        if (tree.exists(path)) {
            return path;
        }
    }
    return undefined;
}
//# sourceMappingURL=add-path-mapping.js.map