import React from 'react';
import { Box, Heading, View, Avatar, Container, Text, VStack, HStack, Menu, Pressable, HamburgerIcon, IconButton } from 'native-base';
import { Banner } from './Banner';
import { Feather, FontAwesome5 } from "@expo/vector-icons";


export function Home() {
  return (
    <VStack paddingTop={20} flex={1} space={60} bg="#EFEFEF">
      <HStack alignItems='center' justifyContent='space-around'>
        <Avatar
          source={{
            uri: "https://pbs.twimg.com/profile_images/1369921787568422915/hoyvrUpc_400x400.jpg"
          }}
        >
          SS
          <Avatar.Badge bg="green.500" />
        </Avatar>
        <Text fontFamily="Lato_700Bold">Home</Text>
        <Menu w="190" trigger={triggerProps => {
          return <Pressable accessibilityLabel="More options menu" {...triggerProps}>
            <HamburgerIcon />
          </Pressable>;
        }}>
          <Menu.Item>Arial</Menu.Item>
          <Menu.Item>Nunito Sans</Menu.Item>
          <Menu.Item>Roboto</Menu.Item>
          <Menu.Item>Poppins</Menu.Item>
          <Menu.Item>SF Pro</Menu.Item>
          <Menu.Item>Helvetica</Menu.Item>
          <Menu.Item isDisabled>Sofia</Menu.Item>
          <Menu.Item>Cookie</Menu.Item>
        </Menu>
      </HStack>

      <VStack space="1" marginX={9}>
        <VStack>
          <Text fontSize={24} fontFamily='Lato_300Light'>Olá,</Text>
          <Heading fontSize={36} fontFamily='Lato_900Black'>Guilherme! 💊</Heading>
        </VStack>
      </VStack>

      <View alignSelf={'center'}>
        <Banner />
      </View>

      <HStack alignItems="center" space={30} marginY={20} marginX={10}>
        <View flex={2} height={95}>
          <IconButton bg="white" flex={1} size={'lg'} variant="solid" _icon={{
            as: Feather,
            name: "user", 
            color: "info.300"
          }} />
        </View>
        <View flex={2}>
          <IconButton bg="white" flex={1} height={95} size={'lg'} variant="solid" _icon={{
            as: FontAwesome5,
            name: "syringe", 
            color: "info.300"
          }} />
        </View>
        <View flex={2}>
          <IconButton bg="white" flex={1} height={95} size={'lg'} variant="solid" _icon={{
            as: Feather,
            name: "info",
            color: "info.300"
          }} />
        </View>

      </HStack>
    </VStack>
  )
}