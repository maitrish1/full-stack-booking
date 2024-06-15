import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Users = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchAllUsers = async () => {
      try {
        const res = await axios.get("http://localhost:8800/users");
        setUsers(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchAllUsers();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete("http://localhost:8800/users/" + id);
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <h1>All Users</h1>
      <div className="books">
        {users.map((user) => (
          <div className="user" key={user.id}>
            <span>{user.username} - {user.email} - {user.ph}</span>
            <button className="delete" onClick={() => handleDelete(user.id)}>
              Delete
            </button>
            {/* <button className="update">
              <Link to={`/update/${user.id}`}>Update</Link>
            </button> */}
          </div>
        ))}

        <button>
          <Link to="/add">Add new User</Link>
        </button>
      </div>
    </div>
  );
};

export default Users;
