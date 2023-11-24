import { useEffect, useState } from 'react';
import { Box, useToast, Heading, View, Avatar, Text, VStack, HStack, Menu, Pressable, HamburgerIcon, IconButton } from 'native-base';
import { Banner } from './Banner';
import { Feather, FontAwesome5 } from "@expo/vector-icons";
import UserService from '../services/UserService';

export function Home({ navigation }) {

  const [userData, setUserData] = useState(null)
  const toast = useToast();

  const handleDeleteAccount = async () => {
    const response = UserService.deleteUser(userData.id)
    if(response){
      await UserService.deleteUserKeyFromAsyncStorage()
      navigation.navigate('Login')
      toast.show({
        render: () => {
          return <Box bg="emerald.500" px="2" py="1" rounded="sm" mb={5} >
                  <Text color='white'> Conta apagada com sucesso! </Text>
                </Box>;
        }
      });
    }else {
      toast.show({
        render: () => {
          return <Box bg="red.500" px="2" py="1" rounded="sm" mb={5}>
                  Falha ao apagar a conta!
                </Box>;
        }
      });
    }
  }

  const logout = async () => {
    const response = await UserService.deleteUserKeyFromAsyncStorage()
    if(response){
      navigation.navigate('Login')
      toast.show({
        render: () => {
          return <Box bg="emerald.500" px="2" py="1" rounded="sm" mb={5} >
                  <Text color='white'> Deslogado com sucesso! </Text>
                </Box>;
        }
      });
    } else {
      toast.show({
        render: () => {
          return <Box bg="red.500" px="2" py="1" rounded="sm" mb={5}>
                  Falha ao sair!
                </Box>;
        }
      });
    }
  }

  const updateUserData = async () => {
    const data = await UserService.readDataUser()
    setUserData(data)
    console.log(data)
  }

  useEffect(() => {
    updateUserData()
  }, []);

    const getPrimeiraPalavra = (nomeCompleto) => {
      const partesDoNome = nomeCompleto.split(' ');
      return partesDoNome[0] || ''; // Retorna a primeira palavra ou uma string vazia se não houver nome
    };
    
  return (
    <VStack paddingTop={20} flex={1} space={60} bg="#EFEFEF">
      <HStack alignItems='center' justifyContent='space-around'>
        <Avatar
          source={{
            uri: "https://t.ctcdn.com.br/BJyPkubCHjm_RTDyKdQw9IVisFE=/400x400/smart/i490892.jpeg"
          }}
        >
          SS
          <Avatar.Badge bg="green.500" />
        </Avatar>
        <Text fontFamily="Lato_700Bold" fontSize={18}>Home</Text>
        <Menu w="190" trigger={triggerProps => {
          return <Pressable accessibilityLabel="More options menu" {...triggerProps}>
            <HamburgerIcon />
          </Pressable>;
        }}>
          <Menu.Item onPress={logout}>Logout</Menu.Item>
          <Menu.Item onPress={logout}>Deletar Conta</Menu.Item>
        </Menu>
      </HStack>

      <VStack space="1" marginX={9}>
        <VStack>
          <Text fontSize={24} fontFamily='Lato_300Light'>Olá,</Text>
          <Heading fontSize={36} fontFamily='Lato_900Black'>{userData?.nome && getPrimeiraPalavra(userData.nome) + "! 💊"}</Heading>
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
          }}
          onPress={() => navigation.navigate('Profile')}
          />
        </View>
        <View flex={2}>
          <IconButton bg="white" flex={1} height={95} size={'lg'} variant="solid" _icon={{
            as: FontAwesome5,
            name: "syringe", 
            color: "info.300"
          }} onPress={() => navigation.navigate('Vacinas')}/>
        </View>
      

      </HStack>
    </VStack>
  )
}