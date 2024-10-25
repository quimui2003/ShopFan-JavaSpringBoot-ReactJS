import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const StatusForm = () =>{
    const { register, handleSubmit, setValue, formState: { errors } } = useForm();
    const navigate = useNavigate();
    const { status_id } = useParams();

    useEffect(() => {
        if (status_id) {
            axios.get(`http://localhost:8080/status/getById/${status_id}`)
                .then(response => {
                    const statu = response.data;
                    setValue('status_name', statu.status_name);
                })
                .catch(error => console.error('Error fetching status:', error));
        }
    }, [status_id, setValue]);

    const onSubmit = (data) => {
        const statu = {
          ...data
        };
    
        if (status_id) {
            axios.put(`http://localhost:8080/status/update/${status_id}`, statu)
                .then(() => {
                    toast.success('Status updated successfully!');
                    setTimeout(() => navigate('/status'), 2000);
                })
                .catch(error => console.error('Error updating status:', error));
        } 
        else {
            axios.post('http://localhost:8080/status/create', statu)
                .then(() => {
                    toast.success('Status created successfully!');
                    setTimeout(() => navigate('/status'), 2000);
                })
                .catch(error => console.error('Error creating status:', error));
        }
    };

    return (
        <div className="container mt-5">
            <h2>{status_id ? 'Edit Status' : 'New Status'}</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-3">
                    <label htmlFor="status_name" className="form-label">Status Name</label>
                    <input
                        type="text"
                        className="form-control"
                        id="status_name"
                        {...register('status_name', { required: 'Status name is required' })}
                    />
                    {errors.status_name && <span className="text-danger">{errors.status_name.message}</span>}
                </div>
        
                <div className="d-flex justify-content-end">
                    <button type="submit" className="btn btn-success me-2">Save</button>
                    <button type="button" className="btn btn-secondary" onClick={() => navigate('/status')}>Cancel</button>
                </div>
            </form>
            <ToastContainer />
        </div>
    );
}

export default StatusForm;