import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { withStyles } from 'material-ui/styles';
import Grid from 'material-ui/Grid';
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';

const styles = theme => ({
  root: {
    flexGrow: 1,
    padding: '0px 10px',
  },
  paper: {
    textAlign: 'center',
    padding: '40px 40px',
    cursor: 'pointer',
  },
  control: {
    padding: theme.spacing.unit * 2,
  },
});

class SelectGame extends Component {
  state = {
    spacing: '16',
  };

  handleChange = key => (event, value) => {
    this.setState({
      [key]: value,
    });
  };

  render() {
    const { classes,allGamesConfig } = this.props;
    const { spacing } = this.state;
    return (
      <div className={classes.root}>
        <Typography variant="display1">Select Game</Typography>
        <Grid container className={classes.root}>
          <Grid item xs={12}>
            <Grid container className={classes.demo} justify="center" spacing={Number(spacing)}>
              {allGamesConfig.map(game => (
                <Grid key={game.id} item onClick={() => this.props.nextPage('selectedGameId', game.id)}>
                  <Paper className={classes.paper}>
                    <Typography variant="headline" component="h3">
                      {game.name}
                    </Typography>
                  </Paper>
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
      </div>
    );
  }
}

SelectGame.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SelectGame);
