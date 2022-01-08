import type { NextPage } from 'next'
import Head from 'next/head'
import React from 'react'
import { Flex } from '@chakra-ui/react'
import Home from '../pages/Home'
import Header from '../components/Header'
import { Footer } from '../components/Common'

const Index: NextPage = (props: any) => {
  // console.info('Index: NextPage = ', props)

  // let backupImg = 'https://api.lootswag.io/images/lootswag/avatars/og/male/2-1636122727850.png';
  // let imageUrl, data, label: any;
  // if (props.data.result === 'NO') {
  //   imageUrl = backupImg;
  //   label = 'Loot #2';
  // } else {
  //   data = props.data.lootInfo;
  //   let url = props.data.shareAvatarUrl;

  //   if (url === '') {
  //     imageUrl = backupImg;
  //   } else {
  //     imageUrl = pngBaseUrl + url;
  //   }

  //   label = getLootLabel(data.loot_type, data.loot_id).lootLabel;
  //   // console.info('imageUrl = ', imageUrl)
  //   // console.info('label = ', label)
  // }

  return (
    <div>
      <Head>
        <title>OurInsight</title>
        <link rel="icon" href="/favicon.ico" />

        {/* <meta property="og:type" content="website" />
        <meta property="og:title" content={"Loot share - " + label} />
        <meta property="og:description" content="This is a loot avatar share from Loot Swag." />
        <meta property="og:image" content={imageUrl} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@LootSwag" />
        <meta name="twitter:creator" content="@LootSwag" /> */}
      </Head>

      <Flex direction='column' minHeight='100vh'>
        <Header />
        <Flex height='180px' />
        <Home {...props.data} />
        <Footer />
      </Flex>
    </div>
  )
}

// export async function getServerSideProps(context: any) {
//   let url = apiBaseUrl + 'shareInfo?shareId=' + context.query["shareId"];
//   let resp = await axios.get(url) as any;
//   if (resp && resp.data.code === 1) {
//     return { props: { data: resp.data.data } }
//   } else {
//     return { props: { data: { result: 'NO' } } }
//   }
// }

export default Index
