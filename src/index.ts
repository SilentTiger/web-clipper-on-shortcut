import type { IReadabilityArticle } from './common'
import plugins from './plugin'
import launchers from './launcher';
import { Readability, isProbablyReaderable } from '@mozilla/readability';
import TurndownService from 'turndown';
import dompurify from 'dompurify';

function clip(target: string) {
  const { completion } = window;
  const clonedDocument: Document = document.cloneNode(true) as Document
  const url = new URL(location.href)

  const neededPlugin = plugins.filter(plugin => {
    let needed = false
    try {
      needed = plugin.check(clonedDocument, url);
    } catch (error) {
      console.log(`plugin [${plugin.name}] check error`, error)
    }
    return needed
  })

  const beforeReadableDocument: Document = neededPlugin.reduce((doc, plugin): Document => {
    try {
      return plugin.beforeReadable?.(doc, url) ?? doc
    } catch (error) {
      console.log(`plugin [${plugin.name}] beforeReadable error`, error)
    }
    return doc
  }, clonedDocument);

  if (!isProbablyReaderable(beforeReadableDocument)) {
    completion(false);
  }

  const readabilityArticle: IReadabilityArticle | null = new Readability(beforeReadableDocument).parse()

  if (readabilityArticle === null) {
    return
  }

  const afterReadableArticle: IReadabilityArticle = neededPlugin.reduce((article, plugin): IReadabilityArticle => {
    try {
      return plugin.afterReadable?.(article, clonedDocument, url) ?? article
    } catch (error) {
      console.log(`plugin [${plugin.name}] afterReadable error`, error)
    }
    return article
  }, readabilityArticle)

  const pureArticle = {
    ...afterReadableArticle,
    content: dompurify.sanitize(afterReadableArticle.content)
  }

  const turndownService = new TurndownService({
    headingStyle: 'atx',
  })
  const markdownContent: string = turndownService.turndown(pureArticle.content)

  const afterMarkdownContent: string = neededPlugin.reduce((markdown, plugin): string => {
    try {
      return plugin.afterMarkdown?.(markdown, pureArticle, clonedDocument, url) ?? markdown;
    } catch (error) {
      console.log(`plugin [${plugin.name}] afterMarkdown error`, error)
    }
    return markdown;
  }, markdownContent)

  console.log('final markdown content:')
  console.log(afterMarkdownContent)

  const finalArticle: IReadabilityArticle = {
    ...pureArticle,
    markdownContent: afterMarkdownContent
  }

  const launcher = launchers.find(item => item.name === target)
  if (!launcher) {
    completion(false);
    alert('launcher not found');
  } else {
    completion(launcher.launch(finalArticle, url) ?? false);
    alert('launcher success obsidian');
  }
}
window.wcosClip = clip