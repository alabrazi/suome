import { AutoRotatingCarousel } from 'material-auto-rotating-carousel';
import { Slide } from 'material-auto-rotating-carousel';
import { red, blue, green } from '@material-ui/core/colors';
import { withRouter } from 'react-router-dom';
import React from 'react';
import { withStyles } from '@material-ui/core/styles';
const styles = theme => ({
	img: {
		width: '100%',
		height: '100%'
	}
});

class TopBen extends React.Component {
	state = {
		open: true
	};

	componentWillMount = () => {
		if (window.localStorage.getItem('viewedIntro')) {
			this.props.history.push('/dashboard');
		}
	};

	handleGetStarted = () => {
		window.localStorage.setItem('viewedIntro', 'true');
		this.props.history.push('/dashboard');
	};
	render() {
		const { classes } = this.props;
		return (
			<div style={{ position: 'relative', width: '100%', height: 500 }}>
				<AutoRotatingCarousel
					interval={5000}
					label="Get started"
					open={this.state.open}
					onClose={() => this.setState({ open: false })}
					style={{ position: 'absolute' }}
					onStart={this.handleGetStarted}
					mobile
				>
					<Slide
						media={
							<img
								src="https://i.kinja-img.com/gawker-media/image/upload/s--IoFa6NEN--/c_scale,f_auto,fl_progressive,q_80,w_800/vub3vgkwxnuwwj36emni.jpg"
								alt="first"
								className={classes.img}
							/>
						}
						mediaBackgroundStyle={{ backgroundColor: red[400] }}
						style={{ backgroundColor: red[600] }}
						title="Never boring again"
						subtitle="Songs, comics, cartoons all of this will blow your mind."
					/>
					<Slide
						media={
							<img
								src="https://i.kinja-img.com/gawker-media/image/upload/s--Y1y5rSB7--/c_scale,f_auto,fl_progressive,q_80,w_800/nku34ahdpcxq5t6m2lys.jpg"
								alt="second"
								className={classes.img}
							/>
						}
						mediaBackgroundStyle={{ backgroundColor: blue[400] }}
						style={{ backgroundColor: blue[600] }}
						title="Ever wanted to be popular?"
						subtitle="Well just ask  question or answer to some!"
					/>
					<Slide
						media={
							<img
								src="https://starwarsblog.starwars.com/wp-content/uploads/2017/04/join-the-resistance-featured.jpg"
								alt="third"
								className={classes.img}
							/>
						}
						mediaBackgroundStyle={{ backgroundColor: green[400] }}
						style={{ backgroundColor: green[600] }}
						title="May the force be with you"
						subtitle="The Force is a group of learners join their forces together."
					/>
				</AutoRotatingCarousel>
			</div>
		);
	}
}

export default withRouter(withStyles(styles)(TopBen));
