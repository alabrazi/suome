import grey from '@material-ui/core/colors/grey';
export const styles = theme => ({
	root: {
		width: '100%',
		padding: theme.spacing.unit * 0.1
	},

	heading: {
		fontSize: theme.typography.pxToRem(15),
		fontWeight: theme.typography.fontWeightRegular
	},
	// list:{
	//   paddingLeft:4,
	//   paddingRight:4,
	// },
	questionListItem: {
		background: grey[200]
	},
	nested: {
		paddingLeft: theme.spacing.unit * 4,
		minHeight: '136px',
		// marginTop: theme.spacing.unit * 2,
		// marginBottom:theme.spacing.unit,
		background: grey[200]
	},
	nestedbutton: {
		paddingRight: theme.spacing.unit * 8,
		minHeight: '34px',
		marginTop: theme.spacing.unit,
		marginBottom: theme.spacing.unit * 4
	},
	nestedPadding: {
		paddingLeft: theme.spacing.unit * 8
		// "&:hover": {
		//   textDecoration: "none",
		//   backgroundColor: grey[200],
		//   // Reset on touch devices, it doesn't add specificity
		//   "@media (hover: none)": {
		//     backgroundColor: "transparent"
		//   }
		// }
	},
	rightIcon: {
		marginLeft: theme.spacing.unit
	},
	iconSmall: {
		fontSize: 20,
		width: '30px',
		height: '30px',
		background: grey[200]
	},
	button: {
		background: grey[200]
	},
	textField: {
		width: '100%'
	},
	nestedclose: {
		minHeight: '30px',
		background: grey[200]
	}
});

export const defaultProps = {
	isQuestionOwner: true,
	isSubreply: true,
	topic: {
		tags: ['song', 'tag2'],
		featuredWords: ['world', 'sky', 'cloud'],
		likes: 1,
		replies: [
			{
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
			},
			{
				subReplies: [],
				votes: 0,
				_id: '5b51febcff643756f1ff05a7',
				content: 'replies to topic from react',
				owner: null,
				parentTopic: '5b51c9cd62e18839f1b67bf6',
				createdAt: '2018-07-20T15:24:44.621Z',
				updatedAt: '2018-07-20T15:24:44.621Z',
				__v: 0
			},
			{
				subReplies: [],
				votes: 0,
				_id: '5b5605aeff643756f1ff05ab',
				content: 'This is second reply',
				owner: {
					_id: '5b51c5d72618b8c3eebf1bf5',
					facebookId: '1866460166707827',
					avatar: 'http://graph.facebook.com/1866460166707827/picture',
					name: 'Ala Brazi',
					username: 'alabrazi'
				},
				parentTopic: '5b51c9cd62e18839f1b67bf6',
				createdAt: '2018-07-23T16:43:26.032Z',
				updatedAt: '2018-07-23T16:43:26.032Z',
				__v: 0
			},
			{
				subReplies: [],
				votes: 0,
				_id: '5b560757ff643756f1ff05b0',
				content: 'This is third reply',
				owner: {
					_id: '5b51c5d72618b8c3eebf1bf5',
					facebookId: '1866460166707827',
					avatar: 'http://graph.facebook.com/1866460166707827/picture',
					name: 'Ala Brazi',
					username: 'alabrazi'
				},
				parentTopic: '5b51c9cd62e18839f1b67bf6',
				createdAt: '2018-07-23T16:50:31.042Z',
				updatedAt: '2018-07-23T16:50:31.042Z',
				__v: 0
			}
		],
		_id: '5b51c9cd62e18839f1b67bf6',
		title: 'if you want so',
		type: 'song',
		source: 'https://youtu.be/Sg32nIhcKrw',
		description: 'This song teach you basic words about love...',
		coverImg: 'http://i3.ytimg.com/vi/Sg32nIhcKrw/maxresdefault.jpg',
		content: [
			{
				fi: 'finnish1',
				en: 'english1'
			},
			{
				fi: 'finnish2',
				en: 'english2'
			}
		],
		owner: {
			_id: '5b51c5d72618b8c3eebf1bf5',
			facebookId: '1866460166707827',
			avatar: 'http://graph.facebook.com/1866460166707827/picture',
			name: 'Ala Brazi',
			username: 'alabrazi'
		},
		createdAt: '2018-07-20T11:38:53.953Z',
		updatedAt: '2018-07-20T11:38:53.953Z',
		__v: 0
	}
};
