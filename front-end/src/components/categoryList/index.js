import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styles from './category.module.css';

const CategoryList = () => {
    const [categories, setCategory] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        axios.get('http://localhost:8080/category/getAll')
        .then(response => setCategory(response.data))
        .catch(error => console.error('Error fetching category:', error));
    }, []);

    const handleEdit = (category_id) => {
        navigate(`/category/edit/${category_id}`);
    };
        
    const handleDelete = (category_id) => {
        if (window.confirm('Are you sure you want to delete this category?')) {
            axios.delete(`http://localhost:8080/category/delete/${category_id}`)
                .then(() => {
                    setCategory(categories.filter(category => category.category_id !== category_id));
                    toast.success('Category deleted successfully!');
                })
                .catch(error => console.error('Error deleting category:', error));
        }
    };

    const filteredCategory = categories.filter(category =>
        category.category_name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="container mt-5">
            <h2>Category List</h2>
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
                <button className="btn btn-primary" onClick={() => navigate('/category/new')}>Add New Category</button>
            </div>
    
            <table className="table table-bordered">
                <thead>
                <tr>
                    <th>Category Name</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                    {filteredCategory.map(category => (
                        <tr key={category.category_id}>
                        <td>{category.category_name}</td>
                        <td>
                            <button className="btn btn-warning me-2" onClick={() => handleEdit(category.category_id)}>Edit</button>
                            <button className="btn btn-danger" onClick={() => handleDelete(category.category_id)}>Delete</button>
                        </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <ToastContainer />
        </div>
    );
};

export default CategoryList;