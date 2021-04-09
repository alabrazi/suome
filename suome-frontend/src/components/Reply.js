import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';
import classNames from 'classnames';
import { withRouter } from 'react-router-dom';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import DialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ReplyIcon from '@material-ui/icons/Reply';

import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import EditIcon from '@material-ui/icons/Edit';
import Collapse from '@material-ui/core/Collapse';
import AlertModal from './shared/Modal/Modal';
import Modal from './shared/Modal/Modal';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import ReactMarkdown from 'react-markdown';
import moment from 'moment';
import Config from '../Config';
import options from './Options';
import request from 'request-promise';
import QuestionModal from './shared/Modal/QuestionModal';
import SnackBar from './shared/SnackBar';
import SubReply from './SubReply';

import { styles, defaultProps } from './presets/Reply';

// const user = JSON.parse(localStorage.getItem('user'));
class Reply extends React.Component {
	//user = JSON.parse(localStorage.getItem('user'));
	// user = JSON.parse(window.user);

	state = {
		snackbarY: 0,
		snackopen: false,
		snackMsg: '',
		vote: 0,
		openSubReplies: false,
		modalStatus: {
			question: false,
			alert: false,
			info: false
		},
		subReplies: [],
		reply: {},
		user:{}
	};

	subReplyIds = [];
	handleDeleteReply = async _id => {
		this.props.handleDeleteReply(_id);
		this.toggleModal('alert', false);

		// this.setState({deleteTopicID:""})
		let subReplies = [...this.state.subReplies];

		subReplies = subReplies.filter(doc => {
			return doc._id !== _id;
		});
		this.setState({ subReplies });

		this.forceUpdate();
	};

	handleChange = prop => event => {
		this.setState({ [prop]: event.target.value });
	};
	handleEditReply = async _id => {
		try {
			let data = {
				content: this.state.tempReply,
				type: 'reply',
				id: _id
			};
			const url = `${Config.API}/replies/${_id}`;
			await request(options(url, 'put', data)); //method cat id data

			// this.setState({confirmDelete:false})
			this.setState({ reply: this.state.tempReply });
		} catch (e) {}

		// this.setState({deleteTopicID:""})
		this.toggleModal('info', false);
	};
	toggleModal = (type, action) => {
		const newState = {
			...this.state
		};

		newState.modalStatus[type] = action;
		this.setState(newState);
	};
	handleOpenSubReplies = () => {
		this.setState({ openSubReplies: !this.state.openSubReplies });
	};

	submitQuestion = async replyContent => {
		const payload = {
			content: replyContent,
			type: 'reply',
			id: this.props.reply._id,
			topicId: this.props.topicId
		};

		const url = `${Config.API}/replies`;

		return await request(options(url, 'post', payload));
	};

	handleSubmitQuestionSuccess = async reply => {
		// window.location.reload();
		// this.props.history.replace(`/topic/${this.props.match.params.id}/3`);
		//
		// window.location.reload();
		// this.subReplyIds.push(reply._id);
		// this.props.fetchTopic()
		// this.fetchSubReplies(reply._id);
		const url = `${Config.API}/replies/${reply._id}`;
		const res = await request(options(url));
		reply = JSON.parse(res);
		let subReplies = [...this.state.subReplies];
		subReplies.push(reply);
		this.setState({ subReplies });

		this.forceUpdate();
	};
	fetchSubReplies = async IDs => {
		try {
			let subReplies = [];
			IDs.forEach(async id => {
				try {
					const res = await request(options(`${Config.API}/replies/${id}`));
					subReplies.push(JSON.parse(res));
				} catch (e) {}
			});
			await this.setState({ subReplies });
		} catch (e) {}
	};
	handleVote = async (e, _id, upOrDown) => {
		try {
			this.setState({ snackbarY: -e.clientY });
			let votes = this.state.votes;
			const payload = {};

			await request(options(`${Config.API}/replies/${_id}/${upOrDown}`, 'post', payload));

			upOrDown === 'upvote' ? this.setState({ votes: votes + 1 }) : this.setState({ votes: votes - 1 });
		} catch (e) {
			this.setState({ snackopen: true });

			this.setState({ snackMsg: e.error });
		}
	};

	async componentDidMount() {
		this.fetchSubReplies(this.props.reply.subReplies);
		this.setState({ subReplyIds: this.props.reply.subReplies });
		this.setState({ votes: this.props.reply.votes });
		this.setState({ reply: this.props.reply.content });
		this.setState({ tempReply: this.props.reply.content });
				// this.setState({ user: JSON.parse(localStorage.getItem('user'))});

		// const user = await JSON.parse(window.user)
		// await this.setState({ user  });
		// alert(window.user)
		const user = await JSON.parse(window.user)

			this.setState({ user  });
		//
		//
		// this.forceUpdate()
	}
	// async componentDidUpdate(prevProps, prevState) {
	// 	const user = await JSON.parse(window.user)
	// 	await this.setState({ user  });
	// 	alert(window.user)
	// }
	handleGetReplyDetail = async _id => {
		try {
			const data = {};
			const res = await request(options(`${Config.API}/replies/${_id}`, 'get', data));

			return res;
		} catch (e) {}
	};
	handleGoToProfile = owner => {
		if (owner._id !== this.state.user._id) {
			this.props.history.push(`/profile/${owner._id}`);
		} else {
			this.props.history.push(`/profile`);
		}
	};

	// componentWillReceiveProps(nextProps) {
	// 	if (this.props.reply.subReplies.length !== nextProps.reply.subReplies.length){
	//
	// 		this.setState({subReplyIds:nextProps.reply.subReplies})
	// 		this.fetchSubReplies(nextProps.reply.subReplies);
	//
	// 	}
	//
	//
	// }
	componentWillReceiveProps(nextProps) {
		// console.log("next",nextProps.user);
		// 		console.log("current",JSON.parse(JSON.parse(this.props.user)));
		if(JSON.parse(nextProps.user) !== this.state.user){
			this.setState({user:JSON.parse(nextProps.user)})
		}

		this.forceUpdate()
	}
	handleSnackClose = (event, reason) => {
		if (reason === 'clickaway') {
			return;
		}


		this.setState({ snackopen: false });
		this.setState({ snackMsg: '' });
	};
	render() {
		const { classes, reply } = this.props;
				const { user } = this.state;
		// console.log(reply);

		return (
			<div className={classes.root}>
				<div style={{ position: 'relative' }}>
					<SnackBar
						snackopen={this.state.snackopen}
						handleSnackClose={(e, reason) => {
							this.handleSnackClose(e, reason);
						}}
						snackMsg={this.state.snackMsg}
						snackbarY={this.state.snackbarY}
					/>
					<List dense component="div">
						<ListItem
							className={classNames(classes.nested, {
								[classes.nestedPadding]: this.props.isSubreply === true
							})}
						>
							<Avatar
								alt={reply.owner && reply.owner.name}
								src={reply.owner && reply.owner.avatar}
								onClick={e => {
									this.handleGoToProfile(reply.owner);
								}}
							/>
							<ListItemText
								inset
								primary={<ReactMarkdown source={this.state.reply} />}
								secondary={`${reply.owner && reply.owner.name} ${moment(reply.createdAt).format('MMM Do, YYYY')}`}
							/>

							<ListItemSecondaryAction>
								<Grid
									container
									className={classes.demo}
									alignItems="center"
									direction="column"
									justify="center"
									alignContent="center"
								>
									<Grid item>
										<IconButton
											aria-label="Upward"
											onClick={e => {
												this.handleVote(e, reply._id, 'upvote');
											}}
										>
											<ArrowUpwardIcon color="primary" />
										</IconButton>
									</Grid>
									<Grid item>
										<Avatar>{['', null, 0, undefined].includes(this.state.votes) ? '0' : this.state.votes}</Avatar>
									</Grid>
									<Grid item>
										<IconButton
											aria-label="Downward"
											onClick={e => {
												this.handleVote(e, reply._id, 'downvote');
											}}
										>
											<ArrowDownwardIcon color="error" />
										</IconButton>
									</Grid>
								</Grid>
							</ListItemSecondaryAction>
						</ListItem>

						<ListItem className={classes.bottomActions}>
							<ListItemSecondaryAction>
									{(user.isAdmin===true) || (reply.owner._id === user._id)  ? (
									<div>
										<IconButton
											variant="contained"
											size="small"
											className={classes.button}
											onClick={this.toggleModal.bind(this, 'info', true)}
										>
											<EditIcon className={classNames(classes.iconSmall)} />
										</IconButton>
										<IconButton
											variant="contained"
											size="small"
											color="secondary"
											className={classes.button}
											onClick={this.toggleModal.bind(this, 'alert', true)}
										>
											<DeleteForeverIcon className={classNames(classes.iconSmall)} />
										</IconButton>
										<IconButton
											variant="contained"
											size="small"
											color="primary"
											className={classes.button}
											onClick={this.toggleModal.bind(this, 'question', true)}
										>
											<ReplyIcon className={classNames(classes.iconSmall)} />
										</IconButton>
									</div>
								) : (
									<IconButton
										variant="contained"
										size="small"
										color="primary"
										className={classes.button}
										onClick={this.toggleModal.bind(this, 'question', true)}
									>
										<ReplyIcon className={classNames(classes.iconSmall)} />
									</IconButton>
								)}
							</ListItemSecondaryAction>
						</ListItem>
						{this.state.subReplies.length > 0 ? (
							<ListItem style={{ height: '48px', marginBottom: 4 }}>
								{this.state.openSubReplies ? (
									<IconButton className={classes.expandIconButton} onClick={this.handleOpenSubReplies}>
										<ExpandLess />
									</IconButton>
								) : (
									<IconButton onClick={this.handleOpenSubReplies} className={classes.expandIconButton}>
										<ExpandMore />
									</IconButton>
								)}
							</ListItem>
						) : null}
					</List>
				</div>

				<Collapse in={this.state.openSubReplies} timeout="auto" unmountOnExit>
					{this.state.subReplies &&
						this.state.subReplies.map(item => {
							return (
								<SubReply
									key={item._id}
									classes={classes}
									item={item}
									handleVote={this.handleVote}
									handleDeleteReply={this.handleDeleteReply}
									id={this.props.reply._id}
									topicId={this.props.topicId}
									handleSubmitQuestionSuccess={this.handleSubmitQuestionSuccess}
									fetchSubReplies={this.fetchSubReplies}
								/>
							);
						})}
				</Collapse>

				<QuestionModal
					title={`reply to ${reply.owner && reply.owner.name}`}
					showModal={this.state.modalStatus.question}
					handleHideModal={this.toggleModal.bind(this, 'question', false)}
					task={this.submitQuestion}
					onSubmitSuccess={this.handleSubmitQuestionSuccess}
					buttonType="Reply"
				/>
				<AlertModal
					buttonType="Close"
					title={'Delete your post'}
					showModal={this.state.modalStatus.alert}
					handleHideModal={this.toggleModal.bind(this, 'alert', false)}
				>
					<DialogContent>
						<DialogContentText id="alert-dialog-delete">Are you sure you want to delete this?</DialogContentText>

						{this.props.otherData}
					</DialogContent>
					<DialogActions>
						<Button onClick={this.toggleModal.bind(this, 'alert', false)} color="primary">
							Cancel
						</Button>
						<Button
							onClick={e => {
								this.handleDeleteReply(reply._id);
							}}
							color="primary"
							autoFocus
						>
							Delete
						</Button>
					</DialogActions>
				</AlertModal>
				<Modal
					buttonType="Close"
					title={'Update Reply'}
					showModal={this.state.modalStatus.info}
					handleHideModal={this.toggleModal.bind(this, 'info', false)}
				>
					<DialogContent>
						<DialogContentText id="info-dialog-edit" />

						<TextField
							id="textarea"
							label="Edit Reply"
							value={this.state.tempReply}
							placeholder="Placeholder"
							multiline
							className={classes.textField}
							margin="normal"
							onChange={this.handleChange('tempReply')}
						/>
					</DialogContent>
					<DialogActions>
						<Button
							onClick={e => {
								this.handleEditReply(reply._id);
							}}
						>
							Update
						</Button>
					</DialogActions>
				</Modal>
			</div>
		);
	}
}

Reply.propTypes = {
	classes: PropTypes.object.isRequired
};

Reply.defaultProps = defaultProps;
export default withRouter(withStyles(styles)(Reply));
