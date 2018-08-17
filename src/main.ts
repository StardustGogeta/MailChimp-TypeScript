import {Campaigns} from "./Campaigns";
import * as request from "request";

////request.get("https://example.com", a => {console.log(a)});

class MailChimp {
    private API_KEY : string = "";
    private REGION : string = "";
    private BASE_URL : string = "";

    constructor(key? : string) {
        if (key) {
            this.API_KEY = key;
            this.REGION = key.split("-")[1];
            this.BASE_URL = "https://" + this.REGION + ".api.mailchimp.com/3.0/";
        }
    }

    public setAPIKey(key : string) {
        this.API_KEY = key;
    }

    private apiCall(urlExtension : string, opts?) {
        // console.log(this.BASE_URL+urlExtension);
        request.get(this.BASE_URL+urlExtension, (req, res) => {
            console.log(res.body);
        });
    }

    public campaigns = new Campaigns(this);
}

//console.log(new MailChimp());
var m = new MailChimp();
m.campaigns.actions.cancel("dir");
////console.log(m.campaigns.actions.cancel("dir"));

