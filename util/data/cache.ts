var cacheMap = new Map<string,CacheDataInfo>();
class CacheDataInfo{
    endTime!:Date;
    data:any;
}

export function addToCache(key:string,duration:number,data:any){
    if(data===null||data===undefined){
        return;
    }
    let info = new CacheDataInfo();
    let now = new Date();
    info.endTime = new Date(now.getTime()+duration*1000);
    info.data = data;
    cacheMap.set(key,info);
}

export function getFromCache(key:string):any{
    let info = cacheMap.get(key);
    if(info!==null&&info!==undefined){
        let now = new Date();
        if((now.getTime() - info.endTime.getTime())<=0){
            return info.data;
        }else{
            cacheMap.delete(key);
        }
    }
    return null;
}