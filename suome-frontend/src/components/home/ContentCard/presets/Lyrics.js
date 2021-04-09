export const styles = theme => ({
	root: {
		flexGrow: 1,
		zIndex: 9999999,
				marginTop: theme.spacing.unit
	},
	paper: {
		// padding: theme.spacing.unit * 2,
		textAlign: 'center',
		color: theme.palette.text.secondary,
		flexGrow: 1
	},
	relativpos: {
		position: 'relative'
	},
	iconsLeft: {
		position: 'absolute',
		top: -24,
		left: 0,
		float: 'left',
		cursor: 'pointer'
	},
	iconsRight: {
		position: 'absolute',
		top: -24,
		right: 0,
		float: 'right',
		cursor: 'pointer'
	},
	icon: {
		margin: '0 1rem',
		fontSize: 32,
		textAlign: 'center',
		cursor: 'pointer'
	},
	text: {
		padding: '1rem'
	},
	progress: {
		marginTop: theme.spacing.unit
	},
	contentArea: {
		display: 'flex',
		marginLeft: '24px',
		marginRight: '24px',
		justifyContent: 'center',
		alignItems: 'center',
		height: '3rem'
	},
	flexcenter: {
		display: 'flex',
		justifyContent: 'center'
	}
});

export const defaultProps = {
	content: [{ fi: '...', en: '...' }]
};
