import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styles from './customers.module.css';

const CustomersList = () => {
    const [customers, setCustomers] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        axios.get('http://localhost:8080/customers/getAll')
        .then(response => setCustomers(response.data))
        .catch(error => console.error('Error fetching customers:', error));
    }, []);

    const handleEdit = (customer_id) => {
        navigate(`/customers/edit/${customer_id}`);
    };
        
    const handleDelete = (customer_id) => {
        if (window.confirm('Are you sure you want to delete this customer?')) {
            axios.delete(`http://localhost:8080/customers/delete/${customer_id}`)
                .then(() => {
                    setCustomers(customers.filter(customer => customer.customer_id !== customer_id));
                    toast.success('Customer deleted successfully!');
                })
                .catch(error => console.error('Error deleting customer:', error));
        }
    };

    const filteredCustomers = customers.filter(customer =>
        customer.customer_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        customer.phone_number.includes(searchQuery) ||
        customer.address.toLowerCase().includes(searchQuery)
    );

    return (
        <div className="container mt-5">
            <h2>Customer List</h2>
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
                <button className="btn btn-primary" onClick={() => navigate('/customers/new')}>Add New Customer</button>
            </div>
    
            <table className="table table-bordered">
                <thead>
                <tr>
                    <th>Name</th>
                    <th>Phone</th>
                    {/* <th>Birth Date</th> */}
                    <th>Address</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                    {filteredCustomers.map(customer => (
                        <tr key={customer.customer_id}>
                        <td>{customer.customer_name}</td>
                        <td>{customer.phone_number}</td>
                        {/* <td>{new Date(customer.birthday).toLocaleDateString()}</td> */}
                        <td>{customer.address}</td>
                        <td>
                            <button className="btn btn-warning me-2" onClick={() => handleEdit(customer.customer_id)}>Edit</button>
                            <button className="btn btn-danger" onClick={() => handleDelete(customer.customer_id)}>Delete</button>
                        </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <ToastContainer />
        </div>
    );
};

export default CustomersList;