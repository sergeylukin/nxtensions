"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupE2ETests = void 0;
const devkit_1 = require("@nrwl/devkit");
const linter_1 = require("@nrwl/linter");
const cypress_1 = require("../../utilities/cypress");
async function setupE2ETests(tree, options) {
    if (!options.addCypressTests) {
        return undefined;
    }
    const name = `${(0, devkit_1.names)(options.name).fileName}-e2e`;
    const directory = options.directory
        ? `${(0, devkit_1.names)(options.directory).fileName}/${name}`
        : name;
    const e2eProjectName = directory.replace(/\//g, '-');
    const { cypressProjectGenerator } = await (0, cypress_1.importNrwlCypress)();
    const cypressTask = await cypressProjectGenerator(tree, {
        name,
        project: options.projectName,
        directory: options.directory,
        linter: linter_1.Linter.EsLint,
        standaloneConfig: options.standaloneConfig,
        skipFormat: true,
    });
    const e2eProject = (0, devkit_1.readProjectConfiguration)(tree, e2eProjectName);
    e2eProject.targets.e2e.options.devServerTarget =
        e2eProject.targets.e2e.options.devServerTarget.replace(':serve', ':dev');
    delete e2eProject.targets.e2e.configurations;
    (0, devkit_1.updateProjectConfiguration)(tree, e2eProjectName, e2eProject);
    tree.write(`${e2eProject.sourceRoot}/e2e/app.cy.ts`, `import { getGreeting } from '../support/app.po';

describe('${options.projectName}', () => {
  beforeEach(() => cy.visit('/'));

  it('should display welcome message', () => {
    cy.login('my-email@something.com', 'myPassword');

    getGreeting().contains('Welcome to Astro');
  });
});`);
    return cypressTask;
}
exports.setupE2ETests = setupE2ETests;
//# sourceMappingURL=setup-e2e-tests.js.map