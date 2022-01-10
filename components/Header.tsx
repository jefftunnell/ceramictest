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
// import { Web3Provider } from '@ethersproject/providers';
// import { chain_id_eth, ethersProvider, getNewWalletConnectInstance, injected, walletconnect } from '../util/connectors';
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
import {
  CN, COLOR_BG_BODY, COLOR_BG_AVATAR, COLOR_BG_POPUP, COLOR_BORDER,
  EN, COLOR_GRAY, connected, xp, ost
} from '../util/consts';
import { addressToEns, shortAddress } from '../util/utils';
import { useRouter } from 'next/router';
import { useUpdate } from 'react-use';
import { onConnect, onDisconnect, onReconnect, selectedAccount } from '../util/web3Modal';

let search_loot_id: any;

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
  const update = useUpdate();
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();

  //
  function onOpenMenu() {
    setIsOpenMenu(true);
  }

  //
  function onCloseMenu() {
    setIsOpenMenu(false);
  }

  async function getENS(address: string) {
    // So slow, need to find new method.
    // let ens = await addressToEns(address);
    let ens = shortAddress(address);
    setEnsName(ens);
  }

  useEffect(() => {
    console.info('--> Header: selectedAccount: ', selectedAccount);

    // Reconnect to wallet while page refresh.
    if (!selectedAccount) onReconnect();

    if (selectedAccount) {
      getUserInfo(selectedAccount, setUserAvatar, setUserNickname, setDefaultPhoto, setIsDisplayPFP);

      // get ens name
      getENS(selectedAccount);

      // TODO After first login, prompt user to update avatar and username
      // router.push('/Profile');
      // router.push('/Search');
    }

  }, [selectedAccount]);

  EventSubscribe(connected, (data: any) => {
    update();
  }, "Header");

  EventSubscribe('disconnect', (data: any) => {
    console.log("--> disconnect - selectedAccount : ", selectedAccount);
    update();
  }, "Header");

  const defaultRef = React.useRef() as any;
  const onCloseChoose = () => setIsOpenChoose(false);

  const SearchPrompt = (
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

  function BeforeConnect() {
    return (
      <Button h={[10, '2.6rem']} onClick={onConnect} fontSize={['sm', 'md']}
        px={[3, 5]} leftIcon={<MdAccountBalanceWallet />} colorScheme="blue" variant="solid" borderRadius='28px'>
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
        <MenuButton px={[0, 3]} py={2} border='none'>
          <Flex align='center'>
            <Avatar
              bg={COLOR_BG_AVATAR}
              mr={3}
              // size='sm'
              w={[7, 10]} h={[7, 10]}
              cursor='pointer'
              src={userAvatar}
              name="Unnamed"
            />
            <Text fontSize={['sm', 'md']} mr={3}>{ensName}</Text>
            <ChevronDownIcon w={5} h={5} color="gray.400" />
          </Flex>
        </MenuButton>

        <MenuList border='none' boxShadow='lg'>
          {menuItem('Profile', openProfile)}
          {menuItem('Message', openMessage)}
          {menuItem('Setting', openSetting)}
          {menuItem('Log out', onDisconnect)}
        </MenuList>
      </Menu>
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
          if (result === selectedAccount) {
            toastInfo(toast, 'Same address to current user logined.');
            return;
          }

          // localStorage.setItem('search_address', result);
          if (window.location.href.indexOf("friend_page") > 0) {
            EventDispatch("search_address", result);
          }
          doVisit(selectedAccount, result);
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

          {SearchPrompt}
        </Flex>

        <Flex>
          <Text mr={10}>{xp}: 0</Text>
          <Text>{ost}: 0</Text>
        </Flex>

        <Flex align="center">
          <Flex mr={5}>
            {selectedAccount ? <AfterConnect /> : <BeforeConnect />}
          </Flex>
          <Language />
        </Flex>
      </Flex>

      {/* FOR MOBILE */}
      <Flex d={['flex', 'none']} bg={COLOR_BG_BODY} pos="fixed" w="100%" zIndex={88}
        justify="space-between" align="center" p={5} boxShadow="md">

        <HamburgerIcon w={8} h={8} onClick={onOpenMenu} />

        <Flex fontSize={'sm'}>
          <Text mr={3}>{xp}: 0</Text>
          <Text>{ost}: 0</Text>
        </Flex>

        <Flex align="center">
          <Flex>
            {selectedAccount ? <AfterConnect /> : <BeforeConnect />}
          </Flex>
        </Flex>

        <Drawer
          isOpen={isOpenMenu}
          onClose={onCloseMenu}
          placement="right"
          size="full"
        >
          <DrawerOverlay />
          <DrawerContent mt='5.8rem'>
            <DrawerCloseButton />
            <DrawerBody mt='5rem'>
              <Divider />
              <Flex my={10} align={'center'}>
                <Flex mr={10}>
                  {selectedAccount ? <AfterConnect /> : <BeforeConnect />}
                </Flex>
                <Language />
              </Flex>
            </DrawerBody>
          </DrawerContent>
        </Drawer>
      </Flex>
    </div>
  );
}
