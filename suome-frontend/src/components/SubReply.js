import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';
import classNames from 'classnames';
import { withRouter } from 'react-router-dom';
import IconButton from '@material-ui/core/IconButton';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ReactMarkdown from 'react-markdown';
import moment from 'moment';
import SnackBar from './shared/SnackBar';
import Config from '../Config';
import options from './Options';
import request from 'request-promise';
import ReplyIcon from '@material-ui/icons/Reply';
import AlertModal from './shared/Modal/Modal';
import Modal from './shared/Modal/Modal';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import EditIcon from '@material-ui/icons/Edit';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import DialogActions from '@material-ui/core/DialogActions';
import QuestionModal from './shared/Modal/QuestionModal';
const user = JSON.parse(localStorage.getItem('user'));
class SubReply extends React.Component {
	state = {
		snackbarY: 0,
		snackopen: false,
		snackMsg: '',
		votes: 0,
		modalStatus: {
			question: false,
			alert: false,
			info: false
		},
		user:user
	};
	handleDeleteReply = async _id => {
		this.props.handleDeleteReply(_id);

		// this.setState({deleteTopicID:""})
		this.toggleModal('alert', false);
	};
	handleChange = prop => event => {
		this.setState({ [prop]: event.target.value });
	};
	handleGoToProfile = (owner)=>{
		if (owner._id !== this.state.user._id){
			this.props.history.push(`/profile/${owner._id}`)
		}
		else{
						this.props.history.push(`/profile`)
		}

	}
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
	submitQuestion = async replyContent => {
		const payload = {
			content: replyContent,
			type: 'reply',
			id: this.props.id,
			toUser: this.props.item.owner._id,
			topicId: this.props.topicId
		};

		const url = `${Config.API}/replies`;
		return await request(options(url, 'post', payload));
	};

	handleSubmitQuestionSuccess = reply => {
		this.props.handleSubmitQuestionSuccess(reply);
	};
	handleVote = async (e, _id, upOrDown) => {
		try {
			this.setState({ snackbarY: -e.clientY });
			let votes = this.state.votes;
			const payload = {};

			const res = await request(options(`${Config.API}/replies/${_id}/${upOrDown}`, 'post', payload));

			upOrDown === 'upvote' ? this.setState({ votes: votes + 1 }) : this.setState({ votes: votes - 1 });
			res !== 'ok' && this.setState({ snackMsg: res });
		} catch (e) {
			this.setState({ snackopen: true });

			this.setState({ snackMsg: e.error });
		}
	};
	handleSnackClose = (event, reason) => {
		//close snackbar
		if (reason === 'clickaway') {
			//close snackbar when clicking away
			return;
		}

		this.setState({ snackopen: false });
		this.setState({ snackMsg: '' });
	};
	componentDidMount() {
		this.setState({ votes: this.props.item.votes });
		this.setState({ user: JSON.parse(window.user) });
		this.setState({ reply: this.props.item.content });
		this.setState({ tempReply: this.props.item.content });
	}
	// componentWillReceiveProps(nextProps) {
	// 	this.props.fetchSubReplies();
	// }
	render() {
		const { classes } = this.props;
		const reply = this.props.item;
		return (
			<div style={{ position: 'relative' }}>
				<SnackBar
					snackopen={this.state.snackopen}
					handleSnackClose={(e, reason) => {
						this.handleSnackClose(e, reason);
					}}
					snackMsg={this.state.snackMsg}
					snackbarY={this.state.snackbarY}
				/>
				<List dense component="div" className={classes.subReplyList}>
					<ListItem className={classNames(classes.nested)}>
						<Avatar alt={this.props.item.owner.name} src={this.props.item.owner.avatar} onClick={(e)=>{this.handleGoToProfile(this.props.item.owner)}} />
						<ListItemText
							inset
							primary={<ReactMarkdown source={this.state.reply} />}
							secondary={`${this.props.item.owner.name} ${moment(this.props.item.createdAt).format('MMM Do, YYYY')}`}
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
										aria-label="Upvote"
										onClick={e => {
											this.handleVote(e, this.props.item._id, 'upvote');
										}}
									>
										<ArrowUpwardIcon color="primary" />
									</IconButton>
								</Grid>
								<Grid item>
									<Avatar>{['', null, 0, undefined].includes(this.state.votes) ? '0' : this.state.votes} </Avatar>
								</Grid>
								<Grid item>
									<IconButton
										aria-label="Downvote"
										onClick={e => {
											this.handleVote(e, this.props.item._id, 'downvote');
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
							{this.state.user && (reply.owner._id === this.state.user._id) || (this.state.user.isAdmin===true) ? (
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
				</List>
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
				<QuestionModal
					title={`reply to ${reply.owner.name}`}
					showModal={this.state.modalStatus.question}
					handleHideModal={this.toggleModal.bind(this, 'question', false)}
					task={this.submitQuestion}
					onSubmitSuccess={this.handleSubmitQuestionSuccess.bind(this)}
					buttonType="Reply"
				/>
			</div>
		);
	}
}


export default withRouter(SubReply);
