import React, { useState, useEffect } from 'react';
import { Table, Button, Form } from 'react-bootstrap';
import axios from 'axios';

const AdminPage = ({ token }) => {
  const [users, setUsers] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await axios.get('/admin', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setUsers(response.data);  // Assuming the API returns a list of users
    };

    fetchUsers();
  }, [token]);

  const toggleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedUsers(users.map((user) => user.id));  // Select all users
    } else {
      setSelectedUsers([]);  // Deselect all users
    }
  };

  const handleSelectUser = (id) => {
    setSelectedUsers((prevSelected) =>
      prevSelected.includes(id)
        ? prevSelected.filter((userId) => userId !== id)
        : [...prevSelected, id]
    );
  };

  const handleBlockUsers = async () => {
    await axios.post('/admin/block', { ids: selectedUsers }, {
      headers: { Authorization: `Bearer ${token}` }
    });
    // Refresh user list after blocking
    const response = await axios.get('/admin', {
      headers: { Authorization: `Bearer ${token}` }
    });
    setUsers(response.data);
  };

  return (
    <div>
      <h2>Admin Page</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>
              <Form.Check type="checkbox" onChange={toggleSelectAll} />
            </th>
            <th>Username</th>
            <th>Email</th>
            <th>Last Login</th>
            <th>Blocked</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>
                <Form.Check
                  type="checkbox"
                  checked={selectedUsers.includes(user.id)}
                  onChange={() => handleSelectUser(user.id)}
                />
              </td>
              <td>{user.username}</td>
              <td>{user.email}</td>
              <td>{new Date(user.last_login).toLocaleString()}</td>
              <td>{user.is_blocked ? 'Yes' : 'No'}</td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Button variant="danger" onClick={handleBlockUsers}>
        Block Selected Users
      </Button>
    </div>
  );
};

export default AdminPage;
