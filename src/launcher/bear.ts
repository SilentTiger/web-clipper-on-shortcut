import { ILauncher } from "../common";

type Vault = string
type Name = string
type BearLaunchConfig = `${Vault}|${Name}`

const bearLauncher: ILauncher<BearLaunchConfig> = {
  name: "Bear",
  launch: (article, url, config: BearLaunchConfig): [string, string] | null => {
    if (!article.markdownContent) {
      return null
    }
    const vault = config.split("|")[0]
    const name = config.split("|")[1]
    if (vault && name) {
      return [
        encodeURI(`bear://x-callback-url/create?title=${article.title}&open_note=yes&clipboard=yes&timestamp=yes`),
        article.markdownContent
      ]
    }
    return null
  }
}

export default bearLauncher