import { baseTheme, extendTheme, Theme } from '@chakra-ui/react'

const CustomTheme = {
  config: {
    initialColorMode: 'light',
    useSystemColorMode: false,
  },
  colors: {
    brand: baseTheme.colors.blue,
  },
}

export default extendTheme(CustomTheme) as Theme
