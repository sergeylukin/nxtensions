"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.processProjectGraph = void 0;
const devkit_1 = require("@nrwl/devkit");
const fs_1 = require("fs");
const typescript_import_locator_1 = require("nx/src/project-graph/build-dependencies/typescript-import-locator");
const target_project_locator_1 = require("nx/src/utils/target-project-locator");
const path_1 = require("path");
let astroCompiler;
let astroCompilerUtils;
let importLocator;
let ts;
async function processProjectGraph(graph, context) {
    const filesToProcess = getAstroFilesToProcess(context.filesToProcess);
    // return the unmodified project graph when there are no Astro files to process
    if (filesToProcess.length === 0) {
        return graph;
    }
    const builder = new devkit_1.ProjectGraphBuilder(graph);
    for (const { project, files } of filesToProcess) {
        if (!graph.nodes[project]) {
            addNode(context, builder, project);
        }
        for (const file of files) {
            // we delay the creation of these until needed and then, we cache them
            astroCompiler !== null && astroCompiler !== void 0 ? astroCompiler : (astroCompiler = await new Function(`return import('@astrojs/compiler');`)());
            astroCompilerUtils !== null && astroCompilerUtils !== void 0 ? astroCompilerUtils : (astroCompilerUtils = await new Function(`return import('@astrojs/compiler/utils');`)());
            const fileContent = (0, fs_1.readFileSync)((0, path_1.join)(devkit_1.workspaceRoot, file.file), 'utf-8');
            // parse the file to get the AST
            const { ast } = await astroCompiler.parse(fileContent, {
                position: false,
            });
            // collect the dependencies
            collectDependencies(builder, ast, graph, project, file.file);
        }
    }
    return builder.getUpdatedProjectGraph();
}
exports.processProjectGraph = processProjectGraph;
function addNode(context, builder, projectName) {
    var _a;
    const project = context.workspace.projects[projectName];
    const projectType = project.projectType === 'application'
        ? projectName.endsWith('-e2e')
            ? 'e2e'
            : 'app'
        : 'lib';
    builder.addNode({
        data: {
            ...project,
            tags: (_a = project.tags) !== null && _a !== void 0 ? _a : [],
            files: context.fileMap[projectName],
        },
        name: projectName,
        type: projectType,
    });
}
function collectDependencies(builder, node, graph, project, filePath) {
    if (astroCompilerUtils.is.frontmatter(node)) {
        // we delay the creation of these until needed and then, we cache them
        importLocator !== null && importLocator !== void 0 ? importLocator : (importLocator = new typescript_import_locator_1.TypeScriptImportLocator());
        ts = ts !== null && ts !== void 0 ? ts : require('typescript');
        const targetProjectLocator = new target_project_locator_1.TargetProjectLocator(graph.nodes, graph.externalNodes);
        const sourceFile = ts.createSourceFile(filePath, node.value, ts.ScriptTarget.Latest, true);
        // locate imports
        importLocator.fromNode(filePath, sourceFile, (importExpr, filePath) => {
            // locate project containing the import
            const target = targetProjectLocator.findProjectWithImport(importExpr, filePath);
            // add the explicit dependency when the target project was found
            if (target) {
                builder.addExplicitDependency(project, filePath, target);
            }
        });
        // bail out since the frontmatter has already been processed
        return;
    }
    if (!astroCompilerUtils.is.parent(node)) {
        return;
    }
    for (const child of node.children) {
        collectDependencies(builder, child, graph, project, filePath);
        // the child is the frontmatter and at this point was already processed, bail out
        if (astroCompilerUtils.is.frontmatter(child)) {
            return;
        }
    }
}
function getAstroFilesToProcess(filesToProcess) {
    const astroExtensions = ['.astro', '.md'];
    return Object.entries(filesToProcess)
        .map(([project, files]) => {
        const astroFiles = files.filter((file) => astroExtensions.includes((0, path_1.extname)(file.file)));
        if (astroFiles.length > 0) {
            return { project, files: astroFiles };
        }
        return undefined;
    })
        .filter(Boolean);
}
//# sourceMappingURL=plugin.js.map