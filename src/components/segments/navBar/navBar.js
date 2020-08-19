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
        }
    }
    componentDidMount()
    {
        this.setState({videoId : this.props.videoId});
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
        fetch(process.env.REACT_APP_BASE_URL + "/movie/searchMovie/"+ key, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
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
                        <div className="menu-items">
                            <ul className="menu-item-list">
                                <a href="/" className="nav">Home</a>
                                <a className="nav">Channel</a>
                                <a className="nav">Videos</a>
                            </ul>
                        </div>
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
                            <div className="profile"> 
                                <div className="account-icon"><MaterialIcon icon="account_circle" size={44} color="black"/></div>
                                <div className="profile-name">{this.state.name}</div>
                                <MaterialIcon icon="arrow_drop_down" size={30} color="black"/>
                            </div>
                        </div></Col>
                        <Col md={1} ></Col>
                </Row>
                </div>

          )
    }
}
export default NavBar;