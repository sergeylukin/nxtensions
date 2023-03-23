"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const devkit_1 = require("@nrwl/devkit");
const tsquery_1 = require("@phenomnomnominal/tsquery");
async function default_1(tree) {
    var _a;
    const executorsToMigrate = [
        '@nxtensions/astro:build',
        '@nxtensions/astro:dev',
    ];
    for (const [projectName, project] of (0, devkit_1.getProjects)(tree)) {
        updateAstroConfiguration(tree, project);
        for (const [, target] of Object.entries((_a = project.targets) !== null && _a !== void 0 ? _a : {})) {
            if (!executorsToMigrate.includes(target.executor)) {
                continue;
            }
            if (target.options) {
                updateOptions(target.options);
            }
            if (!target.configurations) {
                continue;
            }
            Object.entries(target.configurations).forEach(([, options]) => {
                updateOptions(options);
            });
        }
        (0, devkit_1.updateProjectConfiguration)(tree, projectName, project);
    }
    await (0, devkit_1.formatFiles)(tree);
}
exports.default = default_1;
function updateAstroConfiguration(tree, project) {
    const configNames = [
        'astro.config.mjs',
        'astro.config.js',
        'astro.config.cjs',
        'astro.config.ts',
    ];
    for (const configName of configNames) {
        const configPath = `${project.root}/${configName}`;
        if (!tree.exists(configPath)) {
            continue;
        }
        const astroConfig = tree.read(configPath, 'utf-8');
        const astroConfigAst = tsquery_1.tsquery.ast(astroConfig);
        const experimentalStaticBuildAssignmentSelector = 'PropertyAssignment:has(Identifier[name="buildOptions"]) PropertyAssignment:has(Identifier[name="experimentalStaticBuild"])';
        const [experimentalStaticBuildAssignment] = (0, tsquery_1.tsquery)(astroConfigAst, experimentalStaticBuildAssignmentSelector, { visitAllChildren: true });
        if (experimentalStaticBuildAssignment) {
            const [falseKeyword] = (0, tsquery_1.tsquery)(experimentalStaticBuildAssignment, 'Identifier ~ FalseKeyword', { visitAllChildren: true });
            const experimentalStaticBuildAssignmentEnd = experimentalStaticBuildAssignment.getEnd();
            const updatedConfig = astroConfig.slice(0, experimentalStaticBuildAssignment.getStart()) +
                (falseKeyword ? 'legacyBuild: true' : '') +
                astroConfig.slice(falseKeyword
                    ? experimentalStaticBuildAssignmentEnd
                    : experimentalStaticBuildAssignmentEnd + 1);
            tree.write(configPath, updatedConfig);
        }
        return;
    }
}
function updateOptions(options) {
    if (options.experimentalStaticBuild === false) {
        options.legacyBuild = true;
    }
    delete options.experimentalStaticBuild;
}
//# sourceMappingURL=remove-experimental-static-build.js.map