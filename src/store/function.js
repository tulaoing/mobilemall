const sessionEvent = function (item) {
    this.get = function(){
        if(sessionStorage.getItem(item)){
            console.log('ok');
            return JSON.parse(sessionStorage.getItem(item));
        }else{
            return;
        }
    }
    this.set = function(obj){
        console.log(obj);
        sessionStorage.setItem(item, JSON.stringify(obj));
    }
    this.clear = function(){
        sessionStorage.removeItem(item);
    }
}

export const login = new sessionEvent('loginstate');