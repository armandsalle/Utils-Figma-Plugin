import { utilsText } from "./utilsText"

// Init UI pop up
figma.showUI(__html__)
figma.ui.show()
figma.ui.resize(500, 400)

// When a user click a button on the UI
figma.ui.onmessage = msg => {
  if (figma.currentPage.selection.length) {
    // Get the text selected
    figma.currentPage.selection.forEach(e => {
      if (e.type === "TEXT") {
        utilsText(msg)
      } else {
        //figma.ui.postMessage("NOT_TEXT")
        figma.ui.postMessage({ type: "error", data: "NOT_TEXT" })
      }
    })
  } else {
    //Send message if no selection
    figma.ui.postMessage({ type: "error", data: "NOT_SELECTION" })
  }
}
