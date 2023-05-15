import { ILauncher } from "../common";

type BearLaunchConfig = never

const bearLauncher: ILauncher<BearLaunchConfig> = {
  name: "Bear",
  launch: (article, url): [string, string] | null => {
    if (!article.markdownContent) {
      return null
    }
    return [
      encodeURI(`bear://x-callback-url/create?title=${article.title}&open_note=yes&clipboard=yes&timestamp=yes`),
      article.markdownContent
    ]
  }
}

export default bearLauncher