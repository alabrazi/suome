//import injectTapEventPlugin from 'react-tap-event-plugin';
//injectTapEventPlugin();
import React from 'react';
import ReactPlayer from 'react-player';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import cyan from '@material-ui/core/colors/cyan';
import Header from '../components/shared/Header/Header'

import Typography from '@material-ui/core/Typography';
const styles = theme => ({
  root: {
    flexGrow: 1,
    color:cyan[50]
  },
typography:{
  margin:theme.spacing.unit
},paper:{
  padding:theme.spacing.unit,
  height:"100%",
  margin:theme.spacing.unit
}
});

class About extends React.Component {
  state = {
  };

  handleChangeBodyState = (param) => {
    this.setState(() => ({body: param}));
  }
  ref = player => {
    this.player = player;
  };
  render() {
    const {classes} = this.props;
    return (

    <Grid container className={classes.root} alignItems="center" justify="center">
      <Header isBackButton = {true}/>


        <Grid xs={12} item>
          <Paper className={classes.paper}        >
            <ReactPlayer
              ref={this.ref}
              url='https://www.youtube.com/watch?v=HTbcnldRuWo'
              config={{
                youtube: {
                  playerVars: {
                    showinfo: 0
                  }
                },
                facebook: {
                  appId: '12345'
                }
              }}
              width="100%"
              height="17rem"
              className={classes.video}
            />
          <Typography className={classes.typography}        >
Learning a foreign language is hard, learning alone is even harder. Learners  feel unmotivated, lonely and helpless when they learn by themselves.There are so many scattered random materials for learning languages that are old and boring. We want to make learning process digitally more fun and social. Our mission to make fireworks in your brain when using our platform. We want to make it addictive."suomea.online" is an online platform to extend, enrich, support and modernize Finnish language learning. Suomea.online is centered around online media and continuous fun learning. We think that music is the common language of humans and good songs and music resonate in the mind. They are liked by wide spectrum of different people. This is a wellbeing product that, in addition to songs, uses series of cartoons, comics and other videos that convey stories and we love to learn from stories. These high quality learning sources in the internet are like treasure for language learners  when they are  filtered out and served properly in convenient platform to suite learners needs.
          </Typography>
                </Paper>
        </Grid>


    </Grid>
    )}}

About.propTypes = {classes: PropTypes.object.isRequired};
export default withStyles(styles)(About); // export default () => {
