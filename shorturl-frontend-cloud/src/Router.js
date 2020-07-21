import React from 'react';
import { Router, Route, Link, Redirect} from 'react-router-dom';
import LoginView from "./View/LoginView";
import UserUrlView from "./View/UserUrlView";
import RegisterView from "./View/RegisterView";
import UserManageView from "./View/UserManageView";
import AdminView from "./View/AdminView";
import {history} from "./history";
import cookie from "react-cookies";
import Base64 from "base-64";
class BasicRoute extends React.Component{

    constructor(props) {
        super(props);
    }

    componentDidMount(){
        if(sessionStorage.getItem("isLogin")==1)
        {
            return;
        }
        else if(cookie.load("remember")==1)
        {
            let username = cookie.load("username");
            let password = cookie.load("password");
            const auth = Base64.encode((username+':'+password));
            sessionStorage.setItem("userAuth",auth);
            sessionStorage.setItem("isLogin",1);
            history.push("/url");
        }
    }

    render(){
        return(
            <Router history={history}>
                <Route exact path="/" component={LoginView} />
                <Route exact path="/url" component={UserUrlView} />
                <Route exact path="/reg" component={RegisterView} />
                <Route exact path="/url/manage" component={UserManageView} />
                <Route exact path="/admin" component={AdminView} />
            </Router>
        )
    }


}

export default BasicRoute;
