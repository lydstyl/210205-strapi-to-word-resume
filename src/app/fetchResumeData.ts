require('isomorphic-fetch')

export async function fetchResumeData(
  url: string,
  query: string,
): Promise<any> {
  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        query,
      }),
    })

    const data = await (await res).json()

    return Promise.resolve(data)
  } catch (error) {
    console.log('🚀 ~ fetchResumeData ~ error', error)
    Promise.reject(error)
  }
}
