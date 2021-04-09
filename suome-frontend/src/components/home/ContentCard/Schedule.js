import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import IconButton from '@material-ui/core/IconButton';
import InfoIcon from '@material-ui/icons/Info';
import Modal from '../../shared/Modal/Modal';

import withWidth from '@material-ui/core/withWidth';

import { styles, defaultProps } from './presets/Schedule';

class TitlebarGridList extends React.Component {
	state = {
		showModal: false,
		descriptions: ''
	};
	buildInfo = (words, tags) => {
		let tagsSentence = words.join(', ');
		let wordsSentence = tags.join(', ');
		let descriptions = `This video talks about ${wordsSentence}.\nTags include : ${tagsSentence}`;
		this.setState({ descriptions });
	};
	handleHideModal = () => {
		this.setState({ showModal: false });
	};
	handleShowModal = () => {
		this.setState({ showModal: true });
	};

	handleCardClick = cardID => {
		this.props.history.push(`/card/${cardID}`);
	};
	render() {
		const { classes } = this.props;
		return (
			<div className={classes.root}>
				<GridList cellHeight={180} cols={3} className={classes.gridList}>
					{this.props.topics.map(topic => (
						<GridListTile
							key={topic._id}
							cols={this.props.width === 'xs' ? 3 : 1}
							style={{
								position: 'relative'
							}}
						>
							<Modal
								buttonType="Close"
								title={topic.title}
								handleHideModal={this.handleHideModal}
								showModal={this.state.showModal}
								otherData={this.state.descriptions}
							/>
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
								titlePosition="top"
								title={topic.title}
								subtitle={<span> Liked ❤ by: {topic.likes}</span>}
								actionIcon={
									<IconButton
										className={classes.icon}
										onClick={() => {
											this.buildInfo(topic.featuredWords, topic.tags);
											this.handleShowModal();
										}} //event and variable
									>
										{' '}
										<InfoIcon />
									</IconButton>
								}
							/>
						</GridListTile>
					))}
				</GridList>
			</div>
		);
	}
}

TitlebarGridList.propTypes = {
	classes: PropTypes.object.isRequired
};

TitlebarGridList.defaultProps = defaultProps;
export default withWidth()(withStyles(styles)(TitlebarGridList));
