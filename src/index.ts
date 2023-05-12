import type { IReadabilityArticle } from './common'
import plugins from './plugin'
import launchers from './launcher';
import { Readability } from '@mozilla/readability';
import TurndownService from 'turndown';
import dompurify from 'dompurify';

function clip(target: string, launcherConfig: string): string | null {
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

  const readabilityArticle: IReadabilityArticle | null = new Readability(beforeReadableDocument).parse()

  if (readabilityArticle === null) {
    return null;
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
    alert('launcher not found');
    return null
  } else {
    return (launcher.launch(finalArticle, url, launcherConfig) ?? null);
  }
}
window.wcosClip = clip