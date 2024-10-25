import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const OrdersForm = () =>{
    const { register, handleSubmit, setValue, formState: { errors } } = useForm();
    const navigate = useNavigate();
    const { order_id } = useParams();

    useEffect(() => {
        if (order_id) {
            axios.get(`http://localhost:8080/orders/getById/${order_id}`)
                .then(response => {
                    const order = response.data;
                    setValue('order_date', order.order_date);
                    setValue('total_price', order.total_price);
                    setValue('status_id', order.status_id);
                    setValue('customer_id', order.customer_id);
                })
                .catch(error => console.error('Error fetching order:', error));
        }
    }, [order_id, setValue]);

    const onSubmit = (data) => {
        const order = {
          ...data
        };
    
        if (order_id) {
            axios.put(`http://localhost:8080/orders/update/${order_id}`, order)
                .then(() => {
                    toast.success('Order updated successfully!');
                    setTimeout(() => navigate('/orders'), 2000);
                })
                .catch(error => console.error('Error updating order:', error));
        }
        else {
            axios.post('http://localhost:8080/orders/create', order)
                .then(() => {
                    toast.success('Order created successfully!');
                    setTimeout(() => navigate('/orders'), 2000);
                })
                .catch(error => console.error('Error creating order:', error));
        }
    };

    return (
        <div className="container mt-5">
            <h2>{order_id ? 'Edit Order' : 'New Order'}</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-3">
                    <label htmlFor="order_date" className="form-label">Order date</label>
                    <input
                        type="date"
                        className="form-control"
                        id="order_date"
                        {...register('order_date', { required: 'Order date is required' })}
                    />
                    {errors.order_date && <span className="text-danger">{errors.order_date.message}</span>}
                </div>
        
                <div className="mb-3">
                    <label htmlFor="total_price" className="form-label">Total Price</label>
                    <input
                        type="number"
                        className="form-control"
                        id="total_price"
                        {...register('total_price', { required: 'Total price is required' })}
                    />
                    {errors.total_price && <span className="text-danger">{errors.total_price.message}</span>}
                </div>
        
                <div className="mb-3">
                    <label htmlFor="status_id" className="form-label">Status Id</label>
                    <input
                        type="number"
                        className="form-control"
                        id="status_id"
                        {...register('status_id', { required: 'Status id is required' })}
                    />
                    {errors.status_id && <span className="text-danger">{errors.status_id.message}</span>}
                </div>

                <div className="mb-3">
                    <label htmlFor="customer_id" className="form-label">Customer Id</label>
                    <input
                        type="number"
                        className="form-control"
                        id="customer_id"
                        {...register('customer_id', { required: 'Customer id is required' })}
                    />
                    {errors.customer_id && <span className="text-danger">{errors.customer_id.message}</span>}
                </div>
        
                <div className="d-flex justify-content-end">
                    <button type="submit" className="btn btn-success me-2">Save</button>
                    <button type="button" className="btn btn-secondary" onClick={() => navigate('/orders')}>Cancel</button>
                </div>
            </form>
            <ToastContainer />
        </div>
    );
}

export default OrdersForm;