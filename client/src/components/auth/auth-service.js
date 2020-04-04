import axios from 'axios';

class AuthService {
  constructor() {
    this.service = axios.create({
      baseURL: `${process.env.REACT_APP_APIURL || ""}/auth`,
      withCredentials: true
    });
  }
  signup = (firstname, lastname,phonenumber,email,password) => {
    return this.service.post('/signup', {firstname, lastname,phonenumber,email,password})
      .then(response => response.data)
  }
  loggedin = () => {
    return this.service.get('/loggedin').then(response => response.data)
  }
  login = (email, password) => {
    return this.service.post('/login', {email, password})
    .then(response => response.data)
  }

  logout = () => {
    return this.service.post('/logout', {})
    .then(response => response.data)
  }
}

export default AuthService;