'use client';
import React from 'react'
import { useFormState } from "react-dom";
import Form from 'next/Form';
import { redirect } from 'next/navigation'
import { loginUser } from '../components/Utils';


// interface User {
//     id: number;
//     username: string;
// }

export default function UserPage() {
    // const request = await fetch('http://localhost:3000/users', {cache: "no-store"});
    // const data: User[] = await request.json();

    const [state, formAction] = useFormState(loginUser, { success: "", error: "" });
    
    return (
        <div>
            <h1>Users</h1>
            <h2 className={"text-xl font-semibold mb-4"}>Login</h2>
            {state.error && <p className={"text-red-500"}>{state.error}</p>}
            {state.success && redirect("/tasks")}
            <Form action={formAction} className="space-y-4">
                <input type={"text"} name={"username"} placeholder={"Username"} className={"w-full p-2 border rounded"} required />
                <input type={"password"} name={"password"} placeholder={"Password"} className={"w-full p-2 border rounded"} required />
                <button type={"submit"} className={"w-full bg-blue-500 text-white p-2 rounded"}>Login</button>
            </Form>

            {/* <ul>
                {data.map(user => <li key={user.id}>{user.username}</li>)}
            </ul> */}
        </div>
    );
}