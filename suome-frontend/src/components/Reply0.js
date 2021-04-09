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
const user = JSON.parse(JSON.parse(localStorage.getItem('user')));
class Reply extends React.Component {
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
		reply: '',
		user: user
	};

	subReplyIds = [];
	handleDeleteReply = async _id => {
		this.fetchSubReplies();
		this.props.handleDeleteReply(_id);
		// this.setState({deleteTopicID:""})
		this.toggleModal('alert', false);
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
		this.props.history.replace(`/topic/${this.props.match.params.id}/3`);

		window.location.reload();
		// this.subReplyIds.push(reply._id);
		// this.fetchSubReplies();
	};

	fetchSubReplies = async () => {
		try {
			let subReplies = [...this.state.subReplies];
			this.props.reply.subReplies.forEach(async id => {
				try {
					const res = await request(options(`${Config.API}/replies/${id}`));
					subReplies.push(JSON.parse(res));
				} catch (e) {}
			});
			this.setState({ subReplies });
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

	componentDidMount() {
		this.fetchSubReplies();
		this.setState({ votes: this.props.reply.votes });
		this.setState({ reply: this.props.reply.content });
		this.setState({ tempReply: this.props.reply.content });
	}

	handleGetReplyDetail = async _id => {
		try {
			const data = {};
			const res = await request(options(`${Config.API}/replies/${_id}`, 'get', data));

			return res;
		} catch (e) {}
	};

	handleSnackClose = (event, reason) => {
		if (reason === 'clickaway') {
			return;
		}

		this.setState({ snackopen: false });
		this.setState({ snackMsg: '' });
	};
	render() {
		const { classes, reply } = this.props;

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
							<Avatar alt={reply.owner && reply.owner.name} src={reply.owner && reply.owner.avatar} />
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
								{this.state.user && (reply.owner && reply.owner._id) === this.state.user._id ? (
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
						{this.props.reply.subReplies.length > 0 ? (
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
									handleDeleteReply={this.props.handleDeleteReply}
									id={this.props.reply._id}
									topicId={this.props.topicId}
									handleSubmitQuestionSuccess={this.handleSubmitQuestionSuccess}
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
