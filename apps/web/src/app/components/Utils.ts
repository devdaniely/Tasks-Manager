'use server'
import { cookies } from 'next/headers';
import { getCookie } from 'cookies-next';
import { User } from '@app/models';
import type { CreateTaskFormData } from "../tasks/Models";
import { API_CREATE_UPDATE_TASK_URL, API_TASKS_URL, USER_COOKIE_KEY } from "./Constants";


export async function getServerData() {
  console.log("GETTING SERVER DATA - ", new Date().toLocaleString());
  const res = await fetch(API_TASKS_URL)
  return res.json()
}

export async function submitCreateTask(formData: CreateTaskFormData) {

  if (!formData.title) {
    return {message: 'One or more fields is invalid!', error: true}
  }

  try {
    // Add userId to request
    const value = await getCookie(USER_COOKIE_KEY, { cookies });
    if (typeof value === 'undefined') {
      throw new Error('User cookie is not set');
    }
    const userInfo: User = JSON.parse(value);
    formData.created_by = userInfo.id

    console.log("Submitting CreateUpdateTask Request")
    console.log(formData)
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

    return {message: 'Task Created!', error: false, data: await response.json()}
  } catch (error) {
    console.error('Error submitting form:', error);
    return {message: 'One or more fields is invalid!', error: true}
  }
};