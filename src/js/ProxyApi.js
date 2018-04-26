import EventEmitter from './EventEmitter';

export default class ProxyApi extends EventEmitter{
    constructor(url){
        super();
        this.url = url;
    }

    async get(body, ...params) {
        return await this.request('GET', body, ...params);
    }

    async post(body, ...params) {
        return await this.request('POST', body, ...params);
    }

    async request(method, body, ...params) {
        if (typeof body !== "string")
            body = JSON.stringify(body);

        let url = this.url + params.join('/');

        let proxyUrl = "./requestProxy.php";
        let proxyBody = `url=${encodeURI(url)}&method=${encodeURI(method)}&body=${encodeURI(body)}`;

        let response = await fetch("./requestProxy.php", {
            method: "POST", body: proxyBody,
            headers: {
                "Content-Type": "application/x-www-form-urlencoded; charset=utf-8"
            }
        });
        let responseText = await response.text();

        try {
            return JSON.parse(responseText);
        } catch (e) {
            console.warn(e.message, responseText);
        }
    }
}