import { generateMexicanWave, generateHashtag } from "./textFunctions"

function createMexicanWave() {
  const node = figma.currentPage.selection["0"]
  const newNodes: SceneNode[] = []

  const mw = generateMexicanWave(node.characters)

  mw.forEach((element, i) => {
    const newText = figma.createText()
    const wave = style(node, newText, element)

    wave.x = node.x
    wave.y = node.height * i
    newNodes.push(wave)
  })

  const groupMW = figma.group(newNodes, node.parent)
  groupMW.name = "Mexican Wave"
  groupMW.x = node.x
  groupMW.y = node.y + node.height + 10

  figma.currentPage.selection = figma.currentPage.findAll(e => e.name === "Mexican Wave")
  figma.viewport.center = { x: groupMW.x, y: groupMW.y }
  figma.viewport.zoom = 0.3
}

function createHashtag() {
  const node = figma.currentPage.selection["0"]
  const newNodes: SceneNode[] = []

  const hashtag = generateHashtag(node.characters)
  const newText = figma.createText()
  const newNode = style(node, newText, hashtag)
  newNode.x = node.x
  newNode.y = node.y + node.height + 10
  newNodes.push(newNode)

  node.parent.appendChild(newNode)
  figma.currentPage.selection = newNodes
  figma.viewport.center = { x: newNode.x, y: newNode.y }
  figma.viewport.zoom = 0.3
}

function style(oldEl, newEl, text) {
  const result = newEl

  figma
    .loadFontAsync(oldEl.fontName)
    .then(() => {
      oldEl.textStyleId ? (result.textStyleId = oldEl.textStyleId) : ""
      oldEl.fillStyleId ? (result.fillStyleId = oldEl.fillStyleId) : ""
      oldEl.effectStyleId ? (result.effectStyleId = oldEl.effectStyleId) : ""
      oldEl.strokeStyleId ? (result.strokeStyleId = oldEl.strokeStyleId) : ""
      result.fontName = oldEl.fontName
      result.characters = text
    })
    .catch(error => console.error(error))

  return result
}

export const utilsText = msg => {
  if (msg.type === "create-mexican-waves") {
    createMexicanWave()
  } else if (msg.type === "create-hashtag") {
    createHashtag()
  } else {
    figma.closePlugin()
  }
}
