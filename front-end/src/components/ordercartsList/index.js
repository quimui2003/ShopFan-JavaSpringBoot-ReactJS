import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../productsList/products.css';
import logo from '../../assets/images/logoM.png';

const OrdercartsList = () => {
    const [carts, setCarts] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const storedUser = sessionStorage.getItem('user');
        
        if (storedUser) {
            const users = JSON.parse(storedUser);
            console.log(users);
            // Kiểm tra xem sản phẩm đã có trong giỏ hàng của user chưa
            axios.get(`http://localhost:8080/carts/getListByAccountId/${users.data.account_id}`)
                .then((response) => {
                    const cartItems = response.data;
                    const fetchStatusName = cartItems.map(cart => {
                        return axios.get(`http://localhost:8080/products/getById/${cart.product_id}`)
                            .then(pro => {
                                const productname = pro.data.product_name;
                                const productprice = pro.data.unit_price;
                                return axios.get(`http://localhost:8080/category/getById/${pro.data.category_id}`)
                                    .then(cate => {
                                        const categoryname = cate.data.category_name;
                                        return { ...cart, categoryName: categoryname, productName: productname, unitPrice: productprice };
                                    });
                            });
                    });

                    Promise.all(fetchStatusName)
                        .then(updatedAcc => {
                            setCarts(updatedAcc);
                            setLoading(false);
                        });
                    
                        
                })
                .catch(error => console.error('Error fetching cart items:', error));
        }
    }, []);

    let message;

    if (loading) {
        message = <tr className='manage'><td>Loading...</td></tr>;
    }

    // const handleEdit = (cart_id) => {
    //     navigate(`/carts/edit/${cart_id}`);
    // };
        
    const handleDelete = (cart_id) => {
        if (window.confirm('Are you sure you want to delete this cart?')) {
            axios.delete(`http://localhost:8080/carts/delete/${cart_id}`)
                .then(() => {
                    setCarts(carts.filter(cart => cart.cart_id !== cart_id));
                    toast.success('Cart deleted successfully!');
                })
                .catch(error => console.error('Error deleting cart:', error));
        }
    };

    let totalPrice = () => {
        let total = 0;
        carts.forEach(element => {
            total += element.product_quantity * element.unitPrice;
        });
        return total;
    };

    const payOrder = () => {
        console.log(carts);
        // axios.post('http://localhost:8080/orders/create', order)
        //     .then(() => {
        //         toast.success('Order created successfully!');
        //         setTimeout(() => navigate('/orders'), 2000);
        //     })
        //     .catch(error => console.error('Error creating order:', error));
    }

    const filteredCarts = carts.filter(cart =>
        cart.product_quantity.toString().includes(searchQuery.toString()) ||
        cart.categoryName.toString().includes(searchQuery.toString()) ||
        cart.productName.toString().includes(searchQuery.toString())
    );

    return (
        <div>
            <header className="header">
                <Link to="/" className="logo">
                    <img src={logo} alt="logoMT"/>
                </Link>

                <nav className="navbar">
                    <Link to="/" className='navbar-link'>Home</Link>
                    <Link to="/" className='navbar-link'>About</Link>
                    <Link to="/" className='navbar-link'>Products</Link>
                </nav>

                <div className="icons">
                    <div className="fas fa-search" id="search-btn" title="Tìm kiếm"></div>
                    <div className="fas fa-shopping-cart" id="cart-btn" title="Giỏ hàng" onClick={() => navigate('/carts')}></div>
                    <div className="fas fa-user" id="user-btn" title="Tài khoản" onClick={() => navigate('/login')}></div>
                    <div className="fas fa-bars" id="menu-btn"></div>
                </div>

                <div className="search-form">
                    <input
                        id='search-box'
                        type="search"
                        className=""
                        placeholder="Search here..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <label htmlFor="search-box" className="fas fa-search"></label>
                </div>
            </header>
            <section id='cart'>
                <div className="container mt-5">
                    <h2>Cart List</h2>
                    <div className="searchContainer">
                        <div className="mb-3">
                            <input
                                type="text"
                                className="searchInput"
                                placeholder="Search..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>
                        <button className="btn btn-primary" onClick={() => payOrder()}>Thanh Toán</button>
                    </div>
            
                    <table className="table table-bordered">
                        <thead>
                        <tr>
                            <th>Product Name</th>
                            <th>Category</th>
                            <th>Product Quantity</th>
                            <th>Total Price</th>
                            <th>Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                            {message}
                            {filteredCarts.map(cart => (
                                <tr key={cart.cart_id}>
                                    <td>{cart.productName}</td>
                                    <td>{cart.categoryName}</td>
                                    <td>{cart.product_quantity}</td>
                                    <td>{cart.product_quantity * cart.unitPrice}</td>
                                    <td className='edit'>
                                        {/* <button className="ed" onClick={() => handleEdit(cart.cart_id)}>Edit</button> */}
                                        <button className="de" onClick={() => handleDelete(cart.cart_id)}>Delete</button>
                                    </td>
                                </tr>
                            ))}
                            <tr className='manage'><td>Tổng cộng: {totalPrice()} VNĐ</td></tr>
                        </tbody>
                    </table>
                </div>
            </section>
            <section className="footer">
                <div className="share">
                    <Link to="#" className="fab fa-facebook-f"></Link>
                    <Link to="#" className="fab fa-twitter"></Link>
                    <Link to="#" className="fab fa-instagram"></Link>
                    <Link to="#" className="fab fa-linkedin"></Link>
                    <Link to="#" className="fab fa-pinterest"></Link>
                </div>

                <div className="links">
                    <Link to="/" className='navbar-link'>home</Link>
                    <Link to="/" className='navbar-link'>about</Link>
                    <Link to="/" className='navbar-link'>products</Link>
                    <Link to="#review" className='navbar-link'>review</Link>
                    <Link to="#contact" className='navbar-link'>contact</Link>
                    <Link to="#blogs" className='navbar-link'>blogs</Link>
                </div>

                <div className="credit">coppyright &copy; 2024 <span>MT-Media</span>. Phát triển bởi <span>nguyen van qui mui</span>.</div>
            </section>
            <ToastContainer />
        </div>
    );
};

export default OrdercartsList;