//import injectTapEventPlugin from 'react-tap-event-plugin';
//injectTapEventPlugin();
import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import Grid from '@material-ui/core/Grid';

import classNames from 'classnames';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Checkbox from '@material-ui/core/Checkbox';
const styles = theme => ({
	root: {
		flexGrow: 1,
		marginTop:theme.spacing.unit,
		marginBottom:theme.spacing.unit,
		background:theme.palette.grey[200]
	},
	textField: {
		marginLeft: theme.spacing.unit,
		marginRight: theme.spacing.unit,
		width: '100%'
	},
  answers:{
    marginLeft:theme.spacing.unit*4,
    marginTop:theme.spacing.unit*2
  }
});
class QuestionEntry extends React.Component {
  state = {
		quize:{question:"title or question or blank",choices:['a','b','c','d'],answers:[1]}
  };
	componentDidMount(){
		this.setState({quize:this.props.quize})

	}
	// handleChecked = async (index) => {
	// 	let result = false;
	// 	  result= await this.state.quize.answers.includes(index)
	// 	return result
	// }
	handleQuizeChange = (type, choiceIndex, newValue) => event =>{
		let quize = this.state.quize;
		if(type === "choice"){


			quize.choices[choiceIndex] = event.target.value
		}
		if(type ==="answer"){
			event.target.checked ?  quize.answers.push(choiceIndex):
			quize.answers.splice(quize.answers.indexOf(choiceIndex),1)
		}
		if(type ==="question"){
			quize.question=event.target.value;
		}
		this.setState({quize})

		this.props.handleQuizeChange(this.props.questionIndex, quize)
	};
  handleChangeBodyState = (param) => {
    this.setState(() => ({body: param}));
  }
  handleMakeAnswers=()=>{
    let answers = []
    answers = this.state.quize.choices.map((choice, index)=>{
			return(

					index === 0 ? 			<div key={index} >
					<FormControl className={classNames(this.props.classes.margin, this.props.classes.textField)}>
																	 												 <InputLabel htmlFor="adornment-Set">{`Set ${this.props.questionIndex}`}</InputLabel>
																	 												 <Input
																	 													 id={`adornment-${index}`}
																	 													 type="text"
																	 													 value={this.state.quize.question}
																	 													 onChange={this.handleQuizeChange('question',index)}
																	 												 />


																	 											 </FormControl>
						<Grid container className={this.props.classes.answers} >
												 <Grid item xs={11}>
												 <FormControl className={classNames(this.props.classes.margin, this.props.classes.textField)}>
													 <InputLabel htmlFor="adornment-Answer">{`Answer or Question ${index}`}</InputLabel>
													 <Input
														 id={`adornment-${index}`}
														 type="text"
														 value={choice}
														 onChange={this.handleQuizeChange('choice',index)}
													 />
												 </FormControl>
												 </Grid>
												 <Grid item xs={1}>

														 <Checkbox
										 checked={this.state.quize.answers.includes(index)}
										 onChange={this.handleQuizeChange('answer',index)}

										 value={`Checkbox ${index}`}
										 color="primary"
										 />


												 </Grid>
											 </Grid>
				</div>
											 :					<Grid container className={this.props.classes.answers} >
											 											 <Grid item xs={11}>
											 											 <FormControl className={classNames(this.props.classes.margin, this.props.classes.textField)}>
											 												 <InputLabel htmlFor="adornment-Answer">{`Answer or Question ${index}`}</InputLabel>
											 												 <Input
											 													 id={`adornment-${index}`}
											 													 type="text"
											 													 value={choice}
											 													 onChange={this.handleQuizeChange('choice',index)}
											 												 />
											 											 </FormControl>
											 											 </Grid>
											 											 <Grid item xs={1}>

											 													 <Checkbox
											 									 checked={this.state.quize.answers.includes(index)}
											 									 onChange={this.handleQuizeChange('answer',index)}

											 									 value={`Checkbox ${index}`}
											 									 color="primary"
											 									 />


											 											 </Grid>
											 											 </Grid>





			)





    })
		return answers
  }
  render() {
    const {classes} = this.props;
    return (
    <Grid container className={classes.root}>
      <Grid xs={12} item>

      {
        this.handleMakeAnswers()
    }
      </Grid>
    </Grid>
    )}}
QuestionEntry.propTypes = {classes: PropTypes.object.isRequired};
export default withStyles(styles)(QuestionEntry); // export default () => {
