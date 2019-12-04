import { utilsText } from "./utilsText"

// Init UI pop up
figma.showUI(__html__)
figma.ui.show()
figma.ui.resize(500, 400)

// When a user click a button on the UI
figma.ui.onmessage = msg => {
  // Get the text selected
  figma.currentPage.selection.forEach(e => {
    if (e.type === "TEXT") {
      utilsText(msg)
    } else {
      // Create the error message
      figma.ui.postMessage("NOT_TEXT")
    }
  })
}
