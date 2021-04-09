import React, { Component } from 'react';
import Modal from './Modal';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import Button from '@material-ui/core/Button';
class QuestionModal extends Component {
	state = {
		replyContent: ''
	};

	handleChange = event => {
		this.setState({
			replyContent: event.target.value
		});
	};
	handleClose = () => {
		this.props.handleHideModal();
	};

	render() {
		return (
			<Modal
				buttonType="Submit"
				title={this.props.title}
				handleHideModal={this.props.handleHideModal}
				showModal={this.props.showModal}
				task={this.props.task}
				onSubmitSuccess={this.props.onSubmitSuccess}
			>
				<DialogContent>

					<DialogContentText id="alert-dialog-description">{this.props.contentText}</DialogContentText>
					<Grid container alignItems="baseline" justify="center">
						<Grid item xs={12}>
							<TextField
								autoFocus
								id="textarea"
								label="What do you think?"
								placeholder="Type it here"
								multiline
								margin="normal"
								onChange={this.handleChange}
								style = {{width:"100%"}}
							/>
						</Grid>
					</Grid>
					{this.props.otherData}
				</DialogContent>
				<DialogActions>
					<Button
						onClick={async () => {
							this.handleClose();
							try {
								const res = await this.props.task(this.state.replyContent);
								this.props.onSubmitSuccess(JSON.parse(res));
							} catch (e) {
								console.log('e', e);
							}
						}}
					>
						{this.props.buttonType}
					</Button>
				</DialogActions>

			</Modal>
		);
	}
}

export default QuestionModal;
