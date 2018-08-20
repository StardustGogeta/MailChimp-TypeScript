export class Campaigns {
    private client;
    public actions : Actions;

    constructor(client) {
        this.client = client;
        this.actions = new Actions(this.client);
    }

    public all(cb? : ({}) => void, data? : {}) {
        this.client.apiCall("GET", "campaigns", cb, data);
    }

    /*
    public create(cb? : ({}) => void, data? : {}) {
        this.client.apiCall("POST", "campaigns", cb, data);
    }
    */

    public get(id : string, cb? : ({}) => void, data? : {}) {
        this.client.apiCall("GET", "campaigns/" + id, cb, data);
    }
}

class Actions {
    private client;

    constructor(client) {
        this.client = client;
    }

    /*
    public cancel(id) {
        console.log(this.client);
        console.log(this.client.REGION);
        this.client.apiCall("https://example.com");
    }
    */
}
