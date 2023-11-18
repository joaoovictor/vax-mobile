import React from 'react'
import { Box, VStack, View, Image, HStack, Icon, Divider, Button, Text } from 'native-base'
import { Feather } from '@expo/vector-icons';
import { TextInput } from 'react-native';

export function Profile({ navigation }) {
  return (
    <VStack flex={1}>
      <Box flex={1} borderBottomRadius={80} bg='info.300' alignItems={'center'}>
        <Image alt='Foto do perfil' marginTop={10} borderRadius={18} size={'xl'} source={{ uri: "https://t.ctcdn.com.br/BJyPkubCHjm_RTDyKdQw9IVisFE=/400x400/smart/i490892.jpeg" }} />
      </Box>
      <VStack space={15} marginTop={5} flex={1}>

        <HStack alignItems={'center'} marginX={8}>
          <Feather name="user" size={24} color="gray" />
          <TextInput value='Guilherme Ferreira' style={{fontFamily: 'Lato_400Regular', flex: 1, textAlign: 'center'}}/>
        </HStack>
        <Divider />
        <HStack alignItems={'center'} marginX={8}>
          <Feather name="calendar" size={24} color="gray" />
          <TextInput value="05/05/2003" style={{fontFamily: 'Lato_400Regular', flex: 1, textAlign: 'center'}} />
        </HStack>
        <Divider />
        <HStack alignItems={'center'} marginX={8}>
          <Feather name="home" size={24} color="gray" />
          <TextInput value='05186-230' style={{fontFamily: 'Lato_400Regular', flex: 1, textAlign: 'center'}}/>
        </HStack>
        <Divider />
        <HStack alignItems={'center'} marginX={8}>
          <Feather name="git-branch" size={24} color="gray" />
          <TextInput value='Masculino' style={{fontFamily: 'Lato_400Regular', flex: 1, textAlign: 'center'}}/>
        </HStack>
        <Divider />
      </VStack>
      <VStack flex={1} marginX={20}>
          <Button height={57} size="lg" bg="info.300" marginTop={20}>
            <Text fontFamily={'Lato_700Bold'} color={'white'}> Editar perfil</Text>  
          </Button> 
      </VStack>
    </VStack>
  )
}