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

export async function fetchResumeData() {
  require('isomorphic-fetch')

  fetch('https://gabriel-brun-resume-backend.herokuapp.com/graphql', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      query: `
        query {
          about {
            title
            description
            goal
            published_at
          }
          
          skills{
            name
            score
            labels {
              name
            }
          }
          
          experiences {
            title
            company
            begin
            end
            description
          }
          
          educations {
            title
            begin
            end
            description
          }
          
          certificats {
            name
            url
          }
          
          interests {
            name
          }
        }`,
    }),
  })
    .then((res) => res.json())
    .then((res) => console.log(res.data))
}

fetchResumeData()
