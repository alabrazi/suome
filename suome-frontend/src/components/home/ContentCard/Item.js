import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

import TopicTabs from './Tabs';

import Header from '../../shared/Header/Header';

const styles = theme => ({
	root: {
		flexGrow: 1
	},
	paper: {
		padding: theme.spacing.unit * 2,
		textAlign: 'center',
		color: theme.palette.text.secondary,
		height: '100%'
	}
});
class Topic extends React.Component {
	render() {
		const { classes } = this.props;
		return (
			<div className={classes.root}>
				<Header isBackButton={true} />
				<Grid container spacing={0} alignItems="stretch">
					<Grid item xs={12}>
						<TopicTabs />
					</Grid>
				</Grid>
			</div>
		);
	}
}

Topic.propTypes = {
	classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Topic);
