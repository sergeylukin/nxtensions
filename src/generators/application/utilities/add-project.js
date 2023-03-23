"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addProject = void 0;
const devkit_1 = require("@nrwl/devkit");
const semver_1 = require("semver");
const versions_1 = require("../../../utilities/versions");
function addProject(tree, options) {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const { version: nxVersion } = require('nx/package.json');
    const outputDirectory = (0, semver_1.gte)(nxVersion, '15.0.0')
        ? (0, devkit_1.joinPathFragments)('{workspaceRoot}', 'dist', '{projectRoot}')
        : (0, devkit_1.joinPathFragments)('dist', options.projectRoot);
    const astroVersion = (0, versions_1.getInstalledAstroVersion)();
    (0, devkit_1.addProjectConfiguration)(tree, options.projectName, {
        root: options.projectRoot,
        projectType: 'application',
        sourceRoot: (0, devkit_1.joinPathFragments)(options.projectRoot, 'src'),
        targets: {
            build: {
                outputs: [outputDirectory],
                executor: '@nxtensions/astro:build',
                options: {},
            },
            dev: {
                executor: '@nxtensions/astro:dev',
                options: {},
            },
            preview: {
                dependsOn: [
                    {
                        target: 'build',
                        projects: 'self',
                    },
                ],
                executor: '@nxtensions/astro:preview',
                options: {},
            },
            check: {
                executor: '@nxtensions/astro:check',
            },
            sync: !astroVersion || (0, semver_1.gte)(astroVersion, '1.8.0')
                ? { executor: '@nxtensions/astro:sync' }
                : undefined,
        },
        tags: options.tags,
    }, options.standaloneConfig);
}
exports.addProject = addProject;
//# sourceMappingURL=add-project.js.map