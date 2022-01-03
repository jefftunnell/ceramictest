import { BigNumber } from '@ethersproject/bignumber';
import { Contract } from '@ethersproject/contracts';
import { parseEther } from '@ethersproject/units';
import LootSkinAbi from '../abis/LootSkin.json'
import Multicall2Abi from '../abis/Multicall2.json'
import { nftWalletProvider, nft_rpc_url } from '../connectors';
import { addToCache, getFromCache } from './cache';
import { allComponents, EquipmentItemInfo, V3Components } from './pojo';
import { getUrlByItemName } from './tools';
//TODO 需要切换 LootSkin 主网地址 0xb8DD9C9D6A566971a7d2ADcDEBED82dEF474a284
export let LootSkinAddress = "0x212aF571015E588f172008fEF480960e2F99F1eD".toLowerCase();
export const Multicall2Address = "0x5BA1e12693Dc8F9c48aAD8770482f4739bEeD696".toLowerCase();
// Mint
// https://rinkeby.etherscan.io/address/0xe3422D43Ea897727682AC1aB9c5024a164B2FFa8

// lootSkin
// https://rinkeby.etherscan.io/address/0x212aF571015E588f172008fEF480960e2F99F1eD
let lootSkinContract: Contract
let multicall2Contract: Contract
function initContract() {
    if (!lootSkinContract) {
        if(nft_rpc_url.indexOf("mainnet")>0){
            LootSkinAddress = "0xb8DD9C9D6A566971a7d2ADcDEBED82dEF474a284".toLowerCase();
        }
        lootSkinContract = new Contract(LootSkinAddress, LootSkinAbi.abi, nftWalletProvider)
        multicall2Contract = new Contract(Multicall2Address, Multicall2Abi, nftWalletProvider)
    }
}

export async function getNftBalance(address: string, typeName: string, partIndex: number): Promise<any> {
    initContract();
    const fragment = lootSkinContract.interface.getFunction("balanceOf")

    let itemUrlList = [];
    let v2ItemNames = allComponents[partIndex];
    let v3ItemNames = V3Components[partIndex];

    let balances = getFromCache(address);
    if (!balances) {
        let callDatas = []
        for (let i = 0; i < 119; i++) {
            callDatas.push(
                { target: lootSkinContract.address, callData: lootSkinContract.interface.encodeFunctionData(fragment, [address, i + 1]) }
            )
        }
        const res = await multicall2Contract.callStatic.aggregate(callDatas);
        balances = res.returnData
        addToCache(address, 120, balances);
    }

    let v2length = 0;
    let v3length = 0;
    for (let i = 1; i < partIndex; i++) {
        v2length += allComponents[i].length;
        v3length += V3Components[i].length;
    }

    let count = 0;
    for (let index = v2length; index < v2length + v2ItemNames.length; index++) {
        let result = lootSkinContract.interface.decodeFunctionResult(fragment, balances[index])
        if (result[0].toNumber() > 0) {
            let node = new EquipmentItemInfo();
            node.typeName = typeName;
            node.version = 2;
            node.name = v2ItemNames[count];
            node.amount = result[0].toNumber();
            node.url = getUrlByItemName(typeName, node.name, node.version);
            itemUrlList.push(node);
        }
        count++;
    }

    count = 0;
    for (let index = 101 + v3length; index < 101 + v3length + v3ItemNames.length; index++) {
        let result = lootSkinContract.interface.decodeFunctionResult(fragment, balances[index])
        if (result[0].toNumber() > 0) {
            let node = new EquipmentItemInfo();
            node.typeName = typeName;
            node.version = 3;
            node.name = v3ItemNames[count];
            node.amount = result[0].toNumber();
            node.url = getUrlByItemName(typeName, node.name, node.version);
            itemUrlList.push(node);
        }
        count++;
    }

    return itemUrlList
}
