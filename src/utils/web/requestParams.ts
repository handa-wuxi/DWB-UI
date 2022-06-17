export function URLParams(params: RawObject) {
  const p = new URLSearchParams(params);
  return p;
}
