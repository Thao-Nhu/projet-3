import React from 'react';
import AuthService from './auth-service';
import {Link, withRouter} from 'react-router-dom';
import NavBar from '../NavBar.js';
class Signup extends React.Component{

    constructor(props){
        super(props);
        this.state={
            firstname:"",
            lastname:"",
            phonenumber:"",
            email:"",
            password:""
        };
        this.service=new AuthService()
    }

    handleFormSubmit=(event)=>{
        event.preventDefault();
        
        const firstname=this.state.firstname;
        const lastname=this.state.lastname;
        const phonenumber=this.state.phonenumber;
        const email=this.state.email;
        const password=this.state.password;

        
        this.service.signup(firstname, lastname,phonenumber,email,password)
        .then(response=>{
            this.setState({
                firstname:"",
                lastname:"",
                phonenumber:"",
                email:"",
                password:""
            })
            this.props.getUser(response);
            //console.log("response sign up",response)
            this.props.history.push("/profile");
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
                        <div className="form-field-item-label"><label>First Name</label></div>
                        <div className="form-field-item-input">
                            <input type="text" name="firstname" value={this.state.firstname} onChange={e=>this.handleChange(e)}/>
                        </div>
                    </div>

                    <div className="form-field-item">
                        <div className="form-field-item-label"><label>Last Name</label></div>
                        <div className="form-field-item-input">
                            <input type="text" name="lastname" value={this.state.lastname} onChange={e=>this.handleChange(e)}/>
                        </div>
                    </div>

                    <div className="form-field-item">
                        <div className="form-field-item-label"><label>Phone Number</label></div>
                        <div className="form-field-item-input">
                            <input type="text" name="phonenumber" value={this.state.phonenumber} onChange={e=>this.handleChange(e)}/>
                        </div>
                    </div>

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

                    <div className="sign-up-div"><button className="sign-up-button">SIGN UP</button></div>
                </form>
                <div className="message">
                    Already have an account ? <Link className="button" to={"/login"}>LOG IN</Link>
                </div>
            </div>
        )
    }
}
export default withRouter(Signup);