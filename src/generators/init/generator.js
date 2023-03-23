"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initGenerator = void 0;
const devkit_1 = require("@nrwl/devkit");
const cypress_1 = require("../utilities/cypress");
const utilities_1 = require("./utilities");
const versions_1 = require("./versions");
async function initGenerator(tree, options) {
    var _a;
    const workspace = (0, devkit_1.readWorkspaceConfiguration)(tree);
    if ((_a = workspace.plugins) === null || _a === void 0 ? void 0 : _a.includes('@nxtensions/astro')) {
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        return () => { };
    }
    (0, utilities_1.addProjectGraphPlugin)(tree);
    (0, utilities_1.updateWorkspaceConfiguration)(tree);
    (0, utilities_1.updateGitignore)(tree);
    (0, utilities_1.addVSCodeRecommendedExtensions)(tree);
    (0, utilities_1.patchNxCli)(tree);
    (0, utilities_1.setupNpmrc)(tree);
    const tasks = [];
    if (options.addCypressTests !== false) {
        const { cypressInitGenerator } = await (0, cypress_1.importNrwlCypress)();
        const cypressTask = await cypressInitGenerator(tree, {});
        tasks.push(cypressTask);
    }
    const depsTask = (0, devkit_1.addDependenciesToPackageJson)(tree, {}, { astro: versions_1.astroVersion });
    tasks.push(depsTask);
    return () => tasks.forEach((task) => task());
}
exports.initGenerator = initGenerator;
exports.default = initGenerator;
//# sourceMappingURL=generator.js.map