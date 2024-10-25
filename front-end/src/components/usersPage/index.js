import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './users.css';
import logo from '../../assets/images/logoM.png';

const UserHome = () => {
    const [products, setProducts] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [loading, setLoading] = useState(true);
    // const [cart, setCart] = useState([]);
    // const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        // Gọi API để lấy danh sách sản phẩm
        axios.get('http://localhost:8080/products/getAll')
            .then(response => {
                const productsData = response.data;

                // Với mỗi sản phẩm, gọi API để lấy hình ảnh
                const fetchImages = productsData.map(product => {
                    return axios.get(`http://localhost:8080/products/uploads/${product.image_path}`, { responseType: 'blob' })
                        .then(imageResponse => {
                            // Tạo URL cho ảnh từ dữ liệu trả về
                            const imageObjectUrl = URL.createObjectURL(imageResponse.data);
                            return { ...product, imageUrl: imageObjectUrl };  // Thêm imageUrl vào từng sản phẩm
                        });
                });

                // Chờ tất cả các API lấy ảnh hoàn tất
                Promise.all(fetchImages)
                    .then(updatedProducts => {
                        setProducts(updatedProducts);  // Cập nhật state với sản phẩm có kèm URL hình ảnh
                        setLoading(false);
                    });
            })
            .catch(error => console.error('Error fetching products:', error));
    }, []);

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

    const detail = (product_id) => {
        navigate(`/products/detail/${product_id}`);
    };

    const filteredProducts = products.filter(p =>
        p.product_name.toString().includes(searchQuery.toString())
    );

    const scrollToHome = () => {
        const section = document.getElementById('home');
        section.scrollIntoView({ behavior: 'smooth' });
    };

    const scrollToAbout = () => {
        const section = document.getElementById('about');
        section.scrollIntoView({ behavior: 'smooth' });
    };

    const scrollToProduct = () => {
        const section = document.getElementById('menu');
        section.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <div>
            <header className="header">
                <Link to="#home" className="logo" onClick={scrollToHome}>
                    <img src={logo} alt="logoMT"/>
                </Link>

                <nav className="navbar">
                    <Link to="#home" className='navbar-link' onClick={scrollToHome}>Home</Link>
                    <Link to="#about" className='navbar-link' onClick={scrollToAbout}>About</Link>
                    <Link to="#menu" className='navbar-link' onClick={scrollToProduct}>Products</Link>
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
            <section className="home" id="home">
                <div className="content">
                    <h3>QUẠT ĐIỆN CHUYÊN DỤNG</h3>
                    <p>
                        Chuyên cung cấp các thiết bị quạt điện phục vụ cho các trường học
                        và các bệnh viện trên toàn quốc.
                    </p>
                    <Link to="#menu" className="btn" onClick={scrollToProduct}>Mua ngay</Link>
                </div>
            </section>

            <section className="about" id="about">
                <h1 className="heading"><span>about</span> us </h1>
                <div className="row">
                    <div className="image">
                        <img src="/Images/logoytemt.png" alt=""/>
                    </div>

                    <div className="content">
                        <p>
                            M-Fan là trang web chuyên cung cấp các thiết bị với sứ mệnh đem tới những sản
                            phẩm tốt nhất cả về chất lượng lẫn giá cả trong lĩnh vực thiết bị điện để quý khách an tâm sử dụng
                            và chăm sóc khách hàng. M-Fan đang ngày nhận được sự tin tưởng của quý khách hàng và khẳng định
                            được vị thế trên thị trường. Để có được thành công đó là nhờ vào đội ngũ cán bộ làm việc với tinh thần
                            trách nhiệm cao, nhiệt tình, năng động và luôn sẵn sàng lắng nghe đồng thời tiếp thu ý kiến đóng góp từ
                            khách hàng của mình nhằm mục đích phục vụ nhu cầu khách hàng một cách chuyên nghiệp nhất.
                        </p>
                        <p>
                            Thiết bị điện M-Fan cung cấp các trang thiết bị điện, quạt điện cho các cá nhân, tổ chức và
                            cả những trường học, bệnh viện lớn trên khắp cả nước. Tất cả các sản phẩm của M-Fan đều có giấy tờ xuất xứ rõ ràng,
                            nhập khẩu chính hãng từ những thương hiệu lớn khắp nơi trên thế giới.
                        </p>
                        <Link to="#" className="btn">Xem thêm</Link>
                    </div>
                </div>
            </section>

            <section className="menu" id="menu">
                <h1 className="heading"> our <span>products</span> </h1>
                <div className="box-container">
                    {message}
                    {filteredProducts.map(sp => (
                        <div className="box" key={sp.product_id}>
                            <div className='box-link' onClick={() => detail(sp.product_id)}>
                                <div className="image">
                                    <img src={sp.imageUrl} alt={`product-${sp.product_name}`}/>
                                </div>
                                <h3>{sp.product_name}</h3>
                                <div className="price">{sp.unit_price}</div>
                            </div>
                            <button onClick={() => addToCart(sp)} className="btn add-to-cart" >add to cart</button>
                        </div>
                    ))}
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
                    <Link to="#home" className='navbar-link' onClick={scrollToHome}>home</Link>
                    <Link to="#about" className='navbar-link' onClick={scrollToAbout}>about</Link>
                    <Link to="#menu" className='navbar-link' onClick={scrollToProduct}>products</Link>
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

export default UserHome;