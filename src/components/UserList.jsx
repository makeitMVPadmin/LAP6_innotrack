import React from "react";
import { useUsersListener } from "@/functions/fetchUsers";

const UserList = () => {
  const { users, error } = useUsersListener({
    limit: 5,
    random: true,
    max: 20,
  });

  if (error) return <p>Error fetching users: {error.message}</p>;
  if (!users.length) return <p>Loading users...</p>;

  return (
    <div>
      <h3>List of Users</h3>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            <strong>{user.firstName}</strong>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserList;
