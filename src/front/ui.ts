import "./ui.css"

const errorSpanTag = document.querySelector(".span-error") as HTMLInputElement
const errorTag = document.querySelector(".error") as HTMLInputElement

// Create a message for mexican wave btn
document.getElementById("createMexicanWave").onclick = () => {
  parent.postMessage({ pluginMessage: { type: "create-mexican-waves" } }, "*")
}

// Create a message for hashtag btn
document.getElementById("createHashtag").onclick = () => {
  parent.postMessage({ pluginMessage: { type: "create-hashtag" } }, "*")
}

// Check if error
onmessage = msg => {
  if (msg.data.pluginMessage === "NOT_TEXT") {
    errorTag.style.display = "flex"
    errorSpanTag.innerHTML = "Must be text!"

    errorTag.addEventListener("click", e => {
      e.preventDefault()
      errorTag.style.display = "none"
    })
  }
}
