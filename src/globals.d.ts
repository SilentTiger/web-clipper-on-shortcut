import type { Readability, isProbablyReaderable } from '@mozilla/readability';
import type turndown from 'turndown';
import type dompurify from 'dompurify';

declare global {
  interface Window {
    isProbablyReaderable: typeof isProbablyReaderable,
    Readability: typeof Readability,
    turndown: typeof turndown,
    dompurify: typeof dompurify,
    completion: (result: boolean) => void;
    wcfiClip: (target: string) => void;
  }
}