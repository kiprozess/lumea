import { copyFileSync, mkdirSync, writeFileSync } from 'node:fs'
// Physical route entries return HTTP 200 on static hosting, including direct visits and reloads.
for (const route of ['bestellung', 'danke', 'ratgeber/deine-routine-in-der-lebensmitte']) {
  mkdirSync(`dist/${route}`, { recursive: true })
  copyFileSync('dist/index.html', `dist/${route}/index.html`)
}
copyFileSync('dist/index.html', 'dist/404.html')
writeFileSync('dist/.nojekyll', '')
