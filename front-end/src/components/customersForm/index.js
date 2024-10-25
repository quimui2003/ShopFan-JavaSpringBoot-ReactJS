import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CustomersForm = () =>{
    const { register, handleSubmit, setValue, formState: { errors } } = useForm();
    const navigate = useNavigate();
    const { customer_id } = useParams();

    useEffect(() => {
        if (customer_id) {
            axios.get(`http://localhost:8080/customers/getById/${customer_id}`)
                .then(response => {
                    const customer = response.data;
                    setValue('customer_name', customer.customer_name);
                    setValue('address', customer.address);
                    setValue('phone_number', customer.phone_number);
                    //setValue('birthDay', new Date(customer.birthday).toISOString().split('T')[0]);
                    //setValue('identificationNumber', customer.identificationnumber);
                })
                .catch(error => console.error('Error fetching customer:', error));
        }
    }, [customer_id, setValue]);

    const onSubmit = (data) => {
        const customer = {
          ...data
        //birthday: data.birthDay,
        //identificationnumber: data.identificationNumber
        };
    
        if (customer_id) {
            axios.put(`http://localhost:8080/customers/update/${customer_id}`, customer)
                .then(() => {
                    toast.success('Customer updated successfully!');
                    setTimeout(() => navigate('/customers'), 2000);
                })
                .catch(error => console.error('Error updating customer:', error));
        } 
        else {
            axios.post('http://localhost:8080/customers/create', customer)
                .then(() => {
                    toast.success('Customer created successfully!');
                    setTimeout(() => navigate('/customers'), 2000);
                })
                .catch(error => console.error('Error creating customer:', error));
        }
    };

    return (
        <div className="container mt-5">
            <h2>{customer_id ? 'Edit Customer' : 'New Customer'}</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input
                        type="text"
                        className="form-control"
                        id="customer_name"
                        {...register('customer_name', { required: 'Name is required' })}
                    />
                    {errors.customer_name && <span className="text-danger">{errors.customer_name.message}</span>}
                </div>
        
                <div className="mb-3">
                    <label htmlFor="phone_number" className="form-label">Phone</label>
                    <input
                        type="text"
                        className="form-control"
                        id="phone_number"
                        {...register('phone_number', { required: 'Phone is required' })}
                    />
                    {errors.phone_number && <span className="text-danger">{errors.phone_number.message}</span>}
                </div>
        
                <div className="mb-3">
                    <label htmlFor="address" className="form-label">Address</label>
                    <input
                        type="text"
                        className="form-control"
                        id="address"
                        {...register('address', { required: 'Address is required' })}
                    />
                    {errors.address && <span className="text-danger">{errors.address.message}</span>}
                </div>
        
                <div className="d-flex justify-content-end">
                    <button type="submit" className="btn btn-success me-2">Save</button>
                    <button type="button" className="btn btn-secondary" onClick={() => navigate('/customers')}>Cancel</button>
                </div>
            </form>
            <ToastContainer />
        </div>
    );
}

export default CustomersForm;