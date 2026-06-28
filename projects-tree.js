const projectsData = {
  name: '.',
  type: 'dir',
  children: [
    {
      name: 'website/',
      type: 'dir',
      description: 'this website',
      children: [
        {
          name: 'github',
          type: 'file',
          link: 'https://github.com/potatsu314/website',
        },
      ],
    },
    {
      name: 'uwulangpack/',
      type: 'dir',
      description: 'tool for creation of uwuified languages for minecraft :3',
      children: [
        {
          name: 'github',
          type: 'file',
          link: 'https://github.com/potatsu314/uwulangpack',
        },
      ],
    },
  ],
}

function generateTree(node, prefix = '') {
  let result = ''

  if (prefix === '') {
    let nameStr = node.name
    if (node.type === 'dir') {
      nameStr = `<span class="col-blue">${node.name}</span>`
    }
    if (node.description) {
      nameStr += ` (${node.description})`
    }
    if (node.link) {
      nameStr = `<a href="${node.link}" class="term-link" target="_blank">${nameStr}</a>`
    }
    result += nameStr + '\n'
  }

  if (node.children && node.children.length > 0) {
    node.children.forEach((child, index) => {
      const isLast = index === node.children.length - 1
      const connector = isLast ? '└── ' : '├── '

      let childName = child.name
      if (child.type === 'dir') {
        childName = `<span class="col-blue">${child.name}</span>`
      }
      if (child.description) {
        childName += ` (${child.description})`
      }
      if (child.link) {
        childName = `<a href="${child.link}" class="term-link" target="_blank">${childName}</a>`
      }

      result += prefix + connector + childName + '\n'

      const nextPrefix = prefix + (isLast ? '    ' : '│   ')
      result += generateTree(child, nextPrefix)
    })
  }

  return result
}

document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('projects-tree-output')
  if (container) {
    container.innerHTML = generateTree(projectsData).trim()
  }
})
