import { ILauncher } from "../common";

const obsidianLauncher: ILauncher = {
  name: "Obsidian",
  launch: (article): boolean => {
    if (!article.markdownContent) {
      return false
    }
    return true
  }
}

export default obsidianLauncher