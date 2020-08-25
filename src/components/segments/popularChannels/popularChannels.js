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
            channels : [
                {
                    "name" : "Divine streamers",
                    "count" : "2k",
                    "status" : false
                },
                {
                    "name" : "Divine streamers",
                    "count" : "2k",
                    "status" : true
                },
                {
                    "name" : "Divine streamers",
                    "count" : "2k",
                    "status" : true
                },
                {
                    "name" : "Divine streamers",
                    "count" : "2k",
                    "status" : false
                },
                {
                    "name" : "Divine streamers",
                    "count" : "2k",
                    "status" : true
                },
                {
                    "name" : "Divine streamers",
                    "count" : "2k",
                    "status" : false
                },
                {
                    "name" : "Divine streamers",
                    "count" : "2k",
                    "status" : true
                },
                {
                    "name" : "Divine streamers",
                    "count" : "2k",
                    "status" : true
                },
                {
                    "name" : "Divine streamers",
                    "count" : "2k",
                    "status" : false
                },
                {
                    "name" : "Divine streamers",
                    "count" : "2k",
                    "status" : true
                },
            ],
        }
    }
    componentDidMount()
    {
    }
    render(){
        return(
                <div className="publish-channel">
                      {
                      this.state.channels.map((item) => 
                        <div className="card-t"><PublisherCard name={item.name} count={item.count} status={item.status} /></div>
                    )}
                </div>

          )
    }
}
export default PopularChannels;