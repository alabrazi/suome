import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import LinearProgress from '@material-ui/core/LinearProgress';
import KeyHandler, { KEYPRESS } from 'react-key-handler';
import ForwardFiveIcon from '@material-ui/icons/Forward5';
import VolumeUpIcon from '@material-ui/icons/VolumeUp';
import VolumeDownIcon from '@material-ui/icons/VolumeDown';
import ReplayFiveIcon from '@material-ui/icons/Replay5';
import { styles, defaultProps } from './presets/Lyrics';
import Button from '@material-ui/core/Button';
class FullWidthGrid extends React.Component {
	state = {
		contentNum: 0,
		fi: '',
		en: ''
	};

	handleKeyPress = e => {
		if (e.key === 'ArrowRight') {
			this.handleNextCard();
		}
		if (e.key === 'ArrowLeft') {
			this.handlePreviousCard();
		}
		if (e.key === 'r') {
			this.handleRest();
		}
	};

	componentWillReceiveProps = () => {
		this.setState({
			fi: this.props.content[this.state.contentNum].fi,
			en: this.props.content[this.state.contentNum].en
		});
	};
	handlePreviousCard = () => {
		if (this.state.contentNum === 0) {
			this.setState({ contentNum: this.props.content.length - 1 });
		} else {
			this.setState({ contentNum: this.state.contentNum - 1 });
		}
	};
	handleNextCard = () => {
		if (this.state.contentNum === this.props.content.length - 1) {
			this.setState({ contentNum: 0 });
		} else {
			this.setState({ contentNum: this.state.contentNum + 1 });
		}
	};
	handleRest = () => {
		this.setState({ contentNum: 0 });
	};
	componentDidUpdate(prevProps, prevState) {
		if (prevState.contentNum !== this.state.contentNum) {
			this.setState({ fi: this.props.content[this.state.contentNum].fi });
			this.setState({ en: this.props.content[this.state.contentNum].en });
		}
	}

	render() {
		const { classes } = this.props;

		return (

			<div className={classes.root}>
				<Grid container spacing={0} alignItems="stretch" alignContent="stretch">
					<KeyHandler keyEventName={KEYPRESS} keyValue="ArrowRight" onKeyHandle={this.handleNextCard} />
					<KeyHandler keyEventName={KEYPRESS} keyValue="ArrowLeft" onKeyHandle={this.handlePreviousCard} />
					<KeyHandler keyEventName={KEYPRESS} keyValue="f" onKeyHandle={this.handleNextCard} />
					<KeyHandler keyEventName={KEYPRESS} keyValue="d" onKeyHandle={this.handlePreviousCard} />
					<KeyHandler keyEventName={KEYPRESS} keyCode="37" onKeyHandle={this.handleNextCard} />
					<KeyHandler keyEventName={KEYPRESS} keyCode="39" onKeyHandle={this.handlePreviousCard} />
					<Paper className={classes.paper}>
						<Grid item xs={12} className={classes.contentArea}>
							<Typography className={classes.text} gutterBottom align="center">
								{this.state.fi}
							</Typography>
						</Grid>
						<Grid className={classes.relativpos} item xs={12}>
							<hr width="60%" style={{ margin: 'auto' }} />
							<IconButton
								className={classes.iconsLeft}
								onClick={e => {
									this.handlePreviousCard();
								}} //event and variable
							>
								<ChevronLeftIcon className={classes.icon} />
							</IconButton>
							<IconButton
								className={classes.iconsRight}
								onClick={e => {
									this.handleNextCard();
								}} //event and variable
							>
								<ChevronRightIcon className={classes.icon} />
							</IconButton>
						</Grid>
						<Grid item xs={12} className={classes.contentArea}>
							<Typography className={classes.text} gutterBottom align="center">
								{this.state.en}
							</Typography>
						</Grid>
					</Paper>
				</Grid>
				<LinearProgress
					className={classes.progress}
					variant="determinate"
					value={(this.state.contentNum * 100) / (this.props.content.length - 1)}
				/>
				<Grid container className={classes.root}>
					<Grid item xs={4} />
					<Grid item xs={4}>
						<div className={classes.flexcenter}>
							<Button disabled

														>

							</Button>							<Button 				onClick={e => {
								this.handlePreviousCard();
							}}
																					>
															<ChevronLeftIcon
																className={classes.icon}

															/>
														</Button>
							<Button 						onClick={e => {
								this.handleNextCard();
							}}>
								<ChevronRightIcon
									className={classes.icon}

								/>
							</Button>
							<Button disabled							onClick={() => {
															console.log("hi");
														}}>

							</Button>



						</div>
					</Grid>
					<Grid item xs={4} />
				</Grid>
			</div>
		);
	}
}

FullWidthGrid.propTypes = {
	classes: PropTypes.object.isRequired,
	content: PropTypes.array.isRequired
};
FullWidthGrid.defaultProps = defaultProps;

// z[0].fi
export default withStyles(styles)(FullWidthGrid);
