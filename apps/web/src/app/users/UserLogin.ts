'use server'
import CryptoJS from 'crypto-js'
import { cookies } from "next/headers"
import { API_LOGIN_URL, USER_COOKIE_KEY } from '../components/Constants';


export async function loginUser(prevState: any, formData: FormData) {
  console.log("Attempting to login...");
  const username = formData.get("username") as string;
  const password = formData.get("password") as string;

  if (!username || !password) {
    return { error: "Login failed!" };
  }

  // Encrypting the pw since we're not using HTTPS, sort of hacky
  const encryptedPassword = CryptoJS.AES.encrypt(password, "pirros_passphrase").toString();

  // Send POST request with just the username
  const response = await fetch(API_LOGIN_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password: encryptedPassword }),
  });

  if (!response.ok) {
    return { error: "Login failed!" };
  }

  // Save user info
  const responseData = await response.json();
  const cookieStore = await cookies();
  cookieStore.set(USER_COOKIE_KEY, responseData.data);

  return { success: "✅ Login successful!" };
}
