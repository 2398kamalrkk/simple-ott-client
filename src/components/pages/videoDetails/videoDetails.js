import React from 'react';
import './videoDetails.scss';
import { Container, Row, Col } from 'react-bootstrap';
import NavBar from '../../segments/navBar/navBar';
import MaterialIcon, {colorPalette} from 'material-icons-react';

class VideoDetails extends React.Component{
    constructor(props)
    {
        super(props);
        this.state = {
            videoId : -1,
            poster : "",
            videoType : "",
            videoName : "",
            genre : "",
            videoYear : "",
            rating : "",
            duration : "",
            videoDesc : "",
            directors : "",
            starring : "",
            subtitles : "",
            audio : "",
            publisher : "",
        }
    }
    componentDidMount()
    {
        fetch(process.env.REACT_APP_BASE_URL + "/movie/getMovie/" + this.props.videoId, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          })
            .then(res => res.json())
            .then(json => {
                console.log("HELLO");
                console.log(json);
                this.setState({poster : json.posterUrl , videoType : json.videoType , videoName : json.videoName , genre : json.genre , videoYear : json.releaseYear , rating : json.rating , duration : json.duration , videoDesc : json.description , directors : json.director , starring : json.starring , subtitles : json.subtitles , audio : json.audio , publisher : json.publisher});
            });
        this.setState({videoId : this.props.videoId});
    }
    render(){
        return(
            <div className="video-details-main">
                <Container fluid>
                <NavBar />
                    <Row>
                        <Col md={1}></Col>
                        <Col md={10}>

                            <div className="video-poster">
                            <div class="content"></div>
                            <div class="content-more"></div>
                                <img className="video-image" src={this.state.poster} ></img>
                            </div>

                                <Row><div className="video-type front">{this.state.videoType.toUpperCase()}</div></Row>
                                <Row><div className="video-name front">{this.state.videoName}</div></Row>
                                <Row >
                                    <div className="front">
                                        <div className="video-genre">{this.state.genre}</div>
                                        <div className="dot"></div>
                                        <div className="video-year">{this.state.videoYear}</div>
                                        <div className="dot"></div>
                                        <div className="video-rating">{this.state.rating}+ </div>
                                        <div className="dot"></div>
                                        <div className="video-duration">{this.state.duration}</div>
                                    </div>
                                </Row>
                                <Row>
                                    <div className="video-desc front">{this.state.videoDesc}</div>
                                </Row>
                                <Row>
                                    <div className="video-control">
                                        <div>
                                            <div style={{cursor: "pointer"}}><MaterialIcon icon="play_circle_filled" size={40} color="#ffdd00"/></div>
                                            <p className="video-details-title">Play</p>
                                        </div>
                                        <div>
                                        <div style={{cursor: "pointer"}}><MaterialIcon icon="add_circle_outline" size={40} color="#ffdd00"/></div>
                                            <p className="video-details-title">Watchlist</p>
                                        </div>
                                        <div>
                                        <div style={{cursor: "pointer"}}><MaterialIcon icon="share" size={40} color="#ffdd00"/></div>
                                            <p className="video-details-title">Share</p>
                                        </div>

                                    </div>
                                    
                                </Row>
                                <Row>
                                    <Col md={1} style={{display:"flex",justifyContent:"start",paddingLeft:"0px"}} ><div className="video-details-title">Directors </div></Col>
                                    <Col md={4} style={{display:"flex",justifyContent:"start",paddingLeft:"0px"}}><div className="video-details-value">{this.state.directors}</div></Col>
                                </Row>
                                <Row>
                                    <Col md={1} style={{display:"flex",justifyContent:"start",paddingLeft:"0px"}}><div className="video-details-title">Starring  </div></Col>
                                    <Col md={8} style={{display:"flex",justifyContent:"start",paddingLeft:"0px"}}><div className="video-details-value">{this.state.starring}</div></Col>
                                </Row>
                                <Row>
                                    <Col md={1} style={{display:"flex",justifyContent:"start",paddingLeft:"0px"}}><div className="video-details-title">Subtitles </div></Col>
                                    <Col md={4} style={{display:"flex",justifyContent:"start",paddingLeft:"0px"}}><div className="video-details-value">{this.state.subtitles}</div></Col>
                                </Row>
                                <Row>
                                    <Col md={1} style={{display:"flex",justifyContent:"start",paddingLeft:"0px"}}><div className="video-details-title">Audio </div></Col>
                                    <Col md={4} style={{display:"flex",justifyContent:"start",paddingLeft:"0px"}}><div className="video-details-value">{this.state.audio}</div></Col>
                                </Row>
                                <Row><div className="video-publish-title">Published by</div></Row>
                                <Row>
                                    <div className="publisher-function">
                                        <div className="publisher-icon"><MaterialIcon icon="account_circle" size={44} color="white"/></div>
                                            <div className="streamer-info">{this.state.publisher}</div>
                                        <div className="subscribe-button-position"><button className="subscribe-button">subscribe</button></div>
                                    </div>
                                </Row>
                        </Col>                        
                        
                        <Col md={1} className={"col"}></Col>
                    </Row>
                </Container>
            </div>

          )
    }
}
export default VideoDetails;