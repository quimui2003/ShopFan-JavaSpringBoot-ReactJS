import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AccountsForm = () =>{
    const { register, handleSubmit, setValue, formState: { errors } } = useForm();
    const navigate = useNavigate();
    const { account_id } = useParams();

    useEffect(() => {
        if (account_id) {
            axios.get(`http://localhost:8080/accounts/getById/${account_id}`)
                .then(response => {
                    const account = response.data;
                    setValue('email', account.email);
                    setValue('role_id', account.role_id);
                    setValue('customer_id', account.customer_id);
                })
                .catch(error => console.error('Error fetching account:', error));
        }
    }, [account_id, setValue]);

    const onSubmit = (data) => {
        const account = {
          ...data
        };
    
        if (account_id) {
            axios.put(`http://localhost:8080/accounts/update/${account_id}`, account)
                .then(() => {
                    toast.success('Account updated successfully!');
                    setTimeout(() => navigate('/accounts'), 2000);
                })
                .catch(error => console.error('Error updating account:', error));
        } 
        else {
            axios.post('http://localhost:8080/accounts/create', account)
                .then(() => {
                    toast.success('Account created successfully!');
                    setTimeout(() => navigate('/accounts'), 2000);
                })
                .catch(error => console.error('Error creating account:', error));
        }
    };

    return (
        <div className="container mt-5">
            <h2>{account_id ? 'Edit Account' : 'New Account'}</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input
                        type="email"
                        className="form-control"
                        id="email"
                        {...register('email', { required: 'Email is required' })}
                    />
                    {errors.email && <span className="text-danger">{errors.email.message}</span>}
                </div>
        
                <div className="mb-3">
                    <label htmlFor="password_hash" className="form-label">Password</label>
                    <input
                        type="password"
                        className="form-control"
                        id="password_hash"
                        {...register('password_hash', { required: 'Password is required' })}
                    />
                    {errors.password_hash && <span className="text-danger">{errors.password_hash.message}</span>}
                </div>
        
                <div className="mb-3">
                    <label htmlFor="password_hash2" className="form-label">Confirm Password</label>
                    <input
                        type="password"
                        className="form-control"
                        id="password_hash2"
                        {...register('password_hash2', { required: 'Password is required' })}
                    />
                    {errors.password_hash2 && <span className="text-danger">{errors.password_hash2.message}</span>}
                </div>
        
                <div className="d-flex justify-content-end">
                    <button type="submit" className="btn btn-success me-2">Save</button>
                    <button type="button" className="btn btn-secondary" onClick={() => navigate('/accounts')}>Cancel</button>
                </div>
            </form>
            <ToastContainer />
        </div>
    );
}

export default AccountsForm;