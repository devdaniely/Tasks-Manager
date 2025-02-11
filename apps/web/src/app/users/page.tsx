import React from 'react'


interface User {
    id: number;
    username: string;
}

const UserBox = async () => {
    
    const request = await fetch('http://localhost:3000/users', {cache: "no-store"});
    const data: User[] = await request.json();
    
    return (
        <div>
            <h1>Users</h1>
            <ul>
                {data.map(user => <li key={user.id}>{user.username}</li>)}
            </ul>
        </div>
    );
}

export default UserBox