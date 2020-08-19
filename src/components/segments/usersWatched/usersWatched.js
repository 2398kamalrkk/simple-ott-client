import React from 'react';
import './usersWatched.scss';
import { Container, Row, Col } from 'react-bootstrap';
import MaterialIcon, {colorPalette} from 'material-icons-react';

class UsersWatched extends React.Component{
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
                <div className="nav-bar">
                
                </div>

          )
    }
}
export default UsersWatched;