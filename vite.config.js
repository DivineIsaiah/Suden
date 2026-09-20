import { defineConfig } from 'vite'
import { resolve, dirname } from 'node:path'
import { readdirSync } from 'node:fs'
import { fileURLToPath } from 'node:url'

const rootDir = dirname(fileURLToPath(import.meta.url))

function getHtmlEntries(dir, root = dir, entries = {}) {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    if (['node_modules', 'dist', '.git'].includes(entry.name)) {
      continue
    }

    const fullPath = resolve(dir, entry.name)

    if (entry.isDirectory()) {
      getHtmlEntries(fullPath, root, entries)
    } else if (entry.isFile() && entry.name.endsWith('.html')) {
      const relativePath = fullPath
        .slice(root.length + 1)
        .replaceAll('\\', '/')
        .replace(/\.html$/, '')

      entries[relativePath] = fullPath
    }
  }

  return entries
}

export default defineConfig({
  base: '/Suden/',

  build: {
    rollupOptions: {
      input: getHtmlEntries(rootDir)
    }
  }
})