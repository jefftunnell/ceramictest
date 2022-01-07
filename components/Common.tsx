import { AddIcon, ArrowBackIcon } from "@chakra-ui/icons";
import {
  Avatar, Flex, Icon, Image, MenuItem, Link as ChakraLink,
  PopoverBody, PopoverContent, SimpleGrid, SkeletonCircle, SkeletonText, Text, Tooltip, Divider, Input, AvatarGroup, Button, Popover, PopoverTrigger, Spacer
} from "@chakra-ui/react";
import axios from "axios";
import { MdChat, MdFavoriteBorder, MdRedo, MdShare } from "react-icons/md";
import Header from "./Header";
import {
  COLOR_BG_AVATAR, COLOR_BG_POPUP, COLOR_BORDER, GRAY_TXT, HOVER_TITLE_1,
  HOVER_TITLE_2, HOVER_TITLE_3, HOVER_TITLE_4, JUMP_TO} from "../util/consts";
import Link from 'next/link'
import { distanceTime, formatTime, shortAddress } from "../util/utils";
import { FaTwitterSquare } from "react-icons/fa";
import { BsDiscord } from "react-icons/bs";
import ScrollContainer from "react-indiana-drag-scroll";
import { FcLike } from "react-icons/fc";
import { selectedAccount } from "../util/web3Modal";

export const PAGE_SIZE = 10;

// TODO TEST CODE
export const pngBaseUrl = 'https://api.lootswag.io/';
export const apiBaseUrl = 'https://api.lootswag.io/api/v1/common/';
export const apiCommunity = 'https://api.lootswag.io/api/v1/community/';

const SIZE = '80px';
const SKIN_HOVER_W = "34rem", TITLE_W = "6rem", ITEM_W = "200px";
const WH_BA = '70px';
const big_wh = '56px', sm_wh = '35px';
const IMG_SIZE = '260px';
const ICON_WH = 5, ICON_MR = 2, ICON_ML = 10;

// test code
export const timestamp = '1640181449'; // 2021-12-22 21:57:29

export function TimeAgo(timestamp: string) {
  return (
    <Text color='#425365' ml={2} title={formatTime(timestamp)}>{distanceTime(timestamp)}</Text>
  )
}

export function menuItem(menu: string, func: any) {
  return (
    <MenuItem minH='45px' onClick={func} _focus={{ bg: 'gray.50' }}>
      <Text fontSize='sm'>{menu}</Text>
    </MenuItem>
  )
}

export function PageHead(router: any) {
  return (
    <div>
      <Header />
      <Flex height='80px' />
      <ArrowBackIcon w={8} h={8} cursor='pointer' mt={10} ml={10} onClick={() => router.back()} />
    </div>
  )
}

export function oneActivity(data: any) {

  // console.info('loot index = ', index);
  let name = data.name;
  // let nickname = data.user_nickname;

  return (
    <Flex key='1' direction='column' mt={10} w='60vw'>
      <Flex align='center'>
        {hoverDetails(BigAvatar())}
        {hoverDetails(UserName(name))}
        <Text color={GRAY_TXT} mx={2}>bought</Text>
        <Text color='blue' fontWeight='bold'>{'Punk #3551'}</Text>
        <Text color={GRAY_TXT} mx={2}>from</Text>
        <Flex>{hoverDetails(UserName('Alice'))}</Flex>
        <Text ml={2}>{'for 35 ETH'}</Text>
      </Flex>

      <Flex direction='column' ml={20} mt={5}>
        {/* content */}
        {/* <ScrollContainer vertical={false} hideScrollbars={false}> */}
        < ScrollContainer vertical={false} >
          <Flex mb={0}>
            <Image mr={10} boxSize={IMG_SIZE} src='/nft/1.png' />
            {/* <Image draggable={false} src='/nft/2.png' /> */}
          </Flex>
        </ScrollContainer>

        {/* icons */}
        <Flex ml={5} mt={5}>
          <Flex align="center" cursor='pointer' onClick={() => onClickLike()} >
            <Icon as={0 === 0 ? MdFavoriteBorder : FcLike} w={ICON_WH} h={ICON_WH} mr={ICON_MR} />
            <Text>66</Text>
          </Flex>
          <Flex ml={ICON_ML} align="center" cursor='pointer' onClick={() => onClickLike()} >
            <Icon as={MdChat} w={ICON_WH} h={ICON_WH} mr={ICON_MR} />
            <Text>66</Text>
          </Flex>
          <Flex ml={ICON_ML} align="center" cursor='pointer' onClick={() => onClickLike()} >
            <Icon as={MdRedo} w={ICON_WH} h={ICON_WH} mr={ICON_MR} />
            <Text>66</Text>
          </Flex>
        </Flex>
      </Flex>
    </Flex >
  )
}

export function onePeople(i: number, data: any, button: any, w?: string) {

  let name = data.name;
  let subTitle = data.subTitle;

  let href = {
    pathname: '/People',
    query: { id: name }
  }

  return (
    <Link key={i} href={href}>
      <Flex mt={1} w={w} p={3} align='center' cursor='pointer'
        _hover={{ bg: 'gray.100', borderRadius: '5px' }}>

        {hoverDetails(SmallAvatar())}
        <Flex direction='column'>
          <Flex fontSize='sm'>{hoverDetails(UserName(name))}</Flex>
          <Text color='#425365' fontSize='xs'>{subTitle}</Text>
        </Flex>
        <Spacer />
        {button}
      </Flex>
    </Link>
  )
}

export function IconFollow() {
  return (
    <AddIcon cursor='pointer' onClick={(e: any) => { e.stopPropagation(); alert('Hi'); }} />
  );
}

export function ButtonFollow() {
  return (
    <Button px={5} colorScheme="blue" variant="solid" borderRadius='28px' _focus={{}}
      onClick={(e: any) => { e.stopPropagation(); alert('ButtonFollow'); }} >
      Follow
    </Button>
  );
}

// will be update
export function OneAvatar(size: string, src: string) {
  return (
    <Avatar w={size} h={size} src={src} cursor='pointer' />
  );
}

export function BigAvatar() {
  return (
    <Avatar mr={6} w={big_wh} h={big_wh} src='/nft/bayc.png' cursor='pointer' />
  );
}

export function SmallAvatar() {
  return (
    <Avatar mr={3} w={sm_wh} h={sm_wh} src='/nft/bayc.png' cursor='pointer' />
  );
}

export function UserName(name: string) {
  return (<Text fontWeight='bold' cursor='pointer'>{name}</Text>);
}

export function hoverDetails(trigger: any) {
  return (
    <Popover trigger='hover'>
      <PopoverTrigger>
        {trigger}
      </PopoverTrigger>

      <PopoverContent border='none' cursor='auto' onClick={(e: any) => e.stopPropagation()} _focus={{}}
        borderRadius='15px' sx={{ boxShadow: '0px 1px 10px -5px black' }}>
        <PopoverBody borderRadius='15px'>
          <Flex direction='column' p={2}>
            <Flex justify='space-between'>
              <Avatar bg={COLOR_BG_AVATAR} w={WH_BA} h={WH_BA} src='/nft/bayc.png' />
              <Button px={5} colorScheme="blue" variant="solid" borderRadius='28px'
                onClick={() => { alert('Follow'); }} _focus={{}}>
                Follow
              </Button>
            </Flex>

            <Text mt={3} fontWeight='bold' >Rook.eth</Text>
            <Text mt={3} >Bio: I like to buy NFTs</Text>

            <Flex mt={6}>
              <Text fontWeight='bold' >{'100'}</Text>
              <Text ml={2} >Following</Text>
              <Text ml={10} fontWeight='bold' >{'200'}</Text>
              <Text ml={2} >Followers</Text>
            </Flex>

            <Flex mt={6}>
              <AvatarGroup size='sm' max={2}>
                <Avatar name='Ryan Florence' src='https://bit.ly/ryan-florence' />
                <Avatar name='Segun Adebayo' src='https://bit.ly/sage-adebayo' />
                <Avatar name='Kent Dodds' src='https://bit.ly/kent-c-dodds' />
                <Avatar name='Prosper Otemuyiwa' src='https://bit.ly/prosper-baba' />
                <Avatar name='Christian Nwamba' src='https://bit.ly/code-beast' />
              </AvatarGroup>
              <Text ml={2} fontSize='xs' >Followed by Loot Swag, Tony He, and Loot</Text>
            </Flex>
          </Flex>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  )
}

export function LinkMedia(icon: any, handleFunc: any, holder: string) {
  return (
    <Flex align='center' mb={6} >
      <Icon as={icon} w={6} h={6} mr={3} />
      <Input
        placeholder={holder}
        borderRadius='5px'
        onChange={handleFunc}
        _hover={{ borderColor: '#24364E' }}
      />
    </Flex>
  )
}

export const CircleIcon = (props: any) => (
  <Icon viewBox='0 0 200 200' {...props}>
    <path
      fill='currentColor'
      d='M 100, 100 m -75, 0 a 75,75 0 1,0 150,0 a 75,75 0 1,0 -150,0'
    />
  </Icon>
)

export function Footer() {
  return (
    <Flex direction='column' align='center' mt='auto' mb={10}>
      <Divider mt={10} />
      <SimpleGrid columns={[2, 2]} spacing="30px" mb={3} mt={8}>
        {SocialMedia("https://twitter.com/LootSwag", FaTwitterSquare)}
        {SocialMedia("https://discord.gg/6QaRVxfUKx", BsDiscord)}
      </SimpleGrid>
      <Text fontSize='sm' opacity='0.8'>© 2022 OurInsight</Text>
    </Flex>
  )
}

export function SocialMedia(url: string, icon: any) {
  return (
    <ChakraLink href={url} _focus={{ outline: 0 }} isExternal>
      <Icon as={icon} w={8} h={8} _hover={{ transform: 'scale(1.1)' }} />
    </ChakraLink>
  )
}


export function FocusedNFT(index: number) {

  const val = 1;
  let opacity = [val, val, val, val];
  for (let i = 0; i < opacity.length; i++) {
    if (index === -1) break;
    if (i !== index) opacity[i] = 0.3;
  }

  return (
    <SimpleGrid columns={[1, 5]} spacing="40px" mt={5} mb={20}>
      <Tooltip label='Crypto Punks' fontSize="md" color="gray">
        <Flex direction='column' cursor='pointer' align='center' opacity={opacity[0]} _hover={{ opacity: '1' }}>
          <Link href="/CryptoPunks">
            <Avatar w={SIZE} h={SIZE} src='/nft/punk.png' />
          </Link>
          <Text mt={3}>Crypto Punks</Text>
        </Flex>
      </Tooltip>

      <Tooltip label='Bored Ape Yacht Club' fontSize="md" color="gray">
        <Flex direction='column' cursor='pointer' align='center' opacity={opacity[1]} _hover={{ opacity: '1' }}>
          <Link href="/CryptoPunks">
            <Avatar w={SIZE} h={SIZE} src='/nft/bayc.png' />
          </Link>
          <Text mt={3}>Bored Ape Yacht Club</Text>
        </Flex>
      </Tooltip>

      <Tooltip label='The Sandbox Game' fontSize="md" color="gray">
        <Flex direction='column' cursor='pointer' align='center' opacity={opacity[2]} _hover={{ opacity: '1' }}>
          <Link href="/CryptoPunks">
            <Avatar w={SIZE} h={SIZE} src='/nft/sand.png' />
          </Link>
          <Text mt={3}>The Sandbox Game</Text>
        </Flex>
      </Tooltip>

      <Tooltip label='Decentraland' fontSize="md" color="gray">
        <Flex direction='column' cursor='pointer' align='center' opacity={opacity[3]} _hover={{ opacity: '1' }}>
          <Link href="/CryptoPunks">
            <Avatar w={SIZE} h={SIZE} src='/nft/decentraland.png' />
          </Link>
          <Text mt={3}>Decentraland</Text>
        </Flex>
      </Tooltip>
    </SimpleGrid>
  )
}

export function SkeletonUI(isDisplay: string) {
  return (
    <Flex direction='column' d={isDisplay} padding="6" boxShadow="lg"
      bg={COLOR_BG_POPUP} w='200px' h='230px'>
      <SkeletonCircle size="10" />
      <SkeletonText mt={10} noOfLines={4} spacing="4" />
    </Flex>
  )
}

export function oneVisitor(key: number, data: any) {
  let address = data.visitor_address;
  if (selectedAccount === address) {
    return (
      <div>
        {oneVisitorUI(key, data, true)}
      </div>
    )
  } else {
    return (
      <Link href={`/player/${address}`}>
        <Flex _hover={{ bg: COLOR_BORDER, borderRadius: '20px' }} >
          {oneVisitorUI(key, data)}
        </Flex>
      </Link>
    )
  }
}

export function oneVisitorUI(key: number, data: any, is_you?: boolean) {

  let avatar = pngBaseUrl + data.avatar_url;
  let address = shortAddress(data.visitor_address);
  let nickname = data.nickname;
  let time = data.latest_visit_time_at;

  return (
    <Flex key={key} m={3} align="center">
      <Avatar bg={COLOR_BG_AVATAR} mr={6} src={avatar} name="Unnamed" />
      <Flex direction='column'>
        {is_you ? <Text color='gray'>You</Text>
          : <Text opacity='0.8' mb={2}>{nickname === '' ? address : nickname}</Text>
        }
        <Text color='gray' fontSize='xs'>{formatTime(time)}</Text>
      </Flex>
    </Flex>
  )
}

export function playerNickname(address: string, nickname: string) {
  return (
    <div>
      {selectedAccount !== address ?
        <Link href={`/player/${address}`}>
          <Tooltip label={JUMP_TO} fontSize="md" color="gray">
            <Text color='#0798F8' mb={1}>
              {nickname === '' ? address : nickname}
            </Text>
          </Tooltip>
        </Link>
        :
        <Text mb={1}>You</Text>
      }
    </div>
  )
}

export function detailPageShare() {
  return (
    <Flex borderRadius='50%' w={10} h={10} align='center' justify='center' my={5}
      borderColor='#24364E' borderWidth='1px' opacity='0.8'
      _hover={{ borderColor: '#0798F8', opacity: '1' }} cursor='pointer'>

      <Icon as={MdShare} w={7} h={7} color='#0798F8' />
    </Flex>
  )
}

export function normalShare(loot: any) {
  return (
    <Flex align="center" mr={10}>
      <Icon as={MdShare} w={5} h={5} mr={2} />
      <Text>{loot.latest_share_count}</Text>
      <Text color='#425365' ml={2}>Share</Text>
    </Flex>
  )
}

// export function shareMenu(shareButton: any, loot: any, toast: any, photo_id: number) {
//   return (
//     <Menu>
//       <MenuButton>
//         {shareButton}
//       </MenuButton>
//       <MenuList bg={COLOR_BG_POPUP} border='none' >
//         <MenuItem icon={<ExternalLinkIcon w={5} h={5} />} onClick={() => onShareAvatar(toast, photo_id)}
//           _hover={{ bg: COLOR_BORDER }} _focus={{ bg: COLOR_BORDER }} >
//           Share to Community
//         </MenuItem>
//         <MenuItem icon={<CopyIcon w={5} h={5} />} onClick={async () => {
//           let shareUrl = 'https://share.lootswag.io/?shareId=' + loot.share_url_id;
//           await navigator.clipboard.writeText(shareUrl);
//           toastCopyShareUrl(toast, 'Share URL Copied.', shareUrl);
//         }}
//           _hover={{ bg: COLOR_BORDER }} _focus={{ bg: COLOR_BORDER }} >
//           Copy URL
//         </MenuItem>
//       </MenuList>
//     </Menu>
//   )
// }

export function HoverInfo(bigImage: string, body: string, lootType: string, loot: string, skinNo: string) {
  return (
    <PopoverContent bg='rgba(23, 31, 44, 0.87)' border='none' color='white' w={SKIN_HOVER_W}>
      <PopoverBody>
        <Flex p={3} align="center">
          <Image w='10rem' src={bigImage} />

          <Flex direction='column' ml={6} color='#425365' fontWeight='bold'>
            <Flex>
              <Text p={1} w={TITLE_W} textAlign='right'>{HOVER_TITLE_1}:</Text>
              <Text p={1} w={ITEM_W} color='white'>{body}</Text>
            </Flex>
            <Flex>
              <Text p={1} w={TITLE_W} textAlign='right'>{HOVER_TITLE_2}:</Text>
              <Text p={1} w={ITEM_W} color='white'>{lootType}</Text>
            </Flex>
            <Flex>
              <Text p={1} w={TITLE_W} textAlign='right'>{HOVER_TITLE_3}:</Text>
              <Text p={1} w={ITEM_W} color='white'>{loot}</Text>
            </Flex>
            <Flex>
              <Text p={1} w={TITLE_W} textAlign='right'>{HOVER_TITLE_4}:</Text>
              <Text p={1} w={ITEM_W} color='white'>{skinNo}</Text>
            </Flex>
          </Flex>
        </Flex>
      </PopoverBody>
    </PopoverContent>
  )
}

export function ShareInfo(face: string, nickname: string, address: string, is_you?: boolean) {
  return (
    <Flex align="center">
      <Avatar bg={COLOR_BG_AVATAR} mr={6} src={face} name="Unnamed" />
      <Flex direction='column'>
        <Flex>
          {is_you ?
            <Text mx={1}>you</Text>
            :
            <Text color='#0798F8'>
              {nickname === '' ? shortAddress(address) : nickname}
            </Text>
          }
          <Text color='#425365' mx={3}>own this outfit</Text>
        </Flex>
      </Flex>
    </Flex>
  )
}

export function onDownloadAvatar(avatar: any, loot_id: any) {
  // console.info('onDownloadAvatar = ', avatar);
  downloadPic(pngBaseUrl + avatar, loot_id + ".png")
}

function downloadPic(src: string, imgName: string) {
  const link = document.createElement('a');
  axios.get(src, {
    responseType: 'blob',
  }).then((res) => {
    link.href = URL.createObjectURL(res.data)
    link.download = imgName;
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link);
  })
}

export function toastSuccess(toast: any, msg: string, description?: string) {
  toast({
    title: msg,
    description: description,
    position: 'top-left',
    status: "success",
    duration: 9000,
    isClosable: true,
  })
}

export function toastCopyShareUrl(toast: any, msg: string, description: string) {
  toast({
    title: msg,
    description: description,
    position: 'bottom',
    status: "success",
    duration: 9000,
    isClosable: true,
  })
}

export function toastInfo(toast: any, msg: string) {
  toast({
    title: msg,
    position: 'top-left',
    status: "info",
    duration: 9000,
    isClosable: true,
  })
}

export function toastError(toast: any, msg: string, description?: string) {
  toast({
    title: msg,
    description: description,
    position: 'top-left',
    status: "error",
    duration: 9000,
    isClosable: true,
  })
}


function onClickLike(): void {
  throw new Error("Function not implemented.");
}

