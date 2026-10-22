// Keep the local root deployment and GitHub Pages subdirectory working from the same source.
const base = import.meta.env.BASE_URL.replace(/\/$/, '')
export function siteUrl(path: string) {
  return path.startsWith('/') && !path.startsWith('//') ? base + path : path
}
export function appPath() {
  const path = window.location.pathname
  const relative = base && (path === base || path.startsWith(base + '/')) ? path.slice(base.length) : path
  return relative.replace(/\/$/, '') || '/'
}
