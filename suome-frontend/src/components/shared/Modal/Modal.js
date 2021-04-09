import React from 'react';
import PropTypes from 'prop-types';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import withMobileDialog from '@material-ui/core/withMobileDialog';
import Grid from '@material-ui/core/Grid';
const styles = theme => ({
	root: {
		flexGrow: 1
	},
	container: {
		marginTop: 5
	},
	icon: {
		float: 'right'
	}
});
class ResponsiveDialog extends React.Component {
	handleClose = () => {
		this.props.handleHideModal();
	};

	render() {
		const { fullScreen } = this.props;
		const { classes } = this.props;
		return (
			<div className={classes.root}>
				<Dialog
					fullScreen={fullScreen}
					open={!!this.props.showModal}
					onClose={this.props.handleHideModal}
					aria-labelledby="responsive-dialog-title"
				>
					<DialogTitle disableTypography id="responsive-dialog-title">
						<Grid container justify="space-between">
							<Grid xs={11} item>
								<Typography type="title" variant="title" gutterBottom align="left" style={{ lineHeight: '48px' }}>
									{this.props.title}
								</Typography>
							</Grid>
							<Grid xs={1} item>
								<IconButton
									className={classes.icon}
									onClick={e => {
										this.handleClose();
									}} //event and variable
								>
									<CloseIcon />
								</IconButton>
							</Grid>
						</Grid>
					</DialogTitle>
					{this.props.children}
				</Dialog>
			</div>
		);
	}
}

ResponsiveDialog.propTypes = {
	fullScreen: PropTypes.bool.isRequired
};
export default withMobileDialog()(withStyles(styles)(ResponsiveDialog));
