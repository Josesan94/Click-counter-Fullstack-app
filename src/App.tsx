import {useState} from 'react'
import { ChakraProvider } from '@chakra-ui/react'
import { Flex } from '@chakra-ui/react';
import DefaultButton from './components/Button';

function App() {



  return (
    <ChakraProvider>
      <Flex  margin={40} alignItems={'center'} justifyContent='center' flexDirection={'column'}>
      <DefaultButton />
      </Flex>
    </ChakraProvider>
  )
}

export default App
