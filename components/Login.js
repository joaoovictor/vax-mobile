import { View, useToast, Center, Box, Heading, VStack, FormControl, Button, Link, HStack, Input, Text } from 'native-base'
import {useState} from 'react'
import AuthService from '../services/AuthService';

export function Login({navigation}) {
  const toast = useToast()
  const handleSubmitForm = async () => {
    try {
      const response = await AuthService.loginUser(loginValues);
      if(response){
        navigation.navigate('Home');
      } else {
        toast.show({
          render: () => {
            return <Box bg="red.500" px="2" py="1" rounded="sm" mb={5}>
                    Falha ao logar!
                  </Box>;
          }
        });
      }
    } catch (error) {
      console.error('Error during login:', error);
    }
  };


  const [loginValues, setLoginValues] = useState({
    email:'',
    senha:''
  })

  return <Center  bg={'#efefef'} flex={1}>
  <Box safeArea p="2" py="8" w="90%" maxW="290" height="90%">
    <Heading fontFamily={'Lato_700Bold'} size="lg" color="coolGray.800" _dark={{
    color: "warmGray.50"
  }}>
      Bem vindo!
    </Heading>
    <Heading mt="1" _dark={{
    color: "warmGray.200"
  }} color="coolGray.600" size="xs"  fontFamily={"Lato_300Light"}>
      Faça o login para continuar!
    </Heading>

    <VStack space={3} mt="5">
      <FormControl>
        <FormControl.Label>Email ID</FormControl.Label>
        <Input fontFamily={'Lato_400Regular'} onChangeText={(value) => setLoginValues({...loginValues, email: value})}/>
      </FormControl>
      <FormControl>
        <FormControl.Label fontFamily='Lato_400Regular'>Senha</FormControl.Label>
        <Input type="password" fontFamily={'Lato_400Regular'} onChangeText={(value) => setLoginValues({...loginValues, senha: value})}/>
        <Link _text={{
        fontSize: "xs",
        fontWeight: "500",
        color: "indigo.500", 
        fontFamily: 'Lato_400Regular'
      }} alignSelf="flex-end" mt="1">
          Esqueci minha senha
        </Link>
      </FormControl>
      <Button mt="2" bg='info.400' onPress={() => handleSubmitForm()}>
        Entrar  
      </Button>
      <HStack mt="6" justifyContent="center">
        <Text fontFamily='Lato_400Regular' fontSize="sm" color="coolGray.600" _dark={{
        color: "warmGray.200"
      }}>
          Sou um novo usuário.{" "}
        </Text>
        <Link
        onPress={() => navigation.navigate('Cadastro')}
        _text={{
        color: "indigo.500",
        fontWeight: "medium",
        fontSize: "sm",
        fontFamily: 'Lato_400Regular'
      }} href="#">
          Cadastrar
        </Link>
      </HStack>
    </VStack>
  </Box>
</Center>;
}