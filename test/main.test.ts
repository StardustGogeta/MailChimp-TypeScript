import { MailChimp } from "../src/main";
import { userConfig } from "../config";

let m = new MailChimp(userConfig.key);

let m2 = new MailChimp();
m2.setAPIKey(userConfig.key);

m.campaigns.all((data) => {
    let ID = data['campaigns'][0]['id'];
    console.log(ID);
    m.campaigns.get(ID, (data) => {
        console.log(data['create_time']);
    });
});
