import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Chip from '@material-ui/core/Chip';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    margin: '50px',
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
  },
  flex: {
    display: 'flex',
    alignItems: 'center',
  },
  topicsWindow: {
    width: '30%',
    height: '300px',
    borderRight: '1px solid grey',
  },
  chatWindow: {
    width: '70%',
    height: '300px',
    padding: '20px',
  },
  chatBox: {
    width: '85%',
  },
  button: {
    width: '15%',
  },
});

const Dashboard = props => {
  const { classes } = props;
  const [textValue, changeTextValue] = React.useState('');
  return (
    <div>
      <Paper className={classes.root} elevation={1}>
        <Typography variant="h4" component="h4">
          Chat App
        </Typography>
        <Typography component="h5" variant="h5">
          Topic Placeholder
        </Typography>
        <div className={classes.flex}>
          <div className={classes.topicsWindow}>
            <List>
              {['general', 'random', 'sports'].map(topic => (
                <ListItem button key={topic}>
                  <ListItemText primary={topic} />
                </ListItem>
              ))}
            </List>
          </div>
          <div className={classes.chatWindow}>
            {[{ from: 'user', message: 'hello' }].map((chat, index) => (
              <div className={classes.flex} key={index}>
                <Chip label={chat.from} className={classes.chip} />
                <Typography variant="p">{chat.message}</Typography>
              </div>
            ))}
          </div>
        </div>
        <div className={classes.flex}>
          <TextField
            label="Send a message"
            className={classes.chatBox}
            value={textValue}
            onChange={evt => changeTextValue(evt.target.value)}
          />
          <Button
            variant="contained"
            color="primary"
            className={classes.button}
          >
            Send
          </Button>
        </div>
      </Paper>
    </div>
  );
};

export default withStyles(styles)(Dashboard);
