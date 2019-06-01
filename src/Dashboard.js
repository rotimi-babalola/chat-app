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

import { CTX } from './Store';

const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    margin: '50px',
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
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

  // CTX store
  const { allChats, sendChatAction, user } = React.useContext(CTX);

  const topics = Object.keys(allChats);

  // local state
  const [textValue, changeTextValue] = React.useState('');
  const [activeTopic, setActiveTopic] = React.useState(topics[0]);

  return (
    <div>
      <Paper className={classes.root} elevation={1}>
        <Typography variant="h4" component="h4">
          Chat App
        </Typography>
        <Typography component="h5" variant="h5">
          {activeTopic}
        </Typography>
        <div className={classes.flex}>
          <div className={classes.topicsWindow}>
            <List>
              {topics.map(topic => (
                <ListItem button key={topic}>
                  <ListItemText
                    primary={topic}
                    onClick={() => setActiveTopic(topic)}
                  />
                </ListItem>
              ))}
            </List>
          </div>
          <div className={classes.chatWindow}>
            {allChats[activeTopic].map((chat, index) => (
              <div className={classes.flex} key={index}>
                <Chip label={chat.from} className={classes.chip} />
                <Typography variant="subtitle1">{chat.msg}</Typography>
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
            onClick={() => {
              sendChatAction({
                msg: textValue,
                from: user,
                topic: activeTopic,
              });
              changeTextValue('');
            }}
          >
            Send
          </Button>
        </div>
      </Paper>
    </div>
  );
};

export default withStyles(styles)(Dashboard);
