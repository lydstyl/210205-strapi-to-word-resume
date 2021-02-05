const fetch = require('node-fetch')

export function hello(name: string): string {
  return `Hello ${name}`
}

export async function getSkills() {
  try {
    const response = await fetch(
      'https://gabriel-brun-resume-backend.herokuapp.com/skills',
    )
    const data = await response.json()
    console.log('🚀 ~ getSkills ~ data', data)
  } catch (error) {
    console.log('🚀 ~ getSkills ~ error', error)
  }
}

getSkills()
