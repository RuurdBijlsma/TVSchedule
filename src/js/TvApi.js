import ProxyApi from './ProxyApi';

export default class TvApi extends ProxyApi{
    constructor() {
        super("https://api.thetvdb.com/");

        let userKey = "1DC2F94979076394";
        let userName = "rutenl";
        let apiKey = "1ADD2E514EEF77D1";

        this.getToken(userKey, userName, apiKey).then(token => {
            this.token = token;
            console.log(token);
            this.fire('token');
        });
    }

    async getToken(userKey, userName, apiKey) {
        return await this.post({
            userKey, userName, apiKey
        }, 'login');
    }
}