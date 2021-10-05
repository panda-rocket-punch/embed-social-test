import React, { useEffect, useState } from 'react';
import { makeStyles, useTheme } from '@mui/material/styles';
import { StreamChat } from 'stream-chat';
import {
  Chat,
  Channel,
  Window,
  ChannelHeader,
  MessageList,
  MessageInput,
  Thread,
} from 'stream-chat-react';
import { connect } from 'react-redux';
import { UserPropTypes } from 'redux/reducers/authReducer';
import 'stream-chat-react/dist/css/index.css';
import 'components/ChatSidebar/GetStreamComponents/chat.css'
import { CustomMessage } from 'components/ChatSidebar/GetStreamComponents/Message'
import { TeamPropTypes } from 'redux/reducers/teamReducer';
import PropTypes from 'prop-types';
import isEmpty from 'lodash/isEmpty';

const client = StreamChat.getInstance('cs8e8cyk3d6j');

export const ChatTabComponent = ({ currentUser, team, teamMembers }) => {
  const [clientReady, setClientReady] = useState(false);
  const [channel, setChannel] = useState({});
  const theme = useTheme();
  const customStyles = {
    '--primary-color': theme.palette.primary.main,
    '--second-font': 'inter',
  };

  useEffect(() => {
    const setupClient = async () => {
      try {
        await client.connectUser({
          id: String(currentUser.uuid),
        },
        currentUser.stream_token);

        setClientReady(true);
      } catch (err) {}
    };

    setupClient();
    return () => {
      setClientReady(false);
      setChannel({});
      client.disconnectUser();
    };
  }, [currentUser]);

  useEffect(() => {
    if (teamMembers.length > 0) {
      const getChannel = client.getChannelById(
        'messaging',
        team.get_stream_channel_id,
        { members: teamMembers.map((teamMember) => teamMember.uuid)},
      );
      setChannel(getChannel);
    }
  }, [teamMembers]);

  if (!clientReady || isEmpty(channel)) return null;

  return (
    <Chat client={client} customStyles={customStyles}>
      <Channel channel={channel}>
        <Window>
          <ChannelHeader />
          <MessageList Message={CustomMessage} />
          <MessageInput />
        </Window>
        <Thread />
      </Channel>
    </Chat>
  );
};

ChatTabComponent.propTypes = {
  currentUser: UserPropTypes.isRequired,
  team: TeamPropTypes.isRequired,
  teamMembers: PropTypes.arrayOf(UserPropTypes).isRequired,
};

ChatTabComponent.defaultProps = {};

const mapStateToProps = (state) => ({
  currentUser: state.auth.user || {},
  team: state.team.current,
  teamMembers: state.user.team_members || [],
});

// const mapDispatchToProps = (dispatch) => ({
// });

export const ChatTab = connect(mapStateToProps)(ChatTabComponent);
