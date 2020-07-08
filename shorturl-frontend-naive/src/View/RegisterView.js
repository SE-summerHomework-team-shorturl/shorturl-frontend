import React, {Component} from 'react';
import Register from "../Components/Register";

class RegisterView extends React.Component{
    render() {
        return (
            <div className="background" style={{paddingLeft:'30%',paddingRight:'30%',paddingTop:'15%'}}>
                <Register ></Register>
            </div>
        );
    }

}

export default RegisterView
