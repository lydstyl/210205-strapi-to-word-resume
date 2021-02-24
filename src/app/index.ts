import { fetchResumeData } from './fetchResumeData'
import { makeWordResume } from './makeWordResume'
import { Options } from './fetchResumeData'

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
    labels {
      name
    }
    shortdescription
    projectname
    tasks {
      task
    }
    skills {
      name
    }
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
    date
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

  const OPTIONS: Options = {
    resumeData,
    // resumeTemplate: '../templates/faceelit.docx',
    resumeTemplate: '../templates/sii.docx',
    copyResumeToWebFolder: false,
  }

  makeWordResume(OPTIONS)
})()

export function hello(name: string): string {
  return `Hello ${name}`
}
