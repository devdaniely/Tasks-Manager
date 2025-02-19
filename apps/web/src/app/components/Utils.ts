
export const TASK_URL = 'http://localhost:3000/tasks'

export async function getServerData() {
  console.log("GETTING SERVER DATA - ", new Date().toLocaleString());
  // Fetch data from external API
  const res = await fetch('http://localhost:3000/tasks')
  return res.json()
}