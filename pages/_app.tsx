import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { extendTheme } from "@chakra-ui/react"
import { ChakraProvider } from "@chakra-ui/react"
import { Web3Provider } from '@ethersproject/providers';
import { Web3ReactProvider } from '@web3-react/core'
import { COLOR_BG_BODY } from '../util/consts';

const theme = extendTheme({
  styles: {
    global: {
      // styles for the `body`
      body: {
        bg: {COLOR_BG_BODY},
        color: "black",
        fontFamily: 'poppins',
      },
    },
  },
});

function getLibrary(provider: any): Web3Provider {
  const library = new Web3Provider(provider)
  library.pollingInterval = 12000
  return library
}

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <ChakraProvider theme={theme}>
        <Component {...pageProps} />
      </ChakraProvider>
    </Web3ReactProvider>
  )
}

export default MyApp
