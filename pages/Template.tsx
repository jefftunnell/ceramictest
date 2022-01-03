import { Center, Flex, Text, Tooltip, useToast } from "@chakra-ui/react"
import { NextPage } from "next"
import Link from 'next/link'
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useUpdate } from "react-use";
import { PageHead } from "../components/Common";
import Header, { currUserAccount } from "../components/Header";
import { JUMP_TO } from "../util/consts";

let addressList: any = [];

const Template: NextPage = (props: any) => {

  const router = useRouter();
  const update = useUpdate();
  const toast = useToast();
  const [isDisplayRank, setIsDisplayRank] = useState('flex');

  useEffect(() => {
    addressList = [];
    getAddress();
  }, []);

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

  // ROOT
  return (
    <Flex direction='column'>
      {PageHead(router)}
      <Center>
        {/* {oneActivity(data)} */}
      </Center>
    </Flex>
  )
}

export default Template