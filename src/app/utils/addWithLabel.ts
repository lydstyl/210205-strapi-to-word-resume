export default function addWithLabel(
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
