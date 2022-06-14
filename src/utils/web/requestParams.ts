export function URLParams(params:Record<string, any>) {
  const p = new URLSearchParams(params);
  return p;
}
