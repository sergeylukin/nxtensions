"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.patchNxCli = void 0;
const devkit_1 = require("@nrwl/devkit");
const patchScriptPath = 'tools/scripts/patch-nx-cli.js';
const patchCommand = `node ./${patchScriptPath}`;
function patchNxCli(tree) {
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
    if (tree.exists(patchScriptPath)) {
        return;
    }
    (0, devkit_1.generateFiles)(tree, (0, devkit_1.joinPathFragments)(__dirname, '..', 'files'), 'tools/scripts', { tmpl: '' });
}
exports.patchNxCli = patchNxCli;
//# sourceMappingURL=patch-nx-cli.js.map