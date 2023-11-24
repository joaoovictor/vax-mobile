import React, { useState } from 'react';
import { Box, useToast, Heading, Button, Input, FormControl, VStack, Center, Select, CheckIcon } from 'native-base';
import * as Yup from 'yup';
import UserService from '../services/UserService';


export function Cadastro({navigation}) {
  const [genero, setGenero] = useState("");
  const toast = useToast()
  const [formValues, setFormValues] = useState({
    email: '',
    senha: '',
    nome: '',
    dataNascimento: '',
    cep: '',
    genero: ''
  });
  const [errors, setErrors] = useState({});

  const validateForm = async () => {
    const schema = Yup.object().shape({
      email: Yup.string().email("O email deve ser válido!").required("Email é obrigatório!"),
      senha: Yup.string().min(6, "A senha deve ter no mínimo 6 caracteres!"),
      nome: Yup.string().min(5, "Insira seu nome e sobrenome!"),
      cep: Yup.number().typeError("Digite um CEP válido!").max(99999999, "O cep deve possuir 8 dígitos!"),
    });

    try {
      await schema.validate(formValues, { abortEarly: false });
      setErrors({});
      return true;
    } catch (error) {
      const newErrors = {};
      error.inner.forEach((e) => {
        newErrors[e.path] = e.message;
      });
      setErrors(newErrors);
      return false;
    }
  };

  const handleSubmitForm = async () => {
    const isValid = await validateForm();

    if (isValid) {
      console.log("Form is valid");
      console.log(formValues)
      await UserService.createUser(formValues)
      .then(() => navigation.navigate('Login'))
    } else {
      toast.show({
        render: () => {
          return <Box bg="red.500" px="2" py="1" rounded="sm" mb={5}>
                  Falha ao sair!
                </Box>;
        }
      });
    }
  };

  return (
    <Center w="100%">
      <Box safeArea p="2" w="90%" maxW="290" py="8">
        <Heading fontFamily={'Lato_700Bold'} size="lg" color="coolGray.800" _dark={{ color: "warmGray.50" }}>
          Boas vindas
        </Heading>
        <Heading mt="1" color="coolGray.600" _dark={{ color: "warmGray.200" }} size="xs" fontFamily={"Lato_300Light"}>
          Se cadastre para continuar!
        </Heading>
        <VStack space={3} mt="5">
          <FormControl isInvalid={!!errors.email}>
            <FormControl.Label>Email</FormControl.Label>
            <Input
              onChangeText={(value) => setFormValues({ ...formValues, email: value })}
              onBlur={validateForm}
            />
            <FormControl.ErrorMessage>{errors.email}</FormControl.ErrorMessage>
          </FormControl>
          <FormControl isInvalid={!!errors.senha}>
            <FormControl.Label>Senha</FormControl.Label>
            <Input
              type="password"
              onChangeText={(value) => setFormValues({ ...formValues, senha: value })}
              onBlur={validateForm}
            />
            <FormControl.ErrorMessage>{errors.senha}</FormControl.ErrorMessage>
          </FormControl>
          <FormControl isInvalid={!!errors.nome}>
            <FormControl.Label>Nome e Sobrenome</FormControl.Label>
            <Input
              onChangeText={(value) => setFormValues({ ...formValues, nome: value })}
              onBlur={validateForm}
            />
            <FormControl.ErrorMessage>{errors.nome}</FormControl.ErrorMessage>
          </FormControl>
          <FormControl isInvalid={!!errors.dataNascimento}>
            <FormControl.Label>Data de Nascimento</FormControl.Label>
            <Input
              onChangeText={(value) => setFormValues({ ...formValues, dataNascimento: value })}
              onBlur={validateForm}
            />
            <FormControl.ErrorMessage>{errors.dataNascimento}</FormControl.ErrorMessage>
          </FormControl>
          <FormControl isInvalid={!!errors.cep}>
            <FormControl.Label>CEP</FormControl.Label>
            <Input
              onChangeText={(value) => setFormValues({ ...formValues, cep: value })}
              onBlur={validateForm}
            />
            <FormControl.ErrorMessage>{errors.cep}</FormControl.ErrorMessage>
          </FormControl>
          <Box maxW="300">
            <FormControl.Label>Gênero</FormControl.Label>
            <Select
              selectedValue={genero}
              minWidth="200"
              accessibilityLabel="Choose Service"
              placeholder="Choose Service"
              _selectedItem={{
                bg: "teal.600",
                endIcon: <CheckIcon size="5" />
              }}
              mt={1}
              onValueChange={(itemValue) => {
                setGenero(itemValue)
                setFormValues({ ...formValues, genero: itemValue })
              }}
            >
              <Select.Item label="Masculino" value="Masculino" />
              <Select.Item label="Feminino" value="Feminino" />
            </Select>
          </Box>
          <Button mt="2" bg='info.400' onPress={handleSubmitForm}>
            Cadastrar
          </Button>
        </VStack>
      </Box>
    </Center>
  );
}
