export function getAssetsFile(src: string) {
  return new URL(`../../assets/${src}`, import.meta.url).href;
}
