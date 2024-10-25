import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styles from './roles.module.css';

const RolesList = () => {
    const [roles, setRoles] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        axios.get('http://localhost:8080/roles/getAll')
        .then(response => setRoles(response.data))
        .catch(error => console.error('Error fetching role:', error));
    }, []);

    const handleEdit = (role_id) => {
        navigate(`/roles/edit/${role_id}`);
    };
        
    const handleDelete = (role_id) => {
        if (window.confirm('Are you sure you want to delete this role?')) {
            axios.delete(`http://localhost:8080/roles/delete/${role_id}`)
                .then(() => {
                    setRoles(roles.filter(role => role.role_id !== role_id));
                    toast.success('Role deleted successfully!');
                })
                .catch(error => console.error('Error deleting category:', error));
        }
    };

    const filteredRoles = roles.filter(role =>
        role.role_name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="container mt-5">
            <h2>Role List</h2>
            <div className={styles.searchContainer}>
                <div className="mb-3">
                    <input
                        type="text"
                        className={styles.searchInput}
                        placeholder="Search..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
                <button className="btn btn-primary" onClick={() => navigate('/roles/new')}>Add New Role</button>
            </div>
    
            <table className="table table-bordered">
                <thead>
                <tr>
                    <th>Role Name</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                    {filteredRoles.map(role => (
                        <tr key={role.role_id}>
                        <td>{role.role_name}</td>
                        <td>
                            <button className="btn btn-warning me-2" onClick={() => handleEdit(role.role_id)}>Edit</button>
                            <button className="btn btn-danger" onClick={() => handleDelete(role.role_id)}>Delete</button>
                        </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <ToastContainer />
        </div>
    );
};

export default RolesList;