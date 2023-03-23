"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupNpmrc = void 0;
const devkit_1 = require("@nrwl/devkit");
function setupNpmrc(tree) {
    const shamefullyHoist = 'shamefully-hoist=true';
    const textToAdd = (0, devkit_1.stripIndents) `# Expose Astro dependencies for \`pnpm\` users
    ${shamefullyHoist}`;
    if (tree.exists('.npmrc')) {
        const npmrc = tree.read('.npmrc', 'utf-8');
        if (!npmrc.includes(shamefullyHoist)) {
            tree.write('.npmrc', (0, devkit_1.stripIndents) `${npmrc}
        ${textToAdd}
      `);
        }
    }
    else {
        tree.write('.npmrc', textToAdd);
    }
}
exports.setupNpmrc = setupNpmrc;
//# sourceMappingURL=setup-npmrc.js.map