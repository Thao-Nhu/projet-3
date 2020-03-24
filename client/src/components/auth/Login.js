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
                    
                    <div className="form-field-item">
                        <div className="form-field-item-label"><label>Email</label></div>
                        <div className="form-field-item-input">
                            <input type="email" name="email" value={this.state.email} onChange={e=>this.handleChange(e)}/>
                        </div>  
                    </div>

                    <div className="form-field-item">
                        <div className="form-field-item-label"><label>Password</label></div>
                        <div className="form-field-item-input">
                            <input type="password" name="password" value={this.state.password} onChange={e=>this.handleChange(e)}/>
                        </div>
                    </div>
                    
                    <div className="sign-up-div"><button className="sign-up-button">Log In</button></div>
                </form>
                <div className="message">
                    Don't have an account ? <Link className="button" to={"/signup"}>Sign up</Link>
                </div>
                
            </div>
        )
    }
}
export default withRouter(Login);