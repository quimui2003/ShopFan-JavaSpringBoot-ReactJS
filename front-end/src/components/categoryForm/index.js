import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CategoryForm = () =>{
    const { register, handleSubmit, setValue, formState: { errors } } = useForm();
    const navigate = useNavigate();
    const { category_id } = useParams();

    useEffect(() => {
        if (category_id) {
            axios.get(`http://localhost:8080/category/getById/${category_id}`)
                .then(response => {
                    const category = response.data;
                    setValue('category_name', category.category_name);
                })
                .catch(error => console.error('Error fetching customer:', error));
        }
    }, [category_id, setValue]);

    const onSubmit = (data) => {
        const category = {
          ...data
        };
    
        if (category_id) {
            axios.put(`http://localhost:8080/category/update/${category_id}`, category)
                .then(() => {
                    toast.success('Category updated successfully!');
                    setTimeout(() => navigate('/category'), 2000);
                })
                .catch(error => console.error('Error updating category:', error));
        } 
        else {
            axios.post('http://localhost:8080/category/create', category)
                .then(() => {
                    toast.success('Category created successfully!');
                    setTimeout(() => navigate('/category'), 2000);
                })
                .catch(error => console.error('Error creating category:', error));
        }
    };

    return (
        <div className="container mt-5">
            <h2>{category_id ? 'Edit Category' : 'New Category'}</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-3">
                    <label htmlFor="category_name" className="form-label">Category Name</label>
                    <input
                        type="text"
                        className="form-control"
                        id="category_name"
                        {...register('category_name', { required: 'Category name is required' })}
                    />
                    {errors.category_name && <span className="text-danger">{errors.category_name.message}</span>}
                </div>
        
                <div className="d-flex justify-content-end">
                    <button type="submit" className="btn btn-success me-2">Save</button>
                    <button type="button" className="btn btn-secondary" onClick={() => navigate('/category')}>Cancel</button>
                </div>
            </form>
            <ToastContainer />
        </div>
    );
}

export default CategoryForm;