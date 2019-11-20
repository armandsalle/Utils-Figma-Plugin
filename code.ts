// Init UI pop up
figma.showUI(__html__)
figma.ui.show()
figma.ui.resize(500, 400)

// Create Mexican Wave
const mexicanWave = text =>
  [
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

//Create Hashtag
const generateHashtag = str =>
  str.length > 140 || str === ""
    ? ""
    : "#" +
      str
        .split(" ")
        .map(capitalize)
        .join("")

//Capitalize each word
const capitalize = str => str.charAt(0).toUpperCase() + str.slice(1)

// Main function
figma.ui.onmessage = msg => {
  // Get the text selected
  const text = figma.currentPage.selection["0"].characters
  const textX = figma.currentPage.selection["0"].x
  const textY = figma.currentPage.selection["0"].y + figma.currentPage.selection["0"].height
  const textParent = figma.currentPage.selection["0"].parent

  // If create-mexican-waves button is clicked
  if (msg.type === "create-mexican-waves") {
    figma.loadFontAsync({ family: "Roboto", style: "Regular" }).then(() => {
      // Init an Array of nodes texts
      const nodes: SceneNode[] = []

      // Create the Mexican Wave
      const mw = mexicanWave(text)

      // Display the MW
      mw.forEach((element, i) => {
        const eachWave = figma.createText()
        eachWave.characters = element
        eachWave.y = i * 25

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
    })
  } else if (msg.type === "create-hashtag") {
    figma.loadFontAsync({ family: "Roboto", style: "Regular" }).then(() => {
      const hashtag = generateHashtag(text)
      const insertHashtag = figma.createText()
      insertHashtag.characters = hashtag
      insertHashtag.x = textX
      insertHashtag.y = textY + 10

      textParent.appendChild(insertHashtag)
      //figma.viewport.scrollAndZoomIntoView(insertHashtag)
    })
  } else {
    figma.closePlugin()
  }
}
