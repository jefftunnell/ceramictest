import Web3 from "web3";
import Web3Modal from "web3modal";
import WalletConnectProvider from '@walletconnect/web3-provider'
import { EventDispatch } from '../util/EventEmiter'
import { connected } from "./consts";

// Web3modal instance
let web3Modal: Web3Modal;

// Chosen wallet provider given by the dialog window
let provider: any;

/**
 * Address of the selected account of connected wallet
 */
export let selectedAccount: string;

/**
 * Web3 Provider of connected wallet
 */
export let web3: Web3;

/**
 * Setup the orchestra
 */
function init() {

  console.log("Initializing web3Modal...");
  // console.log("WalletConnectProvider is", WalletConnectProvider);
  // console.log("Fortmatic is", Fortmatic);

  // Tell Web3modal what providers we have available.
  // Built-in web browser provider (only one can exist as a time)
  // like MetaMask, Brave or Opera is added automatically by Web3modal
  const providerOptions = {
    walletconnect: {
      package: WalletConnectProvider,
      options: {
        // Kevin's test key - don't copy as your mileage may vary
        infuraId: "44929572cbb84ef1b3d374a87cae953a",
      }
    },

    // fortmatic: {
    //   package: Fortmatic,
    //   options: {
    //     // Mikko's TESTNET api key
    //     key: "pk_test_391E26A3B43A3350"
    //   }
    // }
  };

  web3Modal = new Web3Modal({
    cacheProvider: true, // optional
    providerOptions, // required
  });
}

/**
 * Kick in the UI action after Web3modal dialog has chosen a provider
 */
async function fetchAccountData() {

  // Get a Web3 instance for the wallet
  web3 = new Web3(provider);
  // console.log("Web3 instance is : ", web3);

  // Get connected chain id from Ethereum node
  const chainId = await web3.eth.getChainId();
  console.log("--> chainId : ", chainId);

  // Get list of accounts of the connected wallet
  const accounts = await web3.eth.getAccounts();
  // console.log("--> Got accounts : ", accounts);

  // MetaMask does not give you all accounts, only the selected account
  selectedAccount = accounts[0];
  console.log("--> selectedAccount : ", selectedAccount);
  
  // Notify a connected event to others page.
  EventDispatch(connected, '');
  
  // get balance of address
  // const balance = await web3.eth.getBalance(selectedAccount);
  // const ethBalance = web3.utils.fromWei(balance, "ether");
  //   const humanFriendlyBalance = parseFloat(ethBalance).toFixed(4);
  // console.log("--> ethBalance : ", ethBalance);
}

/**
 * Connect wallet button pressed.
 */
export async function onConnect() {
  
  console.log("Opening connection dialog...", web3Modal);
  try {
    provider = await web3Modal.connect();
    fetchAccountData();
  } catch (e) {
    console.log("Could not get a wallet connection", e);
    return;
  }

  // Subscribe to accounts change
  provider.on("accountsChanged", (accounts: string[]) => {
    console.log('--> accountsChanged : ', accounts);
    if (accounts.length === 0) { // Disconnect to Metamask the Chrome browser plugin
      onDisconnect();
    } else { // Switch to another address while there are a few addresses connected to.
      if (provider) fetchAccountData();
    }
  });

  // Subscribe to chainId change
  provider.on("chainChanged", (chainId: number) => {
    console.log('--> chainChanged : ', chainId);
    // if (provider) fetchAccountData();
  });

  // Subscribe to networkId change
  provider.on("networkChanged", (networkId: number) => {
    console.log('--> networkChanged : ', networkId);
    // fetchAccountData();
  });

  // Subscribe to provider connection
  provider.on("connect", (info: { chainId: number }) => {
    console.log('--> connect : ', info);
    // fetchAccountData()
  });

  // Subscribe to provider disconnection
  provider.on("disconnect", (error: { code: number; message: string }) => {
    console.log('--> disconnect : ', error);
    onDisconnect();
  });
}

/**
 * Disconnect wallet button pressed.
 */
export async function onDisconnect() {
  
  console.log("Killing the wallet connection : ", provider);

  // TODO: Which providers have close method?
  // How to disconnect to Metamask and other wallets?

  // if (provider.close) {
  //   await provider.close();

  //   // If the cached provider is not cleared,
  //   // WalletConnect will default to the existing session
  //   // and does not allow to re-scan the QR code with a new wallet.
  //   // Depending on your use case you may want or want not his behavir.
  //   web3Modal.clearCachedProvider();
  //   provider = null;
  // }

  // Not really close the connection with wallet.
  web3Modal.clearCachedProvider();
  provider = null;
  
  // Set account to origin value.
  selectedAccount = '';

  // Notify a disconnect event to Header page.
  EventDispatch("disconnect", '');
}

/**
 * Reconnect wallet while page refresh.
 */
export async function onReconnect() {
  init();
  console.log('--> onReconnect : ', web3Modal.cachedProvider);
  if (web3Modal.cachedProvider) {
    onConnect();
  }
}
