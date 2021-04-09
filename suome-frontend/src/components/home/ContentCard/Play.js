//import injectTapEventPlugin from 'react-tap-event-plugin';
//injectTapEventPlugin();
import React from 'react';
import {Helmet} from "react-helmet";
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import ResponsiveEmbed from 'react-responsive-embed';
import VideoRecorder from './VideoRecorder';
import Camera from './Camera';
const styles = theme => ({
  root: {
    flexGrow: 1,

  },
    avatar:{
      WebkitFilter: "grayscale(100%)",
  filter: "grayscale(100%)"
    }
});

class Play extends React.Component {
  state = {
  };

  handleChangeBodyState = (param) => {
    this.setState(() => ({body: param}));
  }
  render() {
    const {classes} = this.props;
    return (
    <Grid container className={classes.root}>
      <Helmet >
        <script src='//cameratag.com/api/v12/js/cameratag.min.js' type='text/javascript'></script>
        <link rel='stylesheet' href='//cameratag.com/static/12/cameratag.css'></link>
        <link rel="stylesheet" href="//assets-cdn.ziggeo.com/v1-stable/ziggeo.css" />
<script src="//assets-cdn.ziggeo.com/v1-stable/ziggeo.js"></script>
<script>ZiggeoApi.token = "r151cf764a53f89063db0656e6769bb0";</script>


</Helmet>
      <Grid xs={12} item>
        <ResponsiveEmbed src='https://eu-west-1.ziggeo.io/h/lalala' allowFullScreen />
        <br/>
        						<videowall data-app-id='a-c01e7650-7ee1-0136-0d42-0adeb7a592e0' id='myVideoWall' data-show-top-pagnation='false' data-thumbnail-height='150' data-include-name='true' data-include-description='true' ></videowall>
        						<photobooth data-app-id='a-c01e7650-7ee1-0136-0d42-0adeb7a592e0' id='Play' data-width='400' data-height='400' data-force-full-frame='true' ></photobooth>
  <br/>  <br/>
                    <Camera/>
                    <br/>

                    <VideoRecorder/>
      </Grid>
    </Grid>
    )}}

Play.propTypes = {classes: PropTypes.object.isRequired};
export default withStyles(styles)(Play); // export default () => {
