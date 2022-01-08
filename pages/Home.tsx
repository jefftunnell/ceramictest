import { Center, Flex, Text, Tooltip, useToast } from "@chakra-ui/react"
import { NextPage } from "next"
import Link from 'next/link'
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useUpdate } from "react-use";
import { PageHead } from "../components/Common";
import Header from "../components/Header";
import { web3Provider } from "../util/connectors";
import { connected, JUMP_TO } from "../util/consts";
import { EventSubscribe } from "../util/EventEmiter";
import { selectedAccount, web3 } from "../util/web3Modal";

let addressList: any = [];

const Home: NextPage = (props: any) => {

  const router = useRouter();
  const update = useUpdate();
  const toast = useToast();
  const [isDisplayRank, setIsDisplayRank] = useState('flex');

  useEffect(() => {
    console.log("--> Home : web3 : ", web3);
    console.log("--> Home : selectedAccount : ", selectedAccount);

    addressList = [];
    
    if (web3) {
      getAddress();
    }
  }, [selectedAccount]);

  EventSubscribe(connected, (data: any) => {
    update();
  }, "Home");

  async function getAddress() {

    // test code
    let resp = await web3.eth.getBlock(36668);
    console.log('--> PUNKS - tx info : ', resp);

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

  // ROOT
  return (
    <Flex direction='column'>
      <Center>
        <Link href='/Template'>
          <Text color='blue' cursor='pointer' fontSize={'2xl'}>
            Go to second page
          </Text>
        </Link>
      </Center>
    </Flex>
  )
}

export default Home