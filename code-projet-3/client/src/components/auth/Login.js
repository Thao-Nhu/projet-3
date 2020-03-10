import React from 'react';
import AuthService from './auth-service';
import {Link,withRouter} from 'react-router-dom';
import NavBar from '../NavBar.js';
class Login extends React.Component{
    constructor(props){
        super(props);
        this.state={email:"",password:""};
        this.service=new AuthService()
    }
    handleFormSubmit=(event)=>{
        event.preventDefault();
        const email=this.state.email;
        const password=this.state.password;
        this.service.login(email,password)
        .then(response=>{
            this.setState({email:"",password:""});
            this.props.getUser(response);
            this.props.history.push("/profile")
        })
        .catch(err=>console.log(err))
    }
    handleChange=(event)=>{
        const {name,value}=event.target;
        this.setState({[name]:value})
    }
    render(){
        return(
            <div>
                <NavBar/>
                <form onSubmit={this.handleFormSubmit}>
                    
                    <div>
                        <label>Email</label>
                        <input type="email" name="email" value={this.state.email} onChange={e=>this.handleChange(e)}/>
                    </div>

                    <div>
                        <label>Password</label>
                        <input type="password" name="password" value={this.state.password} onChange={e=>this.handleChange(e)}/>
                    </div>
                    
                    <button>Log In</button>
                </form>
                <p>
                    Dont have account ?
                    <Link to={"/signup"}>Sign up</Link>
                </p>
                <Link to={"/"}>Home</Link>
            </div>
        )
    }
}
export default withRouter(Login);