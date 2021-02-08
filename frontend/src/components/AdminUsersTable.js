import React, { useState, useEffect } from 'react';
import { Table } from 'react-bootstrap';
import CustomModal from './CustomModal';
import axios from 'axios';

const AdminUsersTable = ({ history, categories, user }) => {
  const [showModal, setShowModal] = useState(false);
  const [deleteUser, setDeleteUser] = useState({});
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);
  const [databaseDidChange, setDatabaseDidChange] = useState({});

  useEffect(() => {
    setLoading(true);

    try {
      const getUsers = async () => {
        const { data } = await axios.get(`/api/users`);

        setUsers(data);
        setLoading(false);
      };

      getUsers();
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }, [user, databaseDidChange]);

  console.log(users);

  const dateFormatter = dateString => {
    const date = new Date(dateString);

    const daysMonthYear = date.toLocaleDateString('en-GB');
    const time = date.toLocaleTimeString('en-GB', {
      hour: '2-digit',
      minute: '2-digit',
    });

    return `${daysMonthYear}, ${time}`;
  };

  const handleEditUser = user => {
    console.log('edit user ID', user);
    history.push(`/profile/user/edit?id=${user._id}`);
  };

  const handleDeleteUser = user => {
    setDeleteUser(user);
    setShowModal(true);
  };

  const handleModalCancel = () => {
    setShowModal(false);
  };

  const handleDeleteConfirm = async () => {
    setShowModal(false);
    const data = await axios.delete(`/api/users/${deleteUser._id}`);

    window.location.reload();
    console.log(data);
  };

  return (
    <>
      <h2>All Users</h2>
      <Table striped bordered hover variant="dark" responsive="md" size="sm">
        <thead>
          <tr>
            <th>#</th>
            <th>Username</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Admin</th>
            <th>Created</th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {users.length === 0 ? (
            <tr>
              <td></td>
              <td colSpan="8">No users</td>
            </tr>
          ) : (
            users.map((user, index) => (
              <tr key={user._id}>
                <td>{index + 1}</td>
                <td>{user.username}</td>
                <td>{user.firstName}</td>
                <td>{user.lastName}</td>
                <td>{user.email}</td>
                <td className="cell-centered">
                  {user.isAdmin && <i class="far fa-check-circle" />}
                </td>
                <td>{dateFormatter(user.dateCreated)}</td>
                <td
                  className="cell-centered edit-icon"
                  onClick={() => handleEditUser(user)}
                  style={{ cursor: 'pointer' }}
                >
                  <i className="far fa-edit" />
                </td>
                <td
                  className="cell-centered delete-icon"
                  onClick={() => handleDeleteUser(user)}
                  style={{ cursor: 'pointer' }}
                >
                  <i className="fas fa-trash-alt " />
                </td>
              </tr>
            ))
          )}
        </tbody>
      </Table>
      <CustomModal
        show={showModal}
        handleClose={handleModalCancel}
        handleDeleteConfirm={handleDeleteConfirm}
        title="Delete User"
        content="Are you sure you want to delete this user? This can not be undone."
      />
    </>
  );
};

export default AdminUsersTable;
