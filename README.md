# web-clipper-for-obsidian-ios

这是一段用于在 iOS Safari 上剪藏网页内容到笔记 App 的 JavaScript 代码，需要配合 iOS 快捷指令使用。


varAutoUpdate
varClipTarget
varVersion

# 开始初次使用引导
Q: 希望将网页内容剪藏到哪款 App？ Obsidian, Craft, Bear
Q: 启用自动更新吗？自动更新会在每个自然月第一次使用此快捷指令的时候检查是否有新版本的，并提示您立即更新、暂时忽略或跳过此版本，建议开启。

const scriptTagShowdown = document.createElement('script')
scriptTagShowdown.src = 'https://cdn.jsdelivr.net/npm/showdown@2.1.0/dist/showdown.min.js'
document.body.appendChild(scriptTagShowdown)

const scriptTagReadability = document.createElement('script')
scriptTagReadability.src = 'https://cdn.jsdelivr.net/npm/@mozilla/readability@0.4.4/Readability.js'
document.body.appendChild(scriptTagReadability)
