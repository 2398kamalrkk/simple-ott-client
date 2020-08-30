import React from 'react';
import './navBar.scss';
import {Spinner, Container, Row, Col } from 'react-bootstrap';
import MaterialIcon, {colorPalette} from 'material-icons-react';
import SearchCard from '../searchCard/searchCard';
class NavBar extends React.Component{
    constructor(props)
    {
        super(props);
        this.state = {
            videoId : -1,
            name : "Kamal",
            searchList : [],
            focused : false,
            apiCalled : false,
            redirect : false,
            signInStatus : false,
        }
    }
    componentDidMount()
    {
        this.setState({videoId : this.props.videoId});
        if(localStorage.getItem("token") != "false")
        {
            this.setState({signInStatus : true})
        }
        
    };
    onBlur()
    {
        
        this.setState({ focused: false });
    };
    onFocus()
    {
        this.setState({ focused: true });
    }
    handleSearch(v)
    {
        if(v == "")
        {
            this.setState({searchList : [],apiCalled : false})
        }
        else
        {
            this.setState({searchList : [],apiCalled : true})
            this.callSearchApi(v)
        }
    }
    callSearchApi(key)
    {
        console.log(localStorage.getItem("token"))
        console.log(localStorage.getItem("username"))

        fetch(process.env.REACT_APP_BASE_URL + "/services/movie/searchMovie/"+ key, {
            method: 'GET',
            headers: {
              'Authorization' : 'JWT ' + localStorage.getItem("token"),
            },
          })
            .then(res => res.json())
            .then(json => {
                this.setState({searchList : json,apiCalled : false});
            });
    }
    render(){
        return(
                <div className="nav-bar" onClick={(e) => {e.stopPropagation();this.onBlur()}}>
                <Row>
                    <Col md={1} ></Col>
                    <Col md={1} style={{paddingLeft:"0px"}}><div className="logo"> LOGO</div></Col>
                    <Col md={4} >
                        <Row style={{height:"20px"}}>
                        <div className="menu-items">
                            <ul className="menu-item-list">
                                <a href="/" className="nav">Home</a>
                                {/* <a className="nav">Channel</a>
                                <a className="nav">Videos</a> */}
                            </ul>
                        </div>
                        </Row>
                        <Row style={{height:"20px"}}>
                            <div className="menu-items-highlight">
                                <ul>
                                    {
                                        this.props.fromPage == "home"
                                        ?
                                        <li className="nav-highlight whiteNav"></li>
                                        :
                                        <li className="nav-highlight blackNav"></li>

                                    }
                                    
                                    {/* {
                                        this.props.fromPage == "channel"
                                        ?
                                        <li className="nav-highlight whiteNav"></li>
                                        :
                                        <li className="nav-highlight blackNav"></li>

                                    }
                                    {
                                        this.props.fromPage == "video"
                                        ?
                                        <li className="nav-highlight whiteNav"></li>
                                        :
                                        <li className="nav-highlight blackNav"></li>

                                    } */}
                                </ul>
                            </div>
                        </Row>
                        
                        
                    </Col>
                    <Col md={4} >
                        <div className="search-box">
                        
                            <input onChange={(val) => this.handleSearch(val.target.value)} onClick={(e) => {e.stopPropagation();this.onFocus()}}   className="search-input" type="text" placeholder="Search" spellcheck="false">
                                </input>
                                {
                                    this.state.focused
                                    ?
                                    <div className="search-box-result">
                                    {
                                        this.state.searchList.length == 0
                                        ?
                                            this.state.apiCalled
                                            ?
                                                <div className="search-result-card"><div className="no-data">  <Spinner animation="border" variant="light" />
                                                </div></div>
                                            :
                                                <div className="search-result-card"><div className="no-data" >No Data</div></div>
                                        :
                                            <div></div>
                                    }

                                    {
                                    this.state.searchList.map((item) => 
                                    <div onClick={(e) => {e.stopPropagation();window.location.href="/video/"+item.id}}>
                                        <SearchCard year={item.releaseYear} name={item.videoName} genre={item.genre}poster={item.posterUrl} key={item.id}/>
                                    </div>
                                    )
                                    }
                                    </div>
                                    :
                                    <div></div>
                                }
                               
                            </div>
                        
                            
                    </Col>
                    <Col md={1} style={{paddingRight:"0px"}}>
                        <div className="profile-main">
                            {
                                this.state.signInStatus ?
                                <div>
                                    <div className="profile"> 
                                    <div className="account-icon"><MaterialIcon icon="account_circle" size={44} color="#ffdd00"/></div>
                                    <div className="profile-name">{localStorage.getItem("username")}</div>
                                    <MaterialIcon icon="arrow_drop_down" size={30} color="#ffdd00"/>
                                </div>
                                <div class="dropdown-content">
                                    {/* <a className="dropdown-content-list" href="/account">My Account</a>
                                    <a className="dropdown-content-list" href="/watchlist">My Watchlist</a> */}
                                    <a className="dropdown-content-list" href="" onClick={() => localStorage.setItem("token","false")}>Sign out</a>
                                </div>
                            </div>
                            :
                                <div className="profile"> 
                                    <div className="account-icon"><MaterialIcon icon="account_circle" size={44} color="#ffdd00"/></div>
                                    <div className="profile-name" onClick={() => window.location.href="/login"}>Login</div>
                                    <MaterialIcon icon="arrow_drop_down" size={30} color="#ffdd00"/>
                                </div>
                            }
                        </div></Col>
                        <Col md={1} ></Col>
                </Row>
                </div>

          )
    }
}
export default NavBar;