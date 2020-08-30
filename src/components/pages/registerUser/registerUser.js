import React from 'react';
import './registerUser.scss';
import ReactPlayer from 'react-player'
import { Container, Row, Col } from 'react-bootstrap';
import NavBar from '../../segments/navBar/navBar';
import { ToastContainer, toast } from 'react-toastify';
import FooterBar from '../../segments/footerBar/footerBar';

class loginPage extends React.Component {
    constructor(props, context) {
		super(props, context);
		this.state = {
			username: '',
            password: '',
            error: '',
        };
        this.handlePassChange = this.handlePassChange.bind(this);
        this.handleUserChange = this.handleUserChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.dismissError = this.dismissError.bind(this);
	}

    dismissError() {
        this.setState({ error: '' });
      }
    
      handleSubmit(evt) {
        evt.preventDefault();
    
        if (!this.state.username) {
          return this.setState({ error: 'Username is required' });
        }
    
        if (!this.state.password) {
          return this.setState({ error: 'Password is required' });
        }
    
        return this.setState({ error: '' });
      }
    
      handleUserChange(evt) {
        this.setState({
          username: evt.target.value,
        });
      };
    
      handlePassChange(evt) {
        this.setState({
          password: evt.target.value,
        });
      }
      register()
      {
        if(document.getElementById("name").value == "")
        {
          toast.warn("Please enter nick name");
        }
        else if(document.getElementById("username").value == "")
        {
          toast.warn("Please enter mobile number");
        }
        else if(document.getElementById("password").value == "")
        {
          toast.warn("Please enter password");
        }
        else if(document.getElementById("password").value != document.getElementById("confirmpassword").value)
        {
          toast.warn("Password did not match");
        }
        else
        {
        console.log("API CALLED")
        let data ={userName : document.getElementById("name").value , mobileNumber : document.getElementById("username").value , passWord : document.getElementById("password").value }
        fetch(process.env.REACT_APP_BASE_URL + "/login/userSignUp/signUpDetails/", {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body : JSON.stringify(data),
        })
          .then(res => res.text())
          .then(json => {
              if(json == "FAILED")
              {
                toast.warn("Mobile number already registered");
              }
              else if(json == "SUCCESS")
              {
                console.log(json.token)
                window.location.href = "/"
              }
          });
        }
      }
    render()
    {
        return(
          <Container fluid style={{backgroundColor:"#000000",height:"100vh"}}>
            <Row >
            <Col style={{display:"flex",justifyContent:"start",paddingLeft:"0px",paddingRight:"0px"}} md={12}>
          <div className="main-login-c">
            <div id="login">
          <div class="container">
              <div id="login-row" class="row justify-content-center align-items-center">
                  <div id="login-column" class="col-md-6">
                      <div id="login-box" class="col-md-12">
                          <form id="login-form" class="form" action="" method="post">
                              <h3 class="text-left text-label">Sign Up</h3>
                              <div class="form-group">
                                  <input type="text" name="name" id="name" class="form-control input-box" placeholder="Nick Name"/>
                              </div>
                              <div class="form-group">
                                  <input type="text" name="username" id="username" class="form-control input-box" placeholder="Mobile number"/>
                              </div>
                              <div class="form-group">
                                  <input type="password" name="password" id="password" class="form-control input-box" placeholder="Password"/>
                              </div>
                              <div class="form-group">
                                  <input type="password" name="confirmpassword" id="confirmpassword" class="form-control input-box" placeholder="Confirm password"/>
                              </div>
                              <div class="form-group">
                                  {/* <label for="remember-me" class="text-info"><span>Remember me</span> <span><input id="remember-me" name="remember-me" type="checkbox" /></span></label><br /> */}
                                  <div onClick={() => {this.register()}} name="Sign-in" class="full-button" >Register</div>
                              </div>
                              <div class="form-group">
                                <p style={{color:"#FFDD00",fontSize:"10pt",cursor:"pointer"}} onClick={() => window.location.href = "/"}>Already an user ?</p>
                              </div>
                          </form>
                      </div>
                  </div>
              </div>
          </div>
      </div>
      </div>
      </Col>
      </Row>
       <Row style={{marginTop:"30px",marginLeft:"20px",marginRight:"0px"}}>
       <Col md={1}></Col>
           <Col style={{display:"flex",justifyContent:"start",paddingLeft:"0px",paddingRight:"0px"}} md={10}>
               
                       <FooterBar/>
                   
           </Col>
       <Col md={1}></Col>
   </Row>
    </Container>
        )
        }
}
export default loginPage;