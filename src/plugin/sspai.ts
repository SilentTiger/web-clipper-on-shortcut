import { IPlugin } from "../common";

const SspaiPlugin: IPlugin = {
  name: "sspai",
  check(doc: Document, url: URL): boolean {
    return /sspai.com$/.test(url.host)
  },
  beforeReadable(doc: Document, url: URL): Document {
    return doc
  }
}

export default SspaiPlugin;