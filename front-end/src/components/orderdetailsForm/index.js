import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const DetailsForm = () =>{
    const { register, handleSubmit, setValue, formState: { errors } } = useForm();
    const navigate = useNavigate();
    const { detail_id } = useParams();

    useEffect(() => {
        if (detail_id) {
            axios.get(`http://localhost:8080/details/getById/${detail_id}`)
                .then(response => {
                    const detail = response.data;
                    setValue('total_quantity', detail.total_quantity);
                    setValue('sale_price', detail.sale_price);
                    setValue('order_id', detail.order_id);
                    setValue('product_id', detail.product_id);
                })
                .catch(error => console.error('Error fetching detail:', error));
        }
    }, [detail_id, setValue]);

    const onSubmit = (data) => {
        const detail = {
          ...data
        };
    
        if (detail_id) {
            axios.put(`http://localhost:8080/details/update/${detail_id}`, detail)
                .then(() => {
                    toast.success('Detail updated successfully!');
                    setTimeout(() => navigate('/details'), 2000);
                })
                .catch(error => console.error('Error updating detail:', error));
        } 
        else {
            axios.post('http://localhost:8080/details/create', detail)
                .then(() => {
                    toast.success('Detail created successfully!');
                    setTimeout(() => navigate('/details'), 2000);
                })
                .catch(error => console.error('Error creating detail:', error));
        }
    };

    return (
        <div className="container mt-5">
            <h2>{detail_id ? 'Edit Detail' : 'New Detail'}</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-3">
                    <label htmlFor="total_quantity" className="form-label">Total Quantity</label>
                    <input
                        type="number"
                        className="form-control"
                        id="total_quantity"
                        {...register('total_quantity', { required: 'Total quantity is required' })}
                    />
                    {errors.total_quantity && <span className="text-danger">{errors.total_quantity.message}</span>}
                </div>
        
                <div className="mb-3">
                    <label htmlFor="sale_price" className="form-label">Sale Price</label>
                    <input
                        type="number"
                        className="form-control"
                        id="sale_price"
                        {...register('sale_price', { required: 'Sale price is required' })}
                    />
                    {errors.sale_price && <span className="text-danger">{errors.sale_price.message}</span>}
                </div>
        
                <div className="mb-3">
                    <label htmlFor="order_id" className="form-label">Order Id</label>
                    <input
                        type="number"
                        className="form-control"
                        id="order_id"
                        {...register('order_id', { required: 'Order id is required' })}
                    />
                    {errors.order_id && <span className="text-danger">{errors.order_id.message}</span>}
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
                    <button type="button" className="btn btn-secondary" onClick={() => navigate('/details')}>Cancel</button>
                </div>
            </form>
            <ToastContainer />
        </div>
    );
}

export default DetailsForm;