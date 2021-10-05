import React, { useRef } from 'react';
import {
  Attachment,
  messageHasReactions,
  MessageOptions,
  MessageRepliesCountButton,
  MessageStatus,
  MessageText,
  MessageTimestamp,
  ReactionSelector,
  SimpleReactionsList,
  useMessageContext,
} from 'stream-chat-react';
import _find from 'lodash/find';
import { makeStyles } from '@mui/styles';
import { Avatar, Grid, Paper, Typography } from '@mui/material';

import './message.css';
import clsx from 'clsx';
import { UserPropTypes } from 'redux/reducers/authReducer';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const useStyles = makeStyles((theme) => ({
  avatar: {
    width: '50px',
    height: '50px',
  },
  avatarName: {
    ...theme.typography.caption,
    width: '60px',
    minHeight: '38px',
    textAlign: 'center',
    fontSize: '0.75rem',
    textTransform: 'capitalize',
    color: theme.palette.text.light,
  },
  messageContainer: {
    '&.attachment': {
      width: '100%',
      borderRadius: '10px',
      boxShadow: '2px 1px 8px #00000026',
      padding: '0 5px',
      marginTop: '5px',
    },
  },
  messageDetail: {
    fontSize: '0.625rem',
    color: theme.palette.grey.dark1,
    marginTop: '5px',
  },
}));

export const CustomMessageComponent = ({ teamMembers }) => {
  const classes = useStyles();
  const {
    isReactionEnabled,
    message,
    reactionSelectorRef,
    showDetailedReactions,
    isMyMessage,
  } = useMessageContext();

  const messageWrapperRef = useRef(null);

  const hasReactions = messageHasReactions(message);

  const messageUser = _find(teamMembers, { uuid: message.user.id }) || {};

  return (
    <Grid container justifyContent="space-between">
      {
        isMyMessage() && (
          <Grid item xs={9} style={{ flex: 1 }}>
            <Paper className={classes.messageContainer}>
              <MessageText />
            </Paper>
            <Paper className={clsx(classes.messageContainer, 'attachment')}>
              {message.attachments && <Attachment attachments={message.attachments} />}
            </Paper>
            {/*<MessageStatus />*/}
            {/*<MessageRepliesCountButton reply_count={message.reply_count} />*/}
            <Typography className={classes.messageDetail}>
              <MessageTimestamp />
            </Typography>
          </Grid>
        )
      }
      <Grid
        item
        style={{ width: '62px' }}
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
        xs={2}
      >
        <Avatar
          className={classes.avatar}
          src={messageUser.lms_avatar}
          alt={`Profile photo for ${messageUser.first_name} ${messageUser.last_name}`}
          title={`Profile photo for ${messageUser.first_name} ${messageUser.last_name}`}
        />
        <Typography className={classes.avatarName}>
          {messageUser.first_name}
        </Typography>
      </Grid>
      {
        !isMyMessage() && (
          <Grid item xs={9} style={{ flex: 1 }}>
            <Paper className={classes.messageContainer}>
              <MessageText />
            </Paper>
            <Paper className={clsx(classes.messageContainer, 'attachment')}>
              {message.attachments && <Attachment attachments={message.attachments} />}
            </Paper>
            {/*<MessageStatus />*/}
            {/*<MessageRepliesCountButton reply_count={message.reply_count} />*/}
            <Typography className={classes.messageDetail}>
              <MessageTimestamp />
            </Typography>
          </Grid>
        )
      }
    </Grid>
  );
};

CustomMessageComponent.propTypes = {
  teamMembers: PropTypes.arrayOf(UserPropTypes).isRequired,
};

CustomMessageComponent.defaultProps = {};

const mapStateToProps = (state) => ({
  teamMembers: state.user.team_members,
});

// const mapDispatchToProps = (dispatch) => ({
// });

export const CustomMessage = connect(mapStateToProps)(CustomMessageComponent);
