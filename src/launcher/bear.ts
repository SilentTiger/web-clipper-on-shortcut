import { ILauncher } from "../common";

type BearLaunchConfig = never

const bearLauncher: ILauncher<BearLaunchConfig> = {
  name: "Bear",
  launch: (article, url): [string, string] | null => {
    if (!article.markdownContent) {
      return null
    }
    return [
      encodeURI(`bear://x-callback-url/create?title=${article.title}&clipboard=yes&type=html&url=${url.toString()}`),
      article.content
    ]
  }
}

export default bearLauncher