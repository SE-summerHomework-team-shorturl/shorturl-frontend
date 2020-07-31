import React from 'react';
import {Layout, Input,Typography} from 'antd';
import {addShortUrl} from "../Service/UrlService";
import Topbar from "../Components/Topbar";
import {history} from "../history";
const {Header, Content, } = Layout;
const {Search} = Input;
const {Link} = Typography;
class UserUrlView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {shortenedUrl:""};
    }

    componentDidMount(){
        if(sessionStorage.getItem("isLogin")!=1)
        {
            history.push("/");
        }
    }

    urlInput = (value) =>{
        const callback = (data) => {
            console.log(data);
            this.setState({shortenedUrl:data});
        }
        addShortUrl(value,callback);
    }

    render() {
        return (
            <div className="container">
                <Layout className="layout">
                    <Header>
                        <Topbar select="1"/>
                    </Header>
                    <Content style={{padding: '25px'}}>
                        <Layout style={{minHeight:600}}>
                            <Content>
                                <Search
                                    placeholder="在此处输入URL"
                                    enterButton="缩短URL"
                                    onSearch={this.urlInput}
                                    style={{marginLeft:'15%',marginRight:'15%',width:'70%'}}
                                />
                                <Link href={this.state.shortenedUrl}  target="_blank" style={{marginLeft:'15%',marginRight:'15%',width:'70%'}}>
                                    {this.state.shortenedUrl}
                                </Link >

                            </Content>
                        </Layout>
                    </Content>
                </Layout>
            </div>
        )
    }
}

export default UserUrlView
