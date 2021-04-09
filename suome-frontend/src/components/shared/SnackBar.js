//import injectTapEventPlugin from 'react-tap-event-plugin';
//injectTapEventPlugin();
import React from 'react';

import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
const styles = theme => ({
  snack:{
        position:"sticky",
        right:0,
        width:"100%"
  },
  close: {

    width: theme.spacing.unit * 4,
    height: theme.spacing.unit * 4,
    zIndex: 99999999
  }
});
function TransitionLeft(props) {
  return <Slide {...props} direction="left" />;
}
class SnackBar extends React.Component {


  render() {
    const {classes} = this.props;
    return (
      <div >
        <Snackbar className={classes.snack}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right'
          }}
          TransitionComponent= {TransitionLeft}
          open={this.props.snackopen}
          autoHideDuration={6000}
          onClose={this.props.handleSnackClose}
          ContentProps={{
            'aria-describedby': 'message-id'
          }}
          message={<span id="message-id">{this.props.snackMsg}</span>}
          action={[
            <Button key="undo" color="secondary" size="small" onClick={this.props.handleSnackClose}>
              Close
            </Button>,
            <IconButton
              key="close"
              aria-label="Close"
              color="inherit"
              className={classes.close}

              onClick={this.props.handleSnackClose}
            >
              <CloseIcon />
            </IconButton>
          ]}
        />
      </div>
    )}}
SnackBar.propTypes = {classes: PropTypes.object.isRequired};
export default withStyles(styles)(SnackBar); // export default () => {
