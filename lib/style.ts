export const vw = (width: number, viewport = 750): string => {
  return `${width / viewport * 100}vw`;
}