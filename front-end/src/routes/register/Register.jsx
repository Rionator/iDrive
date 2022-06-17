import {
    Button,
    Checkbox,
    Col,
    Form,
    Input,
    Row,
    Select,
} from 'antd';
import React, {useState, useContext} from 'react';
import { UserContext } from '../../contexts/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import { loginFetch } from '../../api/getAPI';
import { getIsAdmin } from '../../auth/auth';

const { Option } = Select;
const formItemLayout = {
    labelCol: {
        xs: {
            span: 24,
        },
        sm: {
            span: 8,
        },
    },
    wrapperCol: {
        xs: {
            span: 24,
        },
        sm: {
            span: 8,
        },
    },
};
const tailFormItemLayout = {
    wrapperCol: {
        xs: {
            span: 24,
            offset: 0,
        },
        sm: {
            span: 24,
            offset: 8,
        },
        md: {
            span: 24,
            offset: 8
        },
        lg: {
            span: 32,
            offset: 8
        }
    },
};

const App = () => {
    const [form] = Form.useForm();
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [phoneNumber, setPhoneNumber] = useState('')
    const [gender, setGender] = useState('')
    const {isLogged, setIsLogged, isAdmin, setIsAdmin} = useContext(UserContext)
    const navigate = useNavigate()

    const onFinish = async () => {
        
        const response = await fetch('http://localhost:8080/api/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name,
                email,
                password,
                phoneNumber,
                gender
                
            })
        })
        const data = await response.json()
        
        const res = await loginFetch(name, email, password)
        if(res.status === 200) {
            const token = await res.json()
            localStorage.setItem('token', token.accessToken)
            setIsLogged(true)
            const admin = getIsAdmin(token)
            setIsAdmin(admin)
            navigate('/MyDrive')
        } else {
            setIsLogged(false)
        }
    };

    const prefixSelector = (
        <Form.Item name="prefix" noStyle>
            <Select
                style={{
                    width: 70,
                }}
            >
                <Option value="33">+33</Option>
                <Option value="39">+39</Option>
            </Select>
        </Form.Item>
    );

    return (
        <Form
            {...formItemLayout}
            form={form}
            name="register"
            onFinish={onFinish}
            initialValues={{
                residence: ['Lyon', 'Paris', 'Marseille'],
                prefix: '33',
            }}
            scrollToFirstError
        >
            <Form.Item
                name="username"
                label="Username"
                tooltip="Username is unique"
                onChange={e => setName(e.target.value)}
                rules={[
                    {
                        required: true,
                        message: 'Please input your username!',
                        whitespace: true,
                    },
                ]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                name="email"
                label="E-mail"
                onChange={e => setEmail(e.target.value)}
                rules={[
                    {
                        type: 'email',
                        message: 'The input is not valid E-mail!',
                    },
                    {
                        required: true,
                        message: 'Please input your E-mail!',
                    },
                ]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                name="password"
                label="Password"
                onChange={e => setPassword(e.target.value)}
                rules={[
                    {
                        required: true,
                        message: 'Please input your password!',
                    },
                ]}
                hasFeedback
            >
                <Input.Password />
            </Form.Item>

            <Form.Item
                name="confirm"
                label="Confirm Password"
                dependencies={['password']}
                hasFeedback
                rules={[
                    {
                        required: true,
                        message: 'Please confirm your password!',
                    },
                    ({ getFieldValue }) => ({
                        validator(_, value) {
                            if (!value || getFieldValue('password') === value) {
                                return Promise.resolve();
                            }

                            return Promise.reject(new Error('The two passwords that you entered do not match!'));
                        },
                    }),
                ]}
            >
                <Input.Password />
            </Form.Item>

            <Form.Item
                name="phone"
                label="Phone Number"
                onChange={e => setPhoneNumber(e.target.value)}
                rules={[
                    {
                        required: true,
                        message: 'Please input your phone number!',
                    },
                ]}
            >
                <Input
                    addonBefore={prefixSelector}
                    style={{
                        width: '100%',
                    }}
                />
            </Form.Item>


            <Form.Item
                name="intro"
                label="Intro"
            >
                <Input.TextArea showCount maxLength={100} />
            </Form.Item>

            <Form.Item
                name="gender"
                label="Gender"
                onChange={e => setGender(e.target.value)}
            >
                <Select placeholder="select your gender">
                    <Option value="male">Male</Option>
                    <Option value="female">Female</Option>
                </Select>
            </Form.Item>
            <Form.Item
                name="agreement"
                valuePropName="checked"
                rules={[
                    {
                        validator: (_, value) =>
                            value ? Promise.resolve() : Promise.reject(new Error('Should accept agreement')),
                    },
                ]}
                {...tailFormItemLayout}
            >
                <Checkbox>
                    I have read the <a href="#">agreement</a>
                </Checkbox>
            </Form.Item>
            <Form.Item {...tailFormItemLayout}>
                <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                    <Col  className="gutter-row" span={10}>
                        <Button type="primary" htmlType="submit">
                            Register
                        </Button>
                    </Col>
                    <Col  className="gutter-row" span={12}>
                        <Link to="/signin">Sign in instead </Link>
                    </Col>
                </Row>

                
            </Form.Item>
        </Form>
    );
};

export default App;