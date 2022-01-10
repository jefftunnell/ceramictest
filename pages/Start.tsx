import { AspectRatio, Center, Divider, Flex, SimpleGrid, Text, Tooltip, useToast } from "@chakra-ui/react"
import { NextPage } from "next"
import useTranslation from "next-translate/useTranslation";
import Link from 'next/link'
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useUpdate } from "react-use";
import { CommonButton, Footer, PageHead, ShowTabs } from "../components/Common";
import Header from "../components/Header";
import { connected, JUMP_TO, ost, w_mobile, w_pc, xp } from "../util/consts";
import { EventSubscribe } from "../util/EventEmiter";
import { selectedAccount, web3 } from "../util/web3Modal";

let addressList: any = [];

const Start: NextPage = (props: any) => {

  const router = useRouter();
  const update = useUpdate();
  const toast = useToast();
  const { t } = useTranslation('common');
  const [isPopular, setIsPopular] = useState('flex');
  const [isPending, setIsPending] = useState('none');
  const [isYours, setIsYours] = useState('none');

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

  function switchTab(doSwitch: number) {
    switch (doSwitch) {
      case 0:
        setIsPopular('flex');
        setIsPending('none');
        setIsYours('none');
        break;
      case 1:
        setIsPopular('none');
        setIsPending('flex');
        setIsYours('none');
        break;
      case 2:
        setIsPopular('none');
        setIsPending('none');
        setIsYours('flex');
        break;
    }
  }

  function oneArticle(type: string, index: number) {
    return (
      <Flex>
        <Text mb={5} color={'blue'} cursor={'pointer'} textDecoration={'underline'}>
          ({type}) 真相文章 - {index}
        </Text>
        <Text ml={10}>+10 {xp} | +20 {ost}</Text>
      </Flex>
    )
  }

  // ROOT
  return (
    <Flex direction='column' minHeight='100vh'>
      {PageHead(router)}
      <Center>
        <Flex direction='column' w={[w_mobile, w_pc]}>
          <Text fontSize={['lg', 'xl']} fontWeight={'bold'}>目标：1000 {xp} | 2000 {ost}</Text>
          <Divider my={5} />
          <Text mb={6} fontSize={['2xl', '2xl']} >Find. 发现事物的本质。</Text>
          <Text fontWeight={'bold'}>核能发电是最安全的清洁能源吗？</Text>
          <Divider my={5} />
          <Text mb={5}>这些是关于真相的文章和视频</Text>

          <Flex>
            <SimpleGrid columns={[3, 3]} spacing="50px" mb={3} mt={2}>
              {ShowTabs(0, switchTab, isPopular, t('popular'))}
              {ShowTabs(1, switchTab, isPending, t('pending'))}
              {ShowTabs(2, switchTab, isYours, t('yours'))}
            </SimpleGrid>
          </Flex>

          <Flex d={isPopular} direction='column' mt={5} >
            <Text as='i' mb={5}>这些是社区以DAO的方式产生的文章</Text>
            {oneArticle(t('popular'), 1)}
            {oneArticle(t('popular'), 2)}
          </Flex>

          <Flex d={isPending} direction='column' mt={5} >
          <Text as='i' mb={5}>社区正在审核的文章，你也可以去投票，通过即可获得奖励。</Text>
            {oneArticle(t('pending'), 1)}
            {oneArticle(t('pending'), 2)}
          </Flex>

          <Flex d={isYours} direction='column' mt={5} >
          <Text as='i' mb={5}>提交自己的成果，社区以DAO的方式审核，通过即可获得奖励。</Text>
            {oneArticle(t('yours'), 1)}
            {oneArticle(t('yours'), 2)}
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

