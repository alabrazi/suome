import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import ForwardFiveIcon from '@material-ui/icons/Forward5';
import VolumeUpIcon from '@material-ui/icons/VolumeUp';
import VolumeDownIcon from '@material-ui/icons/VolumeDown';
import ReplayFiveIcon from '@material-ui/icons/Replay5';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const styles = theme => ({
	root: {
		color: theme.palette.text.primary,
		marginTop: theme.spacing.unit
	},
	icon: {
		margin: '0 1rem',
		fontSize: 32,
		textAlign: 'center',
		cursor: 'pointer'
	},
	flexcenter: {
		display: 'flex',
		justifyContent: 'center'
	}
});
const setVolumeDown = props => {
	props.setVolumeDown(props);
};
const setVolumeUp = props => {
	props.setVolumeUp(props);
};
const seekBackward = props => {
	props.seekBackward(props);
};
const seekForward = props => {
	props.seekForward();
};
function SvgMaterialIcons(props) {
	const { classes } = props;
	return (
		<Grid container className={classes.root}>
			<Grid item xs={4} />
			<Grid item xs={4}>
				<div className={classes.flexcenter}>

					<Button 							onClick={() => {
													setVolumeDown(props);
												}}>
						<VolumeDownIcon
							className={classes.icon}

						/>
					</Button>
					<Button 							onClick={() => {
													seekBackward(props);
												}}>
						<ReplayFiveIcon
							className={classes.icon}

						/>
					</Button>
					<Button 							onClick={() => {
													seekForward(props);
												}}>
						<ForwardFiveIcon
							className={classes.icon}

						/>
					</Button>
					<Button 							onClick={() => {
													setVolumeUp(props);
												}}>
						<VolumeUpIcon
							className={classes.icon}

						/>
					</Button>


				</div>
			</Grid>
			<Grid item xs={4} />
		</Grid>
	);
}

SvgMaterialIcons.propTypes = {
	classes: PropTypes.object.isRequired
};

export default withStyles(styles)(SvgMaterialIcons);
