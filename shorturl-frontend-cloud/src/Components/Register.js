import React from 'react';
import {Form, Input,Button} from 'antd';
import {userRegister} from "../Service/UserService";

class Register extends React.Component {
    render() {
        const formItemLayout = {
            labelCol: {
                xs: {span: 24},
                sm: {span: 4},
            },
            wrapperCol: {
                xs: {span: 24},
                sm: {span: 20},
            },
        };
        const tailFormItemLayout = {
            wrapperCol: {
                xs: {
                    span: 24,
                    offset: 0,
                },
                sm: {
                    span: 12,
                    offset: 8,
                },
            },
        };
        const onFinish = (values) => {
            values.admin = false;
            console.log(values);
            userRegister(values, (data) => {
                console.log(data);
            })
        };
        return (
            <Form
                {...formItemLayout}
                name="register"
                onFinish={onFinish}
                scrollToFirstError
            >
                <Form.Item
                    name="email"
                    label="邮箱"
                    rules={[
                        {
                            type: 'email',
                            message: '这不是一个有效的邮箱地址！',
                        },
                        {
                            required: true,
                            message: '请输入邮箱！',
                        }
                    ]}
                >
                    <Input placeholder="请输入邮箱"/>
                </Form.Item>
                <Form.Item
                    name="username"
                    label="用户名"
                    rules={[
                        {
                            required: true, message: '请输入用户名!', whitespace: true
                        },
                        {
                            max: 14,
                            message: '用户名不能超过16位！'
                        }
                    ]
                    }
                >
                    <Input placeholder="请输入用户名"/>
                </Form.Item>

                <Form.Item
                    name="password"
                    label="密码"
                    rules={[
                        {
                            required: true,
                            message: '请输入密码！',
                        },
                        {
                            max: 16,
                            message: '密码不能超过16位！'
                        },
                        {
                            min: 6,
                            message: '密码不能低于6位！'
                        }

                    ]}
                    hasFeedback
                >
                    <Input.Password placeholder="请输入密码"/>
                </Form.Item>

                <Form.Item
                    name="confirm"
                    label="确认密码"
                    dependencies={['密码']}
                    hasFeedback
                    rules={[
                        {
                            required: true,
                            message: '请确认密码!',
                        },
                        ({getFieldValue}) => ({
                            validator(rule, value) {
                                if (!value || getFieldValue("password") === value) {
                                    return Promise.resolve();
                                }
                                return Promise.reject('两次输入的密码不一致!');
                            },
                        }),
                    ]}
                >
                    <Input.Password placeholder="请输入密码"/>
                </Form.Item>

                <Form.Item {...tailFormItemLayout}>
                    <Button type="primary" htmlType="submit">
                        注册
                    </Button>
                </Form.Item>
            </Form>
        );
    }
};

export default Register
