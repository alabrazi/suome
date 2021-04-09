//import injectTapEventPlugin from 'react-tap-event-plugin';
//injectTapEventPlugin();
import React from 'react';
import classNames from 'classnames';
import request from 'request-promise';
import Config from '../Config';
import options from './Options';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';
import grey from '@material-ui/core/colors/grey';

import green from '@material-ui/core/colors/green';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Popover from '@material-ui/core/Popover';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import { loadCSS } from 'fg-loadcss/dist/loadCSS';
const styles = theme => ({
	root: {
		flexGrow: 1,
		background: theme.palette.primary['A400'],
	},
	avatar: {
		WebkitFilter: 'grayscale(100%)',
		filter: 'grayscale(100%)'
	},
	typography: {
		padding: theme.spacing.unit
	},
	paper:{
		background: grey[300],
		height: '30px',
		minWidth: '25px',
		paddingLeft: '10px',
		paddingRight: '10px'
	},
	done:{
		background: green[200]
	},
	available:{
		background: grey[500]
	}
});

const actionsStyles = theme => ({
  root: {
    flexShrink: 0,
    color: theme.palette.text.secondary,
    marginLeft: theme.spacing.unit * 2.5,
  },
});

class TablePaginationActions extends React.Component {
  handleFirstPageButtonClick = event => {
    this.props.onChangePage(event, 0);
  };

  handleBackButtonClick = event => {
    this.props.onChangePage(event, this.props.page - 1);
  };

  handleNextButtonClick = event => {
    this.props.onChangePage(event, this.props.page + 1);
  };

  handleLastPageButtonClick = event => {
    this.props.onChangePage(
      event,
      Math.max(0, Math.ceil(this.props.count / this.props.rowsPerPage) - 1),
    );
  };

  render() {
    const { classes, count, page, rowsPerPage, theme } = this.props;

    return (
      <div className={classes.root}>
        <IconButton
          onClick={this.handleFirstPageButtonClick}
          disabled={page === 0}
          aria-label="First Page"
        >
          {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
        </IconButton>
        <IconButton
          onClick={this.handleBackButtonClick}
          disabled={page === 0}
          aria-label="Previous Page"
        >
          {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
        </IconButton>
        <IconButton
          onClick={this.handleNextButtonClick}
          disabled={page >= Math.ceil(count / rowsPerPage) - 1}
          aria-label="Next Page"
        >
          {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
        </IconButton>
        <IconButton
          onClick={this.handleLastPageButtonClick}
          disabled={page >= Math.ceil(count / rowsPerPage) - 1}
          aria-label="Last Page"
        >
          {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
        </IconButton>
      </div>
    );
  }
}


const TablePaginationActionsWrapped = withStyles(actionsStyles, { withTheme: true })(
  TablePaginationActions,
);
class WordsHeatMap extends React.Component {
	page = 1;
  per_page = 50;
	state = {
		anchorEl: null,
		amount: 200,
		knownWords: [],
		words: [],
		word: {},
		page: 0,
		coveredWords:[],
	 rowsPerPage: 50
	};
	// loadMore = async () => {
		// <Button onClick={this.loadMore}>Load More</Button>
	// 	this.page = this.page+ 1;
	//
	// 	const url = `${Config.API}/users/myprogress?page=${this.page}&per_page=${this.per_page}`;
	// 	const res = await request(options(url));
	// 	const words = JSON.parse(res);
	// 	this.setState({
	// 		...this.state,
	// 		words: this.state.words.concat(words)
	// 	});
	// };
	handleChangePage = async (event, page) => {
	const url = `${Config.API}/users/myprogress?page=${page+1}&per_page=${this.state.rowsPerPage}`;
	const res = await request(options(url));
	const words = JSON.parse(res);
	this.setState({
		...this.state,
		words,
		page
	});
	this.handleSetCoveredWords(words)
};
handleSetCoveredWords =  (words)=>{
let coveredWords = []
	words.forEach(async (word)=>{
		const url = `${Config.API}/words/${word.english}`;
		const ress = await request(options(url, 'get'));
		if(JSON.parse(ress)[0].mostRepeats>0){
			coveredWords.push(word.english)
			this.setState({coveredWords:this.state.coveredWords.concat(word.english)})
		}

	})
	//console.log("x",x);

}
// componentDidUpdate(prevProps, prevState) {
// 	console.log("console.log(prevState.coveredWords,this.state.coveredWords);",prevState.coveredWords,this.state.coveredWords);
// 	// if (prevState.coveredWords!==this.state.coveredWords){
// 	// 	this.state.coveredWords.includes("be")
// 	// 	this.forceUpdate()
// 	// }
//
// }
handleChangeRowsPerPage = event => {
	this.setState({ rowsPerPage: event.target.value });
};
	// handleAddToComplete = async word => {
	// 	const url = !this.state.user.words.includes(word)&&`${Config.API}/topics/${this.props.topicId}/complete`;
	// 	const res = await request(options(url,'post')); //method cat id data
	// 	let user = this.state.user;
	// 	if(!user.completed.includes(topicID))
	// 	{
	//
	// 		user.completed.push(topicID)
	// 		this.handleUpdateNewWords('reset')
	// 		// user.completed.splice(user.completed.indexOf(topicID),1)
	// // topics[docIndex].completed=topics[docIndex].likes-1
	// 		// this.fetchTopics()
	// 		// let topics =this.state.topics
	// 		// topics[topicID].likes =topics[topicID].likes -1
	// 		// this.setState({topics})
	// 	}
	// 	this.setState({
	// 		user
	// 	});
	// };


	async componentWillMount() {
		loadCSS('https://use.fontawesome.com/releases/v5.1.0/css/all.css', document.querySelector('#insertion-point-jss'));
		this.handleGetKnownWords();

		if (localStorage.getItem('user')) {
			let user = JSON.parse(localStorage.getItem('user'))
			this.setState({ user  });
		}

	}
	handleGetKnownWords = async () => {
		try {
			const data = {};

			const res = await request(options(`${Config.API}/users/myprogress?page=${this.page}&per_page=${this.per_page}`, 'get', data));
			// const res = await request(options(`${Config.API}words?top=${this.state.amount}}`,'get',data));

			const url = `${Config.API}/users/mywords`;
			const ress = await request(options(url, 'get')); //method cat id data
			let words = JSON.parse(res);

			this.setState({
				knownWords: JSON.parse(ress),
				words
			});
			this.handleSetCoveredWords(words)
		} catch (e) {}
	};

	WordTemp = count => {
		// let temp = [grey["300"],red["200"], yellow["A200"],lime["A700"],green["500"]]
		let temp = [grey['300'],"red", green['200']];
		if (count > temp.length) {
			count = temp.length;
		}
		return temp[count];
	};
	handleChangeBodyState = param => {
		this.setState(() => ({ body: param }));
	};

	handleClick = word => event => {
		this.setState({
			anchorEl: event.currentTarget
		});
		this.handleWhatWord(word);
	};
	handleWhatWord = async word => {
		const url = `${Config.API}/words/${word.english}`;
		const ress = await request(options(url, 'get'));
		https://suomea.online/api/words/be
		this.setState({
			word: JSON.parse(ress)[0]
		});
	};

	handleAddToKnown = async word => {
		// let user = JSON.parse(this.state.user);
		// console.log(user.words);
		try{

					// user.words.push(word.english);
					// const url = `${Config.API}/users/me`;
					// const res = await request(options(url,'put',user)); //method cat id data
					const data = {
	english: word.english
};
const url = `${Config.API}/users/mywords`;
const res = await request(options(url, 'post', data)); //method cat id data




		}
		catch(e){
			console.log("Adding the word to complete is problem",e);
		}
		let words = this.state.words;
		let objIndex = words.findIndex((obj => obj._id === word._id));
		words[objIndex]= {...words[objIndex], "done":true}
		let knownWords = this.state.knownWords;
		if(knownWords.indexOf(words[objIndex].english) === -1){
			knownWords.push(words[objIndex].english)

		}

		// handleAddToComplete = async word => {
		// 	const url = !this.state.user.words.includes(word)&&`${Config.API}/topics/${this.props.topicId}/complete`;
		// 	const res = await request(options(url,'post')); //method cat id data
		// 	let user = this.state.user;
		// 	if(!user.completed.includes(topicID))
		// 	{
		//
		// 		user.completed.push(topicID)
		// 		this.handleUpdateNewWords('reset')
		// 		// user.completed.splice(user.completed.indexOf(topicID),1)
		// // topics[docIndex].completed=topics[docIndex].likes-1
		// 		// this.fetchTopics()
		// 		// let topics =this.state.topics
		// 		// topics[topicID].likes =topics[topicID].likes -1
		// 		// this.setState({topics})
		// 	}
		// 	this.setState({
		// 		user
		// 	});
				this.setState({words,knownWords})
	};
	handleClose = () => {
		this.setState({
			anchorEl: null,
			word: {}
		});
	};
	// async componentWillMount()  {
	// 	if (this.props.location.search !== '') {
	// 		const token = this.props.location.search.split('?token=')[1];
	// 		token && localStorage.setItem('token', token);
	// 	}
	//
	// 	if (localStorage.getItem('token')) {
	// 		const getMeUrl = `${Config.API}/users/me`;
	// 		const user = await request(options(getMeUrl));
	// 		localStorage.setItem('user', user);
	// 		window.user = user;
	// 		this.setState({ user: JSON.parse(user) });
	// 	}
	// }
	render() {
		const { classes } = this.props;
		const { anchorEl, word, knownWords, words, page,
    rowsPerPage } = this.state;
		const open = Boolean(anchorEl);
		return (
			<Grid container className={classes.root}>
				<Popover
					id="simple-popper"
					open={open}
					anchorEl={anchorEl}
					onClose={this.handleClose}
					anchorReference="anchorPosition"
					anchorPosition={{ top: window.innerHeight/2, left: window.innerWidth/2 }}
					anchorOrigin={{
				     vertical: 'top',
				     horizontal: 'center',
				   }}
				   transformOrigin={{
				        vertical: 'bottom',
				     horizontal: 'center',
				   }}
				>
					<Typography
						className={classes.typography}
					>
						Fi {word && word.finnish}{' '}
					</Typography>
					<hr />
					{word.mostRepeats > 0 && 				<span>
						<Typography className={classes.typography}>Mentioned {word.mostRepeats} times in <a href={`/topic/${word.topics}`} target="_blank" > this </a> </Typography>
	<hr />
					</span>

							}

					{knownWords.includes(word.english) ? (
						<Typography className={classes.typography}>
							Marked as known
							<IconButton style={{ cursor: 'default' }} className={classes.icon}>
								<Icon className={classNames(classes.icon, 'fas fa-check-circle')} />
							</IconButton>
						</Typography>
					) : (
						<Typography className={classes.typography}>
							Mark as known
							<IconButton
								className={classes.icon}
								onClick={() => {
									this.handleAddToKnown(word);
								}}
							>
								<Icon className={classNames(classes.icon, 'far fa-check-circle')} />
							</IconButton>
						</Typography>
					)}
				</Popover>

				<Grid item xs={12}>
					<Paper style={{ minHeight:"180px",height: '100%', margin: '16px',padding:'4px' }}>
						<Grid
							container
							className={classes.root}
							justify="center"
							alignItems="center"

							spacing={8}
						>
							{words.map((word, index) => {

								return (
									<Grid item  key={word._id}>
										<Button
											style={{ width: '100%', minWidth: '25px', height: 'auto', padding: '0' }}
											onClick={this.handleClick(word)}
										>
											<Paper
												className={classNames(classes.paper, {
													[classes.available]:word && this.state.coveredWords.includes(word.english)&& !word.done,
												                                    [classes.done]: word && word.done,

												                                  })}
												// style={{
												// 	background: `${this.WordTemp( ? 2 : this.state.coveredWords.includes(word)?1:0)}`,
												// 	height: '30px',
												// 	minWidth: '25px',
												// 	paddingLeft: '10px',
												// 	paddingRight: '10px'
												// }}
											>
												<Typography
													noWrap
													style={{ color: 'black', lineHeight: '30px', fontSize: '12px', textAlign: 'center' }}
												>
													{word.english}
												</Typography>
											</Paper>
										</Button>
									</Grid>
								);
							})}

						</Grid>
					</Paper>

				</Grid>
<Grid container style={{marginTop:"20px"}} justify="center" alignItems="center">
<Grid item>
	<TablePagination

colSpan={3}
count={5000}
rowsPerPage={rowsPerPage}
page={page}
onChangePage={this.handleChangePage}
onChangeRowsPerPage={this.handleChangeRowsPerPage}
ActionsComponent={TablePaginationActionsWrapped}
labelRowsPerPage = {'Words'}
rowsPerPageOptions={[50]}
/>
</Grid>
</Grid>




			</Grid>
		);
	}
}

WordsHeatMap.propTypes = { classes: PropTypes.object.isRequired };

export default withStyles(styles)(WordsHeatMap); // export default () => {
