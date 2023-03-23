"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getInstalledAstroVersion = void 0;
const package_json_1 = require("./package-json");
function getInstalledAstroVersion() {
    var _a;
    return (_a = (0, package_json_1.readModulePackageJson)('astro')) === null || _a === void 0 ? void 0 : _a.version;
}
exports.getInstalledAstroVersion = getInstalledAstroVersion;
//# sourceMappingURL=versions.js.map