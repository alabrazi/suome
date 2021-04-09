import Header from '../shared/Header/Header';
import NotificationItem from './Item';

import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import request from 'request-promise';
import Config from '../../Config';
import options from '../Options';

const styles = theme => ({
	root: {
		width: '100%',
		backgroundColor: theme.palette.background.paper
	},
	paper: {
		width: '100%',
		padding: theme.spacing.unit,
		margin: '0 auto',
		marginTop: theme.spacing.unit
	},
	button: {
		marginTop: theme.spacing.unit
	}
});

class Notification extends React.Component {
	page = 1;
	per_page = 10;
	state = {
		notifications: [],
		user: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : this.props.user
	};
	handleMarkAllRead = async () => {
		let notifications = [];
		try {
			for (let unreadNotificationsItem of this.state.notifications) {
				if (!unreadNotificationsItem.read) {
					await request(options(`${Config.API}/notifications/${unreadNotificationsItem._id}/read`, 'post'));
					let item = unreadNotificationsItem;
					item.read = true;
					notifications.push(item);
				} else {
					notifications.push(unreadNotificationsItem);
				}
			}
			this.setState({ notifications });
		} catch (e) {
			console.log('some thing wrong', e);
		}
	};
	loadMore = async () => {
		this.page++;
		const url = `${Config.API}/notifications?page=${this.page}&per_page=${this.per_page}`;
		const res = await request(options(url));
		const notifications = JSON.parse(res);
		this.setState({
			...this.state,
			notifications: this.state.notifications.concat(notifications)
		});
	};
	async componentWillMount() {
		if (localStorage.getItem('token')) {
			const getMeUrl = `${Config.API}/users/me`;
			const user = await request(options(getMeUrl));
			window.user = user;
			localStorage.setItem('user', JSON.stringify(user));
			this.setState({
				user: JSON.parse(user)
			});
		}
		try {
			const res = await request(options(`${Config.API}/notifications/?page=${this.page}&per_page=${this.per_page}`));

			this.setState({ notifications: JSON.parse(res) });
		} catch (e) {
			console.log('some thing wrong', e);
		}
	}
	render() {
		const { classes } = this.props;
		const { notifications } = this.state;
		//TODO:change to      const { notifications } = this.state;
		return (
			<div className={classes.root}>
				<Header isBackButton={true} />

				<Paper className={classes.paper}>
					<List component="nav">
						{notifications.length === 0 ? 'You do not have any unread notifications' : ''}
						{notifications &&
							notifications.map((item, index) => {
								return <NotificationItem key={index} item={item} />;
							})}
					</List>
				</Paper>
				{this.state.notifications.length > 10 && (
					<Grid container justify="center">
						<Grid item>
							<Button onClick={this.loadMore}>Load More</Button>
						</Grid>
					</Grid>
				)}
			</div>
		);
	}
}

Notification.propTypes = {
	classes: PropTypes.object.isRequired
};

Notification.defaultProps = {
	notifications: [
		{
			read: true,
			_id: '5b5f10fa576357549ea94bd4',
			from: '5b51b9d32618b8c3eebf197d',
			to: '5b51c5d72618b8c3eebf1bf5',
			type: 'topic',
			ctx: '5b5fa433576357549ea94bf8',
			msg: 'reply to topic test1',
			action: 'comment',
			createdAt: '2018-07-30T12:32:37.977Z',
			__v: 0
		},
		{
			read: false,
			_id: '5b5f10fa576357549ea94bd4',
			from: '5b51c5d72618b8c3eebf1bf5',
			to: '5b51b9d32618b8c3eebf197d',
			type: 'topic',
			ctx: '5b5fa433576357549ea94bf8',
			msg: 'reply to topic totot',
			action: 'comment',
			createdAt: '2018-07-30T12:32:37.977Z',
			__v: 0
		}
	]
};
export default withStyles(styles)(Notification);
