/**
 * Capitalize the first letter of a word
 * @param {String} str
 * @returns {String}
 */
const capitalize = str => str.charAt(0).toUpperCase() + str.slice(1)

/**
 * Generate an array of word
 * @param {String} str
 * @returns {Array}
 */
export const generateMexicanWave = str => {
  const text = str.replace(/\n+/gm, " ")

  return [
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
  ].filter(e => /[A-Z]/g.test(e))
}

/**
 * Generate an hashatg
 * @param {String} str
 * @returns {String}
 */
export const generateHashtag = str => {
  if (str === "") {
    return "#Error"
  } else {
    const result = str.replace(/\n+/gm, " ")
    const text = result.replace(/[^A-Za-zÀ-ÖØ-öø-ÿ0-9\s]+/gm, " ")

    return (
      "#" +
      text
        .toLowerCase()
        .split(" ")
        .map(capitalize)
        .join("")
    )
  }
}
