// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

fn calculate_cgpa(grade_points: &[f32], credits: &[u32]) -> f32 {
    let total_credits: f32 = credits.iter().sum::<u32>() as f32;
    let total_grade_points: f32 = grade_points
        .iter()
        .zip(credits.iter())
        .map(|(&grade_point, &credit)| grade_point * credit as f32)
        .sum();

    total_grade_points / total_credits * 10.0
}

#[tauri::command]
fn calculate_and_display_cgpa(gradePoints: Vec<f32>, credits: Vec<u32>) -> Result<f32, String> {
    if gradePoints.len() != credits.len() {
        return Err("Grade points and credits count mismatch".to_string());
    }

    let cgpa = calculate_cgpa(&gradePoints, &credits);
    println!("Calculated CGPA: {}", cgpa);

    Ok(cgpa)
}

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![calculate_and_display_cgpa])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
