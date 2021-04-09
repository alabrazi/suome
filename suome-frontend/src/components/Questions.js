import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import Reply from './Reply';

import { styles, defaultProps } from './presets/Questions';

class Questions extends React.Component {
	state = {
		topic:{},
		user:{}
	}
	  async componentDidMount() {
		 //const user =  JSON.parse(window.user)
		 const user = await JSON.parse(localStorage.getItem('user'));
		 console.log(user);
		this.setState(({topic:this.props.topic, user}))

	}
	render() {
		const { classes, topic } = this.props;
		const { user } = this.state;
		return (
			<div className={classes.root}>
				{topic.replies && topic.replies.length
					? topic.replies.map(reply => {
							return (
								<Reply
									user={this.state.user}
									reply={reply}
									topicId={topic._id}
									key={reply._id}
									handleDeleteReply={this.props.handleDeleteReply}
									fetchTopic={this.props.fetchTopic}
								/>
							);
					  })
					: 'There is no questions here, be the first one!'}
			</div>
		);
	}
}

Questions.propTypes = {
	classes: PropTypes.object.isRequired
};
Questions.defaultProps = defaultProps;
export default withStyles(styles)(Questions);
