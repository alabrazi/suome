import React, { Component } from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';

import { withRouter } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';

import request from 'request-promise';
import Config from '../../Config';
import options from '../Options';
import moment from 'moment';
const styles = theme => ({
	unread: {
		background: theme.palette.secondary.light
	}
});

class NotificationItem extends Component {
	handleGoToTopic = async () => {
		try {
			const data = {};
			await request(options(`${Config.API}/notifications/${this.props.item._id}/read`, 'post', data));
			this.props.history.push(`/topic/${this.props.item.topicId._id}/1`);
		} catch (e) {
			console.log('some thing wrong', e);
		}
	};
	render() {
		const { classes, item } = this.props;
		console.log(item);
		const message = `${item.from.name} replied you: "${item.msg}" at "${item.topicId.title}"`;
		const date = moment(item.createdAt).format('MMMM Do YYYY, h:mm:ss a');
		return (
			<ListItem
				dense
				button
				onClick={e => {
					this.handleGoToTopic();
				}}
				className={classNames({
					[classes.unread]: this.props.item.read === false
				})}
			>
				<Avatar alt="user" src={item.from.avatar} />
				<ListItemText inset primary={message} secondary={date} />
			</ListItem>
		);
	}
}

export default withRouter(withStyles(styles)(NotificationItem));

NotificationItem.defaultProps = {
	item: {
		read: false,
		_id: '5b5f0565576357549ea94bc8',
		from: '5b51b9d32618b8c3eebf197d',
		to: '5b51c5d72618b8c3eebf1bf5',
		type: 'topic',
		ctx: '5b5e3e67576357549ea94bbf',
		msg: 'reply to topic test1',
		action: 'comment',
		createdAt: '2018-07-30T12:32:37.977Z',
		__v: 0
	}
};
