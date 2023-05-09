export interface IReadabilityArticle<T = string> {
  /** article title */
  title: string;

  /** HTML string of processed article content */
  content: T;

  /** text content of the article, with all the HTML tags removed */
  textContent: string;

  /** length of an article, in characters */
  length: number;

  /** article description, or short excerpt from the content */
  excerpt: string;

  /** author metadata */
  byline: string;

  /** content direction */
  dir: string;

  /** name of the site */
  siteName: string;

  /** content language */
  lang: string;

  /** markdown content converted from HTML */
  markdownContent?: string;
}

export interface IPlugin {
  name: string;
  check: (doc: Document, url: URL) => boolean;
  beforeReadable?: (doc: Document, url: URL) => Document;
  afterReadable?: (article: IReadabilityArticle, doc: Document, url: URL) => IReadabilityArticle;
  afterMarkdown?: (markdown: string, article: IReadabilityArticle, doc: Document, url: URL) => string;
}

export interface ILauncher {
  name: string;
  launch: (article: IReadabilityArticle, url: URL) => boolean;
}