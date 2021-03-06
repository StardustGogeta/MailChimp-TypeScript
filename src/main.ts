import {Campaigns} from "./campaigns";
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
    public api(method : string, urlExtension : string, callback? : ({}) => void, queryData? : {}, data? : {}) {
        if (callback === undefined) callback = a => {};
        if (data === undefined) data = {};
        request({
            url : "https://" + this.REGION + ".api.mailchimp.com/3.0/" + urlExtension + this.encodeQuery(queryData),
            method: method,
            json : data,
            headers : {"Authorization": "apikey " + this.API_KEY}
        }, (err, res, body) => { callback(body); });
        return "API call successfully made.";
    }

    public campaigns = new Campaigns(this);
}
