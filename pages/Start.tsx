import { AspectRatio, Center, Divider, Flex, SimpleGrid, Spacer, Text, Tooltip, useToast } from "@chakra-ui/react"
import { NextPage } from "next"
import useTranslation from "next-translate/useTranslation";
import Link from 'next/link'
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useUpdate } from "react-use";
import { CommonButton, Footer, NextButton, PageHead, ShowTabs } from "../components/Common";
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

  function oneArticle(title: string, level: string, publish: string, dao?: string) {
    return (
      <Flex direction={'column'}  mb={5} >
        <Text mb={1} color={'blue'} cursor={'pointer'} textDecoration={'underline'}>
          {title}
        </Text>
        <Flex fontSize={'sm'}>
          <Text fontWeight={'bold'}>难度: {level}</Text>
          <Text as='i'  ml={5}>{publish}</Text>
          <Text ml={10}>+10 {xp} | +20 {ost}</Text>
          {dao ? <Text ml={10} color={'blue'} cursor={'pointer'} textDecoration={'underline'}>DAO Vote: {dao}</Text> : <></>}
        </Flex>
      </Flex>
    )
  }

  function onStart() {
    router.push('/Start');
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
            {oneArticle('核裂变反应原理', 'L1', '科学出版社')}
            {oneArticle('可控核反应堆原理和设计', 'L2', '国家原子能机构')}
            {oneArticle('新一代行波核反应堆的发展和应用', 'L3', '国际原子能机构')}
            {oneArticle('可控热核聚变反应堆的技术障碍和突破', 'L4', '突破能源发展基金会')}
          </Flex>

          <Flex d={isPending} direction='column' mt={5} >
            <Text as='i' mb={5}>社区正在审核的文章，你也可以去投票，通过即可获得奖励。</Text>
            {oneArticle('热核聚变反应原理', 'L1', '科学出版社', '60/100')}
            {oneArticle('目前可控核裂变反应堆的缺陷', 'L2', '国际原子能机构', '80/100')}
          </Flex>

          <Flex d={isYours} direction='column' mt={5} >
            <Text as='i' mb={5}>提交自己的成果，社区以DAO的方式审核，通过即可获得奖励。</Text>
            {oneArticle('热核聚变反应堆研究', 'L1', 'You', '10/100')}
            <Flex mt={5}>
              {CommonButton('文章制作教程', onStart)}
              <Flex ml={10} />
              {CommonButton('提交文章', onStart)}
            </Flex>
          </Flex>

          <Divider my={5} />

          <Flex d={isPopular} direction='column' mt={5} >
            <Text as='i' mb={5}>这些是社区以DAO的方式产生的视频</Text>
            <Flex>
              <Text mb={5} color={'blue'} cursor={'pointer'} textDecoration={'underline'}>
                (Popular) 真相视频 - 1
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
          </Flex>

          <Flex d={isPending} direction='column' mt={5} >
            <Text as='i' mb={5}>还没有正在审核的视频，你可以制作自己的。</Text>
            <Flex mt={5}>
              {CommonButton('视频制作教程', onStart)}
              <Flex ml={10} />
              {CommonButton('提交视频', onStart)}
            </Flex>
          </Flex>

          <Flex d={isYours} direction='column' mt={5} >
            <Text as='i' mb={5}>提交自己的成果，社区以DAO的方式审核，通过即可获得奖励。</Text>
            <Flex mt={5}>
              {CommonButton('视频制作教程', onStart)}
              <Flex ml={10} />
              {CommonButton('提交视频', onStart)}
            </Flex>
          </Flex>
          <Divider my={5} />
          <Flex mt={10}>{NextButton('Next   : ACT（行动）', goLevel2)}</Flex>
        </Flex>
      </Center>
      <Footer />
    </Flex>
  )
}

export default Start

