import React, { useState } from 'react';
import {
  Avatar,
  Drawer, Grid, IconButton, ImageList, ImageListItem, Paper, Typography,
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import { KeyboardArrowLeftRounded, KeyboardArrowRightRounded } from '@mui/icons-material';
import { ChatTab } from 'src/components/ChatSidebar/ChatTab';
import { UserPropTypes } from 'src/redux/reducers/authReducer';
// import PropTypes from 'prop-types';

const useStyles = makeStyles((theme) => ({
  drawer: {
    width: theme.drawer.social,
    flexShrink: 0,
  },
  drawerPaper: {
    width: theme.drawer.social,
    overflowY: 'visible',
    boxShadow: '-3px 0px 12px #0b7ea24d',
    visibility: 'visible !important',
    height: 'calc(100% - 130px)',
    top: '130px',
    borderLeft: `1px solid ${theme.palette.grey.light1}`,
    borderTop: `1px solid ${theme.palette.grey.light1}`,
    backgroundColor: theme.palette.grey.light2,
  },
  sideBarContainerFirst: {
    padding: '55px 29px',
  },
  sideBarContainer: {
    padding: '20px 29px',
  },
  drawerPull: {
    left: '-50px',
    top: '-1px',
    width: '50px',
    position: 'absolute',
    border: `1px solid ${theme.palette.grey.light1}`,
    borderRadius: '20px 0 0 20px',
    borderRight: 'unset',
    visibility: 'visible',
    boxShadow: '-3px 8px 12px #0b7ea24d',
    '&.closed': {
      boxShadow: '-3px 8px 12px #0b7ea24d, inset -6px 0px 8px #0b7ea24d',
    },
  },
  openButton: {
    borderRadius: '20px 0 0 20px',
    '&:hover, &:focus': {
      boxShadow: `-3px 8px 12px ${theme.palette.secondary.main}`,
      backgroundColor: theme.palette.white.main,
    },
  },
  openIcon: {
    color: theme.palette.primary.main,
  },
  avatar: {
    border: `1px solid ${theme.palette.primary.main}`,
    width: '50px',
    height: '50px',
    padding: '0',
    '&.author': {
      width: '60px',
      height: '60px',
      border: `1px solid ${theme.palette.grey.dark1}`,
    },
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
  imageList: {
    flexWrap: 'nowrap',
    // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
    transform: 'translateZ(0)',
    width: '370px',
    padding: '15px 0',
    minHeight: '100px',
    backgroundColor: theme.palette.grey.light2,
    margin: '0 15px !important',
    overflowY: 'hidden',
  },
  imageItem: {
    height: '80px !important',
  },
  chatHeader: {
    backgroundColor: theme.palette.white.main,
    minHeight: '51px',
    borderRadius: '0',
    zIndex: '1',
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
}));

export const ChatSidebar = ({ teamMembers }) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  return (
    <Drawer
      className={classes.drawer}
      variant="persistent"
      classes={{
        paper: classes.drawerPaper,
      }}
      open={open}
      anchor="right"
    >
      <Paper className={classes.drawerPull}>
        <IconButton onClick={() => setOpen(!open)} className={classes.openButton}>
          {
            open
              ? <KeyboardArrowRightRounded className={classes.openIcon} />
              : <KeyboardArrowLeftRounded className={classes.openIcon} />
          }

        </IconButton>
      </Paper>
      <Paper className={classes.chatHeader} />
      <ImageList className={classes.imageList} cols={{ xs: 1, md: 2, xl: 2.5 }}>
        {
          teamMembers && teamMembers && teamMembers.map((user) => (
            <ImageListItem
              key={user.id}
              className={
                // eslint-disable-next-line eqeqeq
                `${classes.imageItem} imageHeight`
              }
            >
              <Grid
                style={{ width: '62px' }}
                container
                direction="column"
                justifyContent="center"
                alignItems="center"
                key={user.id}
              >
                <Avatar
                  className={classes.avatar}
                  src={user.lms_avatar}
                  alt={`Profile photo for ${user.first_name} ${user.last_name}`}
                  title={`Profile photo for ${user.first_name} ${user.last_name}`}
                />
                <Typography className={classes.avatarName}>
                  {user.first_name}
                </Typography>
              </Grid>
            </ImageListItem>
          ))
        }
      </ImageList>
      <ChatTab />
    </Drawer>
  );
};

// ChatSidebarComponent.propTypes = {
//   teamMembers: PropTypes.arrayOf(UserPropTypes).isRequired,
// };
//
// ChatSidebarComponent.defaultProps = {};
//
// const mapStateToProps = (state) => ({
//   teamMembers: state.user.team_members || [],
// });
//
// // const mapDispatchToProps = (dispatch) => ({
// // });
//
// export const ChatSidebar = connect(mapStateToProps)(ChatSidebarComponent);
