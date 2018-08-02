import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { withStyles } from 'material-ui/styles';
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';

import brace from 'brace';
import AceEditor from 'react-ace';

import 'brace/mode/json';
import 'brace/theme/github';

const styles = theme => ({
  root: {
    flexGrow: 1,
    padding: '0px 10px',
  },
  button: {
    margin: theme.spacing.unit,
  },
});

class EditConfig extends Component {
  constructor(props) {
    super();
    this.state = {
      errors: [],
      config: JSON.stringify(props.selectedGame['editableConfig'], null, '\t'),
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleValidation = this.handleValidation.bind(this);
    this.handleSave = this.handleSave.bind(this);
  }
  handleChange(newConfig) {
    this.setState({ config: newConfig });
  }
  handleValidation(messages) {
    const errors = messages.filter(msg => (msg.type === 'error' ? true : false));
    this.setState({ errors: errors });
  }
  handleSave() {
    if (this.state.errors.length > 0) {
      alert('Invalid Json');
      return;
    }
    this.props.nextPage('selectedGameConfig', JSON.parse(this.state.config));
  }
  render() {
    const { classes, selectedGame } = this.props;
    const { config } = this.state;

    return (
      <div className={classes.root}>
        <Typography variant="display1">
          <b>{selectedGame.name} :</b> Edit Configuration
        </Typography>
        <AceEditor
          mode="json"
          theme="github"
          name="configEditor"
          width={'100%'}
          onChange={this.handleChange}
          onValidate={this.handleValidation}
          fontSize={14}
          showPrintMargin={true}
          showGutter={true}
          highlightActiveLine={true}
          value={config}
          setOptions={{
            enableBasicAutocompletion: false,
            enableLiveAutocompletion: false,
            enableSnippets: false,
            showLineNumbers: true,
            tabSize: 2,
          }}
        />
        <Button variant="raised" color="primary" className={classes.button} onClick={this.handleSave}>
          Next
        </Button>
      </div>
    );
  }
}

export default withStyles(styles)(EditConfig);
