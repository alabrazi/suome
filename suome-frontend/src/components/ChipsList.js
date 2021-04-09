import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Chip from '@material-ui/core/Chip';
import Button from '@material-ui/core/Button';
import TagFacesIcon from '@material-ui/icons/TagFaces';
const styles = theme => ({
  rootchip: {
    display: 'flex',
    justifyContent: 'center',

    padding: theme.spacing.unit / 2,
  },
  chip: {
    margin: theme.spacing.unit / 2,
  },
});

class ChipsArray extends React.Component {
  state = {
  };

  // handleDelete = data => () => {
  //   if (data.label === 'React') {
  //     alert('Why would you want to delete React?! :)'); // eslint-disable-line no-alert
  //     return;
  //   }
//   this.setState(state => {
//     const chipData = [...state.chipData];
//     const chipToDelete = chipData.indexOf(data);
//     chipData.splice(chipToDelete, 1);
//     return { chipData };
//   });
// };
  handleClick=()=>{
    alert("Filtering videos based on tags is not yet implemented")
  }



  render() {
    const { classes } = this.props;

    return (
      <div className={classes.rootchip}>
        {this.props.tags.map(data => {
          let avatar = null;

          // if (data.label === 'React') {
          //   avatar = (
          //     <Avatar>
          //       <TagFacesIcon className={classes.svgIcon} />
          //     </Avatar>
          //   );
          // }

          return (
<Button style={{width:"auto", height:"auto",padding:"0"}}>
          <Chip
            key={data}
            avatar={avatar}
            label={data}
            onClick={this.handleClick}
            className={classes.chip}
          ></Chip></Button>




          );
        })}
      </div>
    );
  }
}

ChipsArray.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ChipsArray);
