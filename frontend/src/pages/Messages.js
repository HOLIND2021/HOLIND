import React, { Component } from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';

class Messages extends Component {
    state = {
      contactDisplayed: null
    }
  
    componentDidMount() {
      // what to do if component was mounted??
    }

    MessagesList() {

      let message = <ListItemButton alignItems="flex-start" onClick={() => {
        
        this.setState({contactDisplayed: "hi"});
            }}>
            
            <ListItemText
              primary="Hello there"
              secondary={
                <React.Fragment>
                  <Typography
                    sx={{ display: 'inline' }}
                    component="span"
                    variant="body2"
                    color="text.primary"
                  >
                    Kevin Lu
                  </Typography>
                  {" — Hi how are you"}
                </React.Fragment>
              }
            />
            <Divider variant="inset" component="li" />
          </ListItemButton>
      let message2 = <ListItemButton alignItems="flex-start" onClick={() => {
        
        this.setState({contactDisplayed: "adsfasd"});
            }}>
            
            <ListItemText
              primary="Hello there"
              secondary={
                <React.Fragment>
                  <Typography
                    sx={{ display: 'inline' }}
                    component="span"
                    variant="body2"
                    color="text.primary"
                  >
                    Jackson Lei
                  </Typography>
                  {" — Finish this task please"}
                </React.Fragment>
              }
            />
            <Divider variant="inset" component="li" />
          </ListItemButton>
      let messages = [message, message2]

      return messages;

    }
  
  
    render() {
      
      return (
        <table>
          <tr>
            <td>

              <React.Fragment>
              <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>

                  {this.MessagesList()}
      
              </List>
    
              </React.Fragment>

            </td>

            <td>
              {this.state.contactDisplayed}
            
            </td>
          </tr>
        </table>
  
      );
    }
  }
  
  export default Messages;
  


