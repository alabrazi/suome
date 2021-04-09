import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import Snackbar from '@material-ui/core/Snackbar';
import {withRouter} from 'react-router-dom';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import Paper from '@material-ui/core/Paper';
import Switch from '@material-ui/core/Switch';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

// import CardHeader from '@material-ui/core/CardMedia';

import Typography from '@material-ui/core/Typography';

import classNames from 'classnames';
import IconButton from '@material-ui/core/IconButton';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import request from 'request-promise';
import Config from '../Config';
import options from './Options';
import QuestionEntry from './QuestionEntry'
let songs = [

  {
    "featuredWords": [
      ["and", "prevent", "quietly", "weight", "feel", "sky", "over", "year", "all", "smoke", "paper", "in", "home", "border", "again", "from", "for", "to", "sun", "ruin", "when", "hey", "moon", "how", "book", "slowly", "too", "way", "memory", "you", "must", "life", "good", "garden", "that", "burn", "watch", "but", "it", "warm", "know", "dust", "world", "ash", "come", "by", "furniture", "a", "on", "short", "these", "maybe", "also", "gather", "together", "i", "hand", "of", "everything", "the", "head"]
    ],
    "description": "blablabalablalbalbal",
    "tags": ["popular", "easy", "short"],
    "wordsFrequency": [
      [6, 1, 1, 1, 2, 1, 1, 2, 2, 1, 1, 3, 1, 1, 1, 1, 1, 3, 1, 1, 1, 2, 1, 3, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 2, 1, 5, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 1, 1, 2, 1, 1, 1, 1, 2, 4, 2, 13, 1]
    ],
    "quizes": [],
    "lyricSrc": "http://lyricstranslate.com/en/ruoste-rust.html",
    "coverImg": "https://img.youtube.com/vi/L8MJKwA9LZo/maxresdefault.jpg",
    "title": "Rust.",
    "content": [{
      "fi": "Hei",
      "en": "Hey"
    }, {
      "fi": "katso kuinka hiljaa",
      "en": "Watch how quietly"
    }, {
      "fi": "kaikki k\u00e4y",
      "en": "Everything is going by"
    }, {
      "fi": "mutta vuodet on lyhyet",
      "en": "But the years are short"
    }, {
      "fi": "ja kun kuu ja aurinko ovat yhdess\u00e4 taivaalla",
      "en": "And when the moon and the sun are together in the sky"
    }, {
      "fi": "min\u00e4 ker\u00e4\u00e4n kaiken pihalle esiin ja poltan",
      "en": "I gather everything to garden and burn it"
    }, {
      "fi": "niin",
      "en": "Thus"
    }, {
      "fi": "kirjat ja paperit",
      "en": "Books and papers"
    }, {
      "fi": "ehk\u00e4 my\u00f6s",
      "en": "Maybe furniture and memories also"
    }, {
      "fi": "huonekalut ja muistot",
      "en": "All the lies that come in the way of life"
    }, {
      "fi": "kaikki valheet jotka tulevat el\u00e4m\u00e4n tielle",
      "en": "All the good that prevents from seeing"
    }, {
      "fi": "kaikki hyv\u00e4 mik\u00e4 est\u00e4\u00e4 n\u00e4kem\u00e4st\u00e4",
      "en": "It is rust"
    }, {
      "fi": "se on ruoste",
      "en": "The smoke borders on the ruins"
    }, {
      "fi": "savu nuolee raunioita",
      "en": "You must know how it feels"
    }, {
      "fi": "tied\u00e4th\u00e4n milt\u00e4 tuntuu",
      "en": "To warm your hands"
    }, {
      "fi": "l\u00e4mmitt\u00e4\u00e4 k\u00e4si\u00e4\u00e4n",
      "en": "In the ash of burnt homes"
    }, {
      "fi": "palaneiden kotien tuhkassa",
      "en": "Hey"
    }, {
      "fi": "hei",
      "en": "Watch how slowly"
    }, {
      "fi": "katso kuinka hiljaa",
      "en": "It is raining again"
    }, {
      "fi": "sataa taas",
      "en": "Dust over the years"
    }, {
      "fi": "tomu vuotten ylle",
      "en": "Maybe these hands of a murderer are looking too"
    }, {
      "fi": "ehk\u00e4 n\u00e4m\u00e4kin murhaajank\u00e4det etsiv\u00e4t p\u00e4\u00e4t\u00e4",
      "en": "For a head to fondle and feel the weight of the world"
    }, {
      "fi": "jota silitt\u00e4\u00e4 ja tuntea maailman paino",
      "en": "It is rust"
    }],
    "source": "https://youtu.be/L8MJKwA9LZo",
    "totalWords": 120,
    "type": "song"
  },
  {
    "featuredWords": [
      ["and", "own", "want", "just", "be", "into", "it", "yourself", "another", "go", "disappear", "everybody", "again", "their", "explain", "snow", "how", "behind", "which", "you", "even", "them", "string", "get", "nobody", "to", "evil", "know", "they", "world", "those", "pull", "me", "reveal", "none", "of", "keep", "so", "stand", "about", "the"]
    ],
    "description": "blablabalablalbalbal",
    "tags": ["popular", "easy", "short"],
    "wordsFrequency": [
      [2, 1, 1, 2, 1, 1, 3, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 2, 1, 2, 5, 2, 2, 1, 1, 2, 1, 1, 1, 1, 1, 1, 2]
    ],
    "quizes": [],
    "lyricSrc": "http://lyricstranslate.com/en/elae-live.html",
    "coverImg": "https://img.youtube.com/vi/YwF4N0OSm3Y/hqdefault.jpg",
    "title": "Live.",
    "content": [{
      "fi": "\u00c4l\u00e4 selit\u00e4",
      "en": "Don't explain"
    }, {
      "fi": "S\u00e4 et tied\u00e4 niist\u00e4",
      "en": "You don't know about them"
    }, {
      "fi": "\u00c4l\u00e4 paljasta",
      "en": "Don't reveal"
    }, {
      "fi": "Pid\u00e4 hyv\u00e4n\u00e4si",
      "en": "Keep it to yourself"
    }, {
      "fi": "Kukaan edes ei tahdo tiet\u00e4\u00e4",
      "en": "Nobody even wants to know"
    }, {
      "fi": "\u00c4l\u00e4 paljasta",
      "en": "Don't reveal"
    }, {
      "fi": "Ne on taas niit\u00e4 joista ei voi puhua \u00e4\u00e4neen",
      "en": "They are again those which cannot be spoken aloud"
    }, {
      "fi": "Ne on taas niit\u00e4",
      "en": "They are again those"
    }, {
      "fi": "Ja valheet vain katoaa",
      "en": "And lies just desappear"
    }, {
      "fi": "Ne hankeen haudataan",
      "en": "They are buried into snow"
    }, {
      "fi": "Ja valheet vain katoaa",
      "en": "And lies just disappear"
    }, {
      "fi": "Paha siipens\u00e4 ei saa",
      "en": "The evil doesn't get beaten"
    }, {
      "fi": "Se ei kuulu sulle",
      "en": "It's none of your business"
    }, {
      "fi": "Se on eri maailma",
      "en": "It's another world"
    }, {
      "fi": "Minun takana seisovat",
      "en": "They stand behind me"
    }, {
      "fi": "Etk\u00f6 tajua",
      "en": "Can't you realise"
    }, {
      "fi": "Miten maailma kulkee",
      "en": "How the world goes"
    }, {
      "fi": "Kaikki repii omia lankojaan",
      "en": "Everybody pulls their own strings"
    }, {
      "fi": "Ne on niin sekaisin",
      "en": "They are so tangled"
    }],
    "source": "https://youtu.be/YwF4N0OSm3Y",
    "totalWords": 81,
    "type": "song"
  }
  ]

const style = theme => ({
  appBar: {
    position: 'relative'
  },
  flex: {
    flex: 1
  },
  root: {
    flexGrow: 1
  },
  form: {
    height: '100%',
    width: '100%',
    color: theme.palette.common.white,
    padding: theme.spacing.unit * 2
  },
  icons: {
    color: theme.palette.common.white
  },
  disabled: {
    opacity: 0.2
  },
  divider: {
    textAlign: 'center',
    color: theme.palette.common.black
  },
  bottombutton: {
    position: 'absolute',
    bottom: 0,
    margin: '0 auto'
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: '100%'
  },
  close: {
    width: theme.spacing.unit * 4,
    height: theme.spacing.unit * 4,
    zIndex: 99999999
  },
	button:{
		color:"white",
		margin:theme.spacing.unit
	}
});

function Transition(props) {
  return <Slide direction="up" {...props}/>;
}

class TopicEntry extends React.Component {
  state = {
    open: true,
    cardAnimaton: 'cardHidden',
    showPassword: false,
    username: '',
    facebook: '',
    twitter: '',
    instgram: '',
    description: '',
    study:'',
    email: '',
    password: '',
    name: '',
    error: false,
    errorMsg: '',
    snaopen: false,
    quizes: [
    ],
    totalWords:0,
    removed:true

  };
  async componentDidMount() {

  }
  handleClickOpen = () => {
    this.setState({open: true});
  };


  handleSnackClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    this.setState({snaopen: false});
  };
  handleClose = () => {
    this.setState({open: false});
    this.props.history.go(-1);
  };
  handleUpdate = async () => {

      songs.forEach(async (song)=>{
        song.study ="bllsdlsdllsdlsdlfdldfsll"
        song.featuredWords=song.featuredWords[0]

        song.wordsFrequency=song.wordsFrequency[0]
        console.log(song);
        const url = `${Config.API}/topics`;
       const res = await request(options(url, 'post', song));
       // console.log(res);
      })
        // console.log(data);



  };


  render() {
    const {classes} = this.props;
    return (<div>
      <Dialog fullScreen open={this.state.open} onClose={this.handleClose} TransitionComponent={Transition}>
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton color="inherit" onClick={this.handleClose} aria-label="Close">
              <CloseIcon/>
            </IconButton>
            <Typography variant="title" color="inherit" className={classes.flex}>
              Add Topic
            </Typography>
            <Button color="inherit" onClick={this.handleUpdate}>
              Submit
            </Button>
          </Toolbar>
        </AppBar>
      </Dialog>
      <Snackbar anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left'
        }} open={this.state.snaopen} autoHideDuration={6000} onClose={this.handleSnackClose} ContentProps={{
          'aria-describedby' : 'message-id'
        }} message={<span id = "message-id" > {
          this.state.errorMsg
        }
        </span>} action={[
          <Button key="undo" color="secondary" small onClick={this.handleSnackClose}>
            Close
          </Button>,
          <IconButton key="close" aria-label="Close" color="inherit" className={classes.close} onClick={this.handleSnackClose}>
            <CloseIcon/>
          </IconButton>
        ]}/>

    </div>);
  }
}

TopicEntry.propTypes = {
  classes: PropTypes.object.isRequired
};

// TopicEntry.defaultProps = {
//   quizes:[{question:{type:"choice"},choices:['question','a','b','c','d'],answers:[1]}]
// }

export default withStyles(style)(withRouter(TopicEntry));
