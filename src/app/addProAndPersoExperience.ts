export function addProAndPersoExperience(resumeData) {
  const perso = []
  const pro = []

  resumeData.experiences.forEach((e) => {
    const labels = e.labels

    if (contentHasLabel(e, 'pro')) {
      pro.push(e)
    }

    if (contentHasLabel(e, 'perso')) {
      perso.push(e)
    }
  })

  resumeData.pro = pro
  resumeData.perso = perso

  // console.log('🚀 ~ addProAndPersoExperience ~ resumeData', resumeData.pro)

  return resumeData
}

export function contentHasLabel(content: any, label: string): boolean {
  let hasLabel = false

  content.labels.forEach((l) => {
    if (l.name === label) {
      hasLabel = true
    }
  })

  return hasLabel
}
