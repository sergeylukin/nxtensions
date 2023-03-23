"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const devkit_1 = require("@nrwl/devkit");
const fs_1 = require("fs");
const path_1 = require("path");
const patchScriptPath = 'tools/scripts/patch-nx-cli.js';
const patchCommand = `node ./${patchScriptPath}`;
async function default_1(tree) {
    (0, devkit_1.updateJson)(tree, 'package.json', (json) => {
        var _a, _b;
        if (!((_a = json.scripts) === null || _a === void 0 ? void 0 : _a.postinstall)) {
            (_b = json.scripts) !== null && _b !== void 0 ? _b : (json.scripts = {});
            json.scripts.postinstall = patchCommand;
        }
        else if (!json.scripts.postinstall.includes(patchCommand)) {
            json.scripts.postinstall += ` && ${patchCommand}`;
        }
        return json;
    });
    const scriptContent = (0, fs_1.readFileSync)((0, path_1.join)(__dirname, '../../generators/init/files/patch-nx-cli.js__tmpl__'), 'utf8');
    tree.write(patchScriptPath, scriptContent);
    devkit_1.logger.info(`
A command was added to the "postinstall" script in the "package.json" file to patch the Nx CLI in order to support importing an ESM module in the project graph plugin.
Please run "${(0, devkit_1.getPackageManagerCommand)().install}" or "node ./tools/scripts/patch-nx-cli.js" to apply the patch.
`);
    await (0, devkit_1.formatFiles)(tree);
}
exports.default = default_1;
//# sourceMappingURL=add-script-to-patch-nx-cli.js.map