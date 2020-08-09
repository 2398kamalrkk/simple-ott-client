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
                url='https://www.youtube.com/watch?v=-K8Oid03eUU' />
            </div>
            
        )
    }
}
export default homePage;