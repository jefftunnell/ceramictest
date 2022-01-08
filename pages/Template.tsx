import { Center, Flex, Text, Tooltip, useToast } from "@chakra-ui/react"
import { NextPage } from "next"
import Link from 'next/link'
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useUpdate } from "react-use";
import { Footer, PageHead } from "../components/Common";
import Header from "../components/Header";
import { connected, JUMP_TO } from "../util/consts";
import { EventSubscribe } from "../util/EventEmiter";
import { selectedAccount, web3 } from "../util/web3Modal";

let addressList: any = [];

const Template: NextPage = (props: any) => {

  const router = useRouter();
  const update = useUpdate();
  const toast = useToast();
  const [isDisplayRank, setIsDisplayRank] = useState('flex');

  useEffect(() => {
    console.log("--> Template : web3 : ", web3);
    console.log("--> Template : selectedAccount : ", selectedAccount);
    
    addressList = [];

    if (web3) {
      getAddress();
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

  // ROOT
  return (
    <Flex direction='column' minHeight='100vh'>
      {PageHead(router)}
      <Center>
        <Text fontSize={'2xl'}>
          This a page
        </Text>
      </Center>
      <Footer />
    </Flex>
  )
}

export default Template