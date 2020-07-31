import React from 'react';
import {Button, Col, Menu, Row} from 'antd';
import {logout} from "../Service/UserService";
import {Link} from "react-router-dom";

class Topbar extends React.Component{
    constructor(props) {
        super(props);
        console.log(props);
        console.log(sessionStorage.getItem("auth"));
        this.state = {
            select: props.select,
            admin: sessionStorage.getItem("auth")
        };
    }

    render(){
        return (
            <Row>
                <Col span={9}>
                    <Menu
                        theme="dark"
                        mode="horizontal"
                        selectedKeys={[this.state.select]}
                    >
                        <Menu.Item key={"1"} ><Link to='/url'>URL生成</Link ></Menu.Item>
                        <Menu.Item key={"2"} ><Link to='/url/manage'>URL管理</Link ></Menu.Item>
                        {this.state.admin==1?<Menu.Item key={"3"} ><Link to='/admin'>管理员功能</Link ></Menu.Item>:null}
                    </Menu>
                </Col>
                <Col span={2} push={13}>
                    <Button
                        type="primary"
                        onClick={logout}
                    >登出</Button>
                </Col>
            </Row>
        );
    };
}

export default Topbar
