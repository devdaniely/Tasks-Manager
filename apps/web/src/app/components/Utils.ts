'use server'
import { getCookie } from 'cookies-next';
import { cookies } from "next/headers"
import type { User } from '@app/models';
import type { CreateTaskFormData } from "../tasks/Models";
import { API_CREATE_UPDATE_TASK_URL, API_TASKS_URL, USER_COOKIE_KEY } from "./Constants";

export async function getUser() {
  const value = await getCookie(USER_COOKIE_KEY, { cookies });
  if (typeof value === 'undefined') {
    throw new Error('User cookie is not set');
  }
  const userInfo: User = JSON.parse(value);
  return userInfo
}

export async function getServerData() {
  console.log("GETTING SERVER DATA - ", new Date().toLocaleString());
  const res = await fetch(API_TASKS_URL)
  return res.json()
}

export async function submitCreateTask(formData: CreateTaskFormData) {

  if (!formData.title) {
    return {message: 'Title is missing!', error: true}
  }

  try {
    // Add userId to request
    if (!formData.created_by) {
      const userInfo: User = await getUser();
      formData.created_by = userInfo.username
    }

    console.log("Submitting CreateUpdateTask Request")
    console.log(formData)
    const response = await fetch(API_CREATE_UPDATE_TASK_URL, { 
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    const responseData = await response.json()

    if (!response.ok) {
      console.log(responseData)
      return {message: responseData.message, error: true}
    }

    return {message: 'Task Created!', error: false, data: responseData}
  } catch (error) {
    console.error('Error submitting form:', error);
    return {message: 'One or more fields is invalid!', error: true}
  }
}

