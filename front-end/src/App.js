import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AccountsForm from './components/accountsForm';
import AccountsList from './components/accountsList';
import CategoryForm from './components/categoryForm';
import CategoryList from './components/categoryList';
import CustomersForm from './components/customersForm';
import CustomersList from './components/customersList';
import CartsForm from './components/ordercartsForm';
import CartsList from './components/ordercartsList';
import DetailsForm from './components/orderdetailsForm';
import DetailsList from './components/orderdetailsList';
import OrdersForm from './components/ordersForm';
import OrdersList from './components/ordersList';
import ProductsForm from './components/productsForm';
import ProductsList from './components/productsList';
import RolesForm from './components/rolesForm';
import RolesList from './components/rolesList';
import StatusForm from './components/statusForm';
import StatusList from './components/statusList';
import ProductsDetail from './components/productsDetail';
import UserHome from './components/usersPage';
import LoginForm from './components/loginForm';

const App = () => (
  <Router>
    <Routes>
      <Route path="/accounts" element={<AccountsList />} />
      <Route path="/accounts/new" element={<AccountsForm />} />
      <Route path="/accounts/edit/:account_id" element={<AccountsForm />} />

      <Route path="/category" element={<CategoryList />} />
      <Route path="/category/new" element={<CategoryForm />} />
      <Route path="/category/edit/:category_id" element={<CategoryForm />} />

      <Route path="/customers" element={<CustomersList />} />
      <Route path="/customers/new" element={<CustomersForm />} />
      <Route path="/customers/edit/:customer_id" element={<CustomersForm />} />

      <Route path="/carts" element={<CartsList />} />
      <Route path="/carts/new" element={<CartsForm />} />
      <Route path="/carts/edit/:cart_id" element={<CartsForm />} />

      <Route path="/details" element={<DetailsList />} />
      <Route path="/details/new" element={<DetailsForm />} />
      <Route path="/details/edit/:detail_id" element={<DetailsForm />} />
      <Route path="/details/:order_id" element={<DetailsList/>} />

      <Route path="/orders" element={<OrdersList />} />
      <Route path="/orders/new" element={<OrdersForm />} />
      <Route path="/orders/edit/:order_id" element={<OrdersForm />} />

      <Route path="/products" element={<ProductsList />} />
      <Route path="/products/new" element={<ProductsForm />} />
      <Route path="/products/edit/:product_id" element={<ProductsForm />} />
      <Route path="/products/detail/:product_id" element={<ProductsDetail/>} />

      <Route path="/roles" element={<RolesList />} />
      <Route path="/roles/new" element={<RolesForm />} />
      <Route path="/roles/edit/:role_id" element={<RolesForm />} />

      <Route path="/status" element={<StatusList />} />
      <Route path="/status/new" element={<StatusForm />} />
      <Route path="/status/edit/:status_id" element={<StatusForm />} />
      <Route path="/" element={<UserHome/>} />

      <Route path="/login" element={<LoginForm/>} />
    </Routes>
  </Router>
);

export default App;
