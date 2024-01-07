const { invoke } = window.__TAURI__.tauri

// main.js
const inputFields = document.getElementById("input-fields")
const subjectRowTemplate = inputFields.querySelector(".subject-row")
const addSubjectButton = document.getElementById("add-subject")
const calculateButton = document.getElementById("calculate")
const cgpaResult = document.getElementById("cgpa-result")

let subjectCount = 1

function addSubject() {
  addSubjectButton.addEventListener("click", () => {
    const newRow = subjectRowTemplate.cloneNode(true)
    newRow.id = `subject-row-${subjectCount}`

    const gpInput = newRow.querySelector("input[type='number']")
    gpInput.id = `gp-${subjectCount}`
    gpInput.value = "" // Clear any pre-existing value

    const creditsSelect = newRow.querySelector("select")
    creditsSelect.id = `credits-${subjectCount}`

    inputFields.appendChild(newRow)
    subjectCount++
  })
}
addSubject()

function calculateBtn() {
  calculateButton.addEventListener("click", () => {
    const gradePoints = []
    const credits = []

    for (let i = 0; i < subjectCount; i++) {
      const gpInput = document.getElementById(`gp-${i}`)
      const creditsSelect = document.getElementById(`credits-${i}`)

      gradePoints.push(parseFloat(gpInput.value))
      credits.push(parseInt(creditsSelect.value))
    }
  })
}
calculateBtn()
