export const { base = '', query = '' } = (window as unknown as {
  PRIME_CONFIG?: {
    base?: string
    query?: string
  }
}).PRIME_CONFIG ?? {}
