import React from 'react';
import './videoPlayer.scss';
import { Container, Row, Col } from 'react-bootstrap';
import MaterialIcon, {colorPalette} from 'material-icons-react';
import Play from '../../../assets/play.svg';
import Pause from '../../../assets/pause.svg';
import Previous from '../../../assets/previous.svg';
import Forward from '../../../assets/forward.svg';
import Expand from '../../../assets/expand.svg';
import Cross from '../../../assets/cross.svg';

import Contract from '../../../assets/contract.svg';

class VideoPlayer extends React.Component{
    constructor(props, context) {
        super(props, context);
        this.escFunction = this.escFunction.bind(this);
        this.state = {
          paused: false,
          muted: false,
          length: null,
          formattedLength: null,
          currentTime: null,
          formattedTime: null,
          volume: 0.5,
          fullScreen : false,
          width : window.innerWidth +"px",
          appearSettings : true,
          videoId : -1,
          poster : "",
          videoType : "",
          videoName : "",
          genre : "",
          videoYear : "",
          rating : "",
          duration : "",
          videoDesc : "",
          directors : "",
          starring : "",
          subtitles : "",
          audio : "",
          publisher : "",
          videoUrl : "",
        };

      }
      escFunction(){
        window.here = this;
        document.addEventListener("fullscreenchange", function() {
          console.log("HELLOddfdf")
          if((!window.screenTop && !window.screenY))
          {
            console.log("HELLO")
            window.here.setState({width : window.innerWidth +"px"})
          }
        });
      }
      componentDidMount() {
        fetch(process.env.REACT_APP_BASE_URL + "/movie/getMovie/" + this.props.videoId, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        })
          .then(res => res.json())
          .then(json => {
              console.log("HELLO");
              console.log(json);
              this.setState({videoName : json.videoName , videoUrl : json.videoUrl});
              console.log(this.state.videoUrl)
          });
      this.setState({videoId : this.props.videoId});
        this.customVolume();
        setInterval(() => this.setState({ currentTime: this.currentTime() }), 10);
    
        setInterval(() => this.setState({ length: this.duration() }), 10);
        document.addEventListener('keydown', e => {
          if(e.keyCode === 32) 
          { 
            console.log("SPACE")
            this.play();
            const v = document.getElementById("v");
            
        
            if (this.state.paused == true) {
              v.play();
              this.setState({
                paused: false
              });
            } else {
              v.pause();
              this.setState({
                paused: true
              });
            }          }
          else if(e.keyCode === 37)
          {
            document.getElementById("v").currentTime = document.getElementById("v").currentTime - 5;
          }
          else if(e.keyCode === 39)
          {
            document.getElementById("v").currentTime = document.getElementById("v").currentTime + 5;
          }
        });
        this.escFunction();
        var timeout;
        window.now = this;
        document.onmousemove = function(){
        clearTimeout(timeout);
        window.now.setState({appearSettings : true})
        document.getElementById('cont').style.cursor = 'default';
        timeout = setTimeout(function(){
          console.log("move your mouse");
          window.now.setState({appearSettings : false})
          document.getElementById('cont').style.cursor = 'none';
        }, 1000);
    }
      }
      
      play() {
        console.log("SPACE1")
        this.duration();
        const v = document.getElementById("v");
        const play_pause = document.querySelector(".play_pause");
    
        this.setState({
          paused: !this.state.paused
        });
    
        if (this.state.paused == true) {
          v.play();
          this.setState({
            paused: false
          });
        } else {
          v.pause();
          this.setState({
            paused: true
          });
        }
      }
    
      duration() {
        let dur = document.getElementById("v").duration;
        dur = dur.toFixed();
        let formattedLength = dur.toHHMMSS();
    
        this.setState({
          length: dur,
          formattedLength: formattedLength
        });
    
        return dur;
      }
    
      currentTime() {
        String.prototype.toHHMMSS = function() {
          let sec_num = parseInt(this, 10);
          let hours = Math.floor(sec_num / 3600);
          let minutes = Math.floor((sec_num - hours * 3600) / 60);
          let seconds = sec_num - hours * 3600 - minutes * 60;
    
          if (hours < 10) {
            hours = "0" + hours;
          }
          if (minutes < 10) {
            minutes = "0" + minutes;
          }
          if (seconds < 10) {
            seconds = "0" + seconds;
          }
    
          return hours + ":" + minutes + ":" + seconds;
        };
    
        let cur = document.getElementById("v").currentTime;
        cur = cur.toFixed();
        let formattedTime = cur.toHHMMSS();
    
        this.setState({
          currentTime: cur,
          formattedTime: formattedTime
        });
        if (parseInt(this.state.currentTime) === parseInt(this.state.length)) {
          this.setState({ paused: true });
        }
    
        return cur;
      }
    
      customTime() {
        const time_range = document.querySelector(".time_range");
        document.getElementById("v").currentTime = time_range.value;
    
        this.setState({
          currentTime: time_range.value
        });
      }
    
      customVolume() {
        const volume_range = document.querySelector(".volume_range");
        document.getElementById("v").volume = volume_range.value;
    
        this.setState({
          volume: volume_range.value
        });
    
        if (volume_range.value == 0) {
          this.setState({
            muted: true
          });
        } else {
          this.setState({
            muted: false
          });
        }
      }
    
      mute() {
        document.getElementById("v").muted = true;
    
        this.setState({
          muted: true
        });
    
        if (this.state.muted == true) {
          document.getElementById("v").muted = false;
    
          this.setState({
            muted: false
          });
        } else {
          document.getElementById("v").muted = true;
          this.setState({
            muted: true
          });
        }
      }
    
      
      fullScreen()
      {
        var elem = document.getElementById("cont");
          if (elem.requestFullscreen) {
            elem.requestFullscreen();
          } else if (elem.mozRequestFullScreen) { /* Firefox */
            elem.mozRequestFullScreen();
          } else if (elem.webkitRequestFullscreen) { /* Chrome, Safari & Opera */
            elem.webkitRequestFullscreen();
          } else if (elem.msRequestFullscreen) { /* IE/Edge */
            elem.msRequestFullscreen();
          }
      }
      exitFullScreen()
      {
        var elem = document.getElementById("cont");
        if (document.exitFullscreen) {
            document.exitFullscreen();
          } else if (document.mozCancelFullScreen) { /* Firefox */
            document.mozCancelFullScreen();
          } else if (document.webkitExitFullscreen) { /* Chrome, Safari and Opera */
            document.webkitExitFullscreen();
          } else if (document.msExitFullscreen) { /* IE/Edge */
            document.msExitFullscreen();
          }
      }

    render(){
        return(
            <div className="VideoPlayer" id='cont'>
        
        <div className="video-containers-c">
          {
            this.state.appearSettings
            ?
            <div className="overlay-containers">
              <div className="video-player-title">
                {this.state.videoName}
              </div>
            <div className="cross-close-button">
              <img className="play-pause-button" onClick={() => window.history.back()} src={Cross} />
            </div>
            <div className="centre-video-controls">
            <img className="play-pause-button" style={{width: "50px",height:"50px"}} src={Previous} onClick={() => {document.getElementById("v").currentTime = document.getElementById("v").currentTime - 5}}/>
              <div onClick={this.play.bind(this)} className="play_pause_btn">
                {
                    this.state.paused
                    ?
                    <img className="play-pause-button" style={{width: "50px",height:"50px"}} src={Play} />
                    :
                    <img className="play-pause-button" style={{width: "50px",height:"50px"}} src={Pause} />
                }
              </div>
              <img className="play-pause-button" style={{width: "50px",height:"50px"}} src={Forward} onClick={() => {document.getElementById("v").currentTime = document.getElementById("v").currentTime + 5}}/>
            </div>
          </div>
            :
            <div></div>
          }
          
          <video id="v" src={this.state.videoUrl} width={this.state.width} height={window.innerHeight +"px"} autoPlay={true}>
          {/* <source src={this.state.videoUrl} type="video/mp4" /> */}
        </video>
        </div>
        {
          this.state.appearSettings
          ?
          <div style={{width : this.state.width}} className="controls">

          

          <span className="time">
            <span className="video_time">{this.state.formattedTime}</span>
            <span> / </span>
            <span className="video_length">{this.state.formattedLength}</span>
          </span>

          <div className="time-range-c">
                <div style={{width : window.innerWidth +"px"}} className="new-orange-bar"></div>
                <div style={{width : (this.state.currentTime/this.state.length)*window.innerWidth + "px"}} className="new-orange-juice"></div>
              <div className="time-range-selector"><input
              style={{width : window.innerWidth + "px"}}
            type="range"
            className="time_range"
            onChange={this.customTime.bind(this)}
            value={this.state.currentTime}
            step={0.1}
            min={0}
            max={this.state.length}
          />
          </div>
          </div>

          <div onClick={this.mute.bind(this)} className="mute_unmute_btn">

            <svg
              className={this.state.muted ? "hide" : "svg_mute_unmute"}
              viewBox="0 0 20 20"
            >
              <path
                fill="none"
                d="M9.344,2.593c-0.253-0.104-0.547-0.045-0.743,0.15L4.486,6.887H1.313c-0.377,0-0.681,0.305-0.681,0.681v4.916c0,0.377,0.304,0.681,0.681,0.681h3.154l4.137,4.142c0.13,0.132,0.304,0.201,0.482,0.201c0.088,0,0.176-0.017,0.261-0.052c0.254-0.105,0.42-0.354,0.42-0.629L9.765,3.224C9.765,2.947,9.599,2.699,9.344,2.593z M5.233,12.003c-0.128-0.127-0.302-0.2-0.483-0.2H1.994V8.249h2.774c0.182,0,0.355-0.072,0.483-0.201l3.151-3.173l0.001,10.305L5.233,12.003z"
              />
              <path
                fill="none"
                d="M16.434,10.007c0-2.553-1.518-4.853-3.869-5.858C12.223,4,11.821,4.16,11.672,4.506c-0.148,0.346,0.013,0.746,0.359,0.894c1.846,0.793,3.041,2.6,3.041,4.608c0,1.997-1.188,3.799-3.025,4.592c-0.346,0.149-0.505,0.551-0.356,0.895c0.112,0.258,0.362,0.411,0.625,0.411c0.091,0,0.181-0.017,0.269-0.056C14.922,14.843,16.434,12.548,16.434,10.007z"
              />
              <path
                fill="none"
                d="M13.418,10.005c0-1.349-0.802-2.559-2.042-3.086c-0.346-0.144-0.745,0.015-0.894,0.362c-0.146,0.346,0.016,0.745,0.362,0.893c0.737,0.312,1.212,1.031,1.212,1.832c0,0.792-0.471,1.509-1.2,1.825c-0.345,0.149-0.504,0.551-0.352,0.895c0.112,0.257,0.362,0.41,0.625,0.41c0.091,0,0.181-0.017,0.27-0.057C12.625,12.545,13.418,11.339,13.418,10.005z"
              />
              <path
                fill="none"
                d="M13.724,1.453c-0.345-0.15-0.746,0.012-0.895,0.358c-0.148,0.346,0.013,0.745,0.358,0.894c2.928,1.256,4.819,4.122,4.819,7.303c0,3.171-1.886,6.031-4.802,7.289c-0.346,0.149-0.505,0.55-0.356,0.894c0.112,0.258,0.362,0.412,0.626,0.412c0.09,0,0.181-0.019,0.269-0.056c3.419-1.474,5.626-4.826,5.626-8.54C19.368,6.282,17.152,2.923,13.724,1.453z"
              />
            </svg>

            <svg
              className={this.state.muted ? "svg_mute_unmute" : "hide"}
              viewBox="0 0 20 20"
            >
              <path
                fill="none"
                d="M3.401,13.367h0.959l1.56-1.56H4.181v-4.07h3.177c0.207,0,0.405-0.084,0.553-0.23l3.608-3.633V6.21l1.56-1.56V1.983c0-0.315-0.192-0.602-0.485-0.721c-0.29-0.122-0.624-0.055-0.85,0.171L7.032,6.178h-3.63c-0.433,0-0.78,0.349-0.78,0.78v5.629C2.621,13.018,2.968,13.367,3.401,13.367z"
              />
              <path
                fill="none"
                d="M11.519,15.674l-2.416-2.418L8,14.358l3.745,3.753c0.149,0.149,0.349,0.228,0.553,0.228c0.1,0,0.201-0.019,0.297-0.059c0.291-0.12,0.483-0.405,0.483-0.72V9.28l-1.56,1.56V15.674z"
              />
              <path
                fill="none"
                d="M19.259,0.785c-0.167-0.168-0.387-0.25-0.606-0.25s-0.438,0.082-0.606,0.25l-4.968,4.968l-1.56,1.56l-4.496,4.494l-1.56,1.56L0.83,18.001c-0.335,0.335-0.335,0.877,0,1.213c0.167,0.167,0.386,0.251,0.606,0.251c0.22,0,0.439-0.084,0.606-0.251l5.407-5.407l1.105-1.104l2.965-2.966l1.56-1.56l6.18-6.181C19.594,1.664,19.594,1.12,19.259,0.785z"
              />
            </svg>
          </div>
          
          <div style={{width : "40px",right:"0",marginRight:"55px"}} className="new-orange-bar"></div>
          <div className="volume-selector">
            <input
            type="range"
            className="volume_range"
            onChange={this.customVolume.bind(this)}
            value={this.state.volume}
            step={0.1}
            min={0}
            max={1}
          />
          </div>
          <div>
              {
                this.state.width == "100%"
                ?
                <div onClick={() => {this.setState({width : window.innerWidth +"px",fullScreen : true},() => this.exitFullScreen())}}>
                    <img width="20px" height="20px" src={Expand} />
                </div>
                :
                <div onClick={() => {this.setState({width : "100%",fullScreen : false} ,() => this.fullScreen())}}>
                    <img width="20px" height="20px"  src={Expand} />
                </div>
              }
          </div>
        </div>
          :
          <div></div>
        }
        
      </div>

          )
    }
}
export default VideoPlayer;