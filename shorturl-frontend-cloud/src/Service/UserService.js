import {postRequest_Data, postRequest_Json, postRequest_Auth, getRequest} from "./Ajax";
import {history} from "../history";
import {message} from "antd";
import {backendUrl} from "./UrlConfig";
import Base64 from 'base-64';
import cookie from 'react-cookies';
import jwt_decode from "jwt-decode";

export const userRegister = (json) => {
    const url = backendUrl + `/user/register`;
    const callback = (msg) => {
        if (msg.status == "DUP_USERNAME") {
            message.error("该用户名已存在");
        } else if (msg.status == "SUCCESS") {
            history.push("/");
            message.success("注册成功");
        } else {
            message.error("注册失败");
        }
    };
    postRequest_Json(url, json, callback);
};

export const getUsers = (data, callback) => {
    const url = backendUrl + `/getUsers`;
    postRequest_Data(url, data, callback);
}

export const userLogin = (username, password, remember, then) => {
    const auth = "Basic " + Base64.encode(("client-id:client-secret"));
    const callback = (msg) => {
        if (msg.hasOwnProperty("access_token")) {
            console.log(msg);
            sessionStorage.setItem("token", msg.access_token);
            let auth = jwt_decode(msg.access_token).authorities;
            if (auth == null) {
                console.log("No auth");
                sessionStorage.setItem("auth", 0);
            }
            else{
                console.log(auth);
                sessionStorage.setItem("auth", 1);
            }
            sessionStorage.setItem("isLogin", 1);
            message.success("登陆成功");
            if (remember == true) {
                cookie.save("remember", 1, {path: "/"});
                cookie.save("username", username, {path: "/"});
                cookie.save("password", password, {path: "/"});
            }
            then(username, password, remember, auth);
        } else {
            message.error("登陆失败");
        }
    };
    const url = backendUrl + `/login?username=` + username + "&password=" + password;
    postRequest_Auth(url, auth, callback);
};

export const logout = () => {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("isLogin");
    sessionStorage.removeItem("auth");
    cookie.remove("username");
    cookie.remove("password");
    cookie.remove("remember");
    history.push("/");
}
