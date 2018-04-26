import ProxyApi from './ProxyApi';

export default class TvApi extends ProxyApi {
    constructor() {
        super("https://api.thetvdb.com/");

        this.language = 'en';

        let userKey = "1DC2F94979076394";
        let userName = "rutenl";
        let apiKey = "1ADD2E514EEF77D1";

        this.getToken(userKey, userName, apiKey).then(token => {
            this.token = token.token;
            this.fire('token');
        });
    }

    async request(method, body, ...params) {
        let headers = [
            'Accept: application/json',
            'Content-Type: application/json',
            'Accept-Language: ' + this.language,
        ];
        if (this.token)
            headers.push('Authorization: Bearer ' + this.token);
        return await super.request(method, body, headers, ...params);
    }

    async get(body, ...params) {
        return await this.request("GET", body, ...params);
    }

    async getToken(userKey, userName, apiKey) {
        return await this.post({
            userKey, userName, apiKey
        }, 'login');
    }

    async search(query) {
        return await this.get({
            name: query
        }, 'search', 'series');
    }
}