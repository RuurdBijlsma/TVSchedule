import EventEmitter from './EventEmitter';

export default class ProxyApi extends EventEmitter {
    constructor(url) {
        super();
        this.url = url;
    }

    async get(body, headers, ...params) {
        return await this.request('GET', body, headers, ...params);
    }

    async post(body, headers, ...params) {
        return await this.request('POST', body, headers, ...params);
    }

    async request(method, body, headers, ...params) {
        body = JSON.stringify(body);
        headers = JSON.stringify(headers);

        let url = this.url + params.join('/');

        let proxyUrl = "http://localhost:8181/requestProxy.php";

        if (method === "GET")
            url += "?" + Object.entries(JSON.parse(body)).map(e => [e[0], encodeURI(e[1])]).map(e => e.join('=')).join('&');

        let proxyBody = `url=${encodeURI(url)}&method=${encodeURI(method)}&body=${encodeURI(body)}&headers=${encodeURI(headers)}`;

        let options = {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded; charset=utf-8"
            },
            body: proxyBody
        };

        let response = await fetch(proxyUrl, options);
        let responseText = await response.text();

        try {
            return JSON.parse(responseText);
        } catch (e) {
            console.warn(e.message, responseText);
        }
    }
}