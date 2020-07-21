import {postRequest_Data, postRequest_Json, postRequest_Auth,getRequest} from "./Ajax";
import {history} from "../history";
import {message} from "antd";
import {backendUrl} from "./UrlConfig";
import Base64  from 'base-64';
import cookie from 'react-cookies';

export const userRegister = (json) => {
    const url = backendUrl+`/user/register`;
    const callback = (msg) => {
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
    const auth = "Basic "+Base64.encode(("client:client-secret"));
    const callback = (msg) => {
        if(msg.hasOwnProperty("access_token")){
            console.log(msg.access_token);
            sessionStorage.setItem("userAuth",msg.access_token);
            sessionStorage.setItem("userData",msg.user);
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
    const url = backendUrl+`/login?username=`+username+"&password="+password;
    postRequest_Auth(url, auth, callback);
};

export const logout = () => {
    const callback = (msg) => {
        sessionStorage.removeItem("userAuth");
        sessionStorage.removeItem("isLogin");
        sessionStorage.removeItem("userData");
        cookie.remove("username");
        cookie.remove("password");
        cookie.remove("remember");
        history.push("/");
    }
    const url = backendUrl+`/logout?token=`+sessionStorage.getItem("userAuth");
    getRequest(url, callback);
}
