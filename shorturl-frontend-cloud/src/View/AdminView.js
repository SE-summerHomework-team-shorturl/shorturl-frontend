import React from 'react';
import {Layout,  Input} from 'antd';
import {adminFindAllShortUrls} from "../Service/AdminService";
import Topbar from "../Components/Topbar";
import {history} from "../history";
import UrlEditTable from "../Components/UrlEditTable";
const {Header, Content} = Layout;


class AdminView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {data:[]};
    }

    componentDidMount(){
        if(sessionStorage.getItem("isLogin")!=1)
        {
            history.push("/");
        }
        const callback =  (data) => {
            this.setState({data:data});
            console.log(data);
        };
        adminFindAllShortUrls(callback);
    }

    render() {
        return (
            <div className="container">
                <Layout className="layout">
                    <Header>
                        <Topbar select="3"></Topbar>
                    </Header>
                    <Content style={{padding: '25px'}}>
                        <Layout style={{minHeight:600}}>
                            <Content>
                                <UrlEditTable data={this.state.data}></UrlEditTable>
                            </Content>
                        </Layout>
                    </Content>
                </Layout>
            </div>
        )
    }
}

export default AdminView
