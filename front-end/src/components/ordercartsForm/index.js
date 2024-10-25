import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const OrdercartsForm = () =>{
    const { register, handleSubmit, setValue, formState: { errors } } = useForm();
    const navigate = useNavigate();
    const { cart_id } = useParams();

    useEffect(() => {
        if (cart_id) {
            axios.get(`http://localhost:8080/carts/getById/${cart_id}`)
                .then(response => {
                    const cart = response.data;
                    setValue('product_quantity', cart.product_quantity);
                    setValue('account_id', cart.account_id);
                    setValue('product_id', cart.product_id);
                })
                .catch(error => console.error('Error fetching cart:', error));
        }
    }, [cart_id, setValue]);

    const onSubmit = (data) => {
        const cart = {
          ...data
        };
    
        if (cart_id) {
            axios.put(`http://localhost:8080/carts/update/${cart_id}`, cart)
                .then(() => {
                    toast.success('Cart updated successfully!');
                    setTimeout(() => navigate('/carts'), 2000);
                })
                .catch(error => console.error('Error updating cart:', error));
        } 
        else {
            axios.post('http://localhost:8080/carts/create', cart)
                .then(() => {
                    toast.success('Cart created successfully!');
                    setTimeout(() => navigate('/carts'), 2000);
                })
                .catch(error => console.error('Error creating cart:', error));
        }
    };

    return (
        <div className="container mt-5">
            <h2>{cart_id ? 'Edit Cart' : 'New Cart'}</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-3">
                    <label htmlFor="product_quantity" className="form-label">Product Quantity</label>
                    <input
                        type="number"
                        className="form-control"
                        id="product_quantity"
                        {...register('product_quantity', { required: 'Product quantity is required' })}
                    />
                    {errors.product_quantity && <span className="text-danger">{errors.product_quantity.message}</span>}
                </div>
        
                <div className="mb-3">
                    <label htmlFor="account_id" className="form-label">Account Id</label>
                    <input
                        type="number"
                        className="form-control"
                        id="account_id"
                        {...register('account_id', { required: 'Account id is required' })}
                    />
                    {errors.account_id && <span className="text-danger">{errors.account_id.message}</span>}
                </div>
        
                <div className="mb-3">
                    <label htmlFor="product_id" className="form-label">Product Id</label>
                    <input
                        type="number"
                        className="form-control"
                        id="product_id"
                        {...register('product_id', { required: 'Product id is required' })}
                    />
                    {errors.product_id && <span className="text-danger">{errors.product_id.message}</span>}
                </div>
        
                <div className="d-flex justify-content-end">
                    <button type="submit" className="btn btn-success me-2">Save</button>
                    <button type="button" className="btn btn-secondary" onClick={() => navigate('/carts')}>Cancel</button>
                </div>
            </form>
            <ToastContainer />
        </div>
    );
}

export default OrdercartsForm;