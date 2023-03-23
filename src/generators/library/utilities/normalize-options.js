"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.normalizeOptions = void 0;
const devkit_1 = require("@nrwl/devkit");
function normalizeOptions(tree, options) {
    var _a, _b;
    const { libsDir, npmScope, standaloneAsDefault } = (0, devkit_1.getWorkspaceLayout)(tree);
    const name = (0, devkit_1.names)(options.name).fileName;
    const directory = options.directory
        ? `${(0, devkit_1.names)(options.directory).fileName}/${name}`
        : name;
    const projectName = directory.replace(new RegExp('/', 'g'), '-');
    const projectRoot = (0, devkit_1.joinPathFragments)(libsDir, directory);
    const importPath = options.importPath || `@${npmScope}/${projectName}`;
    const tags = options.tags ? options.tags.split(',').map((s) => s.trim()) : [];
    return {
        ...options,
        directory,
        importPath,
        projectName,
        projectRoot,
        publishable: (_a = options.publishable) !== null && _a !== void 0 ? _a : false,
        standaloneConfig: (_b = options.standaloneConfig) !== null && _b !== void 0 ? _b : standaloneAsDefault,
        tags,
    };
}
exports.normalizeOptions = normalizeOptions;
//# sourceMappingURL=normalize-options.js.map