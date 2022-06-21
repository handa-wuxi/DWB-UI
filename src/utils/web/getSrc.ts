export function getAssetsSrc(src: string) {
  if (src.startsWith('@')) {
    const newPath = src.replace('@', '../../');
    return new URL(newPath, import.meta.url);
  }
  return new URL(src, import.meta.url);
}
