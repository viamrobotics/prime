export const { base = '', query = '', workers = {} } = (window as unknown as {
  PRIME_CONFIG?: {
    base?: string
    query?: string
    workers: {
      monaco?: string
    }
  }
}).PRIME_CONFIG ?? {}
