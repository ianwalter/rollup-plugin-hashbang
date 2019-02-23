import MagicString from 'magic-string'

const hashbangRegex = /^\s*(#!.*)/

export default function hashbangPlugin (options = { prepend: true }) {
  return {
    name: 'hashbang',
    transform (code) {
      let match = hashbangRegex.exec(code)
      if (match) {
        this.meta.hashbang = match[1]
        const str = new MagicString(code)
        str.remove(match.index, match[1].length)
        return { code: str.toString(), map: str.generateMap({ hires: true }) }
      }
      return null
    },
    renderChunk (code, { isEntry }) {
      if (options.prepend && isEntry && this.meta.hashbang) {
        const str = new MagicString(code)
        str.prepend(this.meta.hashbang + '\n')
        return { code: str.toString(), map: str.generateMap({ hires: true }) }
      }
    }
  }
}
