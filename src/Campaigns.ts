//import * as request from "request";

export class Campaigns {
    private client;
    public actions : Actions;

    constructor(client) {
        this.client = client;
        this.actions = new Actions(this.client);
    }
}

class Actions {
    private client;

    constructor(client) {
        this.client = client;
    }

    public cancel(id) {
        console.log(this.client);
        console.log(this.client.REGION);
        this.client.apiCall("https://example.com");
    }
}