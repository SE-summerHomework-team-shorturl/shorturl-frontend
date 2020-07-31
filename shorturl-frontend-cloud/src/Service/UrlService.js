import Base64 from "base-64";
import {history} from "../history";
import {message} from "antd";
import {backendUrl} from "./UrlConfig";
import {getRequest_Auth} from "./Ajax";

export const addShortUrl = (longUrl,then) => {
    const auth = "Bearer "+sessionStorage.getItem("token");
    const callback = (msg) => {
        console.log(msg);
        if(msg.status=="SUCCESS") {
            message.success("添加成功");
            then(backendUrl+`/r/`+msg.body.token);
        }
        else{
            message.error("添加失败");
        }
    };
    const url = backendUrl+`/urlmanage/addurl?url=`+longUrl;
    getRequest_Auth(url, auth, callback);
};

export const findAllShortUrls = (then) => {
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
    const url = backendUrl+`/urlmanage/findurl`;
    getRequest_Auth(url, auth, callback);
};

export const deleteShortUrl = (id,then) => {
    const auth = "Bearer "+sessionStorage.getItem("token");
    const callback = (msg) => {
        if(msg.status=="SUCCESS") {
            message.success("删除成功");
            then(msg.body);
        }
        else{
            message.error("删除失败");
        }
    };
    const url = backendUrl+`/urlmanage/deleteurl?id=`+id;
    getRequest_Auth(url, auth, callback);
};

