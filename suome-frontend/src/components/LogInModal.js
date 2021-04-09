import React from 'react';
// @material-ui/core components
import withStyles from '@material-ui/core/styles/withStyles';
import { loadCSS } from 'fg-loadcss/dist/loadCSS';
import Grid from '@material-ui/core/Grid';

import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';

import Icon from '@material-ui/core/Icon';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import { withRouter } from 'react-router-dom';

const container = {
	paddingRight: '15px',
	paddingLeft: '15px',
	marginRight: 'auto',
	marginLeft: 'auto',
	width: '100%',
	'@media (min-width: 576px)': {
		maxWidth: '540px'
	},
	'@media (min-width: 768px)': {
		maxWidth: '720px'
	},
	'@media (min-width: 992px)': {
		maxWidth: '960px'
	},
	'@media (min-width: 1200px)': {
		maxWidth: '1140px'
	},
	divider: {
		marginTop: '30px',
		marginBottom: '0px',
		textAlign: 'center'
	}
};

const style = theme => ({
	appBar: {
		position: 'relative'
	},
	flex: {
		flex: 1
	},
	container: {
		...container,
		zIndex: '2',
		position: 'relative',
		paddingTop: '20vh',
		color: '#FFFFFF'
	},
	form: {
		height: '450px',
		width: '300px',
		color: theme.palette.common.white,
		position: 'relative'
	},
	loginbox: {
		background: theme.palette.primary.main,
		width: '250px',
		height: '150px',
		transform: 'translate3d(0, -60px, 0)'
	},
	pageHeader: {
		minHeight: '100vh',
		maxHeight: '1200px',
		height: 'auto',
		display: 'inherit',
		position: 'relative',
		margin: '0',
		padding: '0',
		border: '0',
		alignItems: 'center',
		'&:before': {
			background: 'rgba(0, 0, 0, 0.5)'
		},
		'&:before,&:after': {
			position: 'absolute',
			zIndex: '1',
			width: '100%',
			height: '100%',
			display: 'block',
			left: '0',
			top: '0',
			content: '""'
		},
		'& footer li a,& footer li a:hover,& footer li a:active': {
			color: '#FFFFFF'
		}
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
	}
});

function Transition(props) {
	return <Slide direction="up" {...props} />;
}

class FullScreenDialog extends React.Component {
	state = {
		open: true,
		cardAnimaton: 'cardHidden',
		error: false,
		errorMsg: ''
	};

	componentDidMount() {
		loadCSS('https://use.fontawesome.com/releases/v5.1.0/css/all.css', document.querySelector('#insertion-point-jss'));
		// we add a hidden class to the card and after 700 ms we delete it and the transition appears
		setTimeout(
			function() {
				this.setState({ cardAnimaton: '' });
			}.bind(this),
			700
		);
	}

	handleClose = () => {
		this.setState({ open: false });
		this.props.history.go(-1);
	};

	handleSnackClose = (event, reason) => {
		if (reason === 'clickaway') {
			return;
		}

		this.setState({ snaopen: false });
	};

	render() {
		const { classes } = this.props;
		return (
			<div>
				<Dialog fullScreen open={this.state.open} onClose={this.handleClose} TransitionComponent={Transition}>
					<AppBar className={classes.appBar}>
						<Toolbar>
							<IconButton color="inherit" onClick={this.handleClose} aria-label="Close">
								<CloseIcon />
							</IconButton>
							<Typography variant="title" color="inherit" className={classes.flex}>
								Login to Suome +
							</Typography>
						</Toolbar>
					</AppBar>
					<div>
						<div
							className={classes.pageHeader}
							style={{
								backgroundImage: 'url("/assets/finland.jpg")',
								backgroundSize: 'cover',
								backgroundPosition: 'top center'
							}}
						>
							<div className={classes.container}>
								<Grid container justify="center" alignItems="stretch">
									<Grid item>
										<Grid container direction="column" alignItems="center">
											<Grid item>
												<div className={classes.loginbox}>
													<Grid container direction="column" alignItems="center">
														<Grid item>
															<Typography
																style={{
																	color: 'white',
																	fontSize: '1.5rem',
																	marginTop: '1.5rem'
																}}
																gutterBottom
															>
																Login
															</Typography>
														</Grid>
														<Grid item>
															<div className={classes.socialLine}>
																<Button
																	onClick={e => (window.location.href = 'https://suomea.online/api/auth/facebook')}
																>
																	<Icon className={classNames('fab fa-facebook', classes.icons)} />
																</Button>
															</div>
														</Grid>
													</Grid>
												</div>
											</Grid>

											<Grid item>
												{this.state.error && (
													<p
														style={{
															color: 'red',
															fontSize: '0.5rem'
														}}
													>
														{this.state.errorMsg}
													</p>
												)}
											</Grid>
										</Grid>
									</Grid>
								</Grid>
							</div>
						</div>
					</div>
				</Dialog>
				<Snackbar
					anchorOrigin={{
						vertical: 'bottom',
						horizontal: 'left'
					}}
					open={this.state.snaopen}
					autoHideDuration={6000}
					onClose={this.handleSnackClose}
					ContentProps={{
						'aria-describedby': 'message-id'
					}}
					message={<span id="message-id">{this.state.errorMsg}</span>}
					action={[
						<Button key="undo" color="secondary" size="small" onClick={this.handleSnackClose}>
							Close
						</Button>,
						<IconButton
							key="close"
							aria-label="Close"
							color="inherit"
							className={classes.close}
							onClick={this.handleSnackClose}
						>
							<CloseIcon />
						</IconButton>
					]}
				/>
			</div>
		);
	}
}

FullScreenDialog.propTypes = {
	classes: PropTypes.object.isRequired
};

export default withStyles(style)(withRouter(FullScreenDialog));
