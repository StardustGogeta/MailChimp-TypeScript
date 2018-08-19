import { MailChimp } from "../src/main";
// import { userConfig } from "../config";

let userConfig = {"key" : "52514a77baa6f05051215e0955e4128a-us18"};

// userConfig.key is the MailChimp API key, in the form XXXXXXXXXXXX-XXXX

let m = new MailChimp(userConfig.key);

let m2 = new MailChimp();
m2.setAPIKey(userConfig.key);

test("campaigns", () => {
    m.campaigns.all((data) => {
        let ID = data['campaigns'][0]['id'];
        expect(ID.length).toBeGreaterThan(8);
    });
});

test("campaignByID", () => {
    m.campaigns.get("29fbf8137a", (data) => {
        expect(data['create_time'].length).toBeGreaterThan(5);
    });
});

test("campaignCount", () => {
    m.campaigns.all((data) => {
        expect(data['campaigns'].length).toBe(3);
    }, {"count" : "3"});
});
