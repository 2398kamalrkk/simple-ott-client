import React from 'react';
import './homePage.scss';
import ReactPlayer from 'react-player'
import { Container, Row, Col } from 'react-bootstrap';
import NavBar from '../../segments/navBar/navBar';
import Carousel from 'react-bootstrap/Carousel';
import TrendingVideos from '../../segments/trendingVideos/trendingVideos';
import PopularChannels from '../../segments/popularChannels/popularChannels';
import FooterBar from '../../segments/footerBar/footerBar';

import Forward from '../../../assets/front-carousel.svg';
import Backward from '../../../assets/back-carousel.svg';

class homePage extends React.Component {
    constructor(props, context) {
		super(props, context);

		this.handleSelect = this.handleSelect.bind(this);

		this.state = {
			index: 0,
            direction: null,
            carouselImages : ["https://picsum.photos/800/400?text=First slide&bg=373940","https://picsum.photos/800/400?text=Second slide&bg=282c34","https://picsum.photos/800/400?text=Third slide&bg=20232a"],
            nextIcon: <img src={Forward}></img>,
            prevIcon: <img src={Backward}></img>,
            trendVideos : [],
		};
	}

	handleSelect(selectedIndex, e) {
		this.setState({
			index: selectedIndex,
            direction: e.direction,
            
		});
    }
    componentDidMount()
    {
        this.getTrendingVideos();
    }
    getTrendingVideos()
    {
        fetch(process.env.REACT_APP_BASE_URL + "/services/trending/trendingVideosCarousel", {
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
    render()
    {
        const { index, direction } = this.state;
        const {nextIcon,prevIcon}=this.state;
        return(
            <div className="main-home">
                <Container fluid>
                <NavBar fromPage="home"/>
                    <Row>
                        <Col md={1}>

                        </Col>
                        <Col md={10}>
                        <Carousel
                        indicators={false}
                        className="image-carousel-c"
                        style={{marginLeft : "-13px"}}
                            nextIcon ={nextIcon} prevIcon={prevIcon}
                            activeIndex={index}
                            direction={direction}
                            onSelect={(v) => this.handleSelect(v,-1)}
                        >
                        {
                            this.state.trendVideos.map((item) => 
                            <Carousel.Item >
                                        <div className="carousel-c" onClick={() => window.location.href="/video/"+item.id}>
                                            <img
                                    className="carousel-image-home"
                                    src={item.posterUrl}
                                    alt="First slide"
                                    >
                                    </img>
                                    <div className="blur-carousel-1"></div>
                                    <div className="blur-carousel-2"></div>
                                    </div>
                            </Carousel.Item>
                            )
                        }
			            </Carousel>
                        </Col>
                        <Col md={1}></Col>
                    </Row>
                    <Row>
                        <Col md={1}></Col>
                        <Col style={{display:"flex",justifyContent:"start",paddingLeft:"0px"}} md={10}><div className="users-watched-title">Trending Videos</div></Col>
                        <Col md={1}></Col>
                    </Row>
                    <Row>
                            <Col style={{display:"flex",justifyContent:"start",paddingLeft:"0px",paddingRight:"0px"}} md={12}>
                                
                                        <TrendingVideos/>
                                    
                            </Col>
                    </Row>
                    <Row>
                        <Col md={1}></Col>
                        <Col style={{display:"flex",justifyContent:"start",paddingLeft:"0px"}} md={10}><div className="users-watched-title">Popular Channels</div></Col>
                        <Col md={1}></Col>
                    </Row>
                    <Row>
                            <Col style={{display:"flex",justifyContent:"start",paddingLeft:"0px",paddingRight:"0px"}} md={12}>
                                
                                        <PopularChannels/>
                                    
                            </Col>
                    </Row>
                    <Row>
                        <Col md={1}></Col>
                            <Col style={{display:"flex",justifyContent:"start",paddingLeft:"0px",paddingRight:"0px"}} md={10}>
                                
                                        <FooterBar/>
                                    
                            </Col>
                        <Col md={1}></Col>
                    </Row>
                </Container>
            </div>
            
        )
    }
}
export default homePage;