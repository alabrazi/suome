export const style = theme => ({
	appBar: {
		position: 'relative'
	},
	flex: {
		flex: 1
	},
	root: {
		flexGrow: 1
	},
	form: {
		height: '100%',
		width: '100%',
		color: theme.palette.common.white,
		padding: theme.spacing.unit * 2
	},
	loginbox: {
		background: theme.palette.primary.main,
		width: '250px',
		height: '150px',
		transform: 'translate3d(0, -60px, 0)'
	},
	icons: {
		color: theme.palette.common.white
	},
	disabled: {
		opacity: 0.2
	},
	divider: {
		textAlign: 'center',
		color: theme.palette.common.black
	},
	bottombutton: {
		position: 'absolute',
		bottom: 0,
		margin: '0 auto'
	},
	textField: {
		marginLeft: theme.spacing.unit,
		marginRight: theme.spacing.unit,
		width: 300
	},
	close: {
		width: theme.spacing.unit * 4,
		height: theme.spacing.unit * 4,
		zIndex: 99999999
	}
});
