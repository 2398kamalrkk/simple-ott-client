import React from 'react';
import './videoCard.scss';
import { Container, Row, Col } from 'react-bootstrap';
import MaterialIcon, {colorPalette} from 'material-icons-react';

class VideoCard extends React.Component{
    constructor(props)
    {
        super(props);
        this.state = {
            
        }
    }
    componentDidMount()
    {
    }
    render(){
        return(
                <div className="video-card-c">
                        <div className="bg-image-video-card">
                            <img className="bg-image-video-card-i" src={this.props.image}></img>
                        </div>
                        <div className="hover-transparent"></div>
                        <div className="bg-image-video-card-desc">
                            <span onClick={() => window.location.href="/video/"+this.props.id}>
                            <div className="hover-video-name">{this.props.name}</div>
                            <div className="hover-front">
                                        <div className="hover-video-genre">{this.props.genre}</div>
                                        <div className="hover-dot"></div>
                                        <div className="hover-video-year">{this.props.year}</div>
                                        <div className="hover-dot"></div>
                                        <div className="hover-video-duration">{this.props.duration}</div>
                            </div>
                            
                            <div className="hover-video-desc">{this.props.desc}</div>
                            <div className="hover-video-publisher"><MaterialIcon icon="account_circle" size={20} color="#3082FF"/>{this.props.streamer}</div>
                            </span>
                            <div className="hover-play-now" onClick={() => window.location.href="/play/"+this.props.id} ><MaterialIcon icon="play_arrow" size={25} color="#0e0e0e"/>Play now</div>
                        </div>
                </div>

          )
    }
}
export default VideoCard;