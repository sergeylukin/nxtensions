"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const devkit_1 = require("@nrwl/devkit");
const path_1 = require("path");
let astroCompiler;
let astroCompilerUtils;
async function default_1(tree) {
    var _a, _b, _c;
    const packageJson = (0, devkit_1.readJson)(tree, 'package.json');
    if (((_a = packageJson.dependencies) === null || _a === void 0 ? void 0 : _a.sass) || ((_b = packageJson.devDependencies) === null || _b === void 0 ? void 0 : _b.sass)) {
        return;
    }
    const projects = (0, devkit_1.getProjects)(tree);
    for (const [, project] of projects) {
        if (!isAstroProject(tree, project)) {
            continue;
        }
        if (!(await isProjectUsingSass(tree, (_c = project.sourceRoot) !== null && _c !== void 0 ? _c : project.root))) {
            continue;
        }
        (0, devkit_1.addDependenciesToPackageJson)(tree, {}, { sass: 'latest' });
        await (0, devkit_1.formatFiles)(tree);
        devkit_1.logger.info(`The "sass" package was added to "devDependencies". Please make sure to run "${(0, devkit_1.getPackageManagerCommand)().install}" to install it.`);
        return;
    }
}
exports.default = default_1;
function isAstroProject(tree, project) {
    var _a, _b;
    if (project.projectType === 'application') {
        return Object.values((_a = project.targets) !== null && _a !== void 0 ? _a : {}).some((target) => target.executor.startsWith('@nxtensions/astro:'));
    }
    // currently, libs don't have any targets, try to find Astro files
    return doesProjectContainAstroFiles(tree, (_b = project.sourceRoot) !== null && _b !== void 0 ? _b : project.root);
}
function doesProjectContainAstroFiles(tree, dirPath) {
    for (const child of tree.children(dirPath)) {
        const fullPath = (0, path_1.join)(dirPath, child);
        if (tree.isFile(fullPath)) {
            if ((0, path_1.extname)(fullPath) === '.astro') {
                return true;
            }
        }
        else {
            const result = doesProjectContainAstroFiles(tree, fullPath);
            if (result) {
                return true;
            }
        }
    }
    return false;
}
async function isProjectUsingSass(tree, dirPath) {
    for (const child of tree.children(dirPath)) {
        const fullPath = (0, path_1.join)(dirPath, child);
        if (!tree.isFile(fullPath)) {
            const result = await isProjectUsingSass(tree, fullPath);
            if (result) {
                return true;
            }
        }
        const fileExt = (0, path_1.extname)(fullPath);
        if (fileExt === '.sass' || fileExt === '.scss') {
            return true;
        }
        if (fileExt === '.astro') {
            const fileContent = tree.read(fullPath, 'utf-8');
            astroCompiler !== null && astroCompiler !== void 0 ? astroCompiler : (astroCompiler = await new Function(`return import('@astrojs/compiler');`)());
            astroCompilerUtils !== null && astroCompilerUtils !== void 0 ? astroCompilerUtils : (astroCompilerUtils = await new Function(`return import('@astrojs/compiler/utils');`)());
            const { ast } = await astroCompiler.parse(fileContent);
            let isUsingSass = false;
            astroCompilerUtils.walk(ast, (node) => {
                if (astroCompilerUtils.is.element(node) &&
                    node.name === 'style' &&
                    node.attributes.some(({ name, value }) => name === 'lang' && ['scss', 'sass'].includes(value))) {
                    isUsingSass = true;
                }
            });
            return isUsingSass;
        }
    }
    return false;
}
//# sourceMappingURL=add-sass-dependency.js.map