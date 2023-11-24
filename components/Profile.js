import React, { useEffect, useState } from 'react';
import { Box, VStack, View, Image, HStack, Icon, Divider, Button, Text } from 'native-base';
import { Feather } from '@expo/vector-icons';
import { TextInput } from 'react-native';
import UserService from '../services/UserService';

export function Profile({ navigation }) {
  const [editable, setEditable] = useState(false);
  const [nome, setNome] = useState('');
  const [id, setId] = useState(null)
  const [dataNascimento, setDataNascimento] = useState('');
  const [cep, setCep] = useState('');
  const [email, setEmail] = useState('');
  const [genero, setGenero] = useState('Feminino');

  const updateUserData = async () => {
    const data = await UserService.readDataUser()
    setNome(data.nome)
    setDataNascimento(data.dataNascimento)
    setCep(data.cep)
    setEmail(data.email)
    setId(data.id)
  }

  useEffect(() => {
    updateUserData()
  }, []);

  // Função para alternar o modo de edição
  const toggleEditable = () => {
    setEditable(!editable);
  };

  const handleEditProfile = async () => {
    const obj = { nome: nome, dataNascimento: dataNascimento, cep: cep, email: email };
    const idUser = id
    try {
      await UserService.updateUser(obj, idUser);
      setEditable(false);
    } catch (error) {
      console.error('Erro ao atualizar o perfil:', error);
    }
  };


  return (
    <VStack flex={1} bg='#EFEFEF'>
      <Box flex={1} borderBottomRadius={80} bg='info.300' alignItems={'center'}>
        <Image alt='Foto do perfil' marginTop={10} borderRadius={18} size={'xl'} source={{ uri: "https://t.ctcdn.com.br/BJyPkubCHjm_RTDyKdQw9IVisFE=/400x400/smart/i490892.jpeg" }} />
      </Box>
      <VStack space={15} marginTop={5} flex={1}>
        <HStack alignItems={'center'} marginX={8}>
          <Feather name="user" size={24} color="gray" />
          <TextInput
            value={nome}
            style={{ fontFamily: 'Lato_400Regular', flex: 1, textAlign: 'center' }}
            editable={editable}
            onChangeText={(text) => setNome(text)}
          />
        </HStack>
        <Divider />
        <HStack alignItems={'center'} marginX={8}>
          <Feather name="calendar" size={24} color="gray" />
          <TextInput
            value={dataNascimento}
            style={{ fontFamily: 'Lato_400Regular', flex: 1, textAlign: 'center' }}
            editable={editable}
            onChangeText={(text) => setDataNascimento(text)}
          />
        </HStack>
        <Divider />
        <HStack alignItems={'center'} marginX={8}>
          <Feather name="home" size={24} color="gray" />
          <TextInput
            value={cep}
            style={{ fontFamily: 'Lato_400Regular', flex: 1, textAlign: 'center' }}
            editable={editable}
            onChangeText={(text) => setCep(text)}
          />
        </HStack>
        <Divider />
        <HStack alignItems={'center'} marginX={8}>
          <Feather name="git-branch" size={24} color="gray" />
          <TextInput
            value={genero}
            style={{ fontFamily: 'Lato_400Regular', flex: 1, textAlign: 'center' }}
            editable={editable}
            onChangeText={(text) => setGenero(text)}
          />
        </HStack>
        <Divider />
        <HStack alignItems={'center'} marginX={8}>
          <Feather name="inbox" size={24} color="gray" />
          <TextInput
            value={email}
            style={{ fontFamily: 'Lato_400Regular', flex: 1, textAlign: 'center' }}
            editable={editable}
            onChangeText={(text) => setEmail(text)}
          />
        </HStack>
        <Divider />
      </VStack>
      <VStack flex={1} marginX={20}>
        {editable ? (
          <Button height={57} size="lg" bg="info.300" marginTop={20} onPress={handleEditProfile}>
            <Text fontFamily={'Lato_700Bold'} color={'white'}>Salvar</Text>
          </Button>
        ) : (
          <Button height={57} size="lg" bg="info.300" marginTop={20} onPress={toggleEditable}>
            <Text fontFamily={'Lato_700Bold'} color={'white'}>Editar perfil</Text>
          </Button>
        )}
      </VStack>
    </VStack>
  );
}
