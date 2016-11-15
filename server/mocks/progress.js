
const casual = require('casual')

exports.step = () => {
  return {
    title: casual.title,
    description: casual.description,
    completed: casual.boolean ? casual.date('YYYY-MM-DDTHH:mm:ssZ') : null,
  }
}

exports.group = () => {
  const count = casual.integer(2, 20)
  const steps = []
  for (let i = 0; i < count; i++) {
    steps.push(this.step())
  }

  return {
    title: casual.title,
    description: casual.description,
    complete: Math.floor(steps.reduce((prev, curr) => {
      if (curr.completed) prev += (100 / count)
      return prev
    }, 0)),
    steps,
  }
}

exports.default = () => {
  const count = casual.integer(2, 5)
  const groups = []
  for (let i = 0; i < count; i++) {
    groups.push(this.group())
  }

  return groups
}
