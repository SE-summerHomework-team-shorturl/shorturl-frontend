import React from 'react';
import {Layout,  Input} from 'antd';
import {findAllShortUrls} from "../Service/UrlService";
import UrlList from "../Components/UrlList";
import Topbar from "../Components/Topbar";
import {history} from "../history";
const {Header, Content} = Layout;


class UserManageView extends React.Component {
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
        findAllShortUrls(callback);
    }

    render() {
        return (
            <div className="container">
                <Layout className="layout">
                    <Header>
                        <Topbar select="2"></Topbar>
                    </Header>
                    <Content style={{padding: '25px'}}>
                        <Layout style={{minHeight:600}}>
                            <Content>
                                <UrlList data={this.state.data}></UrlList>
                            </Content>
                        </Layout>
                    </Content>
                </Layout>
            </div>
        )
    }
}

export default UserManageView
