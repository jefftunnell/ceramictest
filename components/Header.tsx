import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import {
  Button, Image, Divider, Flex, Modal, ModalBody,
  ModalContent, ModalOverlay, Text, useDisclosure, useToast, Icon, Popover,
  PopoverBody, PopoverContent, PopoverTrigger, Avatar, Input, InputGroup,
  InputLeftElement, Link as ChakraLink
} from "@chakra-ui/react"
import { ChevronDownIcon, HamburgerIcon, SearchIcon } from '@chakra-ui/icons';
import { MdAccountBalanceWallet, MdAccountCircle } from "react-icons/md"
// import iconMetamask from '../assets/iconMetamask.svg';
// import iconWalletConnect from '../assets/iconWalletConnect.svg';
import { useWeb3React } from '@web3-react/core';
import { Web3Provider } from '@ethersproject/providers';
import { chain_id_eth, ethersProvider, getNewWalletConnectInstance, injected, walletconnect } from '../util/connectors';
import {
  key_curr_wallect_index, key_curr_user_account, kMetamaskConnection, useEagerConnect,
  useInactiveListener
} from '../util/hooks';
import { AbstractConnector } from '@web3-react/abstract-connector';
import Web3 from 'web3';
import Flags from 'country-flag-icons/react/3x2'
import setLanguage from 'next-translate/setLanguage'

import {
  Drawer,
  DrawerBody,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
} from "@chakra-ui/react"

import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogOverlay,
} from "@chakra-ui/react"

import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuItemOption,
  MenuGroup,
  MenuOptionGroup,
  MenuIcon,
  MenuCommand,
  MenuDivider,
} from '@chakra-ui/react'

import { toastInfo, toastError, menuItem } from './Common';
import { EventDispatch, EventSubscribe } from '../util/EventEmiter';
import { AiFillTwitterCircle } from 'react-icons/ai';
import { FaDiscord } from 'react-icons/fa';
import { doVisit, getUserInfo, searchLootByLootId } from '../util/data/api';
import { CN, COLOR_BG_BODY, COLOR_BG_AVATAR, COLOR_BG_POPUP, COLOR_BORDER, EN, COLOR_GRAY } from '../util/consts';
import { addressToEns, shortAddress } from '../util/utils';
import { useRouter } from 'next/router';

let search_loot_id: any;

export var currChainId = chain_id_eth;
export var currUserAccount: any;
export var currUserAccountSigner: any;

export const chainName = new Map([
  [1, "ETH Mainnet"],
  [3, "ETH Ropsten"],
  [4, "ETH Rinkeby"],
  [5, "ETH Goerli"],
  [42, "ETH Kovan"],
  [56, "BSC Mainnet"],
  [65, "OKExChain Testnet"],
  [80001, "Polygon Testnet"],
  [97, "BSC Testnet"],
]);

export default function Header(props: any) {

  const [ensName, setEnsName] = useState('');
  const [userAvatar, setUserAvatar] = useState('');
  const [userNickname, setUserNickname] = useState('');
  const [defaultPhoto, setDefaultPhoto] = useState('');
  const [isDisplayPFP, setIsDisplayPFP] = useState('flex');
  const [isOpenMenu, setIsOpenMenu] = useState(false);
  const [isOpenChoose, setIsOpenChoose] = useState(false);

  const [currLng, setCurrLng] = useState('en');

  // 0: root page 1: Home(Loot Show) 2: My Activities
  const [inPage, setInPage] = useState(0);

  const router = useRouter();
  
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const context = useWeb3React<Web3Provider>();
  const { connector, library, account, activate, deactivate, chainId } = context;

  // console.info('chainId = ', chainId);
  // console.info('currUserAccount: ', currUserAccount);
  // console.info('currUserAccountSigner: ', currUserAccountSigner);

  if (chainId) {
    currChainId = chainId;
  } else {
    currChainId = 0;
  }

  //
  function onOpenMenu() {
    setIsOpenMenu(true);
  }

  //
  function onCloseMenu() {
    setIsOpenMenu(false);
  }

  // AutoConnect
  const [balance, setBalance] = useState();
  // const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  const isMobile = false;
  /**
   * with built-in broswer of wallet app.
   */
  const checkBuiltInBrowser = async () => {

    // Be using built-in broswer
    if (isMobile && (window as Record<string, any>).ethereum) {
      const web3 = new Web3(Web3.givenProvider);
      const address = await web3.eth.requestAccounts();
      currUserAccount = address[0];

      if (library !== undefined && currUserAccount !== undefined && currUserAccount !== null) {
        currUserAccountSigner = library.getSigner(currUserAccount).connectUnchecked();
        // localStorage.setItem(key_curr_user_account, currUserAccount);
      }

      // Get balance of the address
      // const balance = await web3.eth.getBalance(currUserAccount);
      // myBalance = formatEther(balance);
      // setBalance(myBalance);

    } else { // On desktop or mobile independent browser

      if (library !== undefined && account !== undefined && account !== null) {
        currUserAccount = account;
        currUserAccountSigner = library.getSigner(account).connectUnchecked();
        // localStorage.setItem(key_curr_user_account, account);
      } else {
        currUserAccount = undefined;
        currUserAccountSigner = ethersProvider;
        // localStorage.removeItem(key_curr_user_account);
      }
    }
  }


  checkBuiltInBrowser();
  // initContractObj(true);


  const [activatingConnector, setActivatingConnector] = React.useState();

  useEffect(() => {
    if (activatingConnector && activatingConnector === connector) {
      setActivatingConnector(undefined);
    }
  }, [connector, chainId, account, currUserAccount]);

  if (connector !== undefined) {
    if (connector === injected) {
      // localStorage.setItem(kMetamaskConnection, "0");
    } else {
      // localStorage.setItem(key_curr_wallect_index, "1");
    }
  }

  async function getENS(address: string) {
    let ens = await addressToEns(address);
    setEnsName(ens);
  }

  useEffect(() => {
    if (currUserAccount !== undefined) {
      getUserInfo(currUserAccount, setUserAvatar, setUserNickname, setDefaultPhoto, setIsDisplayPFP);

      // get ens name
      getENS(currUserAccount);

      // TODO After first login, prompt user to update avatar and username
      // router.push('/Profile');
      // router.push('/Search');
    }

    // let page = window.location.hash;
    // // console.info('getCurrentLocation',page)
    // if (page.indexOf("home") !== -1) { // in home
    //   setInPage(1);
    // } else if (page.indexOf("mypage") !== -1) { // in mypage
    //   setInPage(2);
    // } else {
    //   setInPage(0);
    // }
  }, [currUserAccount]);

  const triedEager = useEagerConnect()
  useInactiveListener(!triedEager || !!activatingConnector);

  function onClickWallet(params: number, deactivate: Function, activate: Function,
    activatingConnector: AbstractConnector | undefined, setActivatingConnector: Function) {

    // console.info(params, activatingConnector);
    if (params === 0) { // MetaMask
      if (activatingConnector !== injected) {
        if (activatingConnector !== undefined) {
          // deactivate();
          // walletconnect.close();
        }

        activate(injected);
        setActivatingConnector(injected);
        // localStorage.setItem(kMetamaskConnection, params.toString());
      }
    }

    if (params === 1) { // WalletConnect
      if (activatingConnector !== walletconnect) {
        if (activatingConnector !== undefined) {
          // deactivate();
        }

        try {
          getNewWalletConnectInstance();
          activate(walletconnect);
          setActivatingConnector(walletconnect);
          // localStorage.setItem(key_curr_wallect_index, params.toString());
        } catch (error) {

        }
      }
    }
  }

  const defaultRef = React.useRef() as any;
  const onCloseChoose = () => setIsOpenChoose(false);
  const ChooseLootType = (
    <AlertDialog
      isOpen={isOpenChoose}
      leastDestructiveRef={defaultRef}
      onClose={onCloseChoose}
    >
      <AlertDialogOverlay>
        <AlertDialogContent bg='#0B0F15' w='350px' mt='100px' ml='-550px'>
          {/* <AlertDialogHeader fontSize="lg" fontWeight="bold">
            Choose loot type to search
          </AlertDialogHeader> */}

          <AlertDialogBody>
            <Flex direction='column'>
              <Text px={5} py={2} cursor='pointer'
                onClick={() => { searchById(search_loot_id, 0); onCloseChoose() }}
                _hover={{ bg: "gray.800" }} borderRadius='8px'>
                {'Loot Bag #' + search_loot_id}
              </Text>
              <Text px={5} py={2} cursor='pointer'
                onClick={() => { searchById(search_loot_id, 2); onCloseChoose() }}
                _hover={{ bg: "gray.800" }} borderRadius='8px'>
                {'Genesis Adventurer #' + search_loot_id}
              </Text>

              {/* <Button colorScheme="blue" onClick={onCloseChoose}>
                Genesis Adventurer
              </Button>
              <Button ref={defaultRef} colorScheme="blue" onClick={onCloseChoose}>
                Loot Bag
              </Button> */}
            </Flex>
          </AlertDialogBody>

          {/* <AlertDialogFooter>
            <Flex justify='space-around'>
              <Button colorScheme="blue" onClick={onCloseChoose}>
                Genesis Adventurer
              </Button>
              <Button ref={defaultRef} colorScheme="blue" onClick={onCloseChoose}>
                Loot Bag
              </Button>
            </Flex>
          </AlertDialogFooter> */}
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  )

  function ConnectWalletModal() {
    return (
      <Modal onClose={onClose} isOpen={isOpen} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalBody>
            <Flex
              onClick={() => { onClickWallet(0, deactivate, activate, activatingConnector, setActivatingConnector); onClose() }}
              align="center"
              p={{ base: 4, md: 4 }}
              cursor="pointer"
              _hover={{ bg: 'gray.100', borderRadius: "0.5rem" }}
            >

              <Image src='/iconMetamask.svg' w="3rem" />
              <Text color='black' fontSize="xl" fontWeight="bold" px={10}>MetaMask</Text>
            </Flex>

            <Divider color="#DAE3F0" my={4} />

            <Flex
              onClick={() => { onClickWallet(1, deactivate, activate, activatingConnector, setActivatingConnector); onClose() }}
              // onClick={() => { connectWallet(); onClose() }}
              align="center"
              p={{ base: 4, md: 4 }}
              cursor="pointer"
              _hover={{ bg: 'gray.100', borderRadius: "0.5rem" }}
            >

              <Image src='/iconWalletConnect.svg' w="3rem" />
              <Text color='black' fontSize="xl" fontWeight="bold" px={10}>WalletConnect</Text>
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
    )
  }

  EventSubscribe('upload_avatar', (data: any) => {
    getUserInfo(currUserAccount, setUserAvatar, setUserNickname, setDefaultPhoto, setIsDisplayPFP);
  }, "Header");

  function BeforeConnect() {
    return (
      <Button w='100%' h={['3.3rem', '2.6rem']} onClick={() => { onOpen(); onCloseMenu() }}
        px={5} leftIcon={<MdAccountBalanceWallet />} colorScheme="blue" variant="solid" borderRadius='28px'>
        Connect Wallet
      </Button>
    )
  }

  function openMessage() {
    router.push('/Message');
  }

  function openProfile() {
    router.push('/Profile');
  }

  function openSetting() {
    router.push('/Setting');
  }

  function AfterConnect() {
    return (
      <Menu isLazy id="1">
        <MenuButton px={3} py={2} border='none'>
          <Flex align='center'>
            <Avatar
              bg={COLOR_BG_AVATAR}
              mr={3}
              // size='sm'
              w={10} h={10}
              cursor='pointer'
              src={userAvatar}
              name="Unnamed"
            />
            <Text fontSize='md' mr={3}>{ensName}</Text>
            <ChevronDownIcon w={5} h={5} color="gray.400" />
          </Flex>
        </MenuButton>

        <MenuList border='none' boxShadow='lg'>
          {menuItem('Profile', openProfile)}
          {menuItem('Message', openMessage)}
          {menuItem('Setting', openSetting)}
          {menuItem('Log out', '')}
        </MenuList>
      </Menu>

      // <Flex align="center" bg={COLOR_GRAY} borderRadius='23px' px={4} py={2} cursor='pointer'>
      // <Flex align="center" px={4} py={2} cursor='pointer'>
      //   <Popover trigger='hover'>
      //     <PopoverTrigger>
      //       <Flex align="center">
      //         <Avatar
      //           bg={COLOR_BG_AVATAR}
      //           mr={3}
      //           size='sm'
      //           cursor='pointer'
      //           src={userAvatar}
      //           name="Unnamed"
      //         />
      //         <Text fontSize='md' mr={1}>{ensName}</Text>
      //         <ChevronDownIcon w={5} h={5} color="gray.400" />
      //       </Flex>
      //     </PopoverTrigger>

      //     <PopoverContent borderColor='#24364E'>
      //       <PopoverBody >
      //         <Flex direction='column'>
      //         <Text fontSize='sm'>Profile</Text>
      //         <Text fontSize='sm'>Setting</Text>
      //         <Text fontSize='sm'>All</Text>
      //         </Flex>
      //       </PopoverBody>
      //     </PopoverContent>
      //   </Popover>
      // </Flex>
    )
  }

  let inputVal: any;

  function enterEvent(event: { key: string; }) {

    if (event.key === 'Enter') {

      // test code
      router.push('/Search');
      return;

      const input = inputVal.value;
      try {
        const result = Web3.utils.toChecksumAddress(input);

        if (result) {
          if (result === currUserAccount) {
            toastInfo(toast, 'Same address to current user logined.');
            return;
          }

          // localStorage.setItem('search_address', result);
          if (window.location.href.indexOf("friend_page") > 0) {
            EventDispatch("search_address", result);
          }
          doVisit(currUserAccount, result);
          window.location.assign('#/?friend_page');
        }
      } catch (error: any) {
        // console.error('invalid ethereum address', error.message) 
        // console.error('input value = ', input)
        let lootType;
        if (input > 0 && input <= 2540) { // OG or GA
          // console.info('OG or GA = ', input)
          search_loot_id = input;
          setIsOpenChoose(true);
          return;
        } else if (input > 2540 && input <= 8000) { // OG
          // console.info('OG = ', input)
          lootType = 0;
        } else if (input > 8000 && input <= 1316005) { // mLoot
          // console.info('mLoot = ', input)
          lootType = 1;
        } else {
          // console.error('NOT IS A NUMBER = ', input)
          toastError(toast, 'Invalid Loot Bag ID!');
          return;
        }

        searchById(input, lootType);
      }
    }
  }

  function searchById(lootId: string, lootType: number) {
    searchLootByLootId(lootId, lootType).then((res) => {
      // console.info('searchById = ', res)

      if (res) {
        let data = { 'loot_index': 0, 'loot_data': [res], 'from_search': 'Yes', 'search_by_id': 'Yes' };
        // localStorage.setItem('from_search', 'Yes');
        // localStorage.setItem('loot_data', JSON.stringify(data));
        if (window.location.href.indexOf("friend_detail") > 0) {
          EventDispatch("search_id", '');
        }
        window.location.assign('#/?friend_detail');

      } else {
        toastError(toast, 'Invalid Loot Bag ID!');
      }
    });
  }

  async function switchLanguage(lng: string) {
    setCurrLng(lng);
    await setLanguage(lng);
  }

  function Language() {
    return (
      <Menu isLazy id="1">
        <MenuButton as={Button} bg={COLOR_BG_BODY} border='none' mt={-1}
          _focus={{ bg: COLOR_BG_BODY }}>
          <Flex w='70px'>
            <Flex w='35px' ml={-2} mr={2}>
              {currLng === 'en' ? <Flags.US /> : <Flags.CN />}
            </Flex>
          </Flex>
        </MenuButton>
        <MenuList border='none' boxShadow='lg'>
          <MenuItem minH='48px' onClick={() => switchLanguage('en')}>
            <Flex w='30px' mr={5}>
              <Flags.US />
            </Flex>
            <Text>{EN}</Text>
          </MenuItem>
          <MenuItem minH='40px' onClick={() => switchLanguage('zh')}>
            <Flex w='30px' mr={5}>
              <Flags.CN />
            </Flex>
            <Text>{CN}</Text>
          </MenuItem>
        </MenuList>
      </Menu>
    )
  }

  // ROOT
  return (
    <div>
      <Flex d={['none', 'flex']} bg={COLOR_BG_BODY} pos="fixed" w="100%" zIndex={88}
        justify="space-between" align="center" px={10} py={5} 
        borderBottomColor='#E9E9E9' borderBottomWidth='1px'>

        <Flex align="center">
          <Link href="/">
            <Text fontSize='2xl' fontFamily='poppins_bold' cursor='pointer'
              _hover={{ transform: 'scale(1.02)' }}
              onClick={() => setInPage(0)} >
              OurInsight
            </Text>
          </Link>

          <InputGroup w='25vw' ml='100px' color="gray.300" mt={1} >
            <InputLeftElement
              pointerEvents="none"
              children={<SearchIcon />}
            />
            <Input placeholder="Search by ens or address"
              borderRadius='28px'
              ref={input => inputVal = input}
              onKeyPress={enterEvent}
              bg={COLOR_GRAY}
              color='black'
              _hover={{ borderColor: '#24364E' }}
            />
          </InputGroup>

          {ChooseLootType}
        </Flex>

        <Flex align="center">
          {/* <Link to={{ pathname: '/home', search: 'home' }} >
            <Text mr={10} fontSize='18px' fontFamily='poppins_semibold'
              _hover={{ transform: 'scale(1.02)' }} py={1}
              borderBottomColor={inPage === 1 ? '#0798F8' : ''}
              borderBottomWidth={inPage === 1 ? '3px' : ''}
              onClick={() => setInPage(1)} >
              Loot Show
            </Text>
          </Link> */}

          {/* <Link to={{ pathname: '/mypage', search: 'mypage' }} >
            <Text mr={10} fontSize='18px' fontFamily='poppins_semibold'
              _hover={{ transform: 'scale(1.02)' }} py={1}
              borderBottomColor={inPage === 2 ? '#0798F8' : ''}
              borderBottomWidth={inPage === 2 ? '3px' : ''}
              onClick={() => setInPage(2)} >
              My Activities
            </Text>
          </Link> */}

          {/* <Button w='100%' h={['3.3rem', '2.6rem']} onClick={() => { onOpen(); onCloseMenu() }}
            px={5} leftIcon={<MdAccountBalanceWallet />} colorScheme="blue" variant="solid" borderRadius='28px'>
            Explore
          </Button> */}

          <Text px={5} py={2} cursor='pointer' mr={10}
            _hover={{ bg: COLOR_GRAY, borderRadius: '28px', color: 'blue', fontWeight: 'bold' }}>
            Explore
          </Text>

          <Flex>
            {currUserAccount === undefined ? <BeforeConnect /> : <AfterConnect />}
            <ConnectWalletModal />
          </Flex>

          {/* {SocialMedia("https://twitter.com/LootSwag", FaTwitterSquare)}
          {SocialMedia("https://discord.gg/6QaRVxfUKx", BsDiscord)} */}
          <Language />
        </Flex>
      </Flex>

      {/* FOR MOBILE */}
      <Flex d={['flex', 'none']} bg='#111111' pos="fixed" w="100%" zIndex={88}
        justify="space-between" align="center" px={8} py={5} boxShadow="md">

        {/* <Link to="/">
          <Text fontSize='2xl' fontFamily='poppins_bold' _hover={{ transform: 'scale(1.02)' }}>
            Loot Swag
          </Text>
        </Link> */}

        <HamburgerIcon w={8} h={8} onClick={onOpenMenu} />

        <Drawer
          isOpen={isOpenMenu}
          onClose={onCloseMenu}
          placement="right"
          size="full"
        >
          <DrawerOverlay />
          <DrawerContent mt='5.8rem' bg='#1A1A1A'>
            <DrawerCloseButton />
            {/* <DrawerHeader>Create your account</DrawerHeader> */}

            <DrawerBody mt='5rem'>
              {/* <InputGroup>
                <InputLeftElement
                  pointerEvents="none"
                  children={<SearchIcon color="gray.300" />}
                />
                <Input placeholder="Search address or accounts" />
              </InputGroup> */}

              {/* <Link to="/" >
                <Flex mt={10} mb={3} align="center" onClick={onCloseMenu}>
                  <Icon as={MdHome} w={6} h={6} mr={2} />
                  <Text fontSize='xl' fontWeight='bold'>Loot Show</Text>
                </Flex>
              </Link>
              <Divider /> */}

              {/* <Link to={{ pathname: '/shopping', search: 'shopping' }} >
                <Flex mt={6} mb={3} align="center" onClick={onCloseMenu}>
                  <Icon as={MdAddShoppingCart} w={6} h={6} mr={2} />
                  <Text fontSize='xl' fontWeight='bold'>Shopping</Text>
                </Flex>
              </Link>
              <Divider /> */}

              {/* <Link to={{ pathname: '/myloot', search: 'myloot' }} >
                <Flex mt={6} mb={3} align="center" onClick={onCloseMenu}>
                  <Icon as={MdAccountCircle} w={6} h={6} mr={2} />
                  <Text fontSize='xl' fontWeight='bold'>My Activities</Text>
                </Flex>
              </Link> */}
              <Divider />

              <Flex mt='3rem'>
                {currUserAccount === undefined ? <BeforeConnect /> : <AfterConnect />}
                <ConnectWalletModal />
              </Flex>
            </DrawerBody>

            {/* <DrawerFooter>
              <Button variant="outline" mr={3} onClick={onCloseMenu}>
                Cancel
              </Button>
              <Button colorScheme="blue">Save</Button>
            </DrawerFooter> */}
          </DrawerContent>
        </Drawer>

      </Flex>
    </div>
  );
}
