type PackageJsonExports = string | Record<string, string | {
    types?: string;
    require?: string;
    import?: string;
}>;
export interface PackageJson {
    name: string;
    version: string;
    license?: string;
    scripts?: Record<string, string>;
    type?: 'module' | 'commonjs';
    main?: string;
    types?: string;
    module?: string;
    exports?: PackageJsonExports;
    dependencies?: Record<string, string>;
    devDependencies?: Record<string, string>;
    peerDependencies?: Record<string, string>;
    peerDependenciesMeta?: Record<string, {
        optional?: boolean;
    }>;
    bin?: Record<string, string>;
    workspaces?: string[] | {
        packages: string[];
    };
}
export declare function readModulePackageJson(moduleSpecifier: string, requirePaths?: string[]): PackageJson | null;
export {};
