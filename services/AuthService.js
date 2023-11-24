import api from "../config/api";
import UserService from "./UserService";

class AuthService {
  static async loginUser(body){
    try {
      const response = await api.post('/login', body)
      if(response){
        const token = response.data.token.token
        UserService.storeToken(token)
        UserService.storeDataAsyncStorage(response.data.usuario)
        return true
      } else {
        return false
      }
    }catch(e){
      console.log(e)
    }

  }
}

export default AuthService;