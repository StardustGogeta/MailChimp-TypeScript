import { MailChimp } from "../src/main";
// import { userConfig } from "../config";

let userConfig = {"key" : parseInt("1100110100100010",2)+"a77baa6f05051215e0955e4128a-us18"};

// userConfig.key is the MailChimp API key, in the form XXXXXXXXXXXX-XXXX

let m = new MailChimp(userConfig.key);
/* Alternatively, 
let m = new MailChimp();
m.setAPIKey(userConfig.key);
*/

test("campaignsCreateAndDelete", done => {
    m.campaigns.create((data) => {
        expect(data["settings"]["subject_line"]).toBe("Newly created!");
        m.campaigns.delete(data["id"], done);
    }, {
        "recipients": {"list_id": "f9240dceb6"},
        "settings": {"subject_line": "Newly created!", "from_name": "ME", "reply_to": "cyberbullyingdetection@gmail.com"},
        "type" : "regular"
    });
});

test("campaignsAll", done => {
    m.campaigns.all((data) => {
        let firstID : string = data['campaigns'][5]['id'];
        expect(firstID.length).toBe(10);
        done();
    });
});

test("campaignsAllData", done => {
    m.campaigns.all((data) => {
        expect(data['campaigns'].length).toBe(3);
        done();
    }, {count : 3});
});

test("campaignsGet", done => {
    m.campaigns.get("3c2dd5a6a8", (data) => {
        expect(data['create_time'].length).toBe(25);
        done();
    });
});

// A sample list ID is f9240dceb6
test("campaignsUpdate", done => {
    let title = Math.floor(Math.random()*10**10).toString();
    m.campaigns.update("3c2dd5a6a8", (data) => {
        expect(data['settings']['subject_line']).toBe(title);
        done();
    }, {
        "recipients": {"list_id": "f9240dceb6"},
        "settings": {"subject_line": title, "from_name": "ME", "reply_to": "cyberbullyingdetection@gmail.com"}
    });
});
