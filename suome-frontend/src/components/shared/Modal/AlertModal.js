import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

class AlertDialog extends React.Component {
	render() {
		return (
			<div>
				<Dialog
					open={!!this.props.showModal}
					onClose={this.props.handleHideModal}
					aria-labelledby="alert-dialog-title"
					aria-describedby="alert-dialog-description"
				>
					<DialogTitle id="alert-dialog-title">{this.props.title}</DialogTitle>
					<DialogContent>
						<DialogContentText id="alert-dialog-description">{this.props.contentText}</DialogContentText>
					</DialogContent>
					<DialogActions>
						<Button onClick={this.props.handleHideModal} color="primary">
							Cancel
						</Button>
						<Button onClick={this.props.handleHideModal} color="primary" autoFocus>
							Delete
						</Button>
					</DialogActions>
				</Dialog>
			</div>
		);
	}
}

export default AlertDialog;
