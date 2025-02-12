'use server'
import CryptoJS from 'crypto-js'


export async function loginUser(prevState: any, formData: FormData) {
  console.log("Attempting to login: ", formData);
  const username = formData.get("username") as string;
  const password = formData.get("password") as string;

  if (!username || !password) {
    return {error: "Login failed!"}
  }

  // Encrypting the pw since we're not using HTTPS, sort of hacky
  const encryptedPassword = CryptoJS.AES.encrypt(password, "pirros_passphrase").toString();

  // Send POST request with just the username
  const response = await fetch("http://localhost:3000/loginUser", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username: username, password: encryptedPassword }),
  });

  if (!response.ok) {
    return { error: "Login failed!" };
  }
  return { success: "✅ Login successful!" };
}