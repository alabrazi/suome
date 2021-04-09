import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Badge from '@material-ui/core/Badge';
import { withRouter } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import request from 'request-promise';
import Config from '../../../Config';
import options from '../../Options';
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';
import classNames from 'classnames';
import Icon from '@material-ui/core/Icon';
import { loadCSS } from 'fg-loadcss/dist/loadCSS';
import Modal from '../Modal/Modal';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
const styles = theme => ({
	root: {
		width: '100%',
		marginBottom: 0
	},
	margin: {
		margin: theme.spacing.unit * 2
	},
	flex: {
		flex: 1,
		cursor: 'pointer',
		lineHeight:"48px"
	},
	backButton: {
		marginLeft: -12,
		marginRight: 20
	}
});

class MenuAppBar extends React.Component {
	state = {
		anchorEl: null,
		left: false,
		user: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null,
		modalStatus: {
			info: false,
			alert: false
		},

	};
	toggleModal = (type, action) => {
		const newState = {
			...this.state
		}

		newState.modalStatus[type] = action;
		this.setState(newState);

	};
	async componentDidMount() {
		loadCSS('https://use.fontawesome.com/releases/v5.1.0/css/all.css', document.querySelector('#insertion-point-jss'),);

		if (localStorage.getItem('token')) {
			const getMeUrl = `${Config.API}/users/me`;
			const user = await request(options(getMeUrl));
			window.user = user;
			localStorage.setItem('user', JSON.stringify(user));
			this.setState({
				user: JSON.parse(user)
			});
		}
		// console.log(this.state.user);
	}
	handleAbout = () => {
		this.props.history.push('/about');
	};
	handleChange = (event, checked) => {
		this.setState({ auth: checked });
	};
	doSomethingWith = value => {
		console.log(value);
	};
	handleUserProfile = () => {
		this.props.history.push('/profile');
		this.props.history.go('/profile');
	};
	handleNotification = () => {
		this.props.history.push('/notifications');
	};

	handleMenu = event => {
		this.setState({ anchorEl: event.currentTarget });
	};

	handleClose = () => {
		this.setState({ anchorEl: null });
	};

	handleLogout = () => {
		localStorage.removeItem('token');
		localStorage.removeItem('user');
		this.props.history.push('/dashboard');
		window.location.reload();
	};
	handleTitleClicked = () => {
		this.props.history.push('/dashboard');
		//browserHistory.replace(`/${routename}`);
	};
	handleBackButtonClick = someroute => {
		this.props.history.go(-1);
	};
	handleLogin = () => {
		this.props.history.push('/login');
	};

	render() {
		const { classes, isBackButton } = this.props; //for stateless component const {classes} = props;
		const { anchorEl } = this.state;
		const open = Boolean(anchorEl);

		return (
			<div className={classes.root}>

				<AppBar position="static">
					<Toolbar>
						{isBackButton &&
							window.user && (
								<IconButton className={classes.backButton} color="default" onClick={this.handleBackButtonClick}>
									<KeyboardBackspaceIcon />
								</IconButton>
							)}
							<Grid container justify="space-between">
							<Grid item>
							<Typography onClick={this.handleTitleClicked} type="title" color="inherit" className={classes.flex}>
								Suomea+
							</Typography>
							</Grid>
							{this.props.isReadme &&
								<Grid item>
								<IconButton
								 onClick={this.toggleModal.bind(this, 'info', true)}>


								 <Icon style={{width:"100%"}} className={classNames("fab fa-readme") }
									/>
							 </IconButton>
								</Grid>
							}

							<Grid item>

													{this.state.user ? (
														<div>
															<IconButton
																aria-owns={open ? 'left-menu-appbar' : null}
																aria-haspopup="true"
																onClick={this.handleMenu}
																color="default"
															>
																{this.state.user.unread > 0 ? (
																	<Badge  badgeContent={this.state.user.unread} color="secondary">
																		<Avatar alt={this.state.user.name} src={this.state.user.avatar} />
																	</Badge>
																) : (
																	<Avatar alt={this.state.user.name} src={this.state.user.avatar} />
																)}
															</IconButton>

															<Menu
																id="menu-appbar"
																anchorEl={anchorEl}
																anchorOrigin={{
																	vertical: 'top',
																	horizontal: 'right'
																}}
																transformOrigin={{
																	vertical: 'top',
																	horizontal: 'right'
																}}
																open={open}
																onClose={this.handleClose}
															>
																<MenuItem onClick={this.handleNotification}>


																{this.state.user.unread > 0 ? (
																	<Badge  badgeContent={this.state.user.unread} color="secondary">
																	Notifications
																	</Badge>
																) :"Notifications"

																}

																</MenuItem>

																<MenuItem onClick={this.handleUserProfile}>User Profile</MenuItem>
																<MenuItem>
																	<a
																		href="mailto:alaa.albarazi@aalto.fi
																		?subject=About Suomea+&body=Hi,
																		It would be nice to hear from you. Here are some ideas that you may like to discuss with us.

I suggest x.... features. I don't like...xyz. Could you add xyz.... song. I found the following xxx.... error or bug
I want to join your team. I want to sponsor Suomea+...........
"
																		style={{
																			textDecoration: 'none',
																			color: 'black'
																		}}
																	>
																		{' '}
																		Feedback
																	</a>{' '}
																</MenuItem>
																<MenuItem onClick={this.handleAbout}>About</MenuItem>
																<MenuItem onClick={this.handleLogout}>Logout</MenuItem>
															</Menu>
														</div>
													) : (
														<Button
															color="inherit"
															onClick={e => {
																this.handleLogin();
															}} //event and variable
														>
															Login
														</Button>
													)}
							</Grid>
							</Grid>


					</Toolbar>
				</AppBar>
				<Modal
					buttonType="Close"
					title="Getting Started"
					showModal={this.state.modalStatus.info}
					handleHideModal={this.toggleModal.bind(this, 'info', false)}
				>
					<DialogContent>
						<DialogContentText id="alert-dialog-description">
						Click on the song that you would like to watch. This takes you to the topic page where you see four taps.
						Watch, Study, Think and Question. In watch section you listen and synchronize the lyrics  until you become able to
						understand it without looking at the lyrics. Singing it with the singer is good idea. Then you tap on study section to read some study material related to the grammer of the words in this topic.
						In quize you answer all questions correctly to be able to mark the topic as completed.
						After the topic is marked as completed you can see the words in your user profile highlighted with green. From there you can also mark any word that you already know as completed.

						You can always ask questions and see the answers in the question section.



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

MenuAppBar.propTypes = {
	isBackButton: PropTypes.bool.isRequired,


};

MenuAppBar.defaultProps = {
	isBackButton: false,
	isReadme:false
};
export default withStyles(styles)(withRouter(MenuAppBar));
