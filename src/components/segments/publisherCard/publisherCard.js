import React from 'react';
import './publisherCard.scss';
import { Container, Row, Col } from 'react-bootstrap';
import MaterialIcon, {colorPalette} from 'material-icons-react';

class PublisherCard extends React.Component{
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
                <div className="publisher-card-c">
                     <div className="popular-publisher-logo-c"><img className="popular-publisher-logo" src="https://w0.pngwave.com/png/192/97/logo-template-circle-advertising-circle-png-clip-art.png"></img></div> 
                     <div className="popular-publisher-name">{this.props.name}</div>
                     <div className="popular-publisher-subscribers">{this.props.count} Subscribers</div>
                     {
                         this.props.status ?
                         <div className="popular-publisher-subscribed">Subscribed</div>
                         :
                         <div className="popular-publisher-subscribe">Subscribe</div>
                     }
                </div>

          )
    }
}
export default PublisherCard;