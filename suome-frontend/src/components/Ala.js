import Iframe from 'react-iframe';
import React,{Component} from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import classNames from 'classnames';
import firebase from "firebase";
import IconButton from '@material-ui/core/IconButton';
import LeftIcon from '@material-ui/icons/ChevronLeft';
import RightIcon from '@material-ui/icons/ChevronRight';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
var config = {
  apiKey: "AIzaSyByNYtWev1iWSd0qhwJ1wCKVJOUzRYG2u8",
  authDomain: "vueala.firebaseapp.com",
  databaseURL: "https://vueala.firebaseio.com",
  projectId: "vueala",
  storageBucket: "vueala.appspot.com",
  messagingSenderId: "216460407081"
};
firebase.initializeApp(config);
var database = firebase.database();

firebase.database().ref('songs').set([

    {url:"https://quizlet.com/349237443/flashcard/embed",name:"take good"},
    {url:"https://quizlet.com/349627713/flashcard/embed",name:"The Northen Light "},
{url:"https://quizlet.com/351684269/flashcard/embed",name:"man break"},
{url:"https://quizlet.com/353643002/flashcard/embed",name:"take "},
{url:"https://quizlet.com/350919033/flashcard/embed",name:"man who doesn't "},
  {url:"https://quizlet.com/349312083/flashcard/embed",name:"come to me "},
{url:"https://quizlet.com/353488339/flashcard/embed",name:"Please remeber "},


    {url:"https://quizlet.com/349767473/flashcard/embed",name:"say some words "},
    {url:"https://quizlet.com/349242348/flashcard/embed",name:"what a lovely evening "},
    {url:"https://quizlet.com/351686948/flashcard/embed",name:"I want to make love God "},


    {url:"https://quizlet.com/348890843/flashcard/embed",name:"If I got cat"},
        {url:"https://quizlet.com/350893075/flashcard/embed",name:"whatever you want"},
            {url:"https://quizlet.com/350482672/flashcard/embed",name:"burning head"},

    {url:"https://quizlet.com/350255179/flashcard/embed",name:"I want to make love Sanni"},
        {url:"https://quizlet.com/354748294/flashcard/embed",name:"the love of my life"},

    {url:"https://quizlet.com/349601149/flashcard/embed",name:"I have seen everything"},
]);

firebase.database().ref("songs").on("value", function (snapshot) {
var songs = snapshot.val();
// console.log(songs);
});

const styles = theme => ({
  button: {
		margin: theme.spacing.unit,
		position: 'fixed',
		margin: 3,
		opacity: 0.8,
		zIndex: 2
		// bottom: 0,
		// right: 0,
		// position: 'absolute',
		// bottom: 0,
		//
		// opacity: 0.8
	},
  textField: {
   marginLeft: theme.spacing.unit,
   marginRight: theme.spacing.unit,
 },
 menu: {
  width: 200,
},
  right:{
    bottom: 0,
		right: 10,
  },
  left:{
    bottom: 0,
    right: 80,
  }
});
class Ala extends Component {

// songs=[
//
//     {url:"https://quizlet.com/349237443/flashcard/embed",name:"take good"},
//     {url:"https://quizlet.com/349627713/flashcard/embed",name:"The Northen Light "},
// {url:"https://quizlet.com/351684269/flashcard/embed",name:"man break"},
// {url:"https://quizlet.com/353643002/flashcard/embed",name:"take "},
// {url:"https://quizlet.com/350919033/flashcard/embed",name:"man who doesn't "},
//   {url:"https://quizlet.com/349312083/flashcard/embed",name:"come to me "},
// {url:"https://quizlet.com/353488339/flashcard/embed",name:"Please remeber "},
//
//
//     {url:"https://quizlet.com/349767473/flashcard/embed",name:"say some words "},
//     {url:"https://quizlet.com/349242348/flashcard/embed",name:"what a lovely evening "},
//     {url:"https://quizlet.com/351686948/flashcard/embed",name:"I want to make love God "},
//
//
//     {url:"https://quizlet.com/348890843/flashcard/embed",name:"If I got cat"},
//         {url:"https://quizlet.com/350893075/flashcard/embed",name:"whatever you want"},
//             {url:"https://quizlet.com/350482672/flashcard/embed",name:"burning head"},
//
//     {url:"https://quizlet.com/350255179/flashcard/embed",name:"I want to make love Sanni"},
//         {url:"https://quizlet.com/354748294/flashcard/embed",name:"the love of my life"},
//
//     {url:"https://quizlet.com/349601149/flashcard/embed",name:"I have seen everything"},
// ]
  state = {
    currentSong:0,
    songs:[],
    }
async componentWillMount() {
  await firebase.database().ref("songs").on("value",  (snapshot)=> {
  var songs = snapshot.val();
  this.setState({songs})
  });
}
  handleNextSong=()=> {
    this.state.currentSong < (this.state.songs.length-1) ? this.setState((prevState) => ({ currentSong: prevState.currentSong+1})):this.setState((prevState) => ({ currentSong: 0}))
  };
  handlePreviousSong=()=> {
    this.state.currentSong === 0 ? this.setState((prevState) => ({ currentSong: (this.state.songs.length-1)})):this.setState((prevState) => ({ currentSong: prevState.currentSong-1}))

  };
  handleChange = name => event => {
     this.setState({
       [name]: parseInt(event.target.value),
     });
   };
  render() {
    const {currentSong} = this.state;
    const {classes} = this.props;
    return (
      <div>
        <Iframe url={this.state.songs && this.state.songs[currentSong].url}
    width="100%"
    height="450px"
    display="initial"
    position="relative"
    allowFullScreen/>
    <TextField
      id="standard-select-currency-native"
      select
      label="Native select"
      className={classes.textField}
      value={this.state.currentSong}
      onChange={this.handleChange('currentSong')}
      fullWidth
      SelectProps={{
        native: true,
        MenuProps: {
          className: classes.menu,
        },
      }}
      helperText="Select Song"
      margin="normal"
    >
      {this.state.songs.map((option,i) => (
        <option key={option.url} value={i}>
          {option.name}
        </option>
      ))}
    </TextField>

  <Button variant="fab" color="secondary" aria-label="Add" className={classNames(classes.button,classes.left )}
onClick={(e)=>{this.handlePreviousSong()}}
    >
        <LeftIcon />
      </Button>
        <Button variant="fab" color="secondary" aria-label="Add" className={classNames(classes.button,classes.right )}
onClick={(e)=>{this.handleNextSong()}}


          >
          <RightIcon />
        </Button>


      </div>
    );
  }
}
Ala.defaultProps = {
  title: 'Indecision'
};
export default withStyles(styles)(Ala);
