import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { loadCSS } from 'fg-loadcss/dist/loadCSS';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';

import Avatar from '@material-ui/core/Avatar';
import classNames from 'classnames';
import ListSubheader from '@material-ui/core/ListSubheader';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Modal from './shared/Modal/Modal';
import Button from '@material-ui/core/Button';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import Config from '../Config';
import options from './Options';
import request from 'request-promise';
const styles = theme => ({
	root: {
		flexGrow: 1
	},
	cardContainer: {
		height: '20rem'
		// background:"red"
	},
	paper: {
		// padding: theme.spacing.unit * 2,
		textAlign: 'center',
		color: theme.palette.text.secondary,
		height: '100%',
		width: '100%',
		maxWidth: '500px',
		marginTop: theme.spacing.unit
	},
	div: {
		height: '58px',
		padding: theme.spacing.unit,
		// background:"red",

		width: '100%'
	},
	cardAvatar: {
		color: 'black',
		// background:"yellow",
		cursor: 'pointer',
		width: '35px',
		height: '35px'
	},
	cardIconButton: {
		width: '37px',
		height: '37px'
	},
	qstnAvatar: {
		marginLeft: theme.spacing.unit * 4,
		width: '30px',
		height: '30px'
	},
	list: {
		width: '70%',
		marginRight: '48px',
		marginLeft: '48px'
	},
	unselectedPage: {
		opacity: 0.4
	},
	rightButton: { float: 'right', top: '50%', display: 'absolute', transform: 'translateY(-24px)' },
	leftButton: { float: 'left', top: '50%', display: 'absolute', transform: 'translateY(-50%)' },
	correctAnswer: { background: 'green' },
	wrongAnswer: { background: 'red' },
	questionArea: {
		width: '100%',
		height: '20rem',
		// ,background:"green"
		display: 'relative'
	},
	hr: { width: '98%', margin: 'auto' },
	icon: { margin: 'auton' }
});

class FullWidthGrid extends React.Component {
	state = {
		contentNum: 0,
		userSelections: [],
		quizes: [],
		completed: [],
		modalStatus: {
			info: false,
			alert: false
		},
		user:{likes:[],completed:[]}
	};
	toggleModal = (type, action) => {
		const newState = {
			...this.state
		};

		newState.modalStatus[type] = action;
		this.setState(newState);
	};
	handleReset = () => {
		this.setState({userSelections: []});
	};
	handlePreviousCard = () => {
		if (this.state.contentNum === 0) {
			this.setState({ contentNum: this.props.quizes.length - 1 });
		} else {
			this.setState({ contentNum: this.state.contentNum - 1 });
		}
	};
	handleNextCard = () => {
		if (this.state.contentNum === this.props.quizes.length - 1) {
			this.setState({ contentNum: 0 });
		} else {
			this.setState({ contentNum: this.state.contentNum + 1 });
		}
	};
	handleCompleted = () => {
		let completed = this.state.completed;
		if (this.state.userSelections.length > 0) {
			this.props.quizes.map((quize, index, quizes) => {
				if (
					this.state.userSelections[index] &&
					quize.answers.sort().join(',') === this.state.userSelections[index].sort().join(',')
				) {
					// alert('same members');

					completed[index] = true;
					this.setState({ completed });
				} else {
					// alert('not a match');
					completed[index] = false;
					this.setState({ completed });
				}
			});
		}
		if (this.state.completed.length === this.props.quizes.length && !this.state.completed.includes(false)) {
			this.toggleModal('info', true);
		} else {
			this.toggleModal('info', false);
		}
	};

	handleChceckAnswer = (index, contentNumb) => {
		let selection = this.state.userSelections;

		if (!selection[contentNumb]) {
			selection[contentNumb] = [index];
			this.setState({ userSelections: selection });
			this.handleCompleted();
			return;
		}

		if (selection[contentNumb] && !selection[contentNumb].includes(index)) {
			selection[contentNumb].push(index);
			this.setState({ userSelections: selection });
			this.handleCompleted();
		}
	};
	handleAddToLike = async () => {
		const url = this.state.user.likes.includes(this.state.topicId)
			? `${Config.API}/topics/${this.state.topicId}/unlike`
			: `${Config.API}/topics/${this.state.topicId}/like`;
		await request(options(url, 'post')); //method cat id data
		let user = this.state.user;
		user.likes.includes(this.state.topicId)
			? user.likes.splice(user.likes.indexOf(this.state.topicId), 1)
			: user.likes.push(this.state.topicId);
		this.setState({
			user
		});
	};
	handleAddToComplete = async () => {
		//when the uncomplete api get ready then this has to be fixed to be similar to the above
		const url =
			!this.state.user.completed.includes(this.state.topicId) && `${Config.API}/topics/${this.state.topicId}/complete`;

		if (url) {
			await request(options(url, 'post')); //method cat id data
			let user = this.state.user;
			user.completed.push(this.state.topicId);
			this.setState({
				user
			});
		}
	};
	handleSelectQuestion = index => {
		this.setState({ contentNum: index });
	};
	componentDidMount() {
		try {

			this.setState({ topicId:this.props.topicId  });
			if (window.user) {
				let user = JSON.parse(window.user);

				this.setState({ user });
				console.log(this.props.topicId,user)
			}

			loadCSS(
				'https://use.fontawesome.com/releases/v5.1.0/css/all.css',
				document.querySelector('#insertion-point-jss')
			);
		} catch (e) {}
	}
	// componentWillReceiveProps(nextProps) {
	// 	if (nextProps.quizes.length > 0) {
	// 		this.setState({ quizes: nextProps.quizes });
	// 	}
	// 	if (nextProps.topicId !== this.state.topicId) {
	//
	// 		this.setState({ topicId:nextProps.topicId  });
	// 	}
	// }
	render() {
		const { classes } = this.props;
		const {topicId} = this.state;
		return (
			<div>
				<Grid className={classes.root} container spacing={0} alignItems="center" alignContent="center" justify="center">
					<Paper className={classes.paper}>
						<Grid item xs={12}>
							<Grid container>
								<Grid item xs={12}>
									<div className={classes.div}>
										<Grid container>
											{this.props.quizes &&
												this.props.quizes.map((item, index) => {
													return (
														<Grid item key={index}>
															<IconButton className={classes.cardIconButton}>
																<Avatar
																	onClick={e => {
																		this.handleSelectQuestion(index);
																	}}
																	className={classNames(classes.cardAvatar, {
																		[classes.unselectedPage]: index !== this.state.contentNum
																	})}
																>
																	{index + 1}
																</Avatar>
															</IconButton>
														</Grid>
													);
												})}
										</Grid>
									</div>
								</Grid>
							</Grid>
						</Grid>

						<hr className={classes.hr} />
						<Grid item xs={12}>
							{/*  reserve the whole width of the page for the next container*/}
							<Grid
								className={classes.cardContainer}
								container
								spacing={0}
								alignItems="center"
								alignContent="center"
								justify="space-between"
							>
								<Grid item xs={12}>
									<div className={classes.questionArea}>
										<IconButton
											className={classes.leftButton}
											onClick={e => {
												this.handlePreviousCard();
											}} //event and variable
										>
											<ChevronLeftIcon className={classes.icon} />
										</IconButton>
										<IconButton
											className={classes.rightButton}
											onClick={e => {
												this.handleNextCard();
											}} //event and variable
										>
											<ChevronRightIcon className={classes.icon} />
										</IconButton>
										<Grid container className={classes.questions} justify="center" alignItems="center">
											<Grid item xs={12}>
												<div className={classes.list}>
													<List
														dense
														component="nav"
														subheader={
															<ListSubheader style={{ lineHeight: '1rem', color: 'black' }} component="div">
																{this.props.quizes[this.state.contentNum].question}
															</ListSubheader>
														}
													>
														{this.props.quizes &&
															this.props.quizes.length > 0 &&
															Number.isInteger(this.state.contentNum) &&
															this.props.quizes[this.state.contentNum].choices.map((choice, index) => {
																return (
																	<ListItem
																		key={index}
																		onClick={e => {
																			this.handleChceckAnswer(index, this.state.contentNum);
																		}}
																		button
																	>
																		<ListItemIcon>
																			<Avatar
																				className={classNames(
																					{
																						[classes.correctAnswer]:
																							this.state.userSelections.length > 0 &&
																							this.state.userSelections[this.state.contentNum] &&
																							this.state.userSelections[this.state.contentNum].includes(index) &&
																							this.props.quizes[this.state.contentNum].answers.includes(index)
																					},
																					{
																						[classes.wrongAnswer]:
																							this.state.userSelections.length > 0 &&
																							this.state.userSelections[this.state.contentNum] &&
																							this.state.userSelections[this.state.contentNum].includes(index) &&
																							!this.props.quizes[this.state.contentNum].answers.includes(index)
																					}
																				)}
																			>
																				{index + 1}
																			</Avatar>
																		</ListItemIcon>
																		<ListItemText inset primary={choice} />
																	</ListItem>
																);
															})}
													</List>
												</div>
											</Grid>
										</Grid>
									</div>
								</Grid>
							</Grid>
						</Grid>
						<Grid container justify="center" alignItems="center" >
							<Grid item>
								<Button variant="outlined" style={{marginBottom:"10px"}} onClick={(e)=>{this.handleReset()}}//event and variable
								>
									Reset
								</Button>
							</Grid>
						</Grid>
					</Paper>
				</Grid>

				<Modal
					buttonType="Close"
					title={'Mark as Completed'}
					showModal={this.state.modalStatus.info}
					handleHideModal={this.toggleModal.bind(this, 'info', false)}
				>
					<DialogContent>
						<DialogContentText id="alert-dialog-description">
							We think that you can now understand the lyrics in this song without looking at english translation. Click
							on the heart icon if you like this song.Mark this song as completed if you want add the main words of this
							song to your known words.
							<br />
							<Grid container alignItems="center" justify="center">
								<Grid item xs={1} style={{margin:"10px"}}>
									<IconButton className={classes.icon} 											onClick={e => {
																					this.handleAddToLike();
																				}}>
										<Icon
											className={classNames(
												classes.icon,
												this.state.user.likes.includes(this.state.topicId)
													? 'fas fa-heart'
													: 'far fa-heart'
											)}

										/>
									</IconButton>
								</Grid>
								<Grid item xs={1} style={{margin:"10px"}}>
									<IconButton className={classes.icon} 											onClick={e => {
																					this.handleAddToComplete();
																				}}>
										<Icon
											className={classNames(
												classes.icon,
												this.state.user.completed.includes(this.state.topicId)
													? 'fas fa-check-circle'
													: 'far fa-check-circle'
											)}

										/>
									</IconButton>
								</Grid>
							</Grid>
						</DialogContentText>
					</DialogContent>
					<DialogActions>
						<Button onClick={this.toggleModal.bind(this, 'info', false)}>Close</Button>
					</DialogActions>
				</Modal>
			</div>
		);
	}
}

FullWidthGrid.propTypes = {
	classes: PropTypes.object.isRequired,
	content: PropTypes.array.isRequired
};
FullWidthGrid.defaultProps = {
	content: [
		{
			question: 'bla bla',
			answers: [
				{ answer: 'bla bla', result: true },
				{ answer: 'bla blksdf bla', result: false },
				{ answer: 'bla bal bla', result: true },
				{ answer: 'bla bal bla', result: false }
			]
		},
		{
			question: 'bla sdf',
			answers: [
				{ answer: 'bla bla', result: true },
				{ answer: 'sdf bal bla', result: false },
				{ answer: 'bla bal bla', result: true },
				{ answer: 'bla bal bla', result: false }
			]
		},
		{
			question: 'df bla',
			answers: [
				{ answer: 'bla bla', result: true },
				{ answer: 'bla bal sdf', result: false },
				{ answer: 'bla bal bla', result: true },
				{ answer: 'bla bal bla', result: false }
			]
		},
		{
			question: 'df bla',
			answers: [
				{ answer: 'bla bla', result: true },
				{ answer: 'bla bal sdf', result: false },
				{ answer: 'bla bal bla', result: true },
				{ answer: 'bla bal bla', result: false }
			]
		},
		{
			question: 'df bla',
			answers: [
				{ answer: 'bla bla', result: true },
				{ answer: 'bla bal sdf', result: false },
				{ answer: 'bla bal bla', result: true },
				{ answer: 'bla bal bla', result: false }
			]
		},
		{
			question: 'df bla',
			answers: [
				{ answer: 'bla bla', result: true },
				{ answer: 'bla bal sdf', result: false },
				{ answer: 'bla bal bla', result: true },
				{ answer: 'bla bal bla', result: false }
			]
		},
		{
			question: 'df bla',
			answers: [
				{ answer: 'bla bla', result: true },
				{ answer: 'bla bal sdf', result: false },
				{ answer: 'bla bal bla', result: true },
				{ answer: 'bla bal bla', result: false }
			]
		},
		{
			question: 'df bla',
			answers: [
				{ answer: 'bla bla', result: true },
				{ answer: 'bla bal sdf', result: false },
				{ answer: 'bla bal bla', result: true },
				{ answer: 'bla bal bla', result: false }
			]
		}
	]
};

// z[0].fi
export default withStyles(styles)(FullWidthGrid);
