import React, {Component} from 'react';
import Login from "../Components/Login";

class LoginView extends React.Component{

    render() {
        return (
            <div className="background" style={{paddingLeft:'30%',paddingRight:'30%',paddingTop:'15%'}}>
                <Login ></Login>
            </div>
        );
    }

}

export default LoginView
