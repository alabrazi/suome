export const style = theme => ({
	profile: {
		textAlign: 'center'
	},
	avatar: {
		textAlign: 'center',
		maxWidth: '160px',
		width: '100%',
		height: '100%',
		margin: '0 auto',
		marginTop: theme.spacing.unit,

		paddingTop: theme.spacing.unit
	},
	description: {
		margin: '1.071rem',
		maxWidth: '600px',
		textAlign: 'center !important'
	},

	title: {
		display: 'inline-block',
		position: 'relative',
		minHeight: '32px',
		textDecoration: 'none',
		cursor: 'pointer',
		width: '200px'
	},
	badge: {
		width: '48px',
		height: '48px',
		margin: '0 auto',
		cursor: 'pointer'
	}
});
