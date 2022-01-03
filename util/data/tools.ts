import { pngBaseUrl } from "../../components/Common";

export function getUrlByItemName(typeName: string, itemName: string, skinNo: number) {
  itemName = getItemName(itemName)
  let url = pngBaseUrl + "images/lootswag/icons/v" + skinNo + "/" + typeName + "/" + itemName + ".png";
  return url;
}

export function getItemName(itemName: string) {
  if (itemName) {
    itemName = itemName.replaceAll(" ", "");
    itemName = itemName.replaceAll("'", "");
  }
  return itemName;
}

export function getHeaderUrlByGender(gender: number, skinNo: number) {
  let url = pngBaseUrl + "images/lootswag/icons/header/";
  url += gender === 0 ? "female/" : "male/"
  url += skinNo + ".png";
  return url;
}

export function changeUrlVersion(url: string, oldVerson: number, newVerson: number, skinName: string) {
  let newUrl = url.replaceAll("/v" + oldVerson, "/v" + newVerson);
  let index = newUrl.lastIndexOf("/");
  newUrl = newUrl.substring(0, index + 1) + skinName + ".png";
  return newUrl;
}
export function changeHeaderUrlVersion(url: string, oldVerson: number, newVerson: number) {
  return url.replaceAll("noskin/" + oldVerson + ".png", "noskin/" + newVerson + ".png");
}
export function changeHeadUrlVersion(url: string, oldVerson: number, newVerson: number) {
  return url.replaceAll("unarmed" + oldVerson + ".png", "unarmed" + newVerson + ".png");
}

var BodyNames = ["Head", "Foot", "Chest", "Hand", "Ring", "Weapon", "Neck", "Waist"]
export function getBodyNameBySkinUrl(url: string): string {
  for (let index = 0; index < BodyNames.length; index++) {
    const element = BodyNames[index];
    if (url.indexOf(element) > 0) {
      return element
    }
  }
  return ""
}

export function getComopnentClassCount(components: Array<any>, classType: string) {
  let count = 0;
  if (components) {
    for (let i = 1; i < components.length; i++) {
      const element = components[i];
      if (element.class.toLowerCase() === classType.toLowerCase()) {
        count += 1;
      }
    }
  }
  return count;
}
export function getComopnentValue(components: Array<any>, typeName: string) {
  if (components) {
    for (let index = 1; index < components.length; index++) {
      const element = components[index];
      if (element.type_name.toLowerCase() === typeName.toLowerCase()) {
        let value = element.value;
        return 1 / value;
      }
    }
  }
  return 0;
}