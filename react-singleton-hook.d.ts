declare module "react-singleton-hook" {
  export function singletonHook<T>(defaultValue: T, key?: any): T;
}
