import green from '@material-ui/core/colors/green';
export const styles = theme => ({
	root: {
		flexGrow: 1
	},
	paper: {
		padding: theme.spacing.unit * 2,
		textAlign: 'center',
		color: theme.palette.text.secondary,
		height: '100%'
	},
	Tabsroot: {
		backgroundColor: theme.palette.background.paper,
		width: '100%',
		position: 'relative',
		minHeight: 200
	},
	fab: {
		position: 'fixed',
		bottom: theme.spacing.unit * 2,
		right: theme.spacing.unit * 0.5,
		opacity: 0.8
	},
	fabGreen: {
		color: theme.palette.common.white,
		backgroundColor: green[500]
	},
	textField: {
		width: '97%'
	},
	button: {
		marginRight: theme.spacing.unit
	},
	askcontainer: {
		marginBottom: theme.spacing.unit * 3
	}
});
