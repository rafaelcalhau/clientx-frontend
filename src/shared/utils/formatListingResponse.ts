export const formatListingResponse = (response: any) => {
  if (Array.isArray(response?.data) && response?.total) {
    return { data: response.data, total: response.total }
  }

  return { data: [], total: 0 }
}