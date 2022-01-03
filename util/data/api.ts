import axios, { CancelTokenSource } from "axios";
import { apiBaseUrl, pngBaseUrl, apiCommunity } from "../../components/Common";
import { shortAddress } from "../utils";

// TEST API
export async function getAllPaths(): Promise<any> {
    let url = apiCommunity + 'addressList';

    let resp = await axios.get(url) as any;
    if (resp && resp.data.code === 1) {
        return resp.data.data;
    }
    return null
}

// TEST API
export async function debugOpenSeaAPI2(address: string): Promise<any> {
    let url = 'https://api.opensea.io/api/v1/events';
    url += "?account_address=" + address;

    let resp = await axios.get(url) as any;
    console.info('retrievingEvents = ', resp)
    // if (resp && resp.data.code === 1) {
    //     return resp.data.data;
    // }
    // return null
}

// TEST API
export async function debugOpenSeaAPI(address: string): Promise<any> {
    // let url = 'https://api.opensea.io/api/v1/collections';
    // url += "?asset_owner=" + address;
    let url = 'https://api.opensea.io/api/v1/assets';
    url += "?owner=" + address + "&limit=30";

    let resp = await axios.get(url) as any;
    console.info('getAssets = ', resp)
    // if (resp && resp.data.code === 1) {
    //     return resp.data.data;
    // }
    // return null
}

export async function delShare(share_id: number, sharer_address: string): Promise<any> {
    let url = apiBaseUrl + 'delShare';

    let resp = await axios.post(url, {
        share_id: share_id,
        sharer_address: sharer_address
    }) as any;

    if (resp && resp.data.code === 1) {
        return resp.data.data;
    }
    return null
}

export async function postDefaultPicture(address: string, photo_id: number): Promise<any> {
    let url = apiBaseUrl + 'updateDefaultPicture';
    url += "?address=" + address + "&photo_id=" + photo_id;

    let resp = await axios.post(url) as any;
    // console.info('resp = ', resp)
    if (resp && resp.data.code === 1) {
        return resp.data;
    }
    return null
}

export async function getNewList(curr_page: number, page_size: number, visitor_address?: string, user_address?: string): Promise<any> {
    let url = apiCommunity + 'newList';
    url += "?curr_page=" + curr_page + "&page_size=" + page_size + "&visitor_address=" + visitor_address + "&user_address=" + user_address;

    let resp = await axios.get(url) as any;
    if (resp && resp.data.code === 1) {
        return resp.data.data;
    }
    return null
}

export async function getRankingList(curr_page: number, page_size: number, visitor_address?: string, user_address?: string): Promise<any> {
    let url = apiCommunity + 'rankingList';
    url += "?curr_page=" + curr_page + "&page_size=" + page_size + "&visitor_address=" + visitor_address + "&user_address=" + user_address;

    let resp = await axios.get(url) as any;
    if (resp && resp.data.code === 1) {
        return resp.data.data;
    }
    return null
}

export async function searchLootByLootId(lootId: string, lootType: number): Promise<any> {
    let url = apiBaseUrl + 'searchLootByLootId';
    url += "?lootId=" + lootId + "&lootType=" + lootType;

    let resp = await axios.get(url) as any;
    if (resp && resp.data.code === 1) {
        return resp.data.data;
    }
    return null
}

export async function share(address: string, lootType?: number, lootId?: string,
    radarImage?: string, cakeImage?: string, nameImage?: string, photo_id?: number, is_show_community?: boolean): Promise<any> {

    let url = apiBaseUrl + 'share';

    let resp = await axios.post(url, {
        address: address,
        loot_type: lootType,
        loot_id: lootId,
        radar_image: radarImage,
        cake_image: cakeImage,
        photo_id: photo_id,
        is_show_community: is_show_community,
        name_image: nameImage
    }) as any;

    if (resp && resp.data.code === 1) {
        return resp.data.data;
    }
    return null
}

export async function shareFromList(address: string, photo_id: number): Promise<any> {

    let url = apiBaseUrl + 'share';

    let resp = await axios.post(url, {
        address: address,
        photo_id: photo_id
    }) as any;

    if (resp && resp.data.code === 1) {
        return resp.data.data;
    }
    return null
}

export async function getLootInfo(address: string, lootId: number, lootType: number,
    cancelSource?: CancelTokenSource): Promise<any> {

    let url = apiBaseUrl;
    if (lootType === 2) { // GA
        url = apiBaseUrl + 'getGaLootInfoByLootId';
    } else if (lootType === 3) { // Synthetic Loot
        url = apiBaseUrl + 'getSLootInfoByAddress';
    } else {
        url = apiBaseUrl + 'getLootInfoByLootId';
    }
    url += "?address=" + address + "&lootId=" + lootId
    let resp = await axios.get(url, { cancelToken: cancelSource?.token }) as any;
    if (resp && resp.data.code === 1) {
        return resp.data.data;
    }
    // console.info(resp.data);
    return null
}

export async function updateLootGender(address: string, lootType: number, lootId: number, gender: number): Promise<any> {
    let url = apiBaseUrl + 'updateUserLootInfo';
    url += "?address=" + address + "&lootType=" + lootType + "&lootId=" + lootId + "&gender=" + gender
    let resp = await axios.post(url) as any;
    if (resp && resp.data) {
        return resp.data;
    }
    // console.info(resp);
    return null
}
export async function updateLootSkins(list: Array<any>): Promise<any> {
    let url = apiBaseUrl + 'updateUserLootSkin';
    let resp = await axios.post(url, list) as any;
    if (resp && resp.data) {
        return resp.data;
    }
    return null
}

export async function doVisit(visitorAddress: string | undefined, target: string): Promise<any> {
    if(!visitorAddress){
        visitorAddress="";
    }
    let url = apiBaseUrl + 'visit?visitorAddress=' + visitorAddress + "&target=" + target;
    let resp = await axios.post(url) as any;
    // console.info('doVisit = ',resp);
    if (resp && resp.data) {
        return resp.data;
    }
    return null
}

export async function doLike(userAddress: string, targetId: string): Promise<any> {
    let url = apiCommunity + 'like?user_address=' + userAddress + "&id=" + targetId;
    let resp = await axios.post(url) as any;
    if (resp && resp.data) {
        return resp.data;
    }
    return null
}

export async function doUnlike(userAddress: string, targetId: string): Promise<any> {
    let url = apiCommunity + 'unlike?user_address=' + userAddress + "&id=" + targetId;
    let resp = await axios.post(url) as any;
    if (resp && resp.data) {
        return resp.data;
    }
    return null
}

export async function getVisitorList(target: string): Promise<any> {
    let url = apiBaseUrl + 'visitorList?target=' + target;
    let resp = await axios.get(url) as any;
    if (resp && resp.data) {
        return resp.data;
    }
    return null
}

export async function getUserInfo(address: string, setUserAvatar: any, 
    setUserNickname: any, setDefaultPhoto: any, setIsDisplay: any) {
    let url = apiBaseUrl + 'getUserInfo?address=' + address;
    let resp = await axios.get(url) as any;
    // console.info('getUserInfo = ', resp);

    if (resp.data.code === 0) { // user not exist
        // console.info('user not exist');
        setUserAvatar('');
        setUserNickname(shortAddress(address));
    } else {
        // console.info('user exist');
        if (resp.data.data && resp.data.data.avatar_url) {
            let avatarUrl = pngBaseUrl + resp.data.data.avatar_url;
            setUserAvatar(avatarUrl);
        } else {
            setUserAvatar('');
        }

        let nickname = resp.data.data.nickname;
        if (nickname === '') {
            nickname = shortAddress(address);
        }
        setUserNickname(nickname);

        let photoUrl = pngBaseUrl + resp.data.data.main_loot_avatar_ulr;
        setDefaultPhoto(photoUrl);
        setIsDisplay('none');
    }
}