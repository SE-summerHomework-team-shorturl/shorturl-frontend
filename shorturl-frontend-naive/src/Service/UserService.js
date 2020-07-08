import {postRequest_Data,postRequest_Json,getRequest_Auth} from "./Ajax";
import {history} from "../history";
import {message} from "antd";
import {backendUrl} from "./UrlConfig";
import Base64  from 'base-64';
import cookie from 'react-cookies';

export const userRegister = (json) => {
    const url = backendUrl+`/user/register`;
    const callback = (msg) => {
        console.log(msg);
        if(msg.status == "DUP_USERNAME" ) {
            message.error("该用户名已存在");
        }
        else if(msg.status == "SUCCESS" ){
            history.push("/");
            message.success("注册成功");
        }
        else{
            message.error("注册失败");
        }
    };
    postRequest_Json(url, json, callback);
};

export const getUsers = (data,callback) => {
    const url = backendUrl+`/getUsers`;
    postRequest_Data(url, data, callback);
}

export const userLogin = (username,password,remember,then) => {
    const auth = Base64.encode((username+':'+password));
    const callback = (msg) => {
        if(msg.status=="SUCCESS") {
            sessionStorage.setItem("userAuth",auth);
            sessionStorage.setItem("isLogin",1);
            message.success("登陆成功");
            if(remember==true)
            {
                cookie.save("remember",1,{path:"/"});
                cookie.save("username",username,{path:"/"});
                cookie.save("password",password,{path:"/"});
            }
            then(username,password,remember,auth);
        }
        else{
            message.error("登陆失败");
        }
    };
    const url = backendUrl+`/login`;
    getRequest_Auth(url, auth, callback);
};

export const logout = () => {
    sessionStorage.removeItem("userAuth");
    sessionStorage.removeItem("isLogin");
    cookie.remove("username");
    cookie.remove("password");
    cookie.remove("remember");
    history.push("/");
}
