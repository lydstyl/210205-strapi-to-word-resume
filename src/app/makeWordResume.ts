const Docxtemplater = require('docxtemplater')
import shell = require('shelljs')
import fs = require('fs')
import path = require('path')

import {
  addMainSkills,
  addStarsToMainSkills,
  addOtherSkills,
  filterOtherSkills,
  sortExperiences,
  formateDates,
  capitalizeCertificats,
  removeInvalidDate,
  createZip,
  errorHandler,
} from './utils'

import { addProAndPersoExperience } from './addProAndPersoExperience'

function createDoc(zip, resumeData) {
  let doc

  try {
    doc = new Docxtemplater(zip, { linebreaks: true })
  } catch (error) {
    // Catch compilation errors (errors caused by the compilation of the template : misplaced tags)
    errorHandler(error)
  }

  //set the templateVariables
  // console.log('🚀 ~ resumeData', resumeData.educations)

  doc.setData(resumeData)

  try {
    // render the document (replace all occurences of {first_name} by John, {last_name} by Doe, ...)
    doc.render()
    return doc
  } catch (error) {
    // Catch rendering errors (errors relating to the rendering of the template : angularParser throws an error)
    errorHandler(error)
  }
}

function writeFile(doc, copyResumeToWebFolder): void {
  const buf = doc.getZip().generate({ type: 'nodebuffer' })

  // buf is a nodejs buffer, you can either write it to a file or do anything else with it.
  const fileName = 'CV Gabriel Brun développeur React.docx'

  fs.writeFileSync(path.resolve(__dirname, fileName), buf)

  console.log(`CV généré à ici : ${__dirname}/${fileName}`)

  if (copyResumeToWebFolder) {
    shell.exec('./cpCVToWebSite.sh')

    console.log('CV copié dans le dossier du site web.')
  }
}

export function makeWordResume(
  // resumeData: ResumeData,
  // resumeTemplate: string,
  options,
): void {
  let { resumeData } = options
  const { resumeTemplate, copyResumeToWebFolder } = options

  resumeData = addMainSkills(resumeData)

  resumeData = addStarsToMainSkills(resumeData)

  resumeData = addOtherSkills(resumeData)

  resumeData = filterOtherSkills(resumeData)

  resumeData = sortExperiences(resumeData)

  resumeData = formateDates(resumeData)

  resumeData = capitalizeCertificats(resumeData)

  resumeData = removeInvalidDate(resumeData)

  resumeData = addProAndPersoExperience(resumeData)

  const zip = createZip(resumeTemplate)

  const doc = createDoc(zip, resumeData)

  writeFile(doc, copyResumeToWebFolder)
}
