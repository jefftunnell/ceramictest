import {
  Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel,
  Box, Button, Center, Flex, Spacer, Text, Tooltip, useToast
} from "@chakra-ui/react"
import { NextPage } from "next"
import Link from 'next/link'
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useUpdate } from "react-use";
import { CommonButton, PageHead } from "../components/Common";
import Header from "../components/Header";
import { web3Provider } from "../util/connectors";
import { connected, JUMP_TO, ost, w_mobile, w_pc, xp } from "../util/consts";
import { EventSubscribe } from "../util/EventEmiter";
import { selectedAccount, web3 } from "../util/web3Modal";
import useTranslation from "next-translate/useTranslation";

let addressList: any = [];

const Home: NextPage = (props: any) => {

  const router = useRouter();
  const update = useUpdate();
  const toast = useToast();
  const [isDisplayRank, setIsDisplayRank] = useState('flex');
  const { t } = useTranslation('common');

  useEffect(() => {
    console.log("--> Home : web3 : ", web3);
    console.log("--> Home : selectedAccount : ", selectedAccount);

    addressList = [];

    // if (web3) {
    //   getAddress();
    // }
  }, [selectedAccount]);

  EventSubscribe(connected, (data: any) => {
    update();
  }, "Home");

  async function getAddress() {

    let result = await apiAddress();
    // console.info('--> getAddress = ', result);

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

  function goDashboard() {
    router.push('/Dashboard');
  }

  // ROOT
  return (
    <Center>
      <Flex direction='column' w={[w_mobile, w_pc]}>
        <Text mt={20}>{t('before_word')}</Text>
        <Text my={6} fontSize={'2xl'}>{t('question')}</Text>

        <Text mb={5} fontSize={'2xl'}>{t('slogan')}</Text>
        <Text mb={2} fontWeight={'bold'}>- Find. 发现事物的本质。</Text>
        <Text mb={5}>核电站是最安全的清洁能源吗？人类可以避免下一次大流行疾病吗？</Text>
        <Text mb={2} fontWeight={'bold'}>- Act. 学习新的知识。</Text>
        <Text mb={5}>研发新一代的核电技术。了解人类对抗疾病的原理，掌握DNA编辑技术。</Text>
        <Text mb={2} fontWeight={'bold'}>- Change. 你变得更棒！世界变得更好！。</Text>
        <Text mb={5}>核能发电成为人类的主要能源，避免气候灾难。人类寿命得以延长，生活环境更加健康。</Text>

        <Text my={5} fontSize={'2xl'}>让我们开始一段旅程！ Let&#39;s start a journey!</Text>

        <Accordion id="acc" allowMultiple w={['85vw', '20vw']}>
          <AccordionItem>
            <AccordionButton>
              <Text fontWeight={'bold'} mr={10}>Over 18 years old</Text>
              <Spacer />
              <AccordionIcon />
            </AccordionButton>
            <AccordionPanel>
              <Flex direction='column' ml={10}>
                <Flex my={5}>
                  <Text mr={10}>{xp}: 0</Text>
                  <Text>{ost}: 0</Text>
                </Flex>

                <Flex mb={6}>{CommonButton('核能工程师 -->', goDashboard)}</Flex>
                <Flex mb={6}>{CommonButton('DNA工程师 -->', goDashboard)}</Flex>
              </Flex>
            </AccordionPanel>
          </AccordionItem>

          <AccordionItem>
            <AccordionButton>
              <Text fontWeight={'bold'} mr={10}>Less than 18 years old</Text>
              <Spacer />
              <AccordionIcon />
            </AccordionButton>
            <AccordionPanel>
              <Flex direction='column' ml={10}>
                <Flex my={5}>
                  <Text mr={10}>{xp}: 0</Text>
                  <Text>{ost}: 0</Text>
                </Flex>

                <Flex mb={6}>{CommonButton('核能小学生 -->', goDashboard)}</Flex>
                <Flex mb={6}>{CommonButton('DNA小学生-->', goDashboard)}</Flex>
              </Flex>
            </AccordionPanel>
          </AccordionItem>
        </Accordion>

      </Flex>
    </Center>
  )
}

export default Home