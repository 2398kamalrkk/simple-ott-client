import React from 'react';
import './footerBar.scss';
import {Spinner, Container, Row, Col } from 'react-bootstrap';
import MaterialIcon, {colorPalette} from 'material-icons-react';
import SearchCard from '../searchCard/searchCard';
class FooterBar extends React.Component{
    constructor(props)
    {
        super(props);
        this.state = {
            
        }
    }
    
    render(){
        return(
                <div className="footer-bar">
                    <Container>
                        <Row>
                            <div className="footer-logo"><div className="footer-logo-override"> LOGO</div></div>
                        </Row>
                        <Row>
                            <div className="about">
                                <div></div>
                                <div></div>
                                <div>About</div>
                                <div>FAQ</div>
                                <div>Terms Of UsePrivacy Policy (New)</div>
                                <div>Feedback</div>
                                <div>Sales</div>
                                <div></div>
                                <div></div>
                            </div>
                            
                        </Row>
                        <Row>
                            <div style={{marginTop:"10px"}} className="about">
                            © 2020, LOGO.com, Inc. or its affiliates
                            </div>
                        </Row>
                    </Container>
                </div>

          )
    }
}
export default FooterBar;