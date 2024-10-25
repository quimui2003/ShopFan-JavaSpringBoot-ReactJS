import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../productsList/products.css';
import acc from '../../assets/images/customers.png';
import shoppingbag from '../../assets/images/shoppingbag.png';
import pro from '../../assets/images/bullet-list.png';

const AccountsList = () => {
    const [accounts, setAccounts] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [loading, setLoading] = useState(true);
    //const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get('http://localhost:8080/accounts/getAll')
        .then(response => {
            const accountData = response.data;
            const fetchRoleName = accountData.map(account => {
                return axios.get(`http://localhost:8080/roles/getById/${account.role_id}`)
                    .then(roles => {
                        const rolename = roles.data.role_name;
                        return axios.get(`http://localhost:8080/customers/getById/${account.customer_id}`)
                            .then(customer => {
                                const customername = customer.data.customer_name;
                                return { ...account, roleName: rolename, customerName: customername };
                            });
                    });
            });

            // console.log(fetchRoleName);
            // const fetchCustomerName = fetchRoleName.map(account => {
            //     return axios.get(`http://localhost:8080/customers/getById/${account.customer_id}`)
            //         .then(customer => {
            //             const customername = customer.data.customer_name;
            //             return { ...account, customerName: customername };
            //         });
            // });

            Promise.all(fetchRoleName)
                .then(updatedAcc => {
                    setAccounts(updatedAcc);
                    setLoading(false);
                });

            // Promise.all(fetchCustomerName)
            //     .then(updatedAcc => {
            //         setAccounts(updatedAcc);
            //         setLoading(false);
            //     });
        })
        .catch(error => console.error('Error fetching account:', error));
    }, []);

    let message;

    if (loading) {
        message = <tr className='manage'><td>Loading...</td></tr>;
    }

    // const handleEdit = (account_id) => {
    //     navigate(`/accounts/edit/${account_id}`);
    // };
        
    const handleDelete = (account_id) => {
        if (window.confirm('Are you sure you want to delete this account?')) {
            axios.delete(`http://localhost:8080/accounts/delete/${account_id}`)
                .then(() => {
                    setAccounts(accounts.filter(account => account.account_id !== account_id));
                    toast.success('Account deleted successfully!');
                })
                .catch(error => console.error('Error deleting account:', error));
        }
    };

    const setRoles = (account_id, role_id) => {
        axios.put(`http://localhost:8080/accounts/updateRoles/${account_id}?role_id=${role_id}`)
            .then(() => {
                toast.success('Account updated successfully!');
                setTimeout(() => navigate('/accounts'), 2000);
                axios.get('http://localhost:8080/accounts/getAll')
                    .then(response => {
                        const accountData = response.data;
                        const fetchRoleName = accountData.map(account => {
                            return axios.get(`http://localhost:8080/roles/getById/${account.role_id}`)
                                .then(roles => {
                                    const rolename = roles.data.role_name;
                                    return axios.get(`http://localhost:8080/customers/getById/${account.customer_id}`)
                                        .then(customer => {
                                            const customername = customer.data.customer_name;
                                            return { ...account, roleName: rolename, customerName: customername };
                                        });
                                });
                        });

                        Promise.all(fetchRoleName)
                            .then(updatedAcc => {
                                setAccounts(updatedAcc);
                                setLoading(false);
                            });
                })
                .catch(error => console.error('Error fetching account:', error));
        })
        .catch(error => console.error('Error updating order:', error));
    }

    const filteredAccounts = accounts.filter(account =>
        account.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        account.roleName.toString().includes(searchQuery.toString()) ||
        account.customerName.toString().includes(searchQuery.toString())
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
                        <span className="nav" >&#9776; Accounts</span>
                        <span className="nav2" >&#9776; Accounts</span>
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

                <div className="account">
                    <div className="account-box">
                        <div className="account-content-box">
                            <p>Accounts</p>
                            <br/>
                            <table>
                                <thead>
                                    <tr className="head-tb">
                                        <th className='gm'>Email</th>
                                        <th>Role</th>
                                        <th>Customer Name</th>
                                        <th>Manage</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {message}
                                    {filteredAccounts.map(account => (
                                        <tr key={account.account_id} className="manage">
                                            <td className='gm'>{account.email}</td>
                                            <td>{account.roleName}</td>
                                            <td>{account.customerName}</td>
                                            <td className="edit">
                                                <button className="ed" onClick={() => setRoles(account.account_id, 1)}>Appoint</button>
                                                <button className="de" onClick={() => setRoles(account.account_id, 3)}>Dismissal</button>
                                                <button className='de' onClick={() => handleDelete(account.account_id)}>Delete</button>
                                            </td>
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

export default AccountsList;