import { utilsText } from "./utilsText"

// Init UI pop up
figma.showUI(__html__)
figma.ui.show()
figma.ui.resize(500, 400)

/**
 * Get the user click on a button in the UI
 * @param {Object} msg
 */
figma.ui.onmessage = msg => {
  if (figma.currentPage.selection.length === 1) {
    if (figma.currentPage.selection[0].type === "TEXT") {
      utilsText(msg)
    } else {
      figma.ui.postMessage({ type: "error", data: "NOT_TEXT" })
    }
  } else if (figma.currentPage.selection.length === 0) {
    figma.ui.postMessage({ type: "error", data: "NOT_SELECTION" })
  } else if (figma.currentPage.selection.length > 1) {
    figma.ui.postMessage({ type: "error", data: "NO_MULTIPLE_SELECTION" })
  }
}
