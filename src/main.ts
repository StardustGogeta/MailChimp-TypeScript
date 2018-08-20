import {Campaigns} from "./Campaigns";
import * as request from "request";

export class MailChimp {
    private API_KEY : string = "";
    private REGION : string = "";
    private BASE_URL : string = "";
    private HEADERS : {} = {};

    constructor(key? : string) {
        if (key) this.setAPIKey(key);
    }

    public setAPIKey(key : string) {
        this.API_KEY = key;
        this.REGION = key.split("-")[1];
        this.BASE_URL = "https://" + this.REGION + ".api.mailchimp.com/3.0/";
        this.HEADERS = {headers: {"Authorization": "apikey " + this.API_KEY}};
    }

    private encodeQuery(dict : {}) {
        if (dict) return "?"+Object.keys(dict).map(function(key) {
            return [key, dict[key]].map(encodeURIComponent).join("=");
        }).join("&");
        return "";
    }

    // The following line works:
    // request.get("http://us17.api.mailchimp.com/3.0/campaigns?count=1", {headers: {"Authorization": "apikey XXXXXXXXXXX-us17"}},(req, res) => {console.log(JSON.parse(res.body).campaigns[0]);});
    public apiCall(type : string, urlExtension : string, callback? : ({}) => void | undefined, data? : {} | undefined) {
        if (callback === undefined) callback = a => {};
        let args = [this.BASE_URL + urlExtension + this.encodeQuery(data), this.HEADERS, (req, res) => { callback(JSON.parse(res.body)); }];
        switch (type) {
            case "GET":
                request.get(...args);
                break;
            case "POST":
                request.post(...args);
                break;
        }
    }

    public campaigns = new Campaigns(this);
}
