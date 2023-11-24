import api from "../config/api";
import UserService from "./UserService";

class VacinaService {
  static async getAllVacinas() {
    try {
      const token = await UserService.readToken();
      if (token) {
        const config = {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token,
          },
        };
        const response = await api.get(`/form-vacinas/1`, config);
        console.log(response.data);
        return response.data;
      } else {
        console.error('Token não encontrado. Faça login para obter um token válido.');
        return null;  
      }
    } catch (e) {
      console.error(e);
      return null;  
    }
  } 
  
  static async updateVacinas(body){
    try {
      const token = await UserService.readToken()
      const config = {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token,
        },
      };
      const response = await api.put("/status-vacinas", body, config)
      console.log(response)
      return response ? true : false
    }catch(e){
      console.log(e)
    }
  }

  static async getVacinasPendendes(id){
    try {
      const token = await UserService.readToken();
      if (token) {
        const config = {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token,
          },
        };
        const response = await api.get(`/vacinas-pendententes/${id}`, config);
        console.log(response.data);
        return response.data;
      } else {
        console.error('Token não encontrado. Faça login para obter um token válido.');
        return null;  
      }
    } catch (e) {
      console.error(e);
      return null;  
    }
  }
}

export default VacinaService;
