import { Box, HStack, VStack, Text, Image } from 'native-base'
import React from 'react'


export function Banner() {
  return (
    <Box width={331} height={151} backgroundColor='info.300' borderRadius={15} alignItems='center' justifyContent='center'>
      <HStack flex={1}>
        <VStack alignSelf={'center'}>
          <Text fontSize={18} fontFamily="Lato_700Bold" maxWidth={150}>Você tem algumas pendências:</Text>
          <Text fontFamily={'Lato_400Regular'}>❌Gripe</Text>
          <Text fontFamily={'Lato_400Regular'}>❌Gripe</Text>
        </VStack>
        <Image alignSelf={'flex-end'} source={require('../assets/doctor.png')} alt='Médico com ícones de hospital em sua volta e um fundo preto'/>
      </HStack>
    </Box>
  )
}