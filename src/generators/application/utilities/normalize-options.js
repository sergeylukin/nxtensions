"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseNpmName = exports.normalizeOptions = void 0;
const tslib_1 = require("tslib");
const devkit_1 = require("@nrwl/devkit");
const node_fetch_1 = tslib_1.__importDefault(require("node-fetch"));
async function normalizeOptions(tree, options) {
    var _a, _b;
    const { appsDir, standaloneAsDefault } = (0, devkit_1.getWorkspaceLayout)(tree);
    const name = (0, devkit_1.names)(options.name).fileName;
    const directory = options.directory
        ? `${(0, devkit_1.names)(options.directory).fileName}/${name}`
        : name;
    const projectName = directory.replace(/\//g, '-');
    const projectRoot = (0, devkit_1.joinPathFragments)(appsDir, directory);
    const tags = options.tags
        ? options.tags.split(',').map((tag) => tag.trim())
        : [];
    const integrations = await getIntegrations(options);
    return {
        ...options,
        addCypressTests: (_a = options.addCypressTests) !== null && _a !== void 0 ? _a : true,
        projectName,
        projectRoot,
        integrations,
        standaloneConfig: (_b = options.standaloneConfig) !== null && _b !== void 0 ? _b : standaloneAsDefault,
        tags,
    };
}
exports.normalizeOptions = normalizeOptions;
// Similar to process done by the create-astro package for compatibility
// https://github.com/withastro/astro/blob/9b530bdece4c96fcfa3d2a60c783718401c30535/packages/astro/src/core/add/index.ts#L90
async function getIntegrations(options) {
    var _a;
    if (!((_a = options.integrations) === null || _a === void 0 ? void 0 : _a.length)) {
        return [];
    }
    // normalize some known, common aliases
    const packageAliases = new Map([
        ['solid', 'solid-js'],
        ['tailwindcss', 'tailwind'],
    ]);
    const integrations = options.integrations.map((name) => packageAliases.has(name) ? packageAliases.get(name) : name);
    return await resolveIntegrations(integrations);
}
async function resolveIntegrations(integrationNames) {
    return await Promise.all(integrationNames.map(async (integration) => {
        const parsed = parseIntegrationName(integration);
        if (!parsed) {
            throw new Error(`"${integration}" does not appear to be a valid package name!`);
        }
        let { scope = '' } = parsed;
        const { name, tag } = parsed;
        // Allow third-party integrations starting with `astro-` namespace
        if (!name.startsWith('astro-')) {
            scope = `astrojs`;
        }
        const packageName = `${scope ? `@${scope}/` : ''}${name}`;
        const result = await (0, node_fetch_1.default)(`https://registry.npmjs.org/${packageName}/${tag}`).then((res) => {
            if (res.status === 404) {
                throw new Error(`Unable to fetch "${packageName}". Does this package exist?`);
            }
            return res.json();
        });
        const dependencies = [
            [result['name'], `^${result['version']}`],
        ];
        if (result['peerDependencies']) {
            for (const peer in result['peerDependencies']) {
                dependencies.push([peer, result['peerDependencies'][peer]]);
            }
        }
        return {
            name: integration.split('-')[0],
            packageName: packageName,
            dependencies,
        };
    }));
}
function parseIntegrationName(spec) {
    const result = parseNpmName(spec);
    if (!result) {
        return;
    }
    const { scope } = result;
    let { name } = result;
    let tag = 'latest';
    if (scope) {
        name = name.replace(scope + '/', '');
    }
    if (name.includes('@')) {
        const tagged = name.split('@');
        name = tagged[0];
        tag = tagged[1];
    }
    return { scope, name, tag };
}
function parseNpmName(spec) {
    // not an npm package
    if (!spec || spec[0] === '.' || spec[0] === '/') {
        return undefined;
    }
    let scope;
    let name = '';
    const parts = spec.split('/');
    if (parts[0][0] === '@') {
        scope = parts[0];
        name = parts.shift() + '/';
    }
    name += parts.shift();
    const subpath = parts.length ? `./${parts.join('/')}` : undefined;
    return {
        scope,
        name,
        subpath,
    };
}
exports.parseNpmName = parseNpmName;
//# sourceMappingURL=normalize-options.js.map