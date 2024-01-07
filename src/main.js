const { invoke } = window.__TAURI__.tauri

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

async function calculateBtn() {
  calculateButton.addEventListener("click", async () => {
    const gradePoints = []
    const credits = []

    for (let i = 0; i < subjectCount; i++) {
      const gpInput = document.getElementById(`gp-${i}`)
      const creditsSelect = document.getElementById(`credits-${i}`)

      gradePoints.push(parseFloat(gpInput.value))
      credits.push(parseInt(creditsSelect.value))
    }

    // Calculate total grade points and total credits
    const totalGradePoints = gradePoints.reduce((acc, curr) => acc + curr, 0)
    const totalCredits = credits.reduce((acc, curr) => acc + curr, 0)

    try {
      const result = await invoke("calculate_and_display_cgpa", {
        grade_points: totalGradePoints,
        credits: totalCredits,
      })
      console.log("Calculation result:", result)
      displayCgpa(result)
    } catch (error) {
      console.error("Error calculating CGPA:", error)
    }
  })
}
calculateBtn()

function displayCgpa(cgpa) {
  cgpaResult.textContent = "Your CGPA is " + cgpa
}
