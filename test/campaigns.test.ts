import { MailChimp } from "../src/main";
// import { userConfig } from "../config";

let userConfig = {"key" : parseInt("1100110100100010",2)+"a77baa6f05051215e0955e4128a-us18"};

// userConfig.key is the MailChimp API key, in the form XXXXXXXXXXXX-XXXX

let m = new MailChimp(userConfig.key);
// Alternatively, 
let m2 = new MailChimp();
m2.setAPIKey(userConfig.key);

test("campaignsCreateAndDelete", done => {
    m.campaigns.create((data) => {
        expect(data["settings"]["subject_line"]).toBe("Newly created!");
        m.campaigns.delete(data["id"], done);
    }, {
        "recipients": {"list_id": "f9240dceb6"},
        "settings": {"subject_line": "Newly created!", "from_name": "ME", "reply_to": "cyberbullyingdetection@gmail.com"},
        "type": "regular"
    });
});

test("campaignsCreateAndDeleteVariate", done => {
    m.campaigns.create((data) => {
        expect(data["settings"]["title"]).toBe("Newly created!");
        m.campaigns.delete(data["id"], done);
    }, {
        "recipients": {"list_id": "f9240dceb6"},
        "settings": {"subject_line": "Por favor", "title": "Newly created!", "from_name": "ME", "reply_to": "cyberbullyingdetection@gmail.com"},
        "variate_settings": {"winner_criteria": "opens"},
        "tracking": {"text_clicks": true},
        "type": "variate"
    });
});

test("campaignsCreateAndDeleteRSS", done => {
    m.campaigns.create((data) => {
        expect(data["settings"]["subject_line"]).toBe("Newly created!");
        m.campaigns.delete(data["id"], done);
    }, {
        "recipients": {"list_id": "f9240dceb6"},
        "settings": {"subject_line": "Newly created!", "from_name": "ME", "reply_to": "cyberbullyingdetection@gmail.com"},
        "rss_opts": {"feed_url": "http://www.aweber.com/blog/feed/", "frequency": "weekly"},
        "type": "rss"
    });
});

test("campaignsCreateInvalidType", () => {
    expect(() => m.campaigns.create((_) => { }, {
        "recipients": {"list_id": "f9240dceb6"},
        "settings": {"subject_line": "Fail!", "from_name": "ME", "reply_to": "email_here@com.com"},
        "type": "badbadbad"
    })).toThrowError("Invalid campaign type.");
});

test("campaignsCreateVariateNoVariateSettings", () => {
    expect(() => m.campaigns.create((_) => { }, {
        "recipients": {"list_id": "f9240dceb6"},
        "settings": {"subject_line": "Por favor", "title": "Newly created!", "from_name": "ME", "reply_to": "cyberbullyingdetection@gmail.com"},
        "tracking": {"text_clicks": true},
        "type": "variate"
    })).toThrowError("No variate settings.");
});

test("campaignsCreateVariateNoWinnerCriteria", () => {
    expect(() => m.campaigns.create((_) => { }, {
        "recipients": {"list_id": "f9240dceb6"},
        "settings": {"subject_line": "Por favor", "title": "Newly created!", "from_name": "ME", "reply_to": "cyberbullyingdetection@gmail.com"},
        "variate_settings": {"dummy": "nothing"},
        "tracking": {"text_clicks": true},
        "type": "variate"
    })).toThrowError("No winner criteria.");
});

test("campaignsCreateVariateInvalidWinnerCriteria", () => {
    expect(() => m.campaigns.create((_) => { }, {
        "recipients": {"list_id": "f9240dceb6"},
        "settings": {"subject_line": "Por favor", "title": "Newly created!", "from_name": "ME", "reply_to": "cyberbullyingdetection@gmail.com"},
        "variate_settings": {"winner_criteria": "nothing"},
        "tracking": {"text_clicks": true},
        "type": "variate"
    })).toThrowError("Invalid winner criteria.");
});

test("campaignsCreateVariateNoTracking", () => {
    expect(() => m.campaigns.create((_) => { }, {
        "recipients": {"list_id": "f9240dceb6"},
        "settings": {"subject_line": "Por favor", "title": "Newly created!", "from_name": "ME", "reply_to": "cyberbullyingdetection@gmail.com"},
        "variate_settings": {"winner_criteria": "opens"},
        "type": "variate"
    })).toThrowError("No tracking.");
});

test("campaignsCreateVariateNoTextClickTracking", () => {
    expect(() => m.campaigns.create((_) => { }, {
        "recipients": {"list_id": "f9240dceb6"},
        "settings": {"subject_line": "Por favor", "title": "Newly created!", "from_name": "ME", "reply_to": "cyberbullyingdetection@gmail.com"},
        "variate_settings": {"winner_criteria": "opens"},
        "tracking": {"nothing": "bad"},
        "type": "variate"
    })).toThrowError("No text-click tracking.");
});

test("campaignsCreateRSSNoOptions", () => {
    expect(() => m.campaigns.create((_) => { }, {
        "recipients": {"list_id": "f9240dceb6"},
        "settings": {"subject_line": "Newly created!", "from_name": "ME", "reply_to": "cyberbullyingdetection@gmail.com"},
        "type": "rss"
    })).toThrowError("No RSS options.");
});

test("campaignsCreateRSSNoFeedURL", () => {
    expect(() => m.campaigns.create((_) => { }, {
        "recipients": {"list_id": "f9240dceb6"},
        "settings": {"subject_line": "Newly created!", "from_name": "ME", "reply_to": "cyberbullyingdetection@gmail.com"},
        "rss_opts": {"frequency": "weekly"},
        "type": "rss"
    })).toThrowError("No RSS feed URL.");
});

test("campaignsCreateRSSNoFrequency", () => {
    expect(() => m.campaigns.create((_) => { }, {
        "recipients": {"list_id": "f9240dceb6"},
        "settings": {"subject_line": "Newly created!", "from_name": "ME", "reply_to": "cyberbullyingdetection@gmail.com"},
        "rss_opts": {"feed_url": "http://www.aweber.com/blog/feed/"},
        "type": "rss"
    })).toThrowError("No RSS frequency.");
});

test("campaignsCreateRSSInvalidFrequency", () => {
    expect(() => m.campaigns.create((_) => { }, {
        "recipients": {"list_id": "f9240dceb6"},
        "settings": {"subject_line": "Newly created!", "from_name": "ME", "reply_to": "cyberbullyingdetection@gmail.com"},
        "rss_opts": {"feed_url": "http://www.aweber.com/blog/feed/", "frequency": "by_the_numbers"},
        "type": "rss"
    })).toThrowError("Invalid RSS frequency.");
});

test("campaignsAll", done => {
    m.campaigns.all((data) => {
        let firstID : string = data['campaigns'][5]['id'];
        expect(firstID.length).toBe(10);
        done();
    });
});

test("campaignsAllNoCallback", () => {
    expect(m.campaigns.all()).toBe("API call successfully made.");
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
