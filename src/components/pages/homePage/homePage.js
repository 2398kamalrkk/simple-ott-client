import React from 'react';
import './homePage.scss';
import ReactPlayer from 'react-player'

class homePage extends React.Component {
    render()
    {
        return(
            <div>
                <ReactPlayer 
                controls = 'true'
                url='http://183.82.36.231:20000/videoplayback.mp4' />
            </div>
            
        )
    }
}
export default homePage;