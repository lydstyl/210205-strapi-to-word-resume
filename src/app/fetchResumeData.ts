require('isomorphic-fetch')

export interface About {
  title: string
  description: string
  goal: string
  published_at: string
}

export interface Skill {
  name: string
  score: number
  labels: Array<Label>
}

export interface Label {
  name: string
}

export interface Experience {
  title: string
  company: string
  begin: string
  end: string
  description: string
}

export interface Education {
  title: string
  begin: string
  end: string
  description: string
}

export interface Certificat {
  name: string
  url: string
}

export interface Interest {
  name: string
}

export interface ResumeData {
  date: string
  about: About
  skills: Array<Skill>
  experiences: Array<Experience>
  educations: Array<Education>
  certificats: Array<Certificat>
  interests: Array<Interest>
}

export interface Options {
  resumeData: ResumeData
  resumeTemplate: string
  copyResumeToWebFolder: boolean
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
