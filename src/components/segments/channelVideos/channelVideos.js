import React from 'react';
import './channelVideos.scss';
import { Container, Row, Col } from 'react-bootstrap';
import MaterialIcon, {colorPalette} from 'material-icons-react';
import VideoCard from '../../segments/videoCard/videoCard';
class ChannelVideos extends React.Component{
    constructor(props)
    {
        super(props);
        this.state = {
            trendVideos : [],
        }
    }
    componentDidMount()
    {
        this.getTrendingVideos();
    }
    getTrendingVideos()
    {
        console.log("lllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllll")
        console.log(this.props.channelId)
        fetch(process.env.REACT_APP_BASE_URL + "/services/trending/channelVideos/"+this.props.channelId, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'Authorization' : 'JWT ' + localStorage.getItem("token"),
            },
          })
            .then(res => res.json())
            .then(json => {
                console.log("askjndasjndsakjndaskjdnkasjndasjndajsndajsndasjndlasndlasndasndlasnl")
                
                console.log(json)
                this.setState({trendVideos : json})
            });
    }
    render(){
        return(
                <div className="users-watched">
                    {
                      this.state.trendVideos.length == 0
                      
                      ?
                      <div className=" card-t no-content-status">No Videos by this channel</div>
                      :
                        ""
                      }
                    {
                      this.state.trendVideos.map((item) => 
                        <div key={item.id} className="card-t"><VideoCard name={item.videoName} genre={item.genre} year={item.releaseYear} duration={item.duration} desc={item.description} image={item.cardUrl} streamer={item.publisher} key={item.id} id={item.id}/></div>
                    )}
                </div>

          )
    }
}
export default ChannelVideos;