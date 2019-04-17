import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './App.css';
import AM from './pics/11.png';
import AMD from './pics/111.png';
import BUL from './pics/9.PNG';
import P1 from './pics/1.PNG';
import P2 from './pics/2.PNG';
import P3 from './pics/3.PNG';
import P4 from './pics/4.PNG';
import P5 from './pics/5.PNG';
import BTL from './pics/10.png';




var loc = 50;
const stepSize = 10;
var clearance = [0,0,0];
var i=0;
const path = './pics/'
const width = window.innerWidth;
const scrnhgt = window.innerHeight;
const enemySpeed = 15;
const pics = [P1,P2,P3,P4,P5];
const iconSize = scrnhgt*0.15;
const hitTolerance = iconSize/2*0.8;
const deadline = scrnhgt - iconSize * 1.1;
const offset = -0.4*iconSize;
var score = 0;

const die = () => {
  ReactDOM.render(<h1>
    You died (surrendered to the stress culture at <font face = "Trajan Pro">Columbia</font>) <br></br>
    Your GPA is {score} 
    </h1>, document.getElementById('die'));
  ReactDOM.unmountComponentAtNode(document.getElementById('enemy'));
  ReactDOM.unmountComponentAtNode(document.getElementById('alma'));
  ReactDOM.render(<img src={AMD} alt="img not available" style= {{maxWidth: iconSize, maxHeight: iconSize, 
            position: 'fixed',
  left: loc,
  top: scrnhgt,}}></img>, document.getElementById('alma'));

}


ReactDOM.render(<img src={BTL} alt="img not available" style= {{maxWidth: width*0.5,
  position: 'fixed',
  marginLeft: 'auto', marginRight: 'auto',
top: deadline - width*0.05}}></img>, document.getElementById('but'));


class Bullet extends Component{
    constructor(props) {
    super(props);
    this.state = {x: loc+ offset,
                 y: 2*iconSize
                 };
    this.tick = this.tick.bind(this);
    document.addEventListener("keypress", this.handler.bind(this), false);
  }

  handler(){
    this.setState({x: loc+20});
  }

  componentDidMount() {
    this.timerID = setInterval(
      () => this.tick(),
      500
    );
  }

  //update(){this.setState({x: loc});}

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  tick() {
    //this.setState({y: this.state.y-5});
  }
  
  render(){
    return (<img src={BUL} style={{
          position: 'fixed',
          top: this.state.y,
          left: this.state.x,
        }}height = {deadline-iconSize} width = {iconSize} alt="image not found"></img>); 
  }
}



class Alma extends React.Component{
  constructor (props){
    super(props);
    this.state = {loca: props.location,
    vis: 'hidden',
  score: score};
    document.addEventListener("keyup", this.handler3.bind(this), false);
    document.addEventListener("keypress", this.handler2.bind(this), false);
    document.addEventListener("keydown", this.handler.bind(this), false);

  }

  render(){
    return(
      <div>
      <div style={{
          position: 'fixed',
          left: this.state.loca,
          top: scrnhgt-iconSize*1.1,
          } 
      }>
      <img src={AM} alt="img not available" style= {{maxWidth: iconSize, maxHeight: iconSize}}></img>
      <p>Location: {parseInt(this.state.loca)} score: {this.state.score}</p>
      </div>
      <div style={{
          visibility: this.state.vis,
      }}>
      <Bullet />
      </div>
      </div>
      )
  }
  
  handler(event) {
  if (event.keyCode === 72 && this.state.loca >= stepSize){
    loc -= stepSize; 
    this.setState({loca: loc});
  }
  else if (event.keyCode === 76 && this.state.loca <1000){
    loc += stepSize; 
    this.setState({loca: loc});
    //this.setState({vis: 'visible'});
  }
/*  if (event.keyCode === 32) {
    //this.setState({vis: 'visible'});
  }else   {
    this.setState({vis: 'hidden'});
  }*/
    //ReactDOM.render(
     //<Alma location="50"/>,document.getElementById('root'));
  }

  handler2(event) {
    if (event.which === 106){
      this.setState({vis: 'visible', score: score});
      console.log(event.keyCode,);
    }
  }

  handler3(event) {
    console.log(event.keyCode);
    if (event.keyCode === 74){
      this.setState({vis: 'hidden', score: score}); 

    }
  }


}

ReactDOM.render(<Alma location={loc} />, document.getElementById('alma')
);

      
class Enemy extends React.Component{
  constructor (props){
    super(props);
    this.state = {
      x: Math.floor(Math.random()*1000+1),
      y: 0,
      vis: 'visible',
      pic: Math.floor(Math.random()*5)
    };
    document.addEventListener("keypress", this.handler.bind(this), false);
    console.log("enemy position: "+ this.state.x+" and pic# is "+ this.state.pic);
    /*
    for (i = 0; i < 3; i++){
      if (clearance[i] === 0){
        clearance[i] = this.state.x;
      }else{
        while (Math.abs(this.state.x-clearance[i])<=20)
          this.setState({
            x: Math.floor(Math.random()*1000+1)});
      }
    }*/
  }
   

handler(event){
  if (event.keyCode === 106 && Math.abs(loc - (this.state.x+ iconSize*0.06)) <= hitTolerance ){
    this.setState({vis: 'hidden'});
    console.log("hit");
    score ++;
    var temp = Math.floor(Math.random()*1000+1);
/*
    for (i = 0; i < 3; i++){
      if (clearance[i] === this.state.x){
        clearance[i] = 0;
      }
    }
    while ((clearance[0]===0||Math.abs(temp-clearance[0])<=20) && (clearance[1]===0||Math.abs(temp-clearance[1])<=20) && (clearance[2]===0||Math.abs(temp-clearance[2])<=20))
        temp = Math.floor(Math.random()*1000+1);
    for (i = 0; i < 3; i++){
          if (clearance[i] === 0){
            clearance[i] = temp;
          }
          break;
    }*/
    this.setState ({
      x: temp,
      y: 0,
      vis: 'visible',
      pic: Math.floor(Math.random()*5)
    });
    console.log("enemy position: "+ this.state.x +" and pic# is "+ this.state.pic);

  }
}


  componentDidMount() {
    this.timerID = setInterval(
      () => this.tick(),
      500
    );
  }

  //update(){this.setState({x: loc});}

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  tick() {
    this.setState({y: this.state.y+enemySpeed});
    if (this.state.y > deadline)
      die();
  }



  render(){
    return(
      <div style={{
        position: 'fixed',
        left: this.state.x,
        top: this.state.y,
        visibility: this.state.vis
        }}>
        <img src= {pics[this.state.pic]} style={{maxHeight: iconSize}}></img>
      </div>
    );
  }
}


ReactDOM.render(<div><Enemy /> <Enemy /> <Enemy /></div>, document.getElementById('enemy'));







export default Alma;
//export default Enemy;

