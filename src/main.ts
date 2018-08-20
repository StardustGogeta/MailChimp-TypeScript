import {Campaigns} from "./Campaigns";
import * as request from "request";

export class MailChimp {
    private API_KEY : string = "";
    private REGION : string = "";

    constructor(key? : string) {
        if (key) this.setAPIKey(key);
    }

    public setAPIKey(key : string) {
        this.API_KEY = key;
        this.REGION = key.split("-")[1];
    }

    private encodeQuery(dict : {}) {
        if (dict) return "?"+Object.keys(dict).map(function(key) {
            return [key, dict[key]].map(encodeURIComponent).join("=");
        }).join("&");
        return "";
    }

    // The following line works:
    // request.get("http://us17.api.mailchimp.com/3.0/campaigns?count=1", {headers: {"Authorization": "apikey XXXXXXXXXXX-us17"}},(req, res) => {console.log(JSON.parse(res.body).campaigns[0]);});
    public apiCall(method : string, urlExtension : string, callback? : ({}) => void | undefined, queryData? : {} | undefined, data? : {} | undefined) {
        if (callback === undefined) callback = a => {};
        if (data === undefined) data = {};
        request({
            url : "https://" + this.REGION + ".api.mailchimp.com/3.0/" + urlExtension + this.encodeQuery(queryData),
            method: method,
            json : data,
            headers : {"Authorization": "apikey " + this.API_KEY}
        }, (err, res, body) => { /*console.log("LOGGING", typeof body, urlExtension, method, data); if (method === "PATCH") console.log(body); */ callback(body); });
    }

    public campaigns = new Campaigns(this);
}
