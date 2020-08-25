import React from 'react';
import './trendingVideos.scss';
import { Container, Row, Col } from 'react-bootstrap';
import MaterialIcon, {colorPalette} from 'material-icons-react';
import VideoCard from '../../segments/videoCard/videoCard';
class TrendingVideos extends React.Component{
    constructor(props)
    {
        super(props);
        this.state = {
            trendVideos : [],
        }
    }
    componentDidMount()
    {
        this.setState({videoId : this.props.videoId});
        this.getTrendingVideos();
    }
    getTrendingVideos()
    {
        fetch(process.env.REACT_APP_BASE_URL + "/services/trending/trendingVideos", {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'Authorization' : 'JWT ' + localStorage.getItem("token"),
            },
          })
            .then(res => res.json())
            .then(json => {
                console.log(json)
                this.setState({trendVideos : json})
            });
    }
    render(){
        return(
                <div className="users-watched">
                    {
                      this.state.trendVideos.map((item) => 
                        <div className="card-t"><VideoCard name={item.videoName} genre={item.genre} year={item.releaseYear} duration={item.duration} desc={item.description} image={item.cardUrl} streamer={item.publisher} key={item.id} id={item.id}/></div>
                    )}
                </div>

          )
    }
}
export default TrendingVideos;