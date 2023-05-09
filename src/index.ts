import type { IReadabilityArticle } from './common'
import plugins from './plugin'
import launchers from './launcher';

function clip(target: string) {
  const { Readability, isProbablyReaderable, showdown, dompurify, completion } = window;
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

  const converter = new showdown.Converter()
  const markdownContent: string = converter.makeMarkdown(pureArticle.content)

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

  const result = launchers.find(item => item.name === target)?.launch(finalArticle, url) ?? false
  completion(result);
}
window.wcfiClip = clip