import React from 'react';
import './searchCard.scss';
import { Container, Row, Col } from 'react-bootstrap';
import MaterialIcon, {colorPalette} from 'material-icons-react';

class SearchCard extends React.Component{
    constructor(props)
    {
        super(props);
        this.state = {
            
        }
    }
    componentDidMount()
    {
        this.setState({videoId : this.props.videoId});
    }
   
    render(){
        return(
            <div className="search-result-card" >
                <div className="search-image-c" ><img className="search-image"src={this.props.poster}></img></div>
                <div className="search-image-desc-c">
                    <div className="search-name">{this.props.name}</div>
                    <div className="search-genre">{this.props.genre}</div>
                    <div className="search-year">{this.props.year}</div>
                </div>
            </div>
          )
    }
}
export default SearchCard;