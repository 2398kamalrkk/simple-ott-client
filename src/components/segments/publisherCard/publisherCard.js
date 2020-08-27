import React from 'react';
import './publisherCard.scss';
import { Container, Row, Col } from 'react-bootstrap';
import MaterialIcon, {colorPalette} from 'material-icons-react';

class PublisherCard extends React.Component{
    constructor(props)
    {
        super(props);
        this.state = {
            status : props.status,
            subscribers : props.count,
        }
    }
   
    componentDidMount()
    {
        console.log("UFSDONFDSKJNFJDSFJSDNFKJSNFKJNSDFKJNDSKNFKSJDNFKDSJNK")
    }
    callSubscribeApi(e,context)
        {
            e.stopPropagation();
            fetch(context ? process.env.REACT_APP_BASE_URL + "/services/channel/removeSubscriber/" +this.props.id+"/"+localStorage.getItem("mobile") : process.env.REACT_APP_BASE_URL + "/services/channel/addSubscriber/"+this.props.id+"/"+localStorage.getItem("mobile"), {
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
            fetch(process.env.REACT_APP_BASE_URL + "/services/channel/currentChannel/" +this.props.id +"/"+localStorage.getItem("mobile"), {
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
                <div className="publisher-card-c" onClick={() => window.location.href = "/channel/" + this.props.id}>
                     <div className="popular-publisher-logo-c"><img className="popular-publisher-logo" src={this.props.logoUrl}></img></div> 
                     <div className="popular-publisher-name">{this.props.name}</div>
                     <div className="popular-publisher-subscribers">{this.state.subscribers} Subscribers</div>
                     {
                         this.state.status == "subscribed" ?
                         <div className="popular-publisher-subscribed" onClick={(e) => this.callSubscribeApi(e,true)}>Subscribed</div>
                         :
                         <div className="popular-publisher-subscribe" onClick={(e) => this.callSubscribeApi(e,false)}>Subscribe</div>
                     }
                </div>

          )
    }
}
export default PublisherCard;