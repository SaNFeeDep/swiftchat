const fs = require('fs')
const path = require('path')

const chokidar = require('chokidar')
const { optimize } = require('svgo')
const SVGSpriter = require('svg-sprite')
const { createGradientExtract } = require('./gradient-plugin') // custom plugin!!!

const ROOT_PATH = './svg'

const createTimer = (ms, fn) => {
  let timer = null
  return (...args) => {
    if (timer !== null) {
      clearTimeout(timer)
      timer = null
    }

    timer = setTimeout(() => {
      timer = null
      fn(...args)
    }, ms)
  }
}

const readFolders = (root, ignore, result) => {
  const files = fs.readdirSync(root)

  files.forEach((name) => {
    const file = path.resolve(root, name)
    const stat = fs.statSync(file)

    if (stat.isDirectory()) {
      if (ignore === null || ignore.indexOf(name) === -1) {
        readFolders(file, null, result)
      }
    } else {
      result.push(file)
    }
  })

  return result
}

const createFileInfo = () => ({
  lockFile: false,
  content: null,
})

const getAllFiles = (root, ignore) => {
  const files = readFolders(root, ignore, [])
  const entries = files.map((file) => [file, createFileInfo()])

  return new Map(entries)
}

// -------------------------

const createGroup = (config) => [
  config.name,
  {
    files: null,
    queue: 0,
    readed: false,
    building: false,
    invalid: false,

    ...config,
  },
]

const spriteGroups = new Map([
  createGroup({
    index: 0,
    name: 'general',
    cleanStyles: true,
    root: ROOT_PATH,
    ignore: ['colored', 'vehicles'],
  }),
])

const getGroupByFile = (file) => {
  let folder = file.split('\\')[1]
  if (!spriteGroups.has(folder)) {
    folder = 'general'
  }

  const group = spriteGroups.get(folder)
  if (group.files === null) {
    group.files = getAllFiles(group.root, group.ignore)
  }

  return group
}

// -------------------------

const getSpriteName = (name) => `sprite-${name}.svg`

const spriteBuild = async (group) => {
  const { gradientsExtraction, defs } = createGradientExtract(group.index)

  const spriter = new SVGSpriter({
    mode: {
      symbol: true,
    },
    shape: {
      id: {
        generator: (n, source) => {
          const [fullName] = source.history
          const { dir, name } = path.parse(fullName)
          const [, ...splited] = dir.split('\\')

          const relative = splited.slice(splited.indexOf('svg') + 1)
          relative.push(name)
          return relative.join('--')
        },
      },
      transform: [gradientsExtraction, 'svgo'],
    },
    svg: {
      transform: [
        (svg) =>
          svg.replace('<symbol ', `${defs.firstChild.toString()}<symbol `),
      ],
    },
  })

  const root = path.resolve()
  const count = root.length + 1
  const files = [...group.files].map(([file, { content }]) => ({
    file: file.substr(count),
    content,
  }))

  files.forEach(({ file, content }) => {
    spriter.add(file, null, content)
  })

  const task = new Promise((resolve) => {
    spriter.compile((error, result) => {
      if (error) {
        console.error(error)
      } else {
        let contents = null

        if (
          result &&
          result.symbol &&
          result.symbol.sprite &&
          result.symbol.sprite.contents
        )
          contents = result.symbol.sprite.contents

        const name = getSpriteName(group.name)
        const file = path.resolve(`./cache/${name}`)

        if (contents) {
          fs.writeFileSync(file, contents)
        } else {
          console.error(`contents not found ${name}`)
        }
      }

      resolve()
    })
  })

  await task
}

const readAllFiles = async (filesMap) => {
  const files = [...filesMap].map(([key]) => key)
  const tasks = files.map(
    (file) =>
      new Promise((resolve) => {
        fs.readFile(file, 'utf8', (err, data) => resolve({ file, data }))
      })
  )

  const contents = await Promise.all(tasks)

  contents.forEach(({ file, data }) => {
    const info = filesMap.get(file)
    info.content = data
  })
}

const spriteBuildStart = async (group) => {
  if (group.building) {
    group.invalid = true
    return
  }

  group.building = true

  if (!group.readed) {
    await readAllFiles(group.files)
    group.readed = true
  }

  await spriteBuild(group)

  group.building = false

  if (group.invalid) {
    group.invalid = false
    spriteBuildStart(group)
  } else {
    const sprite = getSpriteName(group.name)
    console.log(`sprite builded: ${sprite}`)
  }
}

const spriteBuildDelayStart = createTimer(3000, spriteBuildStart)

const ATTRS_STYLE = ['fill', 'stroke', 'style', 'class']

const svgFileOptimize = (file, cleanStyles, delay) => {
  const data = fs.readFileSync(file, {
    encoding: 'utf8',
    flag: 'r',
  })

  const result = optimize(data, {
    full: true,
    plugins: [
      {
        name: 'my-custom-plugin',
        type: 'perItem',
        active: true,
        fn(node) {
          // TODO ?? NODE вроде как должен быть всегда объявлен???
          if (!node) {
            return true
          }

          const { name, attrs } = node

          if (attrs) {
            switch (name) {
              case 'svg':
                delete attrs.width
                delete attrs.height

                const fileName = path.basename(file)
                const value = path.parse(fileName)

                attrs.id = { name: 'id', value: value.name }
                break
              case 'g':
                if (node.children.length === 0) {
                  return false
                }
                break
              case 'style':
                if (cleanStyles) {
                  return false
                }
                break
              case 'linearGradient':
                // nothing
                break
              default:
                if (attrs.id) {
                  delete attrs.id
                }
            }

            if (attrs['data-name']) {
              delete attrs['data-name']
            }

            if (cleanStyles) {
              ATTRS_STYLE.forEach((style) => {
                if (attrs[style]) {
                  delete attrs[style]
                }
              })
            }
          }

          return true
        },
      },
    ],
  })

  return new Promise((resolve) => {
    const options = {
      encoding: 'utf8',
      flag: 'w',
    }

    fs.writeFile(file, result.data, options, () => {
      if (delay) {
        setTimeout(() => resolve(result.data), 500)
      } else {
        resolve(result.data)
      }
    })
  })
}

// -------------------------

const updateSvg = async (file) => {
  const group = getGroupByFile(file)
  const full = path.resolve(file)
  const info = group.files.get(full)

  if (info.lockFile) {
    return
  }

  console.log(`detect file: ${file}`)

  info.lockFile = true
  ++group.queue

  info.content = await svgFileOptimize(full, group.cleanStyles, true)

  info.lockFile = false
  --group.queue

  if (group.queue === 0) {
    spriteBuildDelayStart(group)
  }
}

const addSvg = (file) => {
  const group = getGroupByFile(file)
  const full = path.resolve(file)

  group.files.set(full, createFileInfo())
  updateSvg(file)
}

const deleteSvg = (file) => {
  const group = getGroupByFile(file)
  const full = path.resolve(file)

  console.log(`detect file: ${file}`)

  group.files.delete(full)
  spriteBuildDelayStart(group)
}

exports.startListenSvg = async () => {
  const watcher = chokidar.watch(ROOT_PATH, {
    ignoreInitial: true,
    persistent: true,
  })

  watcher.on('add', addSvg)
  watcher.on('change', updateSvg)
  watcher.on('unlink', deleteSvg)
}

exports.rebuildAllSvg = async () => {
  const groups = [...spriteGroups].map(([, group]) => group)
  groups.forEach((group) => {
    group.files = getAllFiles(group.root, group.ignore)
  })

  await Promise.all(
    groups.map((group) => {
      const entries = [...group.files]
      const tasks = entries.map(([file, info]) =>
        svgFileOptimize(file, group.cleanStyles, false).then((data) => {
          info.content = data
        })
      )

      return Promise.all(tasks)
    })
  )

  return Promise.all(groups.map((group) => spriteBuild(group)))
}
