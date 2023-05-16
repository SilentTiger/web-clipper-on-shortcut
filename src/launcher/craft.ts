import { ILauncher } from "../common";

type SpaceId = string
type Folder = string
type CraftLaunchConfig = `${SpaceId}|${Folder}`

const craftLauncher: ILauncher<CraftLaunchConfig> = {
  name: "Craft",
  launch: (article, url, config: CraftLaunchConfig): [string, string] | null => {
    if (!article.markdownContent) {
      return null
    }
    const spaceId = config.split("|")[0]
    const folderId = config.split("|")[1]
    if (spaceId) {
      return [
        encodeURI(`craftdocs://createdocument?spaceId=${spaceId}&title=${article.title}&folderId=${folderId ?? ''}&content=${article.markdownContent}`),
        article.markdownContent
      ]
    }
    return null
  }
}

export default craftLauncher