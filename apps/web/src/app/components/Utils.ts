import { CreateTaskFormData } from "../tasks/Models";

export const TASK_URL = 'http://localhost:3000/tasks'

export async function getServerData() {
  console.log("GETTING SERVER DATA - ", new Date().toLocaleString());
  // Fetch data from external API
  const res = await fetch('http://localhost:3000/tasks')
  return res.json()
}

export async function submitCreateTask(formData: CreateTaskFormData) {
  console.log("FORM DATA ============== ")
  console.log(formData)
  try {
    const response = await fetch('http://localhost:3000/createOrUpdateTask', { 
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
  return
};