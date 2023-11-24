import React, { useState } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { Checkbox,  useToast, Box, Button } from 'native-base';
import { dataVacinas } from '../utils/mockdata';
import VacinaService from '../services/VacinaService';

const VacinaScreen = () => {
  const [vaccineStatus, setVaccineStatus] = useState({});
  const toast = useToast() 
  const handleCheckboxChange = (vaccineId) => {
    setVaccineStatus((prevStatus) => ({
      ...prevStatus,
      [vaccineId]: !prevStatus[vaccineId],
    }));
  };


  const handleSaveChanges = () => {
    const vaccineArray = Object.keys(vaccineStatus).map((id) => ({
      id: Number(id),
      status: vaccineStatus[id],
    }));
  
    const vaccines = VacinaService.updateVacinas(vaccineArray)
    if(vaccines){
      toast.show({
        render: () => {
          return <Box bg="emerald.500" px="2" py="1" rounded="sm" mb={5} >
                  <Text color='white'> Gravado com sucesso! </Text>
                </Box>;
        }
      });
    } else {
      toast.show({
        render: () => {
          return <Box bg="red.500" px="2" py="1" rounded="sm" mb={5}>
                  Falha ao atualizar!
                </Box>;
        }
      });
    }

  };

  return (
    <ScrollView>
      {dataVacinas.map((vaccine) => (
        <View key={vaccine.id} style={{ alignItems: 'center' }}>
          <View style={{padding: 20 ,width: 300, height: 100, backgroundColor: '#dddd', borderRadius: 15, marginBottom: 10, alignItems: 'center', justifyContent: 'center' }}>
            <Text style={{ fontFamily: 'Lato_700Bold', fontSize: 16 }}>{vaccine.nome}</Text>
            <Text>{vaccine.descricao}</Text>
            <Checkbox isChecked={vaccineStatus[vaccine.id]} onChange={() => handleCheckboxChange(vaccine.id)}>
              <Text aria-label='Tomou' style={{ fontSize: 16 }}>Tomou</Text>
            </Checkbox>
          </View>
        </View>
      ))}
      <View style={{ alignItems: 'center' }}>
        <Button mt="2" bg='info.400' onPress={handleSaveChanges}>
        Salvar Alterações  
      </Button>
      </View>
    </ScrollView>
  );
};

export default VacinaScreen;
