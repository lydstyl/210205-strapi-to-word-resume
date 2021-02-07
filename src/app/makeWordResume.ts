const Docxtemplater = require('docxtemplater')

import PizZip = require('pizzip')
import * as dayjs from 'dayjs'

import fs = require('fs')
import path = require('path')

import {
  // About,
  // Skill,
  // Label,
  // Experience,
  // Education,
  // Certificat,
  // Interest,
  ResumeData,
} from './fetchResumeData'

function addMainSkills(resumeData) {
  resumeData.mainSkills = resumeData.skills.filter((s) => {
    let isMain = false
    s.labels.forEach((l) => {
      if (l.name === 'main skill') {
        isMain = true
      }
    })

    if (isMain) {
      return true
    } else {
      return false
    }
  })

  return resumeData
}

function addStarsToMainSkills(resumeData) {
  resumeData.mainSkills = resumeData.mainSkills.map((s) => {
    let fullStars = s.score
    s.stars = ''
    for (let i = 0; i < 10; i++) {
      if (fullStars < 1) {
        s.stars += '☆'
      } else {
        s.stars += '★'
      }
      fullStars--
    }

    return s
  })

  return resumeData
}

function addOtherSkills(resumeData) {
  resumeData.otherSkills = resumeData.skills.filter((s) => {
    let isOther = false
    s.labels.forEach((l) => {
      if (l.name === 'other') {
        isOther = true
      }
    })

    if (isOther) {
      return true
    } else {
      return false
    }
  })

  return resumeData
}

function filterOtherSkills(resumeData) {
  resumeData.otherSkills = resumeData.otherSkills.filter((s) => {
    if (s.score >= 6) {
      return true
    }
    return false
  })

  return resumeData
}

function formateDates(resumeData) {
  resumeData.date = dayjs().format('DD/MM/YYYY')
  resumeData.experiences = resumeData.experiences.map((e) => ({
    ...e,
    begin: dayjs(e.begin).format('DD/MM/YYYY'),
    end: dayjs(e.end).format('DD/MM/YYYY'),
  }))

  resumeData.educations = resumeData.educations.map((e) => ({
    ...e,
    begin: dayjs(e.begin).format('DD/MM/YYYY'),
    end: dayjs(e.end).format('DD/MM/YYYY'),
  }))

  return resumeData
}

// The error object contains additional information when logged with JSON.stringify (it contains a properties object containing all suberrors).
function replaceErrors(key, value) {
  if (value instanceof Error) {
    return Object.getOwnPropertyNames(value).reduce(function (error, key) {
      error[key] = value[key]
      return error
    }, {})
  }
  return value
}

function errorHandler(error) {
  console.log(JSON.stringify({ error: error }, replaceErrors))

  if (error.properties && error.properties.errors instanceof Array) {
    const errorMessages = error.properties.errors
      .map(function (error) {
        return error.properties.explanation
      })
      .join('\n')
    console.log('errorMessages', errorMessages)
    // errorMessages is a humanly readable message looking like this :
    // 'The tag beginning with "foobar" is unopened'
  }
  throw error
}

export function makeWordResume(
  resumeData: ResumeData,
  resumeTemplate: string,
): void {
  resumeData = addMainSkills(resumeData)

  resumeData = addStarsToMainSkills(resumeData)

  resumeData = addOtherSkills(resumeData)

  resumeData = filterOtherSkills(resumeData)

  resumeData = formateDates(resumeData)

  //Load the docx file as a binary
  const content = fs.readFileSync(
    path.resolve(__dirname, resumeTemplate),
    'binary',
  )

  const zip = new PizZip(content)

  let doc

  try {
    doc = new Docxtemplater(zip)
  } catch (error) {
    // Catch compilation errors (errors caused by the compilation of the template : misplaced tags)
    errorHandler(error)
  }

  //set the templateVariables
  console.log('🚀 ~ resumeData', resumeData)
  doc.setData(resumeData)

  try {
    // render the document (replace all occurences of {first_name} by John, {last_name} by Doe, ...)
    doc.render()
  } catch (error) {
    // Catch rendering errors (errors relating to the rendering of the template : angularParser throws an error)
    errorHandler(error)
  }

  const buf = doc.getZip().generate({ type: 'nodebuffer' })

  // buf is a nodejs buffer, you can either write it to a file or do anything else with it.
  const fileName = 'CV Gabriel Brun développeur React.docx'
  fs.writeFileSync(path.resolve(__dirname, fileName), buf)
  console.log(`CV généré à ici : ${__dirname}/${fileName}`)
}
