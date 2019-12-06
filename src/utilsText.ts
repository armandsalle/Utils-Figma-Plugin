import { generateMexicanWave, generateHashtag } from "./textFunctions"

/**
 * Create the mexican wave and display it
 */
function createMexicanWave() {
  const node = figma.currentPage.selection["0"]
  const newNodes: SceneNode[] = []

  const mw = generateMexicanWave(node.characters)

  mw.forEach((element, i) => {
    const newText = figma.createText()
    const wave = style(node, newText, element)

    wave.y = node.height * i
    newNodes.push(wave)
  })

  const groupMW = figma.group(newNodes, node.parent)
  groupMW.name = "Mexican Wave"
  groupMW.x = node.x
  groupMW.y = node.y + node.height + 10

  figma.currentPage.selection = figma.currentPage.findAll(e => e.name === groupMW.name)
}

/**
 * Create the hashtag and display it
 */
function createHashtag() {
  const node = figma.currentPage.selection["0"]
  const newNodes: SceneNode[] = []

  const hashtag = generateHashtag(node.characters)
  const newText = figma.createText()
  const text = style(node, newText, hashtag)
  text.y = node.y + node.height + 10
  newNodes.push(text)

  node.parent.appendChild(text)
  figma.currentPage.selection = newNodes
}

/**
 * Copy styles from an element to another and change the text
 * @param {SceneNode []} oldEl - The node selected
 * @param {TextNode []} newEl - The new element creates
 * @param {String} text - Text to insert
 * @returns {TextNode []} - newEl with the same style as oldEl
 */
function style(oldEl, newEl, text) {
  const result = newEl

  figma
    .loadFontAsync(oldEl.fontName)
    .then(() => {
      result.textStyleId = oldEl.textStyleId
      result.fontName = oldEl.fontName
      result.fontSize = oldEl.fontSize
      result.letterSpacing = oldEl.letterSpacing
      result.lineHeight = oldEl.lineHeight
      result.paragraphIndent = oldEl.paragraphIndent
      result.paragraphSpacing = oldEl.paragraphSpacing
      result.textAlignHorizontal = oldEl.textAlignHorizontal
      result.textAlignVertical = oldEl.textAlignVertical
      result.textAutoResize = oldEl.textAutoResize
      result.textCase = oldEl.textCase
      result.textDecoration = oldEl.textDecoration
      result.characters = text

      result.fillStyleId = oldEl.fillStyleId
      result.blendMode = oldEl.blendMode
      result.constraints = oldEl.constraints
      result.dashPattern = oldEl.dashPattern
      result.fills = oldEl.fills
      result.isMask = oldEl.isMask
      result.opacity = oldEl.opacity
      result.rotation = oldEl.rotation

      result.effectStyleId = oldEl.effectStyleId
      result.effects = oldEl.effects

      result.strokeStyleId = oldEl.strokeStyleId
      result.strokeAlign = oldEl.strokeAlign
      result.strokeCap = oldEl.strokeCap
      result.strokeJoin = oldEl.strokeJoin
      result.strokeWeight = oldEl.strokeWeight
      result.strokes = oldEl.strokes

      result.x = oldEl.x
    })
    .catch(() => {
      figma.ui.postMessage({ type: "error", data: "FONT_NOT_LOAD" })
    })

  return result
}

/**
 * Check what utils function to call
 * @param {Object} msg
 */
export const utilsText = msg => {
  if (msg.type === "create-mexican-waves") {
    createMexicanWave()
  } else if (msg.type === "create-hashtag") {
    createHashtag()
  } else {
    figma.closePlugin()
  }
}
