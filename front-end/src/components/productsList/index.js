import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './products.css';
import acc from '../../assets/images/customers.png';
import shoppingbag from '../../assets/images/shoppingbag.png';
import pro from '../../assets/images/bullet-list.png';

const ProductsList = () => {
    const [products, setProducts] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [loading, setLoading] = useState(true);
    // const [error, setError] = useState(null);
    const navigate = useNavigate();
    //const [refresh, setRefresh] = useState(false);

    useEffect(() => {
        setLoading(true);
        axios.get('http://localhost:8080/products/getAll')
            .then(response => {
                const productsData = response.data;
    
                const fetchImages = productsData.map(product => {
                    return axios.get(`http://localhost:8080/products/uploads/${product.image_path}`, { responseType: 'blob' })
                        .then(imageResponse => {
                            const imageObjectUrl = URL.createObjectURL(imageResponse.data);
                            return { ...product, imageUrl: imageObjectUrl };
                        });
                });
    
                Promise.all(fetchImages)
                    .then(updatedProducts => {
                        setProducts(updatedProducts);
                        setLoading(false);
                    });
            })
            .catch(error => console.error('Error fetching products:', error));
    }, []); // Theo dõi refresh để làm mới dữ liệu khi cần    

    let message;

    if (loading) {
        message = <tr className='manage'><td>Loading...</td></tr>;
    }

    const handleEdit = (product_id) => {
        //navigate(`/products/edit/${product_id}`, { state: { setRefresh } }); // Truyền setRefresh qua state của navigate
        navigate(`/products/edit/${product_id}`);
    };

    const handleDelete = (product_id) => {
        if (window.confirm('Are you sure you want to delete this product?')) {
            axios.delete(`http://localhost:8080/products/delete/${product_id}`)
                .then(() => {
                    setProducts(products.filter(product => product.product_id !== product_id));
                    toast.success('Product deleted successfully!');
                })
                .catch(error => console.error('Error deleting product:', error));
        }
    };

    const filteredProducts = products.filter(product =>
        product.product_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.inventory_quantity.toString().includes(searchQuery.toString()) ||
        product.original_price.toString().includes(searchQuery.toString()) ||
        product.unit_price.toString().includes(searchQuery.toString()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase())
    );

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
            <div id="main">
                <div className="head">
                    <div className="col-div-6">
                        <span className="nav" >&#9776; Products</span>
                        <span className="nav2" >&#9776; Products</span>
                    </div>
                    <div className="col-div-6">
                        <input
                            type="text"
                            className="searchInput"
                            placeholder="Search here..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                    <div className="clearfix"></div>
                </div>
                <div className="product">
                    <div className="product-box">
                        <div className="product-content-box">
                            <div className="sp">
                                <p>Products</p>
                                <button id="add-pd" onClick={() => navigate('/products/new')}><span>+</span> Add Products</button>
                            </div>
                            <br/>
                            <table>
                                <thead>
                                    <tr className="head-tb">
                                        <th className='gm'>Product's Name</th>
                                        <th>Image</th>
                                        <th>Quantity</th>
                                        <th>Original Price</th>
                                        <th>Unit Price</th>
                                        <th>Update Date</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {message}
                                    {filteredProducts.map(product => (
                                        <tr key={product.product_id} className='manage'>
                                            <td className='gm'>{product.product_name}</td>
                                            <td><img src={product.imageUrl} alt={`product-${product.product_name}`} /></td>
                                            <td>{product.inventory_quantity}</td>
                                            <td>{product.original_price}</td>
                                            <td>{product.unit_price}</td>
                                            <td>{new Date(product.updated_time).toLocaleDateString()}</td>
                                            <td className='edit'>
                                                <button className="ed" onClick={() => handleEdit(product.product_id)}>Edit</button>
                                                <button className="de" onClick={() => handleDelete(product.product_id)}>Delete</button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <ToastContainer />
                </div>
            </div>
        </div>
    );
};

export default ProductsList;
