export declare global {
  interface Window {
    wcosClip: (target: string, launcherConfig: string) => [string, string] | null,
  }
}