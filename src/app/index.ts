import { fetchResumeData } from './fetchResumeData'
import { makeWordResume } from './makeWordResume'

const RESUME_DATA_QUERY = `query {
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
}`

;(async function () {
  const resumeData = await fetchResumeData(
    'https://gabriel-brun-resume-backend.herokuapp.com/graphql',
    RESUME_DATA_QUERY,
  )

  makeWordResume(resumeData, 'resume-template.docx')
})()

export function hello(name: string): string {
  return `Hello ${name}`
}
