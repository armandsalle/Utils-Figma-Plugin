figma.showUI(__html__);
figma.ui.onmessage = msg => {
    // Then create button is clicked
    if (msg.type === "create-mexican-waves") {
        // Load font async
        figma.loadFontAsync({ family: "Roboto", style: "Regular" }).then(() => {
            const nodes = [];
            // Get the text selected
            const text = figma.currentPage.selection["0"].characters;
            // Create the Mexican Wave
            const mw = [
                ...text
                    .toLowerCase()
                    .split("")
                    .map((e, i) => text.toLowerCase().slice(0, i) +
                    text
                        .toLowerCase()
                        .charAt(i)
                        .toUpperCase() +
                    text.toLowerCase().slice(i + 1))
            ].filter(e => /[A-Z]/.test(e));
            // Display the MW
            mw.forEach((element, i) => {
                const a = figma.createText();
                a.characters = element;
                a.y = i * 25;
                // Add each MW to the page
                figma.currentPage.appendChild(a);
                nodes.push(a);
            });
            // Select and zoom to the result
            figma.currentPage.selection = nodes;
            figma.viewport.scrollAndZoomIntoView(nodes);
        });
        figma.closePlugin();
    }
    else {
        figma.closePlugin();
    }
};
