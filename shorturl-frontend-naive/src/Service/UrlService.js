import Base64 from "base-64";
import {history} from "../history";
import {message} from "antd";
import {backendUrl} from "./UrlConfig";
import {getRequest_Auth} from "./Ajax";

export const addShortUrl = (longUrl,then) => {
    const auth = sessionStorage.getItem("userAuth");
    const callback = (msg) => {
        if(msg.status=="SUCCESS") {
            message.success("添加成功");
            then(backendUrl+`/r/`+msg.body.token);
        }
        else{
            message.error("添加失败");
        }
    };
    const url = backendUrl+`/shorturl/add-to-my-shorturls?url=`+longUrl;
    getRequest_Auth(url, auth, callback);
};

export const findAllShortUrls = (then) => {
    const auth = sessionStorage.getItem("userAuth");
    const callback = (msg) => {
        if(msg.status=="SUCCESS") {
            then(msg.body);
        }
        else{
            message.error("读取失败");
        }
    };
    const url = backendUrl+`/shorturl/find-all-my-shorturls`;
    getRequest_Auth(url, auth, callback);
};

export const deleteShortUrl = (id,then) => {
    const auth = sessionStorage.getItem("userAuth");
    const callback = (msg) => {
        if(msg.status=="SUCCESS") {
            message.success("删除成功");
            then(msg.body);
        }
        else{
            message.error("删除失败");
        }
    };
    const url = backendUrl+`/shorturl/delete-my-shorturl-by-id?id=`+id;
    getRequest_Auth(url, auth, callback);
};

