import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { extendTheme } from "@chakra-ui/react"
import { ChakraProvider } from "@chakra-ui/react"
import { COLOR_BG_BODY } from '../util/consts';

const theme = extendTheme({
  styles: {
    global: {
      // styles for the `body`
      body: {
        bg: { COLOR_BG_BODY },
        color: "black",
        fontFamily: 'poppins',
      },
    },
  },
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <Component {...pageProps} />
    </ChakraProvider>
  )
}

export default MyApp
