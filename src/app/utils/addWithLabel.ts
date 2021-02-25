export function addWithLabel(
  data,
  content: string,
  labelsToKeep: Array<string>,
) {
  let dataToAdd = data[content]

  dataToAdd = dataToAdd.filter((d) => {
    let isToAdd = false

    d.labels.forEach((label) => {
      if (labelsToKeep.includes(label.name)) {
        isToAdd = true
      }
    })

    return isToAdd
  })

  const dataNameToAdd = content + '_' + labelsToKeep.join('_')

  data[dataNameToAdd] = dataToAdd

  return data
}

export function sortSkills(data) {
  data.skills = data.skills.sort((a, b) => b.score - a.score)

  // console.log(data.skills)

  return data
}
