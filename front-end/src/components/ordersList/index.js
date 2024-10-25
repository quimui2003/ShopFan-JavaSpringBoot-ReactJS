import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../productsList/products.css';
import acc from '../../assets/images/customers.png';
import shoppingbag from '../../assets/images/shoppingbag.png';
import pro from '../../assets/images/bullet-list.png';

const OrdersList = () => {
    const [orders, setOrders] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [loading, setLoading] = useState(true);
    //const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get('http://localhost:8080/orders/getAll')
        .then(response => {
            const orderData = response.data;
            const fetchStatusName = orderData.map(order => {
                return axios.get(`http://localhost:8080/status/getById/${order.status_id}`)
                    .then(status => {
                        const statusname = status.data.status_name;
                        return axios.get(`http://localhost:8080/customers/getById/${order.customer_id}`)
                            .then(customer => {
                                const customername = customer.data.customer_name;
                                return { ...order, statusName: statusname, customerName: customername };
                            });
                    });
            });

            Promise.all(fetchStatusName)
                .then(updatedAcc => {
                    setOrders(updatedAcc);
                    setLoading(false);
                });
        })
        .catch(error => console.error('Error fetching order:', error));
    }, []);

    let message;

    if (loading) {
        message = <tr className='manage'><td>Loading...</td></tr>;
    }

    // const handleEdit = (order_id) => {
    //     navigate(`/orders/edit/${order_id}`);
    // };

    const setStatus = (order_id, status_id) => {
        axios.put(`http://localhost:8080/orders/updateStatus/${order_id}?status_id=${status_id}`)
            .then(() => {
                toast.success('Order updated successfully!');
                setTimeout(() => navigate('/orders'), 2000);
                axios.get('http://localhost:8080/orders/getAll')
                    .then(response => {
                        const orderData = response.data;
                        const fetchStatusName = orderData.map(order => {
                            return axios.get(`http://localhost:8080/status/getById/${order.status_id}`)
                                .then(status => {
                                    const statusname = status.data.status_name;
                                    return axios.get(`http://localhost:8080/customers/getById/${order.customer_id}`)
                                        .then(customer => {
                                            const customername = customer.data.customer_name;
                                            return { ...order, statusName: statusname, customerName: customername };
                                        });
                                });
                        });

                        Promise.all(fetchStatusName)
                            .then(updatedAcc => {
                                setOrders(updatedAcc);
                                setLoading(false);
                            });
                })
                .catch(error => console.error('Error fetching order:', error));
        })
        .catch(error => console.error('Error updating order:', error));
    }

    // const handleDelete = (order_id) => {
    //     if (window.confirm('Are you sure you want to delete this order?')) {
    //         axios.delete(`http://localhost:8080/orders/delete/${order_id}`)
    //             .then(() => {
    //                 setOrders(orders.filter(order => order.order_id !== order_id));
    //                 toast.success('Order deleted successfully!');
    //             })
    //             .catch(error => console.error('Error deleting order:', error));
    //     }
    // };

    const filteredOrders = orders.filter(order =>
        order.order_date.toString().includes(searchQuery.toString()) ||
        order.total_price.toString().includes(searchQuery.toString) ||
        order.statusName.toString().includes(searchQuery.toString()) ||
        order.customerName.toString().includes(searchQuery.toString())
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
                        <span className="nav">&#9776; Orders</span>
                        <span className="nav2">&#9776; Orders</span>
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
                                        <th className='gm'>Order Date</th>
                                        <th>Total Price</th>
                                        <th>Status</th>
                                        <th className='gm'>Customer Name</th>
                                        <th>Manage</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {message}
                                    {filteredOrders.map(order => (
                                        <tr key={order.order_id} className="manage">
                                            <td className='gm'>{new Date(order.order_date).toLocaleDateString()}</td>
                                            <td>{order.total_price}</td>
                                            <td>{order.statusName}</td>
                                            <td className='gm'>{order.customerName}</td>
                                            <td className="edit">
                                                <button className="ed" onClick={() => setStatus(order.order_id, 2)}>Approve</button>
                                                <button className="de" onClick={() => setStatus(order.order_id, 3)}>Reject</button>
                                                <Link to={`/details/${order.order_id}`}>Detail</Link>
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

export default OrdersList;