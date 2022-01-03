
var events: Map<string,Function>;

export function EventDispatch(event:string, data:any) {
    if(!data||isNaN(data)){
        let dataType = typeof(data);
        if(dataType==="number"){
            data = 0;
        }else if(dataType==="string"){
            data = "";
        }else {
            data = undefined;
        }
    }
    events.forEach((callback:Function,key:string)=>{
        if(key.endsWith("_"+event)){
            if(callback){
                callback(data);
            }
        }
    })
}

export function EventSubscribe(event:string, callback:Function,target:string) {
    if(!events){
        events = new Map<string,Function>();
    }
    events.set(target+"_"+event,callback);
}