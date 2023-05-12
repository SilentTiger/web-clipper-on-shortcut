export declare global {
  interface Window {
    completion: (result: boolean) => void,
    wcosClip: (target: string) => void,
  }
}