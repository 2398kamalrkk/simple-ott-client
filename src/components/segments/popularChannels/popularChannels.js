import React from 'react';
import './popularChannels.scss';
import { Container, Row, Col } from 'react-bootstrap';
import MaterialIcon, {colorPalette} from 'material-icons-react';
import PublisherCard from '../../segments/publisherCard/publisherCard';

class PopularChannels extends React.Component{
    constructor(props)
    {
        super(props);
        this.state = {
            channels : [],
        }
    }
    componentDidMount()
    {
        
        fetch(process.env.REACT_APP_BASE_URL + "/services/channel/trendingChannels/"+localStorage.getItem("mobile"), {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'Authorization' : 'JWT ' + localStorage.getItem("token"),
            },
          })
            .then(res => res.json())
            .then(json => {
                console.log(json)
                console.log("LLLLasljkdnasljdnalsndlaskndlasndlakndlkansdlasnldnasldn")
                console.log(Date.now())

                this.setState({channels : []})
                this.setState({channels : json})
            });
    }
    componentWillUnmount()
    {
        this.setState({channels : []})
    }
    render(){
        

        return(
                <div className="publish-channel">
                      {
                      this.state.channels.map((item) => 
                        item.id != this.props.disable
                        ?
                        <div key={item.id} className="card-t"><PublisherCard key={item.id} id={item.id} name={item.channelName} count={item.subscribers} status={item.status} logoUrl={item.logoUrl}/></div>
                        :
                        <div key={item.id} className="card-t"></div>
                    )}
                </div>

          )
    }
}
export default PopularChannels;