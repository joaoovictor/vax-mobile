import api from "../config/api";
import AsyncStorage from '@react-native-async-storage/async-storage';

class UserService {
  static async createUser(user) {
    try {
      console.warn(user);
      const response = await api.post('/registrar', user);
      console.log(response);
    } catch (error) {
      console.error(error);
    } 
  }

  static async storeDataAsyncStorage(body){
    try {
      const jsonValue = JSON.stringify(body);
      console.log(jsonValue)
      await AsyncStorage.setItem('@USER', jsonValue);
    } catch (e) {
      console.log(e)
    }
  }

  static async storeToken(token) {
    try {
      const serializedToken = JSON.stringify(token);
      await AsyncStorage.setItem('@TOKEN', serializedToken);
    } catch (e) {
      console.log(e);
    }
  }

  static async readDataUser(){
    try {
      const value = await AsyncStorage.getItem('@USER');
      if (value !== null) {
        let data = JSON.parse(value)
        return data
      }
      return false
    } catch (e) {
      console.log(e)
    }
  }

  static async readToken() {
    try {
      const serializedToken = await AsyncStorage.getItem('@TOKEN');
      
      if (serializedToken !== null) {
        const token = JSON.parse(serializedToken);
      
        return token;
      }
      
      return false;
    } catch (e) {
      console.log(e);
    }
  }

  static async deleteUserKeyFromAsyncStorage(){
    try {
      await AsyncStorage.multiRemove(['@USER', '@TOKEN'])
    } catch(e) {
      return false
    }
    return true
  }

  static async updateUser(body, id){
    try{
      const serializedToken = await AsyncStorage.getItem('@TOKEN');
      console.log(body)
      console.debug(id)
      if (serializedToken !== null) {
        var token = JSON.parse(serializedToken);
      }
      console.log(token)
    
      const config = {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      };
      const response = await api.put(`/usuario/${id}`, body, config)
      console.log(response)
      return response;
    }catch(e){
      console.log(e)
    }
  }

  static async deleteUser(id){
    try {
      const serializedToken = await AsyncStorage.getItem('@TOKEN');
      console.log(body)
      console.debug(id)
      if (serializedToken !== null) {
        var token = JSON.parse(serializedToken);
      }
      console.log(token)
    
      const config = {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      };
      const response = await api.delete(`/usuario/${id}`, config)
      if(response){
        return true
      } else {
        return false
      }
    }catch(e){
      console.log(e)
    }
  }
  }


export default UserService;