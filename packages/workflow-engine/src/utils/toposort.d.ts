declare module "toposort" {
  const toposort: (edges: Array<[string, string]>) => string[];
  export default toposort;
}
