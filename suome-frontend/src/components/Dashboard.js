import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import IconButton from '@material-ui/core/IconButton';
import InfoIcon from '@material-ui/icons/Info';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import PowerIcon from '@material-ui/icons/Power';
import Modal from './shared/Modal/Modal';
import AlertModal from './shared/Modal/Modal';
import { withRouter } from 'react-router-dom';
import withWidth from '@material-ui/core/withWidth';
import Paper from '@material-ui/core/Paper';
import request from 'request-promise';
import Config from '../Config';
import options from './Options';
import Header from './shared/Header/Header';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import classNames from 'classnames';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import Icon from '@material-ui/core/Icon';
import { styles, defaultProps } from './presets/Dashboard';
import Loading from '../components/shared/Loading';
import { loadCSS } from 'fg-loadcss/dist/loadCSS';
import Badge from '@material-ui/core/Badge';
import Chip from '@material-ui/core/Chip';
import Typography from '@material-ui/core/Typography';

// import defineRequest from './AddToYoutube.js'
class Dashboard extends React.Component {
	page = 1;
	per_page = 10;
	tags = '';
	loading: 'true';
	state = {
		methodType: '',
		deleteTopicID: '',
		descriptions: '',
		topics: [],
		user: {},
		modalStatus: {
			info: false,
			alert: false
		},
		modalTitle: '',
		selectedTags: [],
		newWords: {}
	};
	toggleModal = (type, action) => {
		const newState = {
			...this.state
		};

		newState.modalStatus[type] = action;
		this.setState(newState);
	};
	// componentDidUpdate(prevProps, prevState) {
	// 	if(!this.state.modalStatus.info && !this.state.modalStatus.alert)
	// 	this.setState(title:{});
	// }
	fetchTopics = async () => {
		try {
			const url = `${Config.API}/topics?page=${this.page}&per_page=${this.per_page}&tags=${this.tags}`;
			const res = await request(options(url));

			const topics = JSON.parse(res)
			this.setState(() => ({topics}));
			this.handleUpdateNewWords();

		} catch (e) {
			console.log('error fetching topics', e);
		}
	};
	// componentDidUpdate(prevProps, prevState) {
	// 	console.log(this.state.loading,"loading");
	// 	if(this.state.loading === "true"){
	// 		this.setState({loading:"false"})
	// 	}
	// }
	handleSetTopic = async (topic, type, action, methodType) => {
		await this.setState({ topic, title: topic.title, methodType });
		this.toggleModal(type, action);
	};
	handleAddToLike = async topicID => {
		// if(this.state.user.completed.includes(topicID)){
		let topics = this.state.topics;
		const url = this.state.user.likes.includes(topicID)
			? `${Config.API}/topics/${topicID}/unlike`
			: `${Config.API}/topics/${topicID}/like`;
		let result = await request(options(url, 'post')); //method cat id data
		// console.log("result",result);
		let user = this.state.user;
		let docIndex = topics.findIndex(doc => {
			return doc._id === topicID;
		});
		if (user.likes.includes(topicID)) {
			user.likes.splice(user.likes.indexOf(topicID), 1);
			topics[docIndex].likes = topics[docIndex].likes - 1;
			// this.fetchTopics()
			// let topics =this.state.topics
			// topics[topicID].likes =topics[topicID].likes -1
			// this.setState({topics})
		} else {
			user.likes.push(topicID);
			topics[docIndex].likes = topics[docIndex].likes + 1;
			// this.fetchTopics()
			// let topics =this.state.topics
			// topics[topicID].likes =topics[topicID].likes +1
			// this.setState({topics})
		}

		this.setState({
			user,
			topics
		});

		// }
		// else alert("Topic can only be liked after stuyding it")
	};
	handleClick = tag => {
		//console.log(tag);
		let selectedTags = [];
		if (this.state.selectedTags.includes(tag)) {
			selectedTags = this.state.selectedTags;
			selectedTags.splice(selectedTags.indexOf(tag), 1);
			this.setState({ selectedTags });
		} else {
			selectedTags = this.state.selectedTags;
			selectedTags.push(tag);
			this.setState({ selectedTags });
		}
		this.tags = selectedTags.join(',');
		this.fetchTopics();
		// alert("Filtering videos based on tags is not yet implemented")
	};
	handleAddToCompleted = async topicID => {
		// if(this.state.user.completed.includes(topicID)){

			let topics = this.state.topics
			const url = `${Config.API}/topics/${topicID}/complete`;

				let result = await request(options(url,'post')); //method cat id data


			// console.log("result",result);
			let user = this.state.user;
			let docIndex = topics.findIndex((doc)=>{
					return doc._id === topicID});

			if(!user.completed.includes(topicID))
			{

				user.completed.push(topicID)
				this.handleUpdateNewWords('reset')
				// user.completed.splice(user.completed.indexOf(topicID),1)
// topics[docIndex].completed=topics[docIndex].likes-1
				// this.fetchTopics()
				// let topics =this.state.topics
				// topics[topicID].likes =topics[topicID].likes -1
				// this.setState({topics})
			}
			this.setState({
				user
			});




		this.toggleModal('alert', false);
	};
	async componentWillMount() {
		if (this.props.location.search !== '') {
			const token = this.props.location.search.split('?token=')[1];
			token && localStorage.setItem('token', token);
		}

		if (localStorage.getItem('token')) {
			const getMeUrl = `${Config.API}/users/me`;
			const user = await request(options(getMeUrl));
			localStorage.setItem('user', user);
			window.user = user;
			this.setState({ user: JSON.parse(user) });
		}
	}

handleUpdateNewWords = async (isReset)=>{
	try{
		let url50 = "";
		if(isReset){
			url50 = `${Config.API}/topics?page=${this.page}&per_page=${this.per_page}`
		}
		else{
			url50 = `${Config.API}/topics?page=${this.page}&per_page=${50}`;
		}

		const res50 = await request(options(url50));
		let topics50 = JSON.parse(res50)
		let newWords = this.state.newWords;
		// console.log(topics50);
		for (let topic of topics50) {
			// console.log(isReset);
			// console.log(newWords,!newWords[topic._id]);
		if(!newWords[topic._id] || isReset==='reset'){
			// console.log(topic.title);
				const urll = `${Config.API}/users/tags/${topic._id}`;
				const ress = await request(options(urll));
				newWords[topic._id] = JSON.parse(ress)
			}


		}
		this.setState({newWords});
		this.forceUpdate();



	} catch (e) {
		console.log('some thing wrong', e);
	}
}



	async componentDidMount() {
		// defineRequest
		loadCSS('https://use.fontawesome.com/releases/v5.1.0/css/all.css', document.querySelector('#insertion-point-jss'));
		try {
			const url = `${Config.API}/topics?page=${this.page}&per_page=${this.per_page}`;
			const res = await request(options(url));
			this.setState({ topics: JSON.parse(res), loading: 'false' });
			this.handleUpdateNewWords();
		} catch (e) {
			console.log('some thing wrong', e);
		}
	}
	buildInfo = async (words, tags, description, id, title, type, action) => {
		let stopwords = [
			'but',
			'there',
			'have',
			'with',
			'they',
			'an',
			'be',
			'for',
			'do',
			'it',
			'your',
			'of',
			'most',
			'other',
			'is',
			'am',
			'or',
			'who',
			'as',
			'him',
			'the',
			'themselves',
			'are',
			'we',
			'these',
			'your',
			'his',
			'me',
			'were',
			'her',
			'himself',
			'this',
			'should',
			'our',
			'their',
			'to',
			'our',
			'had',
			'she',
			'no',
			'when',
			'at',
			'any',
			'before',
			'them',
			'and',
			'been',
			'have',
			'in',
			'will',
			'on',
			'does',
			'yourselves',
			'then',
			'that',
			'what',
			'why',
			'so',
			'can',
			'did',
			'not',
			'he',
			'you',
			'herself',
			'has',
			'where',
			'myself',
			'which',
			'those',
			'i',
			'whom',
			'being',
			'if',
			'their',
			'my',
			'a',
			'by',
			'doing',
			'it',
			'how',
			'was',
			'here'
		];
		words = words.filter(value => -1 === stopwords.indexOf(value));
		let tagsSentence = tags.join(', ');
		let wordsSentence = words.join(', ');
		let newWords = this.state.newWords[id].join(', ');
		const url = `${Config.API}/topics/${id}`;
		const res = await request(options(url)); //method cat id data
		let topicDetail = JSON.parse(res);
		//let descriptions = `${topicDetail.description}. New Words include ${newWords}`;
		let descriptions = newWords.length ? `New Words include ${newWords}`:'No new commnly used words found in this song.';
		this.setState({ descriptions });
		this.setState({ title });
		this.toggleModal(type, action);
	};

	handleCardClick = cardID => {
		if (Object.keys(this.state.user).length === 0 && this.state.user.constructor === Object) {
			alert('You need to login to open a topic');
			this.props.history.push(`/login`);
		} else {
			var win = window.open(`/topic/${cardID}`, '_blank');
			win.focus();
			// this.props.history.push(`/topic/${cardID}`);
		}

		// TODO: change to withRouter
	};
	handleEditTopic = _id => {
		var win = window.open(`/admintopic/${_id}`, '_blank');
		win.focus();
		// this.props.history.push(`/admintopic/${_id}`);
	};
	handleSelectTopic = topic => {};
	handleUpdateTopic = async () => {
		try {
			const url = `${Config.API}/topics/${this.state.topic._id}`;
			let res = await request(options(url, 'get'));
			let topic = JSON.parse(res);
			let data = {
				title: topic.title,
				type: topic.type,
				source: topic.source,
				description: topic.description,
				coverImg: topic.coverImg,
				lyricSrc: topic.lyricSrc,
				study: topic.study,
				totalWords: topic.totalWords,
				removed: !!!topic.removed,
				tags: topic.tags,
				featuredWords: topic.featuredWords,
				wordsFrequency: topic.wordsFrequency,
				content: topic.content,
				quizes: topic.quizes
			};
			// console.log(data);

			let urll = `${Config.API}/topics/${topic._id}`;
			await request(options(urll, 'put', data));
			this.fetchTopics();
			this.toggleModal('alert', false);
			this.setState({ topic: {} });
		} catch (e) {
			console.log('some thing wrong', e);
		}
	};
	handleDeleteTopic = async () => {
		try {
			// console.log(data);

			let urll = `${Config.API}/topics/${this.state.topic._id}`;
			await request(options(urll, 'delete'));
			this.fetchTopics();
			this.toggleModal('alert', false);
			this.setState({ topic: {} });
		} catch (e) {
			console.log('some thing wrong', e);
		}
	};
	loadMore = async task => {
		this.setState({ loading: 'true' });
		//console.log(task);
		window.scrollTo(0, 0);
		task === 'previous' ? this.page-- : this.page++;

		const url = `${Config.API}/topics?page=${this.page}&per_page=${this.per_page}&tags=${this.tags}`;
		const res = await request(options(url));
		let topics = JSON.parse(res)
		this.setState(() => ({...this.state,
					loading:"false",topics}));
		this.handleUpdateNewWords()




	};

	render() {
		const { classes } = this.props;
		return (
			<div className={classes.root}>
				<Header user={this.state.user} isReadme={true} />
				{this.page > 1 && (
					<Grid container justify="center">
						<Grid item>
							<Button
								style={{ marginTop: '16px' }}
								onClick={() => {
									this.loadMore('previous');
								}}
							>
								Load Previous
							</Button>
						</Grid>
					</Grid>
				)}
				<Paper className={classes.paper}>
					<Modal
						buttonType="Close"
						title={this.state.title}
						showModal={this.state.modalStatus.info}
						handleHideModal={this.toggleModal.bind(this, 'info', false)}
					>
						<DialogContent>
							<DialogContentText id="alert-dialog-description">{this.state.descriptions}</DialogContentText>
						</DialogContent>
						<DialogActions>
							<Button onClick={this.toggleModal.bind(this, 'info', false)}>Close</Button>
						</DialogActions>
					</Modal>

					<AlertModal
						buttonType="Close"
						title={this.state.title}
						showModal={this.state.modalStatus.alert}
						handleHideModal={this.toggleModal.bind(this, 'alert', false)}
					>
						<DialogContent>
							<DialogContentText id="alert-dialog-description">
								Are you sure you want to {`${this.state.methodType}`} this?
							</DialogContentText>

							{this.props.otherData}
						</DialogContent>
						<DialogActions>
							<Button onClick={this.toggleModal.bind(this, 'alert', false)} color="primary">
								Cancel
							</Button>
							<Button
								onClick={e => {
									if (this.state.methodType === 'update') {
										this.handleUpdateTopic();
									}
									if (this.state.methodType === 'delete') {
										this.handleDeleteTopic();
									}
									if (this.state.methodType === 'complete') {
										this.handleAddToCompleted(this.state.topic._id);
									}
								}}
								color="primary"
								autoFocus
							>
								Confirm
							</Button>
						</DialogActions>
					</AlertModal>

					<GridList cellHeight={400} cols={2} spacing={16} className={classes.gridList}>
						{this.state.loading === 'false' ? (
							this.state.topics.map(topic => (
								<GridListTile
									key={topic._id}
									cols={this.props.width === 'xs' ? 2 : 1}
									style={{
										position: 'relative'
									}}
								>
									<img
										src={topic.coverImg}
										alt={topic.title}
										style={{
											position: 'absolute'
										}}
										onClick={e => {
											this.handleCardClick(topic._id);
										}}
									/>

									<GridListTileBar
										key={topic._id + 'top'}
										titlePosition="top"
										title={<Typography style={{ color: 'white', maxWidth: '3rem' }}>{topic.title}</Typography>}
										// 								actionIcon={
										//
										// 										this.state.user
										// 											? [
										// 												<Grid container justify="center">
										// 												<Grid item>
										// 												<IconButton
										// 													key={1}
										// 													className={classes.icon}
										// 													onClick={() => {
										// 														this.buildInfo(topic.featuredWords, topic.tags, topic.description, topic._id,topic.title,'info',true);
										//
										// 													}}
										// 												>
										// 													<InfoIcon />
										// 												</IconButton>
										// 												</Grid>
										// 												<Grid item>
										// 												<IconButton  className={classes.icon}
										// 												 >
										//
										//
										// 												 <Icon className={classNames(classes.icon,this.state.user && this.state.user.completed.includes(topic._id)?"fas fa-check-circle":"far fa-check-circle")}
										// 													 onClick={(e)=>{this.handleAddToCompleted(topic._id)}}/>
										// 											 </IconButton>
										// 												</Grid>
										// 												<Grid item>
										// 												<IconButton  className={classes.icon}
										// 												 >
										//
										// 											<Badge badgeContent={topic.likes} color="primary" classes={{ badge: classes.badge }}>
										// 												 <Icon className={classNames(classes.icon,this.state.user && this.state.user.likes.includes(topic._id)?"fas fa-heart":"far fa-heart")}
										// 													 onClick={(e)=>{this.handleAddToLike(topic._id)}}/>
										// 											</Badge>
										//
										//
										// 												 </IconButton>
										// 												</Grid>
										//
										//
										// 									</Grid>
										// 												]
										// 											: [
										// 												<Grid container justify="center">
										// 												<Grid item>
										// 													<IconButton
										// 														key={4}
										// 														className={classes.icon}
										// 														onClick={() => {
										// 									this.buildInfo(topic.featuredWords, topic.tags, topic.description, topic._id,topic.title,'info',true);
										// 														}}
										// 													>
										// 														<InfoIcon />
										// 													</IconButton>
										// 													</Grid>
										// 													</Grid>
										// 												]
										//
										// }
									/>
									{JSON.parse(localStorage.getItem('user')) && (
										<GridListTileBar
											style={{ marginTop: '49px' }}
											titlePosition="top"
											key={topic._id + 'top2'}
											title={
												this.state.user
													? [
															<Grid container justify="center">
																<Grid item>
																	<IconButton
																		className={classes.icon}
																		onClick={() => {
																			this.buildInfo(
																				topic.featuredWords,
																				topic.tags,
																				topic.description,
																				topic._id,
																				topic.title,
																				'info',
																				true,
																				this.state.newWords
																			);
																		}}
																	>
																		<InfoIcon />
																	</IconButton>
																</Grid>
																<Grid item>
																	<IconButton className={classes.icon}>
																		<Icon
																			className={classNames(
																				classes.icon,
																				this.state.user &&
																					this.state.user.completed &&
																					this.state.user.completed.includes(topic._id)
																					? 'fas fa-check-circle'
																					: 'far fa-check-circle'
																			)}
																			onClick={e => {
																				this.state.user.completed.includes(topic._id)
																					? alert('Topic is already marked as completed')
																					: this.handleSetTopic(topic, 'alert', true, 'complete');
																			}}
																		/>
																	</IconButton>
																</Grid>
																<Grid item>
																	<IconButton
																		className={classes.icon}
																		onClick={e => {
																			this.handleAddToLike(topic._id);
																		}}
																	>
																		<Badge
																			badgeContent={topic.likes}
																			color="primary"
																			classes={{ badge: classes.badge }}
																		>
																			<Icon
																				className={classNames(
																					classes.icon,
																					this.state.user &&
																						this.state.user.likes &&
																						this.state.user.likes.includes(topic._id)
																						? 'fas fa-heart'
																						: 'far fa-heart'
																				)}
																			/>
																		</Badge>
																	</IconButton>
																</Grid>

																{this.state.user.isAdmin && (
																	<span>
																		<IconButton
																			className={classNames(classes.icon, classes.smallIcon)}
																			onClick={() => {
																				this.handleEditTopic(topic._id);
																			}}
																		>
																			<EditIcon />
																		</IconButton>
																		<IconButton
																			className={classNames(classes.icon, classes.smallIcon)}
																			onClick={() => {
																				this.handleSetTopic(topic, 'alert', true, 'update');
																			}}
																		>
																			<PowerIcon
																				className={classNames({
																					[classes.removed]: topic.removed === true
																				})}
																			/>
																		</IconButton>
																		<IconButton
																			className={classNames(classes.icon, classes.smallIcon)}
																			onClick={() => {
																				this.handleSetTopic(topic, 'alert', true, 'delete');
																			}}
																		>
																			<DeleteIcon />
																		</IconButton>
																	</span>
																)}
															</Grid>
													  ]
													: [
															<Grid container justify="center">
																<Grid item>
																	<IconButton
																		className={classes.icon}
																		onClick={() => {
																			this.buildInfo(
																				topic.featuredWords,
																				topic.tags,
																				topic.description,
																				topic._id,
																				topic.title,
																				'info',
																				true,
																				this.state.newWords
																			);
																		}}
																	>
																		<InfoIcon />
																	</IconButton>
																</Grid>
															</Grid>
													  ]
											}
										/>
									)}

									<GridListTileBar
										style={{ height: '6rem' }}
										key={topic._id + 'bottom'}
										titlePosition="bottom"
										title={
											<Grid container className={classes.rootchip}>
												{
													// 	topic.tags.map(tag => {
													// 	let avatar = null;
													// 	// if (tag.label === 'React') {
													// 	//   avatar = (
													// 	//     <Avatar>
													// 	//       <TagFacesIcon className={classes.svgIcon} />
													// 	//     </Avatar>
													// 	//   );
													// 	// }
													// 	return (
													// 		<Grid key={topic._id + tag} item>
													// 			<Button className={classes.button} disableFocusRipple>
													// 				<Chip
													// 					avatar={avatar}
													// 					label={tag}
													// 					onClick={() => {
													// 						this.handleClick(tag);
													// 					}}
													// 					className={classNames(classes.chip, {
													// 						[classes.selectedTag]: this.state.selectedTags.includes(tag)
													// 					})}
													// 				/>
													// 			</Button>
													// 		</Grid>
													// 	);
													// })
												}
												{this.state.newWords[topic._id] && (
													<Grid key={topic._id + 'newWords'} item>
														<Button disabled className={classes.button} disableFocusRipple>
															<Chip
																style={{ background: '#cccccc', color: '#acacac' }}
																avatar={null}
																label={this.state.newWords[topic._id] && this.state.newWords[topic._id].length}
																className={classNames(classes.chip)}
															/>
														</Button>
													</Grid>
												)}
											</Grid>
										}
									/>
								</GridListTile>
							))
						) : (
							<Loading />
						)}
					</GridList>
				</Paper>
				{this.state.loading !== 'true' && this.state.topics.length > 1 && (
					<Grid container justify="center">
						<Grid item>
							<Button
								onClick={() => {
									this.loadMore('more');
								}}
							>
								Load More
							</Button>
						</Grid>
					</Grid>
				)}
			</div>
		);
	}
}

Dashboard.propTypes = {
	classes: PropTypes.object.isRequired
};

Dashboard.defaultProps = defaultProps;
export default withRouter(withWidth()(withStyles(styles)(Dashboard)));
