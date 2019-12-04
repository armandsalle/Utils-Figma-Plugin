import { mexicanWave } from "./mexicanWave"
import { generateHashtag } from "./generateHashtag"

// Variables about the selected text
let newFont
const text = figma.currentPage.selection["0"].characters
const textX = figma.currentPage.selection["0"].x
const textY = figma.currentPage.selection["0"].y + figma.currentPage.selection["0"].height
const textHeight = figma.currentPage.selection["0"].height
const textParent = figma.currentPage.selection["0"].parent
const textFills = figma.currentPage.selection["0"].fills
const textFontName = figma.currentPage.selection["0"].fontName
const textFontSize = figma.currentPage.selection["0"].fontSize
const textOpacity = figma.currentPage.selection["0"].opacity
const textRotation = figma.currentPage.selection["0"].rotation

console.log(figma.currentPage.selection["0"])

const createMexicanWave = () => {
  // Init an Array of nodes texts
  const nodes: SceneNode[] = []

  // Create the Mexican Wave
  const mw = mexicanWave(text)

  // Display the MW
  mw.forEach((element, i) => {
    const eachWave = figma.createText()
    eachWave.characters = element
    eachWave.y = textHeight * i
    eachWave.fills = textFills
    eachWave.fontSize = textFontSize
    eachWave.fontName = newFont
    eachWave.rotation = textRotation
    eachWave.opacity = textOpacity

    // Create array of texts
    nodes.push(eachWave)
  })

  // Create a group
  const groupMW = figma.group(nodes, textParent)
  groupMW.name = "Mexican Wave"
  groupMW.x = textX
  groupMW.y = textY + 10

  // Select and zoom to the result
  figma.currentPage.selection = figma.currentPage.findAll(function(e): any {
    return e.name === "Mexican Wave"
  })
  figma.viewport.scrollAndZoomIntoView(nodes)
}

const createHashtag = () => {
  // Init an Array of nodes texts
  const nodes: SceneNode[] = []

  // Create the hashtag
  const hashtag = generateHashtag(text)
  const insertHashtag = figma.createText()

  // Display the hashtag with the same style as the selected text
  insertHashtag.characters = hashtag
  insertHashtag.x = textX
  insertHashtag.y = textY + 10
  insertHashtag.fills = textFills
  insertHashtag.fontSize = textFontSize
  insertHashtag.fontName = newFont
  insertHashtag.opacity = textOpacity
  insertHashtag.rotation = textRotation

  // Select and zoom to the result
  textParent.appendChild(insertHashtag)
  figma.currentPage.selection = nodes
  figma.viewport.scrollAndZoomIntoView(nodes)
}

// Main Function
export const utilsText = msg => {
  // Create all variables base on the current text selected
  figma
    .loadFontAsync({ ...textFontName })
    .then(() => {
      newFont = textFontName
    })
    .catch(error => console.error(error))

  figma
    .loadFontAsync({ family: "Roboto", style: "Regular" })
    .then(() => {
      if (msg.type === "create-mexican-waves") {
        createMexicanWave()
      } else if (msg.type === "create-hashtag") {
        createHashtag()
      } else {
        figma.closePlugin()
      }
    })
    .catch(err => console.warn(err))
}
