import { MailChimp } from "../src/main";
// import { userConfig } from "../config";

let userConfig = {"key" : parseInt("1100110100100010",2)+"a77baa6f05051215e0955e4128a-us18"};

// userConfig.key is the MailChimp API key, in the form XXXXXXXXXXXX-XXXX

let m = new MailChimp(userConfig.key);

let m2 = new MailChimp();
m2.setAPIKey(userConfig.key);

test("campaignsAll", done => {
    m.campaigns.all((data) => {
        let firstID : string = data['campaigns'][0]['id'];
        expect(firstID.length).toBe(10);
        done();
    });
});

test("campaignsAllData", done => {
    m.campaigns.all((data) => {
        expect(data['campaigns'].length).toBe(3);
        done();
    }, {"count" : "3"});
});

/*
test("campaignsCreate", done => {
    m.campaigns.create((data) => {
        console.log(data);
        expect(data['campaigns'].length).toBe(3);
        done();
    }, {"type" : "regular"});
});
*/

test("campaignsGet", done => {
    m.campaigns.get("29fbf8137a", (data) => {
        expect(data['create_time'].length).toBe(25);
        done();
    });
});
