import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import Paper from 'material-ui/Paper';

import config from '../config.json';

const styles = theme => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    margin: '0px 30px',
  },
  button: {
    margin: theme.spacing.unit,
    float: 'left',
  },
  paper: theme.mixins.gutters({
    padding: '8px 0',
    margin: '0px 10px',
    borderRadius: '40px',
    float: 'left',
  }),
});

function Header(props) {
  const { classes, scores, toggleScore, toggleMode, gameMode } = props;
  return (
    <div className={classes.root}>
      <AppBar position="static" color="default">
        <Toolbar>
          <div style={{ margin: '0px auto', clear: 'both' }}>
            {toggleScore ? (
              <Button variant="raised" color="primary" className={classes.button} onClick={() => toggleScore()}>
                Toggle Score
              </Button>
            ) : (
              ''
            )}
            <Paper className={classes.paper} elevation={4}>
              {scores ? (
                <Typography variant="headline" component="h3">
                  Player 1 : <span style={{ color: 'blue' }}>{scores[0]}</span>
                  <span style={{ color: 'gray', margin: '0px 10px' }}>{gameMode.name}</span>
                  Player 2 : <span style={{ color: 'blue' }}>{scores[1]}</span>
                </Typography>
              ) : (
                <Typography variant="headline" component="h3">
                  <span style={{ color: 'gray', margin: '0px 10px' }}>{gameMode.name}</span>
                </Typography>
              )}
            </Paper>
            {toggleMode ? (
              <Button variant="raised" color="primary" className={classes.button} onClick={() => toggleMode()}>
                Toggle Mode
              </Button>
            ) : (
              ''
            )}
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
}

Header.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Header);
