import SpriteGeneral from '../../../cache/sprite-general.svg'

const loadAssets = async () => {
  const icons = [SpriteGeneral]

  const exist = document.querySelectorAll('.spritesheet')
  if (exist.length > 0) return

  const promises = icons.map(
    async (icon) => await fetch(icon, { method: 'GET' })
  )

  await Promise.all(promises).then((responses) => {
    responses.forEach(async (response) => {
      if (response.status !== 200) return

      try {
        const data = await response.text()
        const div = document.createElement('div')
        const parent = document.body
        const child = parent.children[0]

        div.className = 'spritesheet'
        div.style.visibility = 'hidden'
        div.style.height = '0px'

        div.innerHTML = data
        parent.insertBefore(div, child)
      } catch (error) {
        console.log(`loadAssets: Error while load icons!`, error)
      }
    })
  })
}

export default loadAssets
