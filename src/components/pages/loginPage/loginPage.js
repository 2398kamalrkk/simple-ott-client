import React from 'react';
import './loginPage.scss';
import ReactPlayer from 'react-player'
import { Container, Row, Col } from 'react-bootstrap';
import NavBar from '../../segments/navBar/navBar';
import { ToastContainer, toast } from 'react-toastify';

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
      signIn()
      {
        console.log("API CALLED")
        let data ={mobileNumber : document.getElementById("username").value , passWord : document.getElementById("password").value }
        fetch(process.env.REACT_APP_BASE_URL + "/login/userLogin/login/", {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body : JSON.stringify(data),
        })
          .then(res => res.json())
          .then(json => {
              if(json.status == "FAILURE")
              {
                toast.warn("Incorrect username or password");
              }
              else if(json.status == "SUCCESS")
              {
                console.log(json.token)
                localStorage.setItem("token",json.token);
                localStorage.setItem("username",json.username);
                window.location.href = "/"
              }
          });
        
      }
    render()
    {
        return(
          <div className="main-login-c">
            <div id="login">
          <div class="container">
              <div id="login-row" class="row justify-content-center align-items-center">
                  <div id="login-column" class="col-md-6">
                      <div id="login-box" class="col-md-12">
                          <form id="login-form" class="form" action="" method="post">
                              <h3 class="text-left text-label">Sign-In</h3>
                              <div class="form-group">
                                  <p for="username" class="text-left text-label">Mobile Number:</p>
                                  <input type="text" name="username" id="username" class="form-control" />
                              </div>
                              <div class="form-group">
                                  <p for="password" class="text-left text-label">Password:</p>
                                  <input type="text" name="password" id="password" class="form-control" />
                              </div>
                              <div class="form-group">
                                  {/* <label for="remember-me" class="text-info"><span>Remember me</span> <span><input id="remember-me" name="remember-me" type="checkbox" /></span></label><br /> */}
                                  <div onClick={() => {this.signIn()}} name="Sign-in" class="full-button" >Sign-in</div>
                              </div>
                              <div class="form-group">
                                  <div name="Register" class="full-button-outline" >Register</div>
                              </div>
                          </form>
                      </div>
                  </div>
              </div>
          </div>
      </div>
      </div>
        )
        }
}
export default loginPage;