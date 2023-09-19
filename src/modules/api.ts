import { FetcherOptions } from "@/shared/interfaces";

const makeHttpHeaders = (fetchOptions?: FetcherOptions) => {
  const headers = new Headers({
    'Accept': '*/*',
    'Content-Type': 'application/json',
  })

  if (fetchOptions?.accessToken) {
    headers.set('Authorization', fetchOptions.accessToken)
  }

  return headers
}

const makeUrl = (url: string) => {
  const baseURL = process.env.NEXT_PUBLIC_API_URL ?? '';
  if (url.startsWith('/')) return `${baseURL}${url}`;
  else return `${baseURL}/${url}`;
}

export const clientAPI = {
  delete: async (url: string, fetchOptions?: FetcherOptions) => {
    const headers = makeHttpHeaders(fetchOptions)
    return fetch(makeUrl(url), { method: 'DELETE', headers })
      .then(res => res.json())
      .catch(err => {
        console.error('@clientAPI, [DELETE], error', err.message)
        return null
      })
  },
  get: async (url: string, fetchOptions?: FetcherOptions) => {
    const headers = makeHttpHeaders(fetchOptions)
    return fetch(makeUrl(url), { method: 'GET', headers })
      .then(res => res.json())
      .catch(err => {
        console.error('@clientAPI, [GET], error', err.message)
        return null
      })
  },
  post: async (url: string, data: Record<string, any>, fetchOptions?: FetcherOptions) => {
    const headers = makeHttpHeaders(fetchOptions)
    return fetch(makeUrl(url), { method: 'POST', headers, body: JSON.stringify(data) })
      .then(res => res.json())
      .catch(err => {
        console.error('@clientAPI, [POST], error', err.message)
        return null
      })
  },
  patch: async (url: string, data: Record<string, any>, fetchOptions?: FetcherOptions) => {
    const headers = makeHttpHeaders(fetchOptions)
    return fetch(makeUrl(url), { method: 'PATCH', headers, body: JSON.stringify(data) })
      .then(res => res.json())
      .catch(err => {
        console.error('@clientAPI, [PATCH], error', err.message)
        return null
      })
  },
  put: async (url: string, data: Record<string, any>, fetchOptions?: FetcherOptions) => {
    const headers = makeHttpHeaders(fetchOptions)
    return fetch(makeUrl(url), { method: 'PUT', headers, body: JSON.stringify(data) })
      .then(res => res.json())
      .catch(err => {
        console.error('@clientAPI, [PUT], error', err.message)
        return null
      })
  }
};