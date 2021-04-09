import grey from '@material-ui/core/colors/grey';
export const styles = theme => ({
	root: {
		width: '100%',
		padding: theme.spacing.unit
	},
	subReplyList: {
		marginLeft: theme.spacing.unit * 3
	},

	heading: {
		fontSize: theme.typography.pxToRem(15),
		fontWeight: theme.typography.fontWeightRegular
	},
	questionListItem: {
		background: grey[200]
	},
	nested: {
		paddingLeft: theme.spacing.unit * 4,
		minHeight: '136px',
		background: grey[200]
	},
	nestedPadding: {
		paddingLeft: theme.spacing.unit * 8
	},
	bottomActions: {
		paddingBottom: theme.spacing.unit * 8,
		minHeight: '44px',
		// marginTop: theme.spacing.unit,

		background: grey[200]
	},
	rightIcon: {
		marginLeft: theme.spacing.unit
	},
	iconSmall: {
		fontSize: 20,
		width: '30px',
		height: '30px'
	},
	button: {
		margin: theme.spacing.unit * 0.1
	},
	textField: {
		width: '100%'
	},
	nestedclose: {
		minHeight: '30px',
		background: grey[200]
	},
	expandIconButton: {
		margin: '0 auto',
		background: grey[200],
		marginTop: '-50px',
		'&:hover': {
			textDecoration: 'none',
			backgroundColor: grey[200],
			'@media (hover: none)': {
				backgroundColor: 'grey[200]'
			}
		}
	}
});

export const defaultProps = {
	reply: {
		subReplies: ['5b51ce6f62e18839f1b67c04'],
		votes: 1,
		_id: '5b51ccb862e18839f1b67bfd',
		content: 'This is first reply',
		owner: {
			_id: '5b51c5d72618b8c3eebf1bf5',
			facebookId: '1866460166707827',
			avatar: 'http://graph.facebook.com/1866460166707827/picture',
			name: 'Ala Brazi',
			username: 'alabrazi'
		},
		parentTopic: '5b51c9cd62e18839f1b67bf6',
		createdAt: '2018-07-20T11:51:20.597Z',
		updatedAt: '2018-07-20T11:51:20.597Z',
		__v: 0
	}
};
