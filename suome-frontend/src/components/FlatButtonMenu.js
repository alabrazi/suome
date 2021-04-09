import React from 'react';
import Button from 'material-ui/Button';
import Menu, { MenuItem } from 'material-ui/Menu';
import { withStyles } from 'material-ui/styles';
import AddIcon from 'material-ui-icons/Add';
import PropTypes from 'prop-types';
import { browserHistory } from 'react-router';
const styles = theme => ({
	button: {
		margin: theme.spacing.unit,
		position: 'fixed',
		bottom: 0,
		right: 10,
		margin: 3,
		opacity: 0.8,
		zIndex: 2
		// bottom: 0,
		// right: 0,
		// position: 'absolute',
		// bottom: 0,
		//
		// opacity: 0.8
	}
});

class SimpleMenu extends React.Component {
	state = {
		anchorEl: null,
		open: false,
		flatbuttonmenu: [
			{
				text: 'Select Rooms',
				route: 'rooms',
				selected: false
			},
			{
				text: 'Select Lectures',
				route: 'lectures',
				selected: false
			}
		]
	};
	handleClick = event => {
		this.setState({ anchorEl: event.currentTarget, open: true });
	};
	handleClose = () => {
		this.setState({ open: false });
	};
	handleMenuClick = (event, option) => {
		browserHistory.replace(`/${option.route}`);
	};
	render() {
		const { classes } = this.props;
		return (
			<div>
				<span>
					<Button
						fab="fab"
						color="accent"
						aria-label="add"
						aria-owns={this.state.open ? 'simple-menu' : null}
						aria-haspopup="true"
						onClick={this.handleClick}
						className={classes.button}
					>
						<AddIcon />
					</Button>
				</span>
				<Menu id="simple-menu" anchorEl={this.state.anchorEl} open={this.state.open} onClose={this.handleClose}>
					{this.state.flatbuttonmenu.map((option, index) => (
						<MenuItem
							selected={option.selected}
							key={index}
							onClick={e => {
								this.setState({ open: false });
								// console.log(option,option.route,this.state.selected);
								this.handleMenuClick(e, option);
							}}
						>
							{option.text}
						</MenuItem>
					))}
				</Menu>
			</div>
		);
	}
}

export default withStyles(styles)(SimpleMenu);
