import Button from '@material-ui/core/Button';

import { loadCSS } from 'fg-loadcss/dist/loadCSS';
import React from 'react';
import Avatar from '@material-ui/core/Avatar';

import { withStyles } from '@material-ui/core/styles';

import Header from './shared/Header/Header';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { withRouter } from 'react-router-dom';

import Icon from '@material-ui/core/Icon';
import Paper from '@material-ui/core/Paper';
import Config from '../Config';
import options from './Options';
import request from 'request-promise';
import { style } from './presets/ProfilePage';
import WordsHeatMap from './WordsHeatMap';
class ProfilePage extends React.Component {
	state = {
		userdata: {},
		knownWords:[]
	};
	async componentDidMount() {
		loadCSS('https://use.fontawesome.com/releases/v5.1.0/css/all.css', document.querySelector('#insertion-point-jss'));
		try {
			if(this.props.match.params.userId){
				const res = await request(options(`${Config.API}/users/${this.props.match.params.userId}`));
				this.setState({ userdata: JSON.parse(res) });
			}
			else{
				const res = await request(options(`${Config.API}/users/me`));
				this.setState({ userdata: JSON.parse(res) });
			}
			this.handleFetchNumberOfKnownWords()
		} catch (e) {
			console.log('some thing wrong', e);
		}
	}
	handleEdit = () => {
		this.props.history.push('/profileupdate');
	};
	handleFetchNumberOfKnownWords = async ()=>{
    try {

    const url = `${Config.API}/users/mywords`;
    const res = await request(options(url,"get")); //method cat id data
    let words=JSON.parse(res)

		let numberOfKnownWords = words.length;
		let badge=this.handleGetBadge(numberOfKnownWords);
    this.setState({
      badge,numberOfKnownWords
    });
  } catch (e) {
  	console.log('something wrong', e);
  }
  }
	handleShowBadgeInfo=(numberOfKnownWords)=>{
		!this.props.match.params.userId &&
		alert(`You have got this badge because you know ${numberOfKnownWords + " word"}${numberOfKnownWords>1 && 's'} `)
	}
	handleGetBadge =  (number)=>{

		// let temp = [grey["300"],red["200"], yellow["A200"],lime["A700"],green["500"]]
		let temp = {0:"chevron-0.svg",10:"chevron-1.svg",20:"chevron-2.svg",
		50:"chevron-3.svg",100:"chevron-4.svg",150:"chevron-5.svg",
200:"chevron-6.svg",250:"chevron-7.svg",300:"chevron-8.svg",
350:"chevron-9.svg",400:"chevron-10.svg",500:"chevron-11.svg",
600:"chevron-12.svg",700:"chevron-13.svg",800:"chevron-14.svg",900:"chevron-15.svg",1000:"chevron-16.svg",
1100:"chevron-17.svg",1200:"chevron-18.svg",1300:"chevron-19.svg",1400:"chevron-20.svg",1500:"chevron-21.svg",
	}
	if (number>1500){
		number =1500
	}		else if (number>1400){
				number =1400
			}		else if (number>1300){
						number =1300
					}		else if (number>1200){
								number =1200
							}		else if (number>1100){
										number =1100
									}		else if (number>1000){
												number =1000
											}		else if (number>900){
														number =900
													}		else if (number>800){
																number =800
															}		else if (number>700){
																		number =700
																	}		else if (number>600){
																				number =600
																			}		else if (number>500){
																						number =500
																					}		else if (number>400){
																								number =400
																							}		else if (number>350){
																										number =350
																									}		else if (number>300){
																												number =300
																											}		else if (number>250){
																														number =250
																													}		else if (number>200){
																																number =200
																															}
		else if (number>150){
			number =150
		}
		else	if(number>100){
				number = 100
			}
			else if(number>50){
				number = 50
			}
			else	if(number>20){
					number =20
				}
		else if(number>10){
			number =10
		}

	else	if(number>0){
			number = 0
		}
		return temp[number]

	}
	render() {
		const { classes } = this.props;
		return (
			<div>
				<Header isBackButton={true} />
				<Paper
					style={{
						margin: '1rem',
						position: 'relative'
					}}
				>
				{
					!this.props.match.params.userId &&
					<Icon
						className={'fas fa-edit'}
						style={{
							position: 'absolute',
							right: 0,
							marginRight: '1rem',
							marginTop: '1rem',
							cursor: 'pointer'
						}}
						onClick={this.handleEdit}
					/>
				}

					<Grid container justify="center">
						<Grid item>
							<div className={classes.profile}>
							<Grid container justify="center">
							<Grid item xs={12}>
							<Avatar
								src={this.state.userdata.avatar + '?type=normal'}
								alt={this.state.userdata.name}
								className={classes.avatar}
							/>
							</Grid>





									<Grid item
										style={{
											display: 'flex',
											alignItems: 'center',
											background:'#EEEEEE',
											maxWidth:'20rem',
											marginTop:"20px",


										}} onClick={(e)=>{this.handleShowBadgeInfo(this.state.numberOfKnownWords)}}
									>
									{
										!this.props.match.params.userId && <img
											src={`/assets/badges/${this.state.badge}`}
											alt="..."
											className={classes.badge}
											style={{
												marginRight: 0
											}}
										/>
									}

										<Typography variant="title" className={classes.title}>
											{this.state.userdata.name}
										</Typography>
										{
											!this.props.match.params.userId && <img
												src={`/assets/badges/${this.state.badge}`}
												alt="..."
												className={classes.badge}
												style={{
													marginRight: 0
												}}
											/>
										}
									</Grid>
</Grid>
									<Typography className={classes.description}>{this.state.userdata.description}</Typography>

									{this.state.userdata.facebook ? (
										<Button justicon="justicon" link="link">
											<a href={this.state.userdata.facebook} target="_blank">
												<Icon className={'fab fa-facebook'} />
											</a>
										</Button>
									) : (
										''
									)}

							</div>
						</Grid>
					</Grid>
				</Paper>
				{
					!this.props.match.params.userId && 	<WordsHeatMap/>
				}

<br></br><br></br><br></br><br></br><br></br>
			</div>
		);
	}
}

ProfilePage.defaultProps = {
	badge: 'chevron-8.svg'
};

export default withRouter(withStyles(style)(ProfilePage));
