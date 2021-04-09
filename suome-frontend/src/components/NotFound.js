//import injectTapEventPlugin from 'react-tap-event-plugin';
//injectTapEventPlugin();
import React from 'react';

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';


const styles = theme => ({
	'@media (max-width: 350px)': {
		__expression__: '(max-width: 350px)',
		root: {
			'-penguinSize': '200px',
			'-penguinSkin': 'black'
		}
	},
	// "penguin": {
	//   "position": "absolute"
	// },
	right_cheek: {
		top: '15%',
		left: '35%',
		background: 'white',
		width: '60%',
		height: '70%',
		borderRadius: '70% 70% 60% 60%',
		position: 'absolute'
	},
	left_cheek: {
		top: '15%',
		left: '5%',
		background: 'white',
		width: '60%',
		height: '70%',
		borderRadius: '70% 70% 60% 60%',
		position: 'absolute'
	},
	belly: {
		top: '60%',
		left: '2.5%',
		background: 'white',
		width: '95%',
		height: '100%',
		borderRadius: '120% 120% 100% 100%',
		position: 'absolute'
	},
	penguin_top: {
		top: '10%',
		left: '25%',
		background: 'gray',
		width: '50%',
		height: '45%',
		borderRadius: '70% 70% 60% 60%',
		position: 'absolute'
	},
	penguin_bottom: {
		top: '40%',
		left: '23.5%',
		background: 'gray',
		width: '53%',
		height: '45%',
		borderRadius: '70% 70% 100% 100%',
		position: 'absolute'
	},
	right_hand: {
		top: '5%',
		left: '25%',
		background: 'black',
		width: '30%',
		height: '60%',
		borderRadius: '30% 30% 120% 30%',
		transform: 'rotate(130deg)',
		zIndex: '-1',
		animationDuration: '3s',
		animationName: 'wave',
		animationIterationCount: 'infinite',
		transformOrigin: '0% 0%',
		animationTimingFunction: 'linear',
		position: 'absolute'
	},
	left_hand: {
		top: '0%',
		left: '75%',
		background: 'gray',
		width: '30%',
		height: '60%',
		borderRadius: '30% 30% 30% 120%',
		transform: 'rotate(-45deg)',
		zIndex: '-1',
		position: 'absolute'
	},
	right_feet: {
		top: '85%',
		left: '60%',
		background: 'orange',
		width: '15%',
		height: '30%',
		borderRadius: '50% 50% 50% 50%',
		transform: 'rotate(-80deg)',
		zIndex: '-2222',
		position: 'absolute'
	},
	left_feet: {
		top: '85%',
		left: '25%',
		background: 'orange',
		width: '15%',
		height: '30%',
		borderRadius: '50% 50% 50% 50%',
		transform: 'rotate(80deg)',
		zIndex: '-2222',
		position: 'absolute'
	},
	right_eye: {
		top: '45%',
		left: '60%',
		background: 'black',
		width: '15%',
		height: '17%',
		borderRadius: '50%',
		position: 'absolute'
	},
	left_eye: {
		top: '45%',
		left: '25%',
		background: 'black',
		width: '15%',
		height: '17%',
		borderRadius: '50%',
		position: 'absolute'
	},
	sparkle: {
		top: '25%',
		left: '-23%',
		background: 'white',
		width: '150%',
		height: '100%',
		borderRadius: '50%',
		position: 'absolute'
	},
	blush_right: {
		top: '65%',
		left: '15%',
		background: 'pink',
		width: '15%',
		height: '10%',
		borderRadius: '50%',
		position: 'absolute'
	},
	blush_left: {
		top: '65%',
		left: '70%',
		background: 'pink',
		width: '15%',
		height: '10%',
		borderRadius: '50%',
		position: 'absolute'
	},
	beak_top: {
		top: '60%',
		left: '40%',
		background: 'orange',
		width: '20%',
		height: '10%',
		borderRadius: '50%',
		position: 'absolute'
	},
	beak_bottom: {
		top: '65%',
		left: '42%',
		background: 'orange',
		width: '16%',
		height: '10%',
		borderRadius: '50%',
		position: 'absolute'
	},
	body: {
		position: 'relative',
		margin: 'auto',
		display: 'block',
		marginTop: '5%',
		width: '300px',
		height: '300px',
		background: '#c6faf1',
		zIndex: -1
	},
	p: {
		margin: 'auto',
		textAlign: 'center'
	}
});

class NotFound extends React.Component {
	state = {
		animationName: ''
	};

	Animate() {
		let styleSheet = document.styleSheets[0];

		let animationName = 'wave';

		let keyframes = `@-webkit-keyframes ${animationName} {
        10% {-webkit-transform:rotate(${110}deg)}
        20% {-webkit-transform:rotate(${130}deg)}
        30% {-webkit-transform:rotate(${110}deg)}
        40% {-webkit-transform:rotate(${130}deg)}
    }`;
		styleSheet.insertRule(keyframes, styleSheet.cssRules.length);
	}
	render() {
		const { classes } = this.props;
		return (
			<div>
				<p className={classes.p}>
					{' '}
					You are lost in the North Pole. Page is not found(404).
					<a href="https://suomea.online">Back to Suomea</a>
				</p>
				<div className={classes.body}>
					<div className={classes.penguin_bottom}>
						<div className={classes.right_hand} />
						<div className={classes.left_hand} />
						<div className={classes.right_feet} />
						<div className={classes.left_feet} />
					</div>
					<div className={classes.penguin_top}>
						<div className={classes.right_cheek} />
						<div className={classes.left_cheek} />
						<div className={classes.belly} />
						<div className={classes.right_eye}>
							<div className={classes.sparkle} />
						</div>
						<div className={classes.left_eye}>
							<div className={classes.sparkle} />
						</div>
						<div className={classes.blush_right} />
						<div className={classes.blush_left} />
						<div className={classes.beak_top} />
						<div className={classes.beak_bottom} />
					</div>
					{this.Animate()}
				</div>
			</div>
		);
	}
}

NotFound.propTypes = { classes: PropTypes.object.isRequired };
export default withStyles(styles)(NotFound); // export default () => {
