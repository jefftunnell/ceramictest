import { Center, Flex, Spacer, Text, Tooltip, useToast } from "@chakra-ui/react"
import { NextPage } from "next"
import useTranslation from "next-translate/useTranslation";
import Link from 'next/link'
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useUpdate } from "react-use";
import { CommonButton, Footer, PageHead } from "../components/Common";
import Header from "../components/Header";
import { connected, JUMP_TO, ost, w_mobile, w_pc } from "../util/consts";
import { EventSubscribe } from "../util/EventEmiter";
import { selectedAccount, web3 } from "../util/web3Modal";

let addressList: any = [];

const Dashboard: NextPage = (props: any) => {

  const router = useRouter();
  const update = useUpdate();
  const toast = useToast();
  const [isDisplayRank, setIsDisplayRank] = useState('flex');
  const { t } = useTranslation('common');

  useEffect(() => {
    console.log("--> Dashboard : web3 : ", web3);
    console.log("--> Dashboard : selectedAccount : ", selectedAccount);

    addressList = [];

    if (web3) {
      getAddress();
    }
  }, [selectedAccount]);

  EventSubscribe(connected, (data: any) => {
    update();
  }, "Dashboard");

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

  function onStart() {
    router.push('/Start');
  }

  // ROOT
  return (
    <Flex direction='column' minHeight='100vh'>
      {PageHead(router)}
      <Center>
        <Flex direction='column' w={[w_mobile, w_pc]}>
          <Flex align={'center'}>
            <Text fontSize={'2xl'} mr={10}>核能发电战场 - Dashboard</Text>
            <Flex>{CommonButton('开始战斗', onStart)}</Flex>
          </Flex>

          <Text my={5} fontWeight={'bold'}>战场人数：1000</Text>

          <Text fontSize={'xl'} mt={5}>阶段 1 - Find. 发现</Text>
          <Text mt={5}>知识库-文章：1000，阅读次数：1000，通过考核人数：10，发放奖励：100 {ost}</Text>
          <Text mt={5}>知识库-视频：1000，播放次数：1000，通过考核人数：10，发放奖励：100 {ost}</Text>

          <Text fontSize={'xl'} mt={10}>阶段 2 - Act. 行动</Text>
          <Text mt={5}>初级任务：100，完成人数：20，通过考核：10，发放奖励：100 {ost}</Text>
          <Text mt={5}>中级任务：100，完成人数：20，通过考核：10，发放奖励：100 {ost}</Text>
          
          <Text fontSize={'xl'} mt={10}>阶段 3 - Change. 改变</Text>
          <Text mt={5}>减少碳排放：1000吨，关联贡献者：20，发放奖励：1000 {ost}</Text>
          <Text mt={5}>增加发电量：100兆瓦，关联贡献者：20，发放奖励：1000 {ost}</Text>

          <Flex mt={10}>{CommonButton('开始战斗', onStart)}</Flex>
        </Flex>
      </Center>
      <Footer />
    </Flex>
  )
}

export default Dashboard

