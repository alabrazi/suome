//import injectTapEventPlugin from 'react-tap-event-plugin';
//injectTapEventPlugin();
import React from 'react';

import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
const styles = theme => (
  {
    "back": {
      "position": "fixed",
      "padding": "0",
      "margin": "0",
      "top": "0",
      "left": "0",
      "width": "100%",
      "height": "100%",
      "background": "white",
      "animationName": "backdiv",
      "animationDuration": "1s",
      animationIterationCount:"infinite",
    },
    "heart": {
      "position": "absolute",
      "margin": "auto",
      "top": "0",
      "right": "0",
      "bottom": "0",
      "left": "0",
      "backgroundColor": "red",
      "height": "50px",
      "width": "50px",
      "transform": "rotate(-45deg)",
      "animationName": "beat",
      "animationDuration": "1s",
      animationIterationCount:"infinite",
    },
    "heart_after": {
            "margin": "auto",
      "backgroundColor": "red",
      "content": "\"\"",
      "borderRadius": "50%",
      "position": "absolute",
      "width": "50px",
      "height": "50px",
      "top": "-25px",
      "left": "25px",
      "right": "0",
      "bottom": "0",
      "animationName": "beat",
      "animationDuration": "1s",
      animationIterationCount:"infinite",
    },
    "heart_before": {
        "margin": "auto",
      "backgroundColor": "red",
      "content": "\"\"",
      "borderRadius": "50%",
      "position": "absolute",
      "width": "50px",
      "height": "50px",
      "top": "-25px",
      "left": "-25px",
      right:"0px",
      bottom:"0px",
      "animationName": "beat",
      "animationDuration": "1s",
      animationIterationCount:"infinite"
    }
  }

);

class Loading extends React.Component {
  state = {
  };
  Animate(){
    let styleSheet = document.styleSheets[0];

    let animationName = "backdiv";

    let keyframesOne =
    `@-webkit-keyframes ${animationName} {

        50% {background: #ffe6f2}

    }`;
    styleSheet.insertRule(keyframesOne, styleSheet.cssRules.length);
    animationName = "beat";
    let keyframesTwo =
    `@-webkit-keyframes ${animationName} {
        0% {-webkit-transform:scale(1) rotate(-45deg)}
        50% {-webkit-transform:scale(0.6) rotate(-45deg)}
    }`;
    styleSheet.insertRule(keyframesTwo, styleSheet.cssRules.length);
  }
  handleChangeBodyState = (param) => {
    this.setState(() => ({body: param}));
  }
  render() {
    const {classes} = this.props;
    return (
<div>
<div className={classes.back}></div>
<div className={classes.heart_before}></div>
<div className={classes.heart}></div>
<div className={classes.heart_after}></div>
{this.Animate()}
</div>
    )}}

Loading.propTypes = {classes: PropTypes.object.isRequired};
export default withStyles(styles)(Loading); // export default () => {
