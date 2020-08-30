import React from 'react';
import './channelDetails.scss';
import { Container, Row, Col } from 'react-bootstrap';
import NavBar from '../../segments/navBar/navBar';
import MaterialIcon, {colorPalette} from 'material-icons-react';
import UsersWatched from '../../segments/usersWatched/usersWatched';
import ChannelVideos from '../../segments/channelVideos/channelVideos';

import FooterBar from '../../segments/footerBar/footerBar';
import PopularChannels from '../../segments/popularChannels/popularChannels';

class ChannelDetails extends React.Component{
    constructor(props)
    {
        super(props);
        this.state = {
            channelName : "",
            id : "",
            logoUrl : "",
            status : "",
            subscribers : "",
            about : "",
        }
    }
    componentDidMount()
    {
        fetch(process.env.REACT_APP_BASE_URL + "/services/channel/currentChannel/"+this.props.channelId + "/" + localStorage.getItem("mobile"), {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'Authorization' : 'JWT ' + localStorage.getItem("token"),
            },
          })
            .then(res => res.json())
            .then(json => {
                console.log("HELLO");
                console.log(json);
                this.setState({channelName : json[0].channelName , id : json[0].id , logoUrl : json[0].logoUrl , status : json[0].status , subscribers : json[0].subscribers , about : json[0].channelDesc});
            });
        this.setState({videoId : this.props.videoId});
    }
    callSubscribeApi(context)
        {
            fetch(context ? process.env.REACT_APP_BASE_URL + "/services/channel/removeSubscriber/" +this.state.id+"/"+localStorage.getItem("mobile") : process.env.REACT_APP_BASE_URL + "/services/channel/addSubscriber/"+this.state.id+"/"+localStorage.getItem("mobile"), {
                method: 'GET',
                headers: {
                  'Content-Type': 'application/json',
                  'Authorization' : 'JWT ' + localStorage.getItem("token"),
                },
              })
                .then(res => res.text())
                .then(json => {
                    this.updateCardChannel();
                });
        }
        updateCardChannel()
        {
            
            fetch(process.env.REACT_APP_BASE_URL + "/services/channel/currentChannel/" +this.state.id +"/"+localStorage.getItem("mobile"), {
                method: 'GET',
                headers: {
                  'Content-Type': 'application/json',
                  'Authorization' : 'JWT ' + localStorage.getItem("token"),
                },
              })
                .then(res => res.json())
                .then(json => {
                    this.setState({status : json[0].status,subscribers : json[0].subscribers})
                }); 
        }
    render(){
        return(
            <div className="video-details-main">
                <Container fluid>
                <NavBar />
                    <Row>
                    <Col md={1}></Col>
                    <Col md={10}>
                        <div className="channel-c">
                            <img
                            className="image-channel"
                            src={"https://specials-images.forbesimg.com/imageserve/5ef0abe1ea0f2c00067cf5ea/960x0.jpg?fit=scale"}
                            alt="First slide"
                            >
                            </img>
                            <div className="blur-channel-1"></div>
                            <div className="blur-channel-2"></div>
                        </div>
                    </Col>
                    
                    <Col md={1}></Col>
                    <Col md={1}></Col>
                    <Col md={5}>
                        <div className="channel-details-c">
                            <div className="channel-logo">
                            <img className="channel-logo-image" src={this.state.logoUrl}></img></div>
                            <div style={{float:"left"}}>
                                <div className="channel-name-details">{this.state.channelName}</div>
                                
                                <div className="channel-subscribers-details">{this.state.subscribers} Subscribers</div>
                                {
                                    this.state.status == "subscribed"
                                    ?
                                    <div className="channel-status-details-outline" onClick={() => this.callSubscribeApi(true)}>Subscribed</div>
                                    :
                                    <div className="channel-status-details-full" onClick={() => this.callSubscribeApi(false)}>Subscribe</div>
                                }
                                
                            </div>
                        </div>
                    </Col>
                    <Col md={5}>
                        <div className="channel-details-c-desc">
                            <div className="channel-details-c-desc-title">About</div>
                            <div className="channel-details-c-desc-main">{this.state.about}</div>
                        </div>
                    </Col>
                    <Col md={1}></Col>
                    </Row>
                    <Row>
                        <Col md={1}></Col>
                        <Col style={{display:"flex",justifyContent:"start",paddingLeft:"0px"}} md={10}><div className="users-watched-title">Channel Videos</div></Col>
                        <Col md={1}></Col>
                    </Row>
                    
                    <Row>
                            <Col style={{display:"flex",justifyContent:"start",paddingLeft:"0px",paddingRight:"0px"}} md={12}>
                                
                                        <ChannelVideos key={this.state.id} channelId={this.state.channelId}/>
                                    
                            </Col>
                    </Row>
                    <Row>
                        <Col md={1}></Col>
                        <Col style={{display:"flex",justifyContent:"start",paddingLeft:"0px"}} md={10}><div className="users-watched-title">Popular Videos</div></Col>
                        <Col md={1}></Col>
                    </Row>
                    
                    <Row>
                            <Col style={{display:"flex",justifyContent:"start",paddingLeft:"0px",paddingRight:"0px"}} md={12}>
                                
                                        <UsersWatched/>
                                    
                            </Col>
                    </Row>
                    <Row>
                        <Col md={1}></Col>
                        <Col style={{display:"flex",justifyContent:"start",paddingLeft:"0px"}} md={10}><div className="users-watched-title">Popular Channels</div></Col>
                        <Col md={1}></Col>
                    </Row>
                    <Row>
                            <Col style={{display:"flex",justifyContent:"start",paddingLeft:"0px",paddingRight:"0px"}} md={12}>
                                
                                        <PopularChannels key={this.state.key} disable={this.state.id}/>
                                    
                            </Col>
                    </Row>
                   
                    <Row>
                        <Col md={1}></Col>
                            <Col style={{display:"flex",justifyContent:"start",paddingLeft:"0px",paddingRight:"0px"}} md={10}>
                                
                                        <FooterBar/>
                                    
                            </Col>
                        <Col md={1}></Col>
                    </Row>
                </Container>
            </div>

          )
    }
}
export default ChannelDetails;