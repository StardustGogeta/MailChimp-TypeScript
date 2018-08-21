export class Campaigns {
    private client;
    public actions : Actions;

    constructor(client) {
        this.client = client;
        this.actions = new Actions(this.client);
    }

    public create(callback? : ({}) => void,
        data? : { // * The following parameters are required:
            recipients : {
                list_id : string,
                [_ : string] : string
            },
            settings : {
                subject_line : string, // TODO: Handle this more carefully. Variate campaigns don't need it if they have "subject_lines".
                from_name : string,
                reply_to : string,
                [_ : string] : string
            },
            type : string,
            [_ : string] : any
    }) {
        if (!["regular", "plaintext", "rss", "variate", "abspilt"].includes(data.type))
            throw new Error("Invalid campaign type.");
        if (data.type === "variate") {
            if (data.hasOwnProperty("variate_settings")) {
                if (data.variate_settings.hasOwnProperty("winner_criteria")) {
                    if (!["opens", "clicks", "total_revenue", "manual"].includes(data.variate_settings.winner_criteria))
                        throw new Error("Invalid winner criteria.");
                } else throw new Error("No winner criteria.");
            } else throw new Error("No variate settings.");
            if (data.hasOwnProperty("tracking")) {
                if (!data.tracking.hasOwnProperty("text_clicks"))
                    throw new Error("No text-click tracking.");
            } else throw new Error("No tracking.");
        } else if (data.type === "rss") {
            if (data.hasOwnProperty("rss_opts")) {
                if (!data.rss_opts.hasOwnProperty("feed_url"))
                    throw new Error("No RSS feed URL.");
                if (data.rss_opts.hasOwnProperty("frequency")) {
                    if (!["daily", "weekly", "monthly"].includes(data.rss_opts.frequency))
                        throw new Error("Invalid RSS frequency.");
                } else throw new Error("No RSS frequency.");
            } else throw new Error("No RSS options.");
        }
        return this.client.api("POST", "campaigns", callback, {}, data);
    }

    public all(callback? : ({}) => void, queryData? : {}) {
        return this.client.api("GET", "campaigns", callback, queryData);
    }

    public get(id : string, callback? : ({}) => void, queryData? : {}) {
        return this.client.api("GET", "campaigns/" + id, callback, queryData);
    }

    public update(id : string, callback? : ({}) => void,
        data? : { // * The following parameters are required:
            settings : {
                subject_line : string, 
                from_name : string,
                reply_to : string,
                [_ : string] : string
            },
            [_ : string] : any
        }) {
        return this.client.api("PATCH", "campaigns/" + id, callback, {}, data);
    }

    public delete(id: string, callback? : ({}) => void) {
        return this.client.api("DELETE", "campaigns/" + id, callback);
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
        return this.client.api("https://example.com");
    }
    */
}
