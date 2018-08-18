import { MailChimp } from "../src/main";
// import { userConfig } from "../config";

let userConfig = {"key" : "52514a77baa6f05051215e0955e4128a-us18"};

// userConfig.key is the MailChimp API key, in the form XXXXXXXXXXXX-XXXX

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

m.campaigns.all((data) => {
    let campaignList = data['campaigns'];
    console.log(campaignList.length);
}, {"count" : "3"});

test("basic", () => {
    expect(1).toBe(1);
});