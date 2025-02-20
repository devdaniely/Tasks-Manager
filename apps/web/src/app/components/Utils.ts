import type { CreateTaskFormData } from "../tasks/Models";
import { API_CREATE_UPDATE_TASK_URL, API_TASKS_URL } from "./Constants";


export async function getServerData() {
  console.log("GETTING SERVER DATA - ", new Date().toLocaleString());
  const res = await fetch(API_TASKS_URL)
  return res.json()
}

export async function submitCreateTask(formData: CreateTaskFormData) {
  console.log("Submitting CreateUpdateTask Request")
  console.log(formData)
  try {
    const response = await fetch(API_CREATE_UPDATE_TASK_URL, { 
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json()
  } catch (error) {
    console.error('Error submitting form:', error);
  }
};