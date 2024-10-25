import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../usersPage/users.css';
import logo from '../../assets/images/logoM.png';

const ProductsDetail = () =>{
    const [products, setProducts] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [loading, setLoading] = useState(true);
    // const [error, setError] = useState(null);
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const { product_id } = useParams();

    useEffect(() => {
        if (product_id) {
            // Gọi API để lấy chi tiết sản phẩm theo product_id
            axios.get(`http://localhost:8080/products/getById/${product_id}`)
                .then(response => {
                    const productData = response.data;
    
                    // Gọi API để lấy hình ảnh sản phẩm
                    axios.get(`http://localhost:8080/uploads/${productData.image_path}`, { responseType: 'blob' })
                        .then(imageResponse => {
                            // Tạo URL cho ảnh từ dữ liệu trả về
                            const imageObjectUrl = URL.createObjectURL(imageResponse.data);
    
                            // Cập nhật state sản phẩm với URL hình ảnh
                            const updatedProduct = { ...productData, imageUrl: imageObjectUrl };
                            setProducts([updatedProduct]);  // Set state cho sản phẩm đơn lẻ (dùng array)
                            setLoading(false);
                        })
                        .catch(error => console.error('Error fetching image:', error));
                })
                .catch(error => console.error('Error fetching product:', error));
        }
    }, [product_id]);
    

    let message;

    if (loading) {
        message = <div>Loading...</div>;
    }

    const addToCart = (sp) => {
        const storedUser = sessionStorage.getItem('user');
        
        if (storedUser) {
            const users = JSON.parse(storedUser);
            // axios.get(`http://localhost:8080/accounts/getByEmail/${users.email}`)
            //     .then(u => {
            //         setUser(u);
            //     })
            //     .catch(error => console.error('Error get account:', error));

            console.log(users.data.account_id);
            const newCartItem = {
                product_quantity: 1,  // Số lượng mặc định hoặc từ input của người dùng
                account_id: users.data.account_id,
                product_id: sp.product_id
            };
            
            axios.get(`http://localhost:8080/carts/getByAccountId/${users.data.account_id}`)
                .then(() => {
                    // Kiểm tra xem sản phẩm đã có trong giỏ hàng của user chưa
                    axios.get(`http://localhost:8080/carts/getListByAccountId/${users.data.account_id}`)
                        .then((response) => {
                            console.log(response);
                            const cartItems = response.data;
                            const existingItem = cartItems.find(item => item.product_id === sp.product_id);
                            if (existingItem) {
                                // Nếu sản phẩm đã có trong giỏ hàng, cập nhật số lượng
                                axios.put(`http://localhost:8080/carts/updateQuantity/${existingItem.cart_id}?product_quantity=${existingItem.product_quantity + 1}`)
                                .then(() => {
                                    toast.success('Updated product quantity in cart!');
                                })
                                .catch(error => console.error('Error updating cart quantity:', error));
                            } else {
                                // Nếu sản phẩm chưa có trong giỏ hàng, thêm mới
                                axios.post('http://localhost:8080/carts/create', newCartItem)
                                    .then(() => {
                                        toast.success('Added product to cart!');
                                    })
                                    .catch(error => console.error('Error adding product to cart:', error));
                            }
                        })
                        .catch(error => console.error('Error fetching cart items:', error));
                }).catch(() => {
                    // Nếu sản phẩm chưa có trong giỏ hàng, thêm mới
                    axios.post('http://localhost:8080/carts/create', newCartItem)
                    .then(() => {
                        toast.success('Added product to cart!');
                    })
                    .catch(error => console.error('Error adding product to cart:', error));
                });
        } else {
            toast.error('You must login to add products to your cart!');
            setTimeout(() => navigate('/login'), 2000);  // Redirect to login page
        }
    };

    const filteredProducts = products.filter(p =>
        p.product_name.toString().includes(searchQuery.toString())
    );

    // const scrollToHome = () => {
    //     const section = document.getElementById('home');
    //     section.scrollIntoView({ behavior: 'smooth' });
    // };

    // const scrollToAbout = () => {
    //     const section = document.getElementById('about');
    //     section.scrollIntoView({ behavior: 'smooth' });
    // };

    // const scrollToProduct = () => {
    //     const section = document.getElementById('menu');
    //     section.scrollIntoView({ behavior: 'smooth' });
    // };

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

                {/* <div className="user-menu">
                    @Html.Action("Logged", "Login")
                </div>

                <div className="cart-items-container">
                    @Html.Action("DisplayCart", "User")
                </div> */}
            </header>
            {/* <div className="wrapper">
                @Html.Action("Login", "Login")
            </div>
            <div className="wrapper1">
                @Html.Action("Register", "Login")
            </div> */}
            {filteredProducts.map(sp => (
                <div className="sp" key={sp.product_id}>
                    <div className="sp-left">
                        {message}
                        <img src={sp.imageUrl} alt="anh"/>
                    </div>
                    <div className="sp-right">
                        <h2>CHI TIẾT SẢN PHẨM</h2>
                        <div className="sanpham">
                            <p>Tên sản phẩm: {sp.product_name}</p>
                            <p>Phân loại: {sp.category_id}</p>
                            <p>Số lượng: {sp.inventory_quantity}</p>
                            <p>Giá: <span className="price">{sp.unit_price} VNĐ</span></p>
                            <button onClick={() => addToCart(sp)} className="btn add-to-cart" >add to cart</button>

                            <div className="info">
                                <h3>THÔNG TIN SẢN PHẨM</h3>
                                <p>{sp.description}</p>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
            <section className="footer">
                <div className="share">
                    <Link to="#" className="fab fa-facebook-f"></Link>
                    <Link to="#" className="fab fa-twitter"></Link>
                    <Link to="#" className="fab fa-instagram"></Link>
                    <Link to="#" className="fab fa-linkedin"></Link>
                    <Link to="#" className="fab fa-pinterest"></Link>
                </div>

                <div className="links">
                    <Link to="#home" className='navbar-link'>home</Link>
                    <Link to="#about" className='navbar-link'>about</Link>
                    <Link to="#menu" className='navbar-link'>products</Link>
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

export default ProductsDetail;