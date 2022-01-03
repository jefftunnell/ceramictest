import Web3 from "web3";
import { ethersProvider, web3Provider } from "./connectors";
import { format, formatDistanceToNowStrict } from "date-fns";

export async function ensToAddress(ens: string) {
  let address = await ethersProvider.resolveName(ens);
  if (address) {
    return address;
  } else {
    return ens; // the ens maybe is not owned
  }
}

export async function addressToEns(address: string) {
  let ens = await ethersProvider.lookupAddress(address);
  if (ens) {
    return ens;
  } else {
    return shortAddress(address);
  }
}

export function shortAddress(address: string) {
  if (!address) return "";
  // let addr = address.substring(0, 6) + ' ... ' + address.substring(address.length - 4);
  let addr = address.substring(0, 7);
  return addr;
}

export function shortPeerId(peerId: string) {
  if (!peerId) return "";
  let result = peerId.substring(0, 16);
  return result;
}

export async function balanceOfAddress(address: string) {
  let balance = await web3Provider.eth.getBalance(address);
  return Web3.utils.fromWei(balance);
}

export function distanceTime(timestamp: any) {
  return formatDistanceToNowStrict(new Date(Number(timestamp) * 1000), { addSuffix: true });
}

export function formatTime(timestamp: any) {
  return format(new Date(Number(timestamp) * 1000), 'h:mm a . MMM d, y');
}

export function backTop() {
  window.scrollTo(0, 0);
}