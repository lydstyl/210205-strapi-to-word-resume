require('isomorphic-fetch')

interface About {
  title: string
  description: string
  goal: string
  published_at: string
}

interface Skill {
  name: string
  score: number
  labels: Array<Label>
}

interface Label {
  name: string
}

interface Experience {
  title: string
  company: string
  begin: string
  end: string
  description: string
}

interface Education {
  title: string
  begin: string
  end: string
  description: string
}

interface Certificat {
  name: string
  url: string
}

interface Interest {
  name: string
}

interface ResumeData {
  about: About
  skills: Array<Skill>
  experiences: Array<Experience>
  educations: Array<Education>
  certificats: Array<Certificat>
  interests: Array<Interest>
}

export async function fetchResumeData(
  url: string,
  query: string,
): Promise<ResumeData> {
  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        query,
      }),
    })

    const data = await res.json()

    return Promise.resolve(data.data)
  } catch (error) {
    console.log('🚀 ~ fetchResumeData ~ error', error)
    Promise.reject(error)
  }
}
