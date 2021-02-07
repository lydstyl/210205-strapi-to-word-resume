const PizZip = require('pizzip')
const Docxtemplater = require('docxtemplater')
import * as dayjs from 'dayjs'

const fs = require('fs')
const path = require('path')

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
  resumeData.date = dayjs().format('DD-MM-YYYY')

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
  fs.writeFileSync(path.resolve(__dirname, 'output.docx'), buf)
}
