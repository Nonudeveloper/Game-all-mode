import React, {Component} from 'react';
import PropTypes from "prop-types";
import Store from '../../store/singlePlayerTwoWindows';
import { observer } from 'mobx-react';
import Button from 'material-ui/Button';
import Grid from 'material-ui/Grid';
import { withStyles } from 'material-ui/styles';

const styles = theme => ({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing.unit * 2,
      textAlign: 'center',
      color: theme.palette.text.secondary,
    },
  });

class Controls extends Component {
    static contextTypes = {
		loop: PropTypes.object
    };
	constructor(props) {
		super(props);
        this.pauseResumeGame = this.pauseResumeGame.bind(this);
        this.restartGame = this.restartGame.bind(this);
        this.loop = this.loop.bind(this);
        this.startCountDown();
	}
    loop(){
        if(Store.time==0&&Store.mode!="restart"&&Store.mode!="pause"){
            Store.mode="pause";
            if(this.props.onEnd){
                var player = Store.score[0]>Store.score[1]?"player1":"player2";
                this.props.onEnd(player);
            }
        }
    }
    startCountDown(){
        setInterval(()=>{
            if(Store.mode=="play"&&Store.time>0)
                Store.time--;
        },1000)
    }
    pauseResumeGame(){
        if(Store.mode=='pause'){
            Store.mode='play';
            this.props.onGameEvent({
                type : "play"
            })
        }
        else{
            Store.mode='pause';
            this.props.onGameEvent({
                type : "pause"
            })
        }
    }

    restartGame(){
        Store.mode='restart';
        setTimeout(()=>{
            Store.mode='play';
        },1000)
        this.props.onGameEvent({
            type : "restart"
        })
    }
	
	getWrapperStyles(){
		return {
			position: 'absolute',
			transform: 'translate(0px, 0px) translateZ(0)',
			transformOrigin: 'top left',
		};
	}

    componentDidMount() {
        this.loopID = this.context.loop.subscribe(this.loop);
    }
    componentWillUnmount() {
        this.context.loop.unsubscribe(this.loopID);
    }
	
	render() {
        const { classes } = this.props;
       return <div>
           <div className={classes.root}>
      <Grid container spacing={24} style={{marginTop:'12px'}}>
        <Grid item xs={12}>
           {Store.time==0&&<div style={{
                    position:"absolute",
                    background: "#7eca84",
                    width:"100%",
                    height:"100%",
                    zIndex:2,
                    top:"-1px"
                }}>
               <h1 style={{
                   marginTop:"30%",
                   textAlign:"center",
                   color:"#fff"
               }}>{Store.score[0]>Store.score[1]?"Player 1 Win!!!":"Player 2 Win!!!"}</h1>
               <Button variant="raised" color="primary" onClick={()=>this.restartGame()}
                    style={{
                        width: "30%",
                        marginLeft: "35%",
                        height: "40px",
                        background: "#7eca84",
                        border: "3px solid #fff",
                        fontSize: "19px",
                        textTransform: "uppercase",
                        color: "#fff",
                        lineHeight: "36px"
                    }}   
                >Restart</Button>
           </div>}
           <h3 style={{position:"fixed", left:0, top:"20px", zIndex:1}}>Player 1 score: {Store.score[0]}</h3>
           <h3 style={{position:"fixed", right:0, top:"20px", zIndex:1}}>Player 2 score: {Store.score[1]}</h3>
           <h3 style={{position:"fixed", left:"45%", top:0}}>Time left: {Store.time}</h3>
           <Button variant="raised" color="primary" style={{position:"fixed", left:0, top:0, zIndex:1}} onClick={()=>this.restartGame()}>Restart</Button>
           <Button variant="raised" color="default" style={{position:"fixed", left:"100px", top:0, zIndex:1}} onClick={()=>this.pauseResumeGame()}>{Store.mode == "play"?"Pause":"Resume"}</Button>
         </Grid>
       </Grid>
       </div>
    </div>
    }
}
export default withStyles(styles)(observer(Controls));