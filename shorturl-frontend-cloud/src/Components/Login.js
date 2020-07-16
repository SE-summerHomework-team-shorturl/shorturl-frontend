import React from 'react';
import { Form, Input, Button, Checkbox} from 'antd';
import { UserOutlined,LockOutlined} from '@ant-design/icons';
import {userLogin} from "../Service/UserService";
import {history} from "../history";

class Login extends React.Component{
    render(){
        const onFinish = values => {
            const callback = () =>{
                history.push("/url");
            }
            userLogin(values.username,values.password,values.remember,callback);
        };
        const onFinishFailed = errorInfo => {
            console.log('Failed:', errorInfo);
        };
        return (
            <Form
                name="normal_login"
                className="login-form"
                initialValues={{ remember: true }}
                onFinish={onFinish}
            >
                <Form.Item
                    name="username"
                    rules={[{ required: true, message: '请输入用户名!' }]}
                >
                    <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="用户名" />
                </Form.Item>
                <Form.Item
                    name="password"
                    rules={[{ required: true, message: '请输入密码！' }]}
                >
                    <Input
                        prefix={<LockOutlined className="site-form-item-icon" />}
                        type="password"
                        placeholder="密码"
                    />
                </Form.Item>
                <Form.Item>
                    <Form.Item name="remember" valuePropName="checked" noStyle>
                        <Checkbox>记住密码</Checkbox>
                    </Form.Item>
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit" className="login-form-button">
                        登录
                    </Button>
                    或者 <a href="/reg">现在注册</a>
                </Form.Item>
            </Form>
        );
    };
}

export default Login
