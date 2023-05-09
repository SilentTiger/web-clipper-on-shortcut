import type { Readability, isProbablyReaderable } from '@mozilla/readability';
import type showdown from 'showdown';
import type dompurify from 'dompurify';

declare global {
  interface Window {
    isProbablyReaderable: typeof isProbablyReaderable,
    Readability: typeof Readability,
    showdown: typeof showdown,
    dompurify: typeof dompurify,
    completion: (result: boolean) => void;
    wcfiClip: (target: string) => void;
  }
}