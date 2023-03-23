"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addStyleDependencies = void 0;
const devkit_1 = require("@nrwl/devkit");
function addStyleDependencies(tree, options) {
    const styleDependencies = {
        scss: { sass: '^1.44.0' },
        sass: { sass: '^1.44.0' },
        less: { less: '^4.1.2' },
        styl: { stylus: '^0.55.0' },
    };
    if (options.style in styleDependencies) {
        return (0, devkit_1.addDependenciesToPackageJson)(tree, {}, styleDependencies[options.style]);
    }
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    return () => { };
}
exports.addStyleDependencies = addStyleDependencies;
//# sourceMappingURL=add-style-dependencies.js.map