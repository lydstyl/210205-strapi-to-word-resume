import PizZip = require('pizzip')
import * as dayjs from 'dayjs'
import fs = require('fs')
import path = require('path')

export function addMainSkills(resumeData) {
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

export function addStarsToMainSkills(resumeData) {
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

export function addOtherSkills(resumeData) {
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

export function filterOtherSkills(resumeData) {
  resumeData.otherSkills = resumeData.otherSkills.filter((s) => {
    if (s.score >= 6) {
      return true
    }
    return false
  })

  return resumeData
}

export function formateDates(resumeData) {
  resumeData.date = dayjs().format('DD/MM/YYYY')
  resumeData.experiences = resumeData.experiences.map((e) => ({
    ...e,
    begin: dayjs(e.begin).format('MM/YYYY'),
    end: dayjs(e.end).format('MM/YYYY'),
  }))

  resumeData.educations = resumeData.educations.map((e) => ({
    ...e,
    begin: dayjs(e.begin).format('MM/YYYY'),
    end: dayjs(e.end).format('MM/YYYY'),
  }))

  return resumeData
}

export function capitalizeCertificats(resumeData) {
  resumeData.interests = resumeData.interests.map((interest) => ({
    ...interest,
    name: interest.name.charAt(0).toUpperCase() + interest.name.slice(1),
  }))

  return resumeData
}

export function replaceErrors(key, value) {
  // The error object contains additional information when logged with JSON.stringify (it contains a properties object containing all suberrors).
  if (value instanceof Error) {
    return Object.getOwnPropertyNames(value).reduce(function (error, key) {
      error[key] = value[key]
      return error
    }, {})
  }
  return value
}

export function errorHandler(error) {
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

export function removeInvalidDate(resumeData) {
  resumeData.experiences = resumeData.experiences.map((xp) => {
    if (xp.end !== 'Invalid Date') {
      xp.hasEnd = true
    }
    return xp
  })

  return resumeData
}

export function sortExperiences(resumeData) {
  resumeData.experiences = resumeData.experiences.sort((a, b) => {
    return dayjs(b.begin).isAfter(dayjs(a.begin)) ? 1 : -1
  })

  return resumeData
}

export function createZip(resumeTemplate: string) {
  //Load the docx file as a binary
  const content = fs.readFileSync(
    path.resolve(__dirname, resumeTemplate),
    'binary',
  )

  const zip = new PizZip(content)
  return zip
}
