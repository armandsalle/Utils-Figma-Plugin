figma.showUI(__html__)
figma.ui.show()
figma.ui.resize(500, 400)

figma.ui.onmessage = msg => {
  // Then create button is clicked
  if (msg.type === "create-mexican-waves") {
    // Load font async
    figma.loadFontAsync({ family: "Roboto", style: "Regular" }).then(() => {
      // Init an Array of nodes texts
      const nodes: SceneNode[] = []

      // Get the text selected
      const text = figma.currentPage.selection["0"].characters
      const textX = figma.currentPage.selection["0"].x
      const textY = figma.currentPage.selection["0"].y + figma.currentPage.selection["0"].height
      const textParent = figma.currentPage.selection["0"].parent

      // Create the Mexican Wave
      const mw: any[] = [
        ...text
          .toLowerCase()
          .split("")
          .map(
            (e, i) =>
              text.toLowerCase().slice(0, i) +
              text
                .toLowerCase()
                .charAt(i)
                .toUpperCase() +
              text.toLowerCase().slice(i + 1)
          )
      ].filter(e => /[A-Z]/.test(e))

      // Display the MW
      mw.forEach((element, i) => {
        const a = figma.createText()
        a.characters = element
        a.y = i * 25

        // Create array of texts
        nodes.push(a)
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
    })

    //figma.closePlugin()
  } else {
    figma.closePlugin()
  }
}
