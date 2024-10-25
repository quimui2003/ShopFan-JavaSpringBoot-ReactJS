import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styles from './status.module.css';

const StatusList = () => {
    const [status, setStatus] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        axios.get('http://localhost:8080/status/getAll')
        .then(response => setStatus(response.data))
        .catch(error => console.error('Error fetching status:', error));
    }, []);

    const handleEdit = (status_id) => {
        navigate(`/status/edit/${status_id}`);
    };
        
    const handleDelete = (status_id) => {
        if (window.confirm('Are you sure you want to delete this status?')) {
            axios.delete(`http://localhost:8080/status/delete/${status_id}`)
                .then(() => {
                    setStatus(status.filter(startu => startu.status_id !== status_id));
                    toast.success('Status deleted successfully!');
                })
                .catch(error => console.error('Error deleting status:', error));
        }
    };

    const filteredStatus = status.filter(statu =>
        statu.status_name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="container mt-5">
            <h2>Status List</h2>
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
                <button className="btn btn-primary" onClick={() => navigate('/status/new')}>Add New Status</button>
            </div>
    
            <table className="table table-bordered">
                <thead>
                <tr>
                    <th>Status Name</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                    {filteredStatus.map(statu => (
                        <tr key={statu.status_id}>
                        <td>{statu.status_name}</td>
                        <td>
                            <button className="btn btn-warning me-2" onClick={() => handleEdit(statu.status_id)}>Edit</button>
                            <button className="btn btn-danger" onClick={() => handleDelete(statu.status_id)}>Delete</button>
                        </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <ToastContainer />
        </div>
    );
};

export default StatusList;