import {message} from "antd";
import {backendUrl} from "./UrlConfig";
import {getRequest_Auth} from "./Ajax";

export const adminFindAllShortUrls = (then) => {
    const auth = "Bearer "+sessionStorage.getItem("token");
    const callback = (msg) => {
        console.log(msg);
        if(msg.status=="SUCCESS") {
            then(msg.body);
        }
        else{
            message.error("读取失败");
        }
    };
    const url = backendUrl+`/admin/findurl`;
    getRequest_Auth(url, auth, callback);
};

export const adminFindAllUsers = (then) => {
    const auth = "Bearer "+sessionStorage.getItem("token");
    const callback = (msg) => {
        console.log(msg);
        if(msg.status=="SUCCESS") {
            then(msg.body);
        }
        else{
            message.error("读取失败");
        }
    };
    const url = backendUrl+`/admin/finduser`;
    getRequest_Auth(url, auth, callback);
};

export const adminDeletedeleteShortUrl = (id,then) => {
    const auth = "Bearer "+sessionStorage.getItem("token");
    const callback = (msg) => {
        console.log(msg);
        if(msg.status=="SUCCESS") {
            then(msg.body);
        }
        else{
            message.error("删除失败");
        }
    };
    const url = backendUrl+`/admin/deleteurl?id=`+id;
    getRequest_Auth(url, auth, callback);
};
