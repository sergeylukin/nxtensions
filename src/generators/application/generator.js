"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.applicationGenerator = void 0;
const devkit_1 = require("@nrwl/devkit");
const generator_1 = require("../init/generator");
const utilities_1 = require("./utilities");
async function applicationGenerator(tree, rawOptions) {
    const options = await (0, utilities_1.normalizeOptions)(tree, rawOptions);
    const initTask = await (0, generator_1.initGenerator)(tree, {
        addCypressTests: options.addCypressTests,
    });
    const tasks = [];
    tasks.push(initTask);
    (0, utilities_1.addProject)(tree, options);
    (0, utilities_1.setDefaultProject)(tree, options.projectName);
    (0, utilities_1.addFiles)(tree, options);
    const e2eTask = await (0, utilities_1.setupE2ETests)(tree, options);
    if (e2eTask) {
        tasks.push(e2eTask);
    }
    const integrationsTask = (0, utilities_1.addIntegrationsPackages)(tree, options.integrations);
    if (integrationsTask) {
        tasks.push(integrationsTask);
    }
    await (0, devkit_1.formatFiles)(tree);
    return () => tasks.forEach((task) => task());
}
exports.applicationGenerator = applicationGenerator;
exports.default = applicationGenerator;
//# sourceMappingURL=generator.js.map