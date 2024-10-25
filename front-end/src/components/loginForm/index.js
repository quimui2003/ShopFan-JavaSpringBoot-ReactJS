import React, { useEffect } from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const LoginForm = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    // const [email, setEmail] = useState('');
    // const [password, setPassword] = useState('');
    // const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        // Khởi tạo sessionStorage rỗng
        // localStorage.clear();
        sessionStorage.setItem('user', '');
      }, []);

    const onSubmit = (data) => {
        const account = {
            ...data
        };
        try {
            axios.post('http://localhost:8080/accounts/login', account)
                .then(() => {
                    axios.get(`http://localhost:8080/accounts/getByEmail/${account.email}`)
                        .then(user => {
                            sessionStorage.setItem('user', JSON.stringify(user));
                            toast.success('Login successfully!');
                            if(user.data.role_id === 1){
                                setTimeout(() => navigate('/orders'), 2000);
                            }
                            else{
                                setTimeout(() => navigate('/'), 2000);
                            }
                        })
                        .catch(error => console.error('Error get account:', error));
                })
                .catch(error => {console.error('Error updating order:', error);
                    toast.error('Email hoặc mật khẩu không đúng.');
                    setTimeout(() => navigate('/login'), 2000);
                });
            
        } catch (error) {
            toast.error('Email hoặc mật khẩu không đúng.');
            setTimeout(() => navigate('/login'), 2000);
        }
    };

    return (
        <div>
            <div className="login_box">
                <div className="close-login" onClick={() => navigate("/")}>X</div>
                <div className="login-header">
                    <span>Login</span>
                </div>
                <form id="loginForm" onSubmit={handleSubmit(onSubmit)}>
                    <div className="input_box">
                        <input
                            type="email"
                            className='input-field'
                            id='email'
                            {...register('email', { required: 'Email is required' })}
                        />
                        {errors.email && <span className="text-danger">{errors.email.message}</span>}
                        <label htmlFor="email" className="label">Email</label>
                        <i className="bx bx-user icon"></i>
                    </div>
                    <div className="input_box">
                        <input
                            type="password"
                            className='input-field'
                            id='password'
                            {...register('password', { required: 'Password is required' })}
                        />
                        {errors.password && <span className="text-danger">{errors.password.message}</span>}
                        <label htmlFor="password" className="label">Mật khẩu</label>
                        <i className="bx bx-lock-alt icon"></i>
                        
                    </div>
                    <div className="error-login" id="error-login"></div>
                    <div className="remember-forgot">
                        <div className="remember-me">
                            <input type="checkbox" id="remember"/>
                            <label htmlFor="remember">Nhớ mật khẩu</label>
                        </div>
                        <div className="forgot">
                            <span id="forgot-btn">Quên mật khẩu?</span>
                            <span id="register">Đăng ký</span>
                        </div>
                    </div>
                    <div className="input_box">
                        <input type="submit" className="input-submit" value="Đăng nhập"/>
                    </div>
                </form>
            </div>
            <ToastContainer />
        </div>
    );
};

export default LoginForm;
