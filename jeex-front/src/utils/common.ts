export const shortenAddress = (str?: string) => {
  if (!str) return ''
  return `${str.slice(0, 5)}...${str.slice(-5)}`
}
