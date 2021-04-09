import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import Snackbar from '@material-ui/core/Snackbar';
import { withRouter } from 'react-router-dom';
import SimpleSchema from 'simpl-schema';

import Paper from '@material-ui/core/Paper';

import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import Typography from '@material-ui/core/Typography';

import classNames from 'classnames';
import IconButton from '@material-ui/core/IconButton';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import { style } from './presets/ProfileUpdateModal';
import Config from '../Config';
import options from './Options';
import request from 'request-promise';

function Transition(props) {
	return <Slide direction="up" {...props} />;
}

class FullScreenDialog extends React.Component {
	state = {
		open: true,
		cardAnimaton: 'cardHidden',
		showPassword: false,
		error: false,
		user: JSON.parse(JSON.parse(localStorage.getItem('user'))),
		errorMsg: '',
		snaopen: false
	};

	handleClickOpen = () => {
		this.setState({ open: true });
	};
	handleSnackClose = (event, reason) => {
		if (reason === 'clickaway') {
			return;
		}

		this.setState({ snaopen: false });
	};
	handleClose = () => {
		this.setState({ open: false });
		this.props.history.go(-1);
	};
	handleUpdate = async () => {
		try {
			const userSchema = new SimpleSchema({
				name: {
					type: String,
					min: 1,
					max: 20,
					optional: true
				},
				description: {
					type: String,
					min: 5,
					max: 5000,
					optional: true
				},
				facebook: {
					type: String,
					optional: true,
					regEx: SimpleSchema.RegEx.Url
				},
				// email: {
				// 	type: String,
				// 	optional: true,
				// 	label: 'Email ',
				// 	regEx: SimpleSchema.RegEx.Email
				// }
			});
			userSchema.validate({
				name: this.state.user.name,
				description: this.state.user.description,
				// email: this.state.user.email,
				facebook: this.state.user.Url
			});
			const { name, description, email, facebook } = this.state.user;

			const payload = {
				name,
				description,
				// email,
				facebook
			};
			await request(options(`${Config.API}/users/me`, 'put', payload));
			this.props.history.go(-1);
		} catch (e) {
			this.setState({ errorMsg: e.message });
			this.setState({ error: true });
			this.setState({ snaopen: true });
		}
	};
	handleChange = prop => event => {
		let state = {
			...this.state
		};
		state.user[prop] = event.target.value;
		this.setState(state);
	};

	handleMouseDownPassword = event => {
		event.preventDefault();
	};

	handleClickShowPassword = () => {
		this.setState(state => ({
			showPassword: !state.showPassword
		}));
	};

	render() {
		const { user } = this.state;
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
								Edit Profile
							</Typography>
							<Button color="inherit" onClick={this.handleUpdate}>
								Update
							</Button>
						</Toolbar>
					</AppBar>

					<div>
						<div className={classes.root}>
							<Grid container justify="flex-start" alignItems="stretch">
								<Grid item xs={12}>
									<Paper className={classes.form}>
										<Grid container direction="column" alignItems="center" justify="flex-start">

											<Grid item>
												<FormControl className={classNames(classes.margin, classes.textField)}>
													<InputLabel htmlFor="name">Name</InputLabel>
													<Input id="name" type="text" value={user.name} onChange={this.handleChange('name')} />
												</FormControl>
											</Grid>

											<Grid item>
												<FormControl className={classNames(classes.margin, classes.textField)}>
													<InputLabel htmlFor="name">Facebook profile</InputLabel>
													<Input id="name" type="text" value={user.facebook} onChange={this.handleChange('facebook')} />
												</FormControl>
											</Grid>
											<Grid item xs={12}>
												<TextField
													id="textarea"
													label="About Me"
													placeholder="Placeholder"
													value={user.description}
													multiline
													className={classes.textField}
													margin="normal"
													onChange={this.handleChange('description')}
												/>
											</Grid>
										</Grid>
									</Paper>
								</Grid>
							</Grid>
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
// <Grid item>
// 	<FormControl className={classNames(classes.margin, classes.textField)}>
// 		<InputLabel htmlFor="email" required>
// 			Email
// 		</InputLabel>
// 		<Input id="email" type="text" value={user.email} onChange={this.handleChange('email')} />
// 	</FormControl>
// </Grid>
