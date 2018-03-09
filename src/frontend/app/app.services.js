export class CommonServices {
     
    constructor($http) {
        this.$http = $http;
    }
		
    getRequest(url, cb) {
        return this.$http.get(url)
            .then( (success) => {
                cb(false, success.data);
            }, (failed) => {
                console.log(failed);
                cb(true, failed.status + ': ' + failed.data + ' - ' + failed.statusText);
            });
    }
};

export default CommonServices;