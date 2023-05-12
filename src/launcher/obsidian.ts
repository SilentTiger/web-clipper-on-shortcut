import { ILauncher } from "../common";

type Vault = string
type Name = string
type ObsidianLaunchConfig = `${Vault}|${Name}`

const obsidianLauncher: ILauncher<ObsidianLaunchConfig> = {
  name: "Obsidian",
  launch: (article, url, config: ObsidianLaunchConfig): string | null => {
    if (!article.markdownContent) {
      return null
    }
    const vault = config.split("|")[0]
    const name = config.split("|")[1]
    if (vault && name) {
      window.open(`obsidian://new?vault=${vault}&file=${name}/${article.title}`)
      return article.markdownContent
    }
    return null
  }
}

export default obsidianLauncher