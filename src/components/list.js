import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Card, { CardContent, CardMedia } from 'material-ui/Card';
import Typography from 'material-ui/Typography';

const styles = {
  card: {
    maxWidth: 500,
    margin: '8px',
  },
  media: {
    height: 150,
  },
};

function VideoCard(props) {
  const { classes, handleSelectVideo, videos } = props;

  return (
    <div>
      {/* {videos.map((video, index) => {
        return (
          <Card
            key={index}
            className={classes.card}
            onClick={() => {
              handleSelectVideo(video);
            }}
          >
            <CardMedia
              className={classes.media}
              image="https://img.talkandroid.com/uploads/2016/06/youtube_play_button_big.jpg"
              title="Contemplative Reptile"
            />
            <CardContent>
              <Typography component="h3">{video.title}</Typography>
            </CardContent>
          </Card>
        );
      })} */}
    </div>
  );
}

VideoCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(VideoCard);
