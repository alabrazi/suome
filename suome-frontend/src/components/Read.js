//import injectTapEventPlugin from 'react-tap-event-plugin';
//injectTapEventPlugin();
import React from 'react';
import ReactMarkdown from 'react-markdown';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

import cyan from '@material-ui/core/colors/cyan';

const styles = theme => ({
  root: {
    flexGrow: 1,
    background:theme.palette.primary["A400"],
    color:cyan[900]
  },
  image:{
        width:"100%"
  }
});

class Read extends React.Component {
  state = {
  };
  render() {
    const {classes} = this.props;
    return (
    <Grid container className={classes.root}>
      <Grid xs={12} item>
        <ReactMarkdown>
{this.props.topic.study}

        </ReactMarkdown>
      </Grid>
    </Grid>
    )}}

Read.propTypes = {classes: PropTypes.object.isRequired};
export default withStyles(styles)(Read); // export default () => {
