import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useNavigate, useParams, Link, useLocation } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import acc from '../../assets/images/customers.png';
import shoppingbag from '../../assets/images/shoppingbag.png';
import pro from '../../assets/images/bullet-list.png';

const ProductsForm = () =>{
    const { register, handleSubmit, setValue, formState: { errors } } = useForm();
    const navigate = useNavigate();
    const { product_id } = useParams();
    const [image, setImage] = useState(null);  // Khởi tạo state để lưu ảnh
    const [previewUrl, setPreviewUrl] = useState(null);  // State để lưu preview URL của ảnh
    // const location = useLocation();
    // const setRefresh = location.state?.setRefresh;

    useEffect(() => {
        if (product_id) {
            axios.get(`http://localhost:8080/products/getById/${product_id}`)
                .then(response => {
                    const product = response.data;
                    setValue('product_name', product.product_name);
                    setValue('image_path', product.image_path);
                    setValue('inventory_quantity', product.inventory_quantity);
                    setValue('original_price', product.original_price);
                    setValue('unit_price', product.unit_price);
                    setValue('description', product.description);
                    setValue('category_id', product.category_id);

                    // Gán preview URL từ sản phẩm nếu đã có ảnh
                    if (product.image_path) {
                        setPreviewUrl(`http://localhost:8080/products/uploads/${product.image_path}`);
                    }
                })
                .catch(error => console.error('Error fetching customer:', error));
        }
    }, [product_id, setValue]);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setImage(file);  // Lưu file đã chọn vào state

        // Tạo preview URL cho ảnh vừa chọn
        if (file) {
            setPreviewUrl(URL.createObjectURL(file));
        }
    };

    // const onSubmit = (data) => {
    //     const product = {
    //       ...data
    //     };
    
    //     if (product_id) {
    //         axios.put(`http://localhost:8080/products/update/${product_id}`, product)
    //             .then(() => {
    //                 toast.success('Product updated successfully!');
    //                 setTimeout(() => navigate('/products'), 2000);
    //             })
    //             .catch(error => console.error('Error updating product:', error));
    //     } 
    //     else {
    //         axios.post('http://localhost:8080/products/create', product)
    //             .then(() => {
    //                 toast.success('Product created successfully!');
    //                 setTimeout(() => navigate('/products'), 2000);
    //             })
    //             .catch(error => console.error('Error creating product:', error));
    //     }
    // };

    const onSubmit = (data) => {
        const formData = new FormData();
        for (let key in data) {
            formData.append(key, data[key]);
        }
    
        if (image) {
            formData.append('image_path', image);
        }
    
        if (product_id) {
            axios.put(`http://localhost:8080/products/update/${product_id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
            .then(() => {
                toast.success('Product updated successfully!');
                setTimeout(() => navigate('/products'), 2000);
            })
            .catch(error => console.error('Error updating product:', error));
        } else {
            axios.post('http://localhost:8080/products/create', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
            .then(() => {
                toast.success('Product created successfully!');
                setTimeout(() => navigate('/products'), 2000);
            })
            .catch(error => console.error('Error creating product:', error));
        }
    };     

    return (
        <div>
            <div id="mySidenav">
                <div className="sidenav">
                <p className="logo"><span>M</span>-Fan</p>
                    {/* <Link to="/dashboard" className="icon-a"><img src="/Images/controlpanel.png" alt="menu" className="icons"/><span>Dashboard</span></Link> */}
                    <Link to="/orders" className="icon-a"><img src={shoppingbag} alt="menu" className="icons"/><span>Orders</span></Link>
                    <Link to="/products" className="icon-a"><img src={pro} alt="menu" className="icons"/><span>Products</span></Link>
                    <Link to="/accounts" className="icon-a"><img src={acc} alt="menu" className="icons"/><span>Accounts</span></Link>
                    {/* <Link to="/settings" className="icon-a"><img src="/Images/settings.png" alt="menu" clasclassNames="icons"/><span>Settings</span></Link>
                    <Link to="" className="icon-a"><img src="/Images/logout.png" alt="menu" className="icons"/><span>Logout</span></Link> */}
                </div>
            </div>
            <div className='add-pd'>
                <div className='add-pd-content'>
                    <h2>{product_id ? 'Edit Product' : 'New Product'}</h2>
                    <form onSubmit={handleSubmit(onSubmit)} id='add-pro'>
                        <div className="mb-3">
                            <label htmlFor="product_name" className="form-label">Product Name</label>
                            <input
                                type="text"
                                className="searchInput"
                                id="product_name"
                                {...register('product_name', { required: 'Name is required' })}
                            />
                            {errors.product_name && <span className="text-danger">{errors.product_name.message}</span>}
                        </div>
                
                        <div className="mb-3">
                            <label htmlFor="image_path" className="form-label">Image</label>
                            <img src={previewUrl} alt='product name' className='previewUrl'/>
                            <input
                                type="file"
                                className="searchInput"
                                id="image_path"
                                {...register('image_path', { required: 'Image is required' })}
                                onChange={handleFileChange}  // Gọi hàm handleFileChange khi chọn file
                            />
                            {errors.image_path && <span className="text-danger">{errors.image_path.message}</span>}
                        </div>

                        <div className="mb-3">
                            <label htmlFor="inventory_quantity" className="form-label">Quantity</label>
                            <input
                                type="number"
                                className="searchInput"
                                id="inventory_quantity"
                                {...register('inventory_quantity', { required: 'Quantity is required' })}
                            />
                            {errors.inventory_quantity && <span className="text-danger">{errors.inventory_quantity.message}</span>}
                        </div>
                
                        <div className="mb-3">
                            <label htmlFor="original_price" className="form-label">Original Price</label>
                            <input
                                type="number"
                                className="searchInput"
                                id="original_price"
                                {...register('original_price', { required: 'Original Price is required' })}
                            />
                            {errors.original_price && <span className="text-danger">{errors.original_price.message}</span>}
                        </div>

                        <div className="mb-3">
                            <label htmlFor="unit_price" className="form-label">Unit Price</label>
                            <input
                                type="number"
                                className="searchInput"
                                id="unit_price"
                                {...register('unit_price', { required: 'Unit Price is required' })}
                            />
                            {errors.unit_price && <span className="text-danger">{errors.unit_price.message}</span>}
                        </div>

                        <div className="mb-3">
                            <label htmlFor="description" className="form-label">Description</label>
                            <input
                                type="text"
                                className="searchInput"
                                id="description"
                                {...register('description', { required: 'Description is required' })}
                            />
                            {errors.description && <span className="text-danger">{errors.description.message}</span>}
                        </div>

                        <div className="mb-3">
                            <label htmlFor="category_id" className="form-label">Category</label>
                            <input
                                type="number"
                                className="searchInput"
                                id="category_id"
                                {...register('category_id', { required: 'Category is required' })}
                            />
                            {errors.category_id && <span className="text-danger">{errors.category_id.message}</span>}
                        </div>
                
                        <div className="d-flex justify-content-end">
                            <button type="submit" className="btn btn-success me-2">Save</button>
                            <button type="button" className="btn btn-secondary" onClick={() => navigate('/products')}>Cancel</button>
                        </div>
                    </form>
                    <ToastContainer />
                </div>
            </div>
        </div>
    );
}

export default ProductsForm;