import React, {useState, useContext} from 'react';
import { UserContext,AdminContext } from '../../contexts/AuthContext';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input } from 'antd';
import './login.css'
import { loginFetch } from '../../api/getAPI';
import { Link, useNavigate } from 'react-router-dom';
import { getIsAdmin } from '../../auth/auth';

const Login = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const {isLogged, setIsLogged, isAdmin, setIsAdmin} = useContext(UserContext)

    const navigate = useNavigate()

    const onFinish = async() => {
        const response = await loginFetch(name, email, password)
        if(response.status === 200) {
            const token = await response.json()
            localStorage.setItem('token', token.accessToken)
            setIsLogged(true)
            const admin = getIsAdmin()
            setIsAdmin(admin)
            navigate('/MyDrive')
        } else {
            setIsLogged(false)
        }
    };

    return (
        <Form
            name="normal_login"
            className="login-form"
            initialValues={{
                remember: true,
            }}
            onFinish={onFinish}
        >
            <Form.Item
                name="username"
                label="Username"
                onChange={e=>setName(e.target.value)}
                rules={[
                    {
                        required: true,
                        message: 'Please input your Username!',
                    },
                ]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                label="Password"
                name="password"
                onChange={e=>setPassword(e.target.value)}
                rules={[
                    {
                        required: true,
                        message: 'Please input your Password!',
                    },
                ]}
            >
                <Input.Password />
            </Form.Item>
            <Form.Item>
                <Form.Item name="remember" valuePropName="checked" noStyle>
                    <Checkbox>Remember me</Checkbox>
                </Form.Item>

                <a className="login-form-forgot" href="">
                    Forgot password
                </a>
            </Form.Item>

            <Form.Item>
                <Button type="primary" htmlType="submit" className="login-form-button">
                    Log in
                </Button>
                Or <Link to="/signup">register now!</Link>
            </Form.Item>
        </Form>
    );
};

export default Login;
