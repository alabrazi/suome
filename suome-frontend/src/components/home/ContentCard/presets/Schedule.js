export const styles = theme => ({
	root: {
		display: 'flex',
		flexWrap: 'wrap',
		justifyContent: 'space-around',
		overflow: 'hidden',
		backgroundColor: theme.palette.background.paper
	},
	gridList: {
		width: '100%',
		height: 180
	},
	icon: {
		color: 'rgba(255, 255, 255, 0.54)'
	}
});

export const defaultProps = {
	topics: [
		{
			_id: '5b51c9cd62e18839f1b67bf6',
			tags: ['song', 'tag2'],
			featuredWords: ['world', 'sky', 'cloud'],
			likes: 1,
			title: 'if you want so',
			coverImg: 'http://i3.ytimg.com/vi/qw140Cr7IV8/maxresdefault.jpg',
			replyCount: 3
		},
		{
			_id: '5b56072cff643756f1ff05ac',
			tags: ['sun', 'punny'],
			featuredWords: [],
			likes: 0,
			title: 'here is the second topic title',
			coverImg: 'http://i3.ytimg.com/vi/qw140Cr7IV8/maxresdefault.jpg',
			replyCount: 0
		},
		{
			_id: '5b56072cff643756f1ff05acx',
			tags: ['sun', 'punny'],
			featuredWords: [],
			likes: 0,
			title: 'here is the second topic title',
			coverImg: 'http://i3.ytimg.com/vi/qw140Cr7IV8/maxresdefault.jpg',
			replyCount: 0
		},
		{
			_id: '5b56072cff643756f1ff05adc',
			tags: ['sun', 'punny'],
			featuredWords: [],
			likes: 0,
			title: 'here is the second topic title',
			coverImg: 'http://i3.ytimg.com/vi/qw140Cr7IV8/maxresdefault.jpg',
			replyCount: 0
		}
	]
};
