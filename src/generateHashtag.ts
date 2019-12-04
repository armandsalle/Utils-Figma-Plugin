//Capitalize each word
const capitalize = str => str.charAt(0).toUpperCase() + str.slice(1)

//Create Hashtag
export const generateHashtag = str =>
  str.length < 0 || str === ""
    ? ""
    : "#" +
      str
        .toLowerCase()
        .split(" ")
        .map(capitalize)
        .join("")
