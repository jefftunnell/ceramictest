import { AspectRatio, Center, Divider, Flex, Text, Tooltip, useToast } from "@chakra-ui/react"
import { NextPage } from "next"
import useTranslation from "next-translate/useTranslation";
import Link from 'next/link'
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useUpdate } from "react-use";
import { CommonButton, Footer, PageHead } from "../components/Common";
import Header from "../components/Header";
import { connected, JUMP_TO, ost, w_mobile, w_pc, xp } from "../util/consts";
import { EventSubscribe } from "../util/EventEmiter";
import { selectedAccount, web3 } from "../util/web3Modal";

let addressList: any = [];

const Start: NextPage = (props: any) => {

  const router = useRouter();
  const update = useUpdate();
  const toast = useToast();
  const [isDisplayRank, setIsDisplayRank] = useState('flex');
  const { t } = useTranslation('common');

  useEffect(() => {
    // console.log("--> Start : web3 : ", web3);
    // console.log("--> Start : selectedAccount : ", selectedAccount);

    addressList = [];

    if (web3) {
      // getAddress();
    }
  }, [selectedAccount]);

  EventSubscribe(connected, (data: any) => {
    update();
  }, "Template");

  async function getAddress() {
    let result = await apiAddress();
    console.info('--> getAddress = ', result);

    if (result) {
      for (let i = 0; i < result.length; i++) {
        // test code
        result[i] = 'This is an ETH address';
        // addressList.push(onePeople(i, result[i], ButtonFollow()));
      }
      update();
    }
  }

  async function apiAddress() {
    return ['', '', '']
  }

  function goLevel2() {
    router.push('/Start');
  }

  // ROOT
  return (
    <Flex direction='column' minHeight='100vh'>
      {PageHead(router)}
      <Center>
        <Flex direction='column' w={[w_mobile, w_pc]}>
          <Text fontSize={['lg', 'xl']} fontWeight={'bold'}>Level 1 - 目标：1000 {xp} | 2000 {ost}</Text>
          <Divider my={5} />
          <Text mb={6} fontSize={['2xl', '2xl']} >Find. 发现事物的本质。</Text>
          <Text fontWeight={'bold'}>核能发电是最安全的清洁能源吗？</Text>
          <Divider my={5} />
          <Text mb={5}>这些是关于真相的文章和视频</Text>

          <Flex>
            <Text mb={5} color={'blue'} cursor={'pointer'} textDecoration={'underline'}>
              真相文章 - 1
            </Text>
            <Text ml={10}>+10 {xp} | +20 {ost}</Text>
          </Flex>

          <Flex>
            <Text mb={5} color={'blue'} cursor={'pointer'} textDecoration={'underline'}>
              真相文章 - 2
            </Text>
            <Text ml={10}>+30 {xp} | +40 {ost}</Text>
          </Flex>

          <Divider my={5} />

          <Flex>
            <Text mb={5} color={'blue'} cursor={'pointer'} textDecoration={'underline'}>
              真相视频 - 1
            </Text>
            <Text ml={10}>+30 {xp} | +40 {ost}</Text>
          </Flex>

          <AspectRatio>
            <iframe
              title='Worst Nuclear Accidents in History'
              src='https://www.youtube.com/embed/Jzfpyo-q-RM'
              allowFullScreen
            />
          </AspectRatio>

          <Flex mt={10}>{CommonButton('进入下一关', goLevel2)}</Flex>
        </Flex>
      </Center>
      <Footer />
    </Flex>
  )
}

export default Start

