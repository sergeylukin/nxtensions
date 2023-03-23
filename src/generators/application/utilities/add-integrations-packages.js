"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addIntegrationsPackages = void 0;
const devkit_1 = require("@nrwl/devkit");
function addIntegrationsPackages(tree, integrations) {
    if (integrations.length === 0) {
        return undefined;
    }
    const dependencies = Array.from(new Set(integrations
        .map(({ dependencies }) => dependencies)
        .flat(1)
        .sort(([a], [b]) => a.localeCompare(b))));
    return (0, devkit_1.addDependenciesToPackageJson)(tree, {}, dependencies.reduce((acc, [packageName, version]) => {
        acc[packageName] = version;
        return acc;
    }, {}));
}
exports.addIntegrationsPackages = addIntegrationsPackages;
//# sourceMappingURL=add-integrations-packages.js.map