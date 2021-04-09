import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import SwipeableViews from 'react-swipeable-views';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Zoom from '@material-ui/core/Zoom';
import Button from '@material-ui/core/Button';
import ChatIcon from '@material-ui/icons/Chat';
import Lyrics from './Lyrics';
import Controls from './Controls';
import Questions from '../../Questions';
import Think from '../../Think';
import Read from '../../Read';
import request from 'request-promise';
import options from '../../Options';
import Config from '../../../Config';
import QuestionModal from '../../shared/Modal/QuestionModal';
import Grid from '@material-ui/core/Grid';
import ReactPlayer from 'react-player';
import { hot } from 'react-hot-loader';
import { withRouter } from 'react-router-dom';
import KeyHandler, { KEYPRESS } from 'react-key-handler';
import { styles } from './presets/Tabs';
import Loading from '../../../components/shared/Loading';
import Iframe from 'react-iframe'

function TabContainer(props) {
	const { children, dir } = props;

	return (
		<Typography component="div" dir={dir}>
			{children}
		</Typography>
	);
}

TabContainer.propTypes = {
	children: PropTypes.node.isRequired,
	dir: PropTypes.string.isRequired
};

class TopicTabs extends React.Component {
	state = {
		videoReady: false,
		url: '',
		playing: false,
		volume: 0.8,
		muted: false,
		played: 0,
		loaded: 0,
		duration: 0,
		playbackRate: 1.0,
		loop: true,
		value: 0,
		topic: {
			study: '',
			quizes:[]
		}
	};
	handleDeleteReply = async _id => {

		try {
			const url = `${Config.API}/replies/${_id}`;
			await request(options(url, 'delete')); //method cat id data
			// this.props.history.replace(`/topic/${this.props.match.params.id}/3`);
			// window.location.reload();
			this.fetchTopic();
			// this.forceUpdate();


			// this.setState({confirmDelete:false})
		} catch (e) {}

		// this.setState({deleteTopicID:""})
	};
	componentDidUpdate(prevProps, prevState) {}
	async componentDidMount() {
		this.props.match.params.pageIndex && this.setState({ value: parseInt(this.props.match.params.pageIndex, 10) });

		this.fetchTopic();
		window.scrollTo(0, 0);
	}
	fetchTopic = async () => {
		const url = `${Config.API}/topics/${this.props.match.params.id}`;
		const res = await request(options(url)); //method cat id data

		this.setState({
			topic: JSON.parse(res),
			url: JSON.parse(res).source
		});
	};
	ref = player => {
		this.player = player;
	};
	playPause = () => {
		this.setState({ playing: !this.state.playing });
	};
	stop = () => {
		this.setState({ url: null, playing: false });
	};
	toggleLoop = () => {
		this.setState({ loop: !this.state.loop });
	};
	setVolume = e => {
		this.setState({ volume: parseFloat(e.target.value) });
	};
	setVolumeUp = () => {
		let newValue = this.state.volume + 0.1;
		if (newValue > 1) {
			newValue = 1;
		}

		this.setState({ volume: newValue });
	};
	setVolumeDown = () => {
		let newValue = this.state.volume - 0.1;
		if (newValue < 0) {
			newValue = 0.0;
		}

		this.setState({ volume: newValue });
	};
	seekForward = () => {
		this.setState({ seeking: true });
		let newValue = this.state.played * this.state.duration + 5;
		if (newValue > this.state.duration) {
			newValue = this.state.duration;
		}

		this.player.seekTo(newValue / this.state.duration);
		this.setState({ played: newValue / this.state.duration });
		this.setState({ seeking: false });
	};
	seekBackward = () => {
		this.setState({ seeking: true });
		let newValue = this.state.played * this.state.duration - 5;
		if (newValue < 0) {
			newValue = 0;
		}

		this.player.seekTo(newValue / this.state.duration);
		this.setState({ played: newValue / this.state.duration });
		this.setState({ seeking: false });
	};
	toggleMuted = () => {
		this.setState({ muted: !this.state.muted });
	};
	setPlaybackRate = e => {
		this.setState({ playbackRate: parseFloat(e.target.value) });
	};
	onPlay = () => {
		this.setState({ playing: true });
	};
	onPause = () => {
		this.setState({ playing: false });
	};
	onSeekMouseDown = e => {
		this.setState({ seeking: true });
	};
	onSeekChange = e => {
		this.setState({ played: parseFloat(e.target.value) });
	};
	onSeekMouseUp = e => {
		this.setState({ seeking: false });
		this.player.seekTo(parseFloat(e.target.value));
	};
	onProgress = state => {
		// We only want to update time slider if we are not currently seeking
		if (!this.state.seeking) {
			this.setState(state);
		}
	};
	onEnded = () => {
		this.setState({ playing: this.state.loop });
	};
	onDuration = duration => {
		this.setState({ duration });
	};

	handleHideModal = () => {
		this.setState({ showModal: false });
	};
	handleShowModal = () => {
		this.setState({ showModal: true });
	};
	handleChange = (event, value) => {
		this.setState({ value });
		window.scrollTo(0, 0);
	};

	submitQuestion = async replyContent => {
		const payload = {
			content: replyContent,
			type: 'topic',
			id: this.state.topic._id
		};

		const url = `${Config.API}/replies`;

		return await request(options(url, 'post', payload));
	};

	handleSubmitQuestionSuccess = reply => {
		// this can be improved by re-fetching the topic details
		this.fetchTopic();
	};

	handleChangeIndex = index => {
		this.setState({ value: index });
	};
	onReady = () => {
		this.setState({ videoReady: true });
	};

	render() {
		const { classes, theme } = this.props;
		const { playing, volume, muted, loop, playbackRate } = this.state;
		const transitionDuration = {
			enter: theme.transitions.duration.enteringScreen,
			exit: theme.transitions.duration.leavingScreen
		};

		const fabs = [
			{
				color: 'primary',
				className: classes.fab,
				icon: <ChatIcon />
			},
			{
				color: 'secondary',
				className: classes.fab,
				icon: <ChatIcon />
			},
			{
				color: 'inherit',
				className: classNames(classes.fab, classes.fabGreen),
				icon: <ChatIcon />
			},
			{
				color: 'default',
				className: classNames(classes.fab),
				icon: <ChatIcon />
			}
		];

		return (
			<div id="root" className={classes.Tabsroot}>
				<AppBar position="static" color="default">
					<Tabs
						value={this.state.value}
						onChange={this.handleChange}
						indicatorColor="primary"
						textColor="primary"
						fullWidth
						centered
					>
						<Tab label="Watch" />



						<Tab label="Ask" />
						<Tab label="Play" />
						{/*
							<Tab label="Think" />
							<Tab label="Read" />
							*/}


						{/* <Tab label="Play" /> */}
					</Tabs>
				</AppBar>
				<SwipeableViews
					axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
					index={this.state.value}
					onChangeIndex={this.handleChangeIndex}
				>
					<TabContainer dir={theme.direction}>
						<KeyHandler keyEventName={KEYPRESS} keyValue="r" onKeyHandle={this.seekForward} />
						<KeyHandler keyEventName={KEYPRESS} keyValue="e" onKeyHandle={this.seekBackward} />
						<Grid container spacing={0}>
							<Grid item xs={12}>
								<ReactPlayer
									ref={this.ref}
									controls
									url={this.state.url}
									playing={playing}
									loop={loop}
									playbackRate={playbackRate}
									volume={volume}
									muted={muted}
									onReady={() => this.onReady()}
									onStart={() => {}}
									onPlay={this.onPlay}
									onPause={this.onPause}
									onBuffer={() => {}}
									onSeek={e => {}}
									onEnded={this.onEnded}
									onError={e => {}}
									onProgress={this.onProgress}
									onDuration={this.onDuration}
									config={{
										youtube: {
											playerVars: {
												showinfo: 0
											}
										},
										facebook: {
											appId: '12345'
										}
									}}
									width="100%"
									height="17rem"
								/>
							</Grid>
						</Grid>
						{!this.state.videoReady ? (
							<Loading />
						) : (
							<div>
								<Lyrics autoFocus ref="Lyrics" content={this.state.topic.content} />

								<Controls
									videostate={this.videostate}
									setVolumeDown={this.setVolumeDown}
									setVolumeUp={this.setVolumeUp}
									seekBackward={this.seekBackward}
									seekForward={this.seekForward}
								/>
								<Grid container justify="center">
									<Grid item>
										<br />
										<br />
										<a target="_blank" rel="noopener noreferrer" href={this.state.topic.lyricSrc}>Thank the translator</a>
									</Grid>
								</Grid>
							</div>
						)}
					</TabContainer>

					<TabContainer dir={theme.direction}>
						<Questions topic={this.state.topic} handleDeleteReply={this.handleDeleteReply} fetchTopic={this.fetchTopic} />
					</TabContainer>
					<TabContainer dir={theme.direction}>
						<Iframe url={this.state.topic.description}
        width="100%"
        height="450px"
        display="initial"
        position="relative"
        allowFullScreen/>
					</TabContainer>


					{/*

							<TabContainer dir={theme.direction}>
												{this.state.topic && this.state.topic.quizes && this.state.topic.quizes.length > 0 ? (
													<Think quizes={this.state.topic.quizes} topicId={this.props.match.params.id} />
												) : (
													<p>No quize is added yet stay toned</p>
												)}
											</TabContainer>
												<TabContainer dir={theme.direction}>
																			{this.state.topic.study ? (
																				<Read topic={this.state.topic} />
																			) : (
																				<p>No study material is added yet stay tuned</p>
																			)}
																		</TabContainer>


																		*/}

				</SwipeableViews>
				<br />
				<br />
				<br />
				{fabs.map((fab, index) => (
					<Zoom
						key={fab.color}
						in={this.state.value === index}
						timeout={transitionDuration}
						style={{
							transitionDelay: this.state.value === index ? transitionDuration.exit : 0
						}}
						unmountOnExit
					>
						<Button
							variant="fab"
							className={fab.className}
							color={fab.color}
							onClick={e => {
								this.handleShowModal();
							}}
						>
							{fab.icon}
						</Button>
					</Zoom>
				))}

				<QuestionModal
					title="Ask a question"
					task={this.submitQuestion}
					onSubmitSuccess={this.handleSubmitQuestionSuccess}
					showModal={this.state.showModal}
					handleHideModal={this.handleHideModal}
					buttonType="Ask"
				/>
			</div>
		);
	}
}

TopicTabs.propTypes = {
	classes: PropTypes.object.isRequired,
	theme: PropTypes.object.isRequired
};

export default hot(module)(withRouter(withStyles(styles, { withTheme: true })(TopicTabs)));
