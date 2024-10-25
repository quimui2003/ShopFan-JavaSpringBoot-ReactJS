import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../productsList/products.css';
import acc from '../../assets/images/customers.png';
import shoppingbag from '../../assets/images/shoppingbag.png';
import pro from '../../assets/images/bullet-list.png';

const DetailsList = () => {
    const { order_id } = useParams();  // Lấy orderId từ URL
    const [details, setOrderDetails] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    // const navigate = useNavigate();

    useEffect(() => {
        // Gọi API để lấy chi tiết đơn hàng theo order_id
        const fetchOrderDetails = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/details/getByOrderId/${order_id}`);
                setOrderDetails(response.data);  // Cập nhật state với chi tiết đơn hàng
                setLoading(false);
            } catch (err) {
                setError('Failed to fetch order details');
                setLoading(false);
            }
        };

        fetchOrderDetails();
    }, [order_id]);  // Chỉ gọi lại khi orderId thay đổi

    let message;

    if (loading) {
        message = <tr className='manage'><td>Loading...</td></tr>;
    }

    if (error) {
        message = <tr className='manage'><td>{error}</td></tr>;
    }

    const filteredDetails = details.filter(detail =>
        detail.total_quantity.toString().includes(searchQuery.toString()) ||
        detail.sale_price.toString().includes(searchQuery.toString) ||
        detail.order_id.toString().includes(searchQuery.toString()) ||
        detail.product_id.toString().includes(searchQuery.toString())
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
            <div id='main'>
                <div className="head">
                    <div className="col-div-6">
                        <span className="nav" >&#9776; Orders</span>
                        <span className="nav2" >&#9776; Orders</span>
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
                <div className="order">
                    <div className="order-box">
                        <div className="order-content-box">
                            <p>Orders</p>
                            <br/>
                            <table>
                                <thead>
                                    <tr className="head-tb">
                                        <th>Total Quantity</th>
                                        <th>Sale Price</th>
                                        <th>Order Id</th>
                                        <th>Product Id</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {message}
                                    {filteredDetails.map(detail => (
                                        <tr key={detail.detail_id} className="manage">
                                            <td>{detail.total_quantity}</td>
                                            <td>{detail.sale_price}</td>
                                            <td>{detail.order_id}</td>
                                            <td>{detail.product_id}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <ToastContainer />
            </div>
        </div>
    );
};

export default DetailsList;