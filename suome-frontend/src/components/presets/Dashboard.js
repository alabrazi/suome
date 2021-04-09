export const styles = theme => ({
	rootchip: {
		display: 'flex',
		justifyContent: 'center',

		padding: theme.spacing.unit / 2,
	},
	chip: {
		margin: theme.spacing.unit / 2
	},
	smallIcon:{
		width:"35px",
		height:"48px"
	},
	removed:{
		background:"red",
	},
	root: {
		display: 'flex',
		flexWrap: 'wrap',
		justifyContent: 'center',
		overflow: 'hidden',
		backgroundColor: theme.palette.background.paper,
		flexGrow: 1
	},
	badge: {
	top: -10,
	right: -12,
	width:"20px",height:"20px",
	// The border color match the background color.
	// border: `2px solid ${
	// 	theme.palette.type === 'light' ? theme.palette.grey[200] : theme.palette.grey[900]
	// }`,
},
	gridList: {
		width: '100%',
		height: '100%',
		marginTop: theme.spacing.unit
	},
	icon: {
		color: 'rgba(255, 255, 255, 0.54)',

	},
	adminIcon: {
		color: 'red',
		width: '30px',
		height: '30px'
	},
	paper: {
		width: '100%',
		height: '100%',
		// padding:theme.spacing.unit,
		paddingRight: 4,
		paddingLeft: 16,
		paddingBottom: theme.spacing.unit,
		paddingTop: theme.spacing.unit,
		margin: theme.spacing.unit
	},
	selectedTag:{
		background:"red",
		"&:focus": {

							backgroundColor: 'red',
		},
		"&:hover": {

							backgroundColor: 'red',
		}
	},
	button:{


			width:"auto", height:"auto",padding:"0",           "&:hover": {
									textDecoration: "none",
								backgroundColor: "transparent",

								"@media (hover: none)": {
								backgroundColor: "transparent",

							}
								},
								"&:focus": {

													backgroundColor: "transparent",
								}
								}


});

export const defaultProps = {
	topics: [
		{
			_id: '5b51c9cd62e18839f1b67bf6',
			tags: ['slow', 'colorful', 'children'],
			featuredWords: [
				'drink',
				'coffee',
				'hair',
				'wake',
				'drop',
				'table',
				'line',
				'by lines',
				'desire',
				'jump',
				'look',
				'unknown',
				'morning',
				'friend',
				'talk'
			],
			likes: 1,
			title: 'This Morning',
			coverImg: 'http://i3.ytimg.com/vi/qw140Cr7IV8/maxresdefault.jpg',
			replyCount: 3
		}
	]
};
