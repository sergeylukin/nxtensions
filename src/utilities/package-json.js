"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.readModulePackageJson = void 0;
const devkit_1 = require("@nrwl/devkit");
const fs_1 = require("fs");
const path_1 = require("path");
function readModulePackageJson(moduleSpecifier, requirePaths = [devkit_1.workspaceRoot]) {
    let packageJsonPath;
    try {
        packageJsonPath = require.resolve(`${moduleSpecifier}/package.json`, {
            paths: requirePaths,
        });
    }
    catch {
        packageJsonPath = findPackageJsonPathFromModuleSpecifier(moduleSpecifier, requirePaths);
    }
    if (!packageJsonPath) {
        return null;
    }
    const packageJson = (0, devkit_1.readJsonFile)(packageJsonPath);
    if (packageJson.name && packageJson.name !== moduleSpecifier) {
        throw new Error(`Found module ${packageJson.name} while trying to locate ${moduleSpecifier}/package.json`);
    }
    return packageJson;
}
exports.readModulePackageJson = readModulePackageJson;
function findPackageJsonPathFromModuleSpecifier(moduleSpecifier, requirePaths) {
    try {
        const entryPoint = require.resolve(moduleSpecifier, {
            paths: requirePaths,
        });
        let moduleRootPath = (0, path_1.dirname)(entryPoint);
        let packageJsonPath = (0, path_1.join)(moduleRootPath, 'package.json');
        while (!(0, fs_1.existsSync)(packageJsonPath) && moduleRootPath !== devkit_1.workspaceRoot) {
            moduleRootPath = (0, path_1.dirname)(moduleRootPath);
            packageJsonPath = (0, path_1.join)(moduleRootPath, 'package.json');
        }
        return packageJsonPath;
    }
    catch {
        return null;
    }
}
//# sourceMappingURL=package-json.js.map