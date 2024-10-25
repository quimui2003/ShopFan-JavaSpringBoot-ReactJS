import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const RolesForm = () =>{
    const { register, handleSubmit, setValue, formState: { errors } } = useForm();
    const navigate = useNavigate();
    const { role_id } = useParams();

    useEffect(() => {
        if (role_id) {
            axios.get(`http://localhost:8080/roles/getById/${role_id}`)
                .then(response => {
                    const role = response.data;
                    setValue('role_name', role.role_name);
                })
                .catch(error => console.error('Error fetching role:', error));
        }
    }, [role_id, setValue]);

    const onSubmit = (data) => {
        const role = {
          ...data
        };
    
        if (role_id) {
            axios.put(`http://localhost:8080/roles/update/${role_id}`, role)
                .then(() => {
                    toast.success('Role updated successfully!');
                    setTimeout(() => navigate('/roles'), 2000);
                })
                .catch(error => console.error('Error updating role:', error));
        } 
        else {
            axios.post('http://localhost:8080/roles/create', role)
                .then(() => {
                    toast.success('Role created successfully!');
                    setTimeout(() => navigate('/roles'), 2000);
                })
                .catch(error => console.error('Error creating role:', error));
        }
    };

    return (
        <div className="container mt-5">
            <h2>{role_id ? 'Edit Role' : 'New Role'}</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-3">
                    <label htmlFor="role_name" className="form-label">Role Name</label>
                    <input
                        type="text"
                        className="form-control"
                        id="role_name"
                        {...register('role_name', { required: 'Role name is required' })}
                    />
                    {errors.role_name && <span className="text-danger">{errors.role_name.message}</span>}
                </div>
        
                <div className="d-flex justify-content-end">
                    <button type="submit" className="btn btn-success me-2">Save</button>
                    <button type="button" className="btn btn-secondary" onClick={() => navigate('/roles')}>Cancel</button>
                </div>
            </form>
            <ToastContainer />
        </div>
    );
}

export default RolesForm;