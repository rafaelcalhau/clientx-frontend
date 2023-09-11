const makeHttpHeaders = (headerOptions?: HeadersInit, accessToken?: string) => {
  const headers = new Headers({
    ...headerOptions,
    'Accept': '*/*',
    'Content-Type': 'application/json',
  })
  if (accessToken) {
    headers.set('Authorization', `Bearer ${accessToken}`)
  }
  return headers
}

const makeUrl = (url: string) => {
  const baseURL = process.env.NEXT_PUBLIC_API_URL ?? '';
  if (url.startsWith('/')) return `${baseURL}${url}`;
  else return `${baseURL}/${url}`;
}

export const clientAPI = {
  delete: async (url: string, headerOptions?: HeadersInit, accessToken?: string) => {
    const headers = makeHttpHeaders(headerOptions, accessToken)
    return fetch(makeUrl(url), { method: 'DELETE', headers })
      .then(res => res.json())
      .catch(err => {
        console.error('@clientAPI, [DELETE], error', err.message)
        return null
      })
  },
  get: async (url: string, headerOptions?: HeadersInit, accessToken?: string) => {
    const headers = makeHttpHeaders(headerOptions, accessToken)
    return fetch(makeUrl(url), { method: 'GET', headers })
      .then(res => res.json())
      .catch(err => {
        console.error('@clientAPI, [GET], error', err.message)
        return null
      })
  },
  post: async (url: string, data: Record<string, any>, headerOptions?: HeadersInit, accessToken?: string) => {
    const headers = makeHttpHeaders(headerOptions, accessToken)
    return fetch(makeUrl(url), { method: 'POST', headers, body: JSON.stringify(data) })
      .then(res => res.json())
      .catch(err => {
        console.error('@clientAPI, [POST], error', err.message)
        return null
      })
  },
  patch: async (url: string, data: Record<string, any>, headerOptions?: HeadersInit, accessToken?: string) => {
    const headers = makeHttpHeaders(headerOptions, accessToken)
    return fetch(makeUrl(url), { method: 'PATCH', headers, body: JSON.stringify(data) })
      .then(res => res.json())
      .catch(err => {
        console.error('@clientAPI, [PATCH], error', err.message)
        return null
      })
  },
  put: async (url: string, data: Record<string, any>, headerOptions?: HeadersInit, accessToken?: string) => {
    const headers = makeHttpHeaders(headerOptions, accessToken)
    return fetch(makeUrl(url), { method: 'PUT', headers, body: JSON.stringify(data) })
      .then(res => res.json())
      .catch(err => {
        console.error('@clientAPI, [PUT], error', err.message)
        return null
      })
  }
};