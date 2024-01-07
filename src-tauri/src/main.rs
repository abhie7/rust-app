// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

#[tauri::command]
fn calculate_and_display_cgpa(totalGradePoints: f32, totalCredits: f32) -> Result<f32, String> {
    if totalCredits == 0.0 {
        return Err("Total credits cannot be zero".to_string());
    }

    let cgpa = (totalGradePoints / totalCredits * 100.0).round() / 100.0;
    println!("Calculated CGPA: {:.2}", cgpa);

    Ok(cgpa)
}

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![calculate_and_display_cgpa])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
