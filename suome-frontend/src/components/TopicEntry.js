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
import SimpleSchema from 'simpl-schema';
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
    console.log(this.props.match.params.id);
    if (this.props.match.params.id) {
      try {
        const url = `${Config.API}/topics/${this.props.match.params.id}`;
        let res = await request(options(url, 'get'));
        res = JSON.parse(res);
        // console.log(res);
        this.setState({type: res.type});
        this.setState({removed: res.removed});
        this.setState({title: res.title});
        this.setState({source: res.source});
        this.setState({coverImg: res.coverImg});
        this.setState({tags: res.tags.join(',')});
				this.setState({quizes: res.quizes});
        this.setState({study: res.study});
        this.setState({lyricSrc: res.lyricSrc});
        this.setState({featuredWords: res.featuredWords.join(',')});
        this.setState({wordsFrequency: res.wordsFrequency.join(',')});
        this.setState({totalWords: String((res.totalWords))});
        const finnish = res.content.map((item, index) => {
          return item.fi;
        }).join('\n');
        this.setState({finnish: finnish});
        const english = res.content.map((item, index) => {
          return item.en;
        }).join('\n');
        // console.log(english);
        this.setState({english: english});
        this.setState({description: res.description});
      } catch (e) {
        console.log('some thing wrong', e);
      }
    }

    setTimeout(function() {
      this.setState({cardAnimaton: ''});
    }.bind(this), 700);
  }
  handleClickOpen = () => {
    this.setState({open: true});
  };
	handleAddRemoveQuestion = (task)=>{
		let quizes = this.state.quizes
		if (task==="Add"){
			quizes.push(      {
							question: "Title or Question or Blank",
							choices: [
								'a', 'b', 'c', 'd'
							],
							answers: [0]
						})
		}
		if(task==="Remove"){
			quizes.pop()
		}

	this.setState({quizes})
	}
  handleQuizeChange = (quizeIndex, quize) => {
		// console.log("quizeIndex",quizeIndex);
		let quizes = this.state.quizes
		quizes[quizeIndex] = quize
		this.setState({quizes})
		// console.log(this.state.quizes);


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
    try {
      const userSchema = new SimpleSchema({
        coverImg: {
          type: String,
          min: 5,
          max: 200,
          optional: true
        },
        title: {
          type: String,
          max: 200,
          optional: true
        },
        tags: {
          type: String,
          max: 200,
          optional: true
        },
        featuredWords: {
          type: String,
          max: 2000,
          optional: true
        },
        wordsFrequency: {
          type: String,
          max: 2000,
          optional: true
        },
        totalWords:{
        type:  String,
        max: 20,
        },
        description: {
          type: String,
          max: 2000,
          optional: true
        },
        source: {
          type: String,
          label: 'source ',
          regEx: SimpleSchema.RegEx.Url
        },
        lyricSrc: {
          type: String,
          label: 'Lyrics Source ',
          regEx: SimpleSchema.RegEx.Url
        },
        type: {
          type: String,
          min: 2,
          max: 10
        },
        finnish: {
          type: String,
          min: 4,
          max: 200000
        },
        english: {
          type: String,
          min: 4,
          max: 200000
        }
      });
      userSchema.validate({
        type: this.state.type,
        title: this.state.title,
        source: this.state.source,
        coverImg: this.state.coverImg,
        tags: this.state.tags,
        finnish: this.state.finnish,
        description: this.state.description,
        english: this.state.english,
        featuredWords: this.state.featuredWords,
        lyricSrc:this.state.lyricSrc,
        wordsFrequency:this.state.wordsFrequency,
      totalWords:this.state.totalWords

      });

      let data = {
        title: this.state.title,
        type: this.state.type,
        source: this.state.source,
        description: this.state.description,
        coverImg: this.state.coverImg,
        lyricSrc:this.state.lyricSrc,
        study:this.state.study,
        totalWords:this.state.totalWords,
        removed:this.state.removed

      };
      data.tags = this.state.tags.split(',').map(item => item.trim());
      data.featuredWords = this.state.featuredWords.split(',').map(item => item.trim());
      data.wordsFrequency=this.state.wordsFrequency.split(',').map(item => parseInt(item.trim(),10));

      const finnish = this.state.finnish.split('\n').map(item => item.trim());
      const english = this.state.english.split('\n').map(item => item.trim());
      const content = finnish.filter((item, index) => {
        return item.length !== 0 && english[index].length !== 0;
      }).map((item, index) => {
        return {fi: item, en: english[index]};
      });
      data.content = content;
      data.quizes = this.state.quizes;
      if (this.props.match.params.id) {
        const url = `${Config.API}/topics${ '/' + this.props.match.params.id}`;
        const res = await request(options(url, 'put', data));
        this.setState({name: JSON.parse(res).name});
        this.setState({username: JSON.parse(res).username});
        // console.log(url);

        // console.log(data);

        // console.log('get done', res);
      } else {
        // console.log(data);
        const url = `${Config.API}/topics`;
        await request(options(url, 'post', data));
        // console.log(url);

        // console.log('get done', res);
      }
      this.props.history.go(-1);
    } catch (e) {
      console.log(e.message);
      this.setState({errorMsg: e.message});
      this.setState({error: true});
      this.setState({snaopen: true});
    } finally {}

  };
  handleChange = prop => event => {
    this.setState({[prop]: event.target.value});
  };
  handleChangeCheck = name => event => {
    this.setState({ [name]: event.target.checked });
  };
  handleMouseDownPassword = event => {
    event.preventDefault();
  };

  handleClickShowPassword = () => {
    this.setState(state => ({
      showPassword: !state.showPassword
    }));
  };
  componentDidUpdate(prevProps, prevState) {}
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
        <div>
          <div className={classes.root}>
            <Paper className={classes.form}>
              <Grid container alignItems="flex-start"  justify="center">
                <Grid item xs={12}>
                  {
                    this.state.error && (<p style={{
                        color: 'red'
                      }}>
                      {this.state.errorMsg}
                    </p>)
                  }
                </Grid>
                <Grid item xs={12}>
                  <Switch
  checked={this.state.removed}
  onChange={this.handleChangeCheck('removed')}
  value="removed"
/>

                </Grid>
                <Grid item xs={12}>

                    <TextField fullWidth label="Title" className={classes.textField}  InputLabelProps={{
                        shrink: true,
                      }} id="adornment-title" type="text" value={this.state.title} onChange={this.handleChange('title')}/>

                </Grid>
                <Grid item xs={12}>


                    <TextField fullWidth label="Type" className={classes.textField}  InputLabelProps={{
                        shrink: true,
                      }} id="adornment-type" type="text" value={this.state.type} onChange={this.handleChange('type')}/>

                </Grid>

                <Grid item xs={12}>


                    <TextField fullWidth label="Souce" className={classes.textField}  InputLabelProps={{
                        shrink: true,
                      }} id="adornment-source" type="source" value={this.state.source} onChange={this.handleChange('source')}/>

                </Grid>
                <Grid item xs={12}>


                    <TextField fullWidth label="Cover Image" className={classes.textField}  InputLabelProps={{
                        shrink: true,
                      }} id="adornment-coverImg" type="text" value={this.state.coverImg} onChange={this.handleChange('coverImg')}/>

                </Grid>

                <Grid item xs={12}>


                    <TextField fullWidth label="Tags" className={classes.textField}  InputLabelProps={{
                        shrink: true,
                      }} id="adornment-tags" type="text" value={this.state.tags} onChange={this.handleChange('tags')}/>

                </Grid>
                <Grid item xs={12}>


                    <TextField fullWidth label="Featured Words" className={classes.textField}  InputLabelProps={{
                        shrink: true,
                      }}   id="adornment-featuredWords" type="text" value={this.state.featuredWords} onChange={this.handleChange('featuredWords')}/>

                </Grid>
                <Grid item xs={12}>


                    <TextField fullWidth label="Frequant Words" className={classes.textField}  InputLabelProps={{
                        shrink: true,
                      }} id="adornment-wordsFrequency" type="text" value={this.state.wordsFrequency} onChange={this.handleChange('wordsFrequency')}/>

                </Grid>
                <Grid item xs={12}>
                  <FormControl className={classNames(classes.margin, classes.textField)}>
                    <InputLabel htmlFor="adornment-totalWords">Total Words</InputLabel>
                    <Input id="adornment-totalWords" type="text" value={this.state.totalWords} onChange={this.handleChange('totalWords')}/>
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <TextField id="textarea" label="Description" value={this.state.description} placeholder="Description" multiline className={classes.textField} margin="normal" onChange={this.handleChange('description')}/>
                </Grid>
                <Grid item xs={12}>
                  <TextField id="textarea"             InputLabelProps={{
                      shrink: true,
                    }}
        label="Lyrics Source" value={this.state.lyricSrc} placeholder="lyricSrc" multiline className={classes.textField} margin="normal" onChange={this.handleChange('lyricSrc')}/>
                </Grid>
                <Grid item xs={12}>
                  <TextField id="textarea" label="Study" value={this.state.study} placeholder="Study" multiline className={classes.textField} margin="normal" onChange={this.handleChange('study')}/>
                </Grid>

                <Grid item xs={6}>
                  <TextField InputLabelProps={{
                      shrink: true,
                    }} id="textarea" label="Finnish" value={this.state.finnish} placeholder="Finnish" multiline className={classes.textField} margin="normal" onChange={this.handleChange('finnish')}/>
                </Grid>
                <Grid item xs={6}>
                  <TextField InputLabelProps={{
                      shrink: true,
                    }} id="textarea" label="English" value={this.state.english} placeholder="English" multiline className={classes.textField} margin="normal" onChange={this.handleChange('english')}/>
                </Grid>
<Grid item xs={2}>
								<Button variant="fab" color="primary" small aria-label="Add"
									 className={classes.button} onClick={(e)=>{this.handleAddRemoveQuestion('Add')}}>
	<AddIcon />
	</Button>
	<Button variant="fab" color="primary" small aria-label="Remove"
	className={classes.button} 	 onClick={(e)=>{this.handleAddRemoveQuestion('Remove')}}>
<RemoveIcon />
</Button>


							</Grid>





              </Grid>


              {
                this.state.quizes.map((quize, index) => {

                  return (<QuestionEntry key={index} quize={quize} questionIndex={index} handleQuizeChange={this.handleQuizeChange}/>)
                })
              }

            </Paper>
          </div>
        </div>
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
