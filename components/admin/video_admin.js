import { useState } from "react";
import { useRecoilState } from "recoil";
import { makeStyles } from "@material-ui/styles";
import Box from "@material-ui/core/Box";
import Link from "@material-ui/core/Link";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Typography from "@material-ui/core/Typography";
import Delete from "@material-ui/icons/Delete";
import IconButton from "@material-ui/core/IconButton";
import MusicNoteIcon from "@material-ui/icons/MusicNote";
import YouTubeIcon from '@material-ui/icons/YouTube';
import { deleteVideoState } from "./videoList_admin";
import { viewVideoState } from "./viewVideo_dialog";

const useStyles = makeStyles((theme) => ({
  videos: {
    width: 200,
    margin: theme.spacing(0.5),
  },
  title: {
    display: "-webkit-box",
    overflow: "hidden",
    "-webkit-line-clamp": 3,
    "-webkit-box-orient": "vertical",
    height: "2.2rem"
  },
}));

export default function VideoCardAdmin({ video }) {
  const [deleteVideo, setDeleteVideo] = useRecoilState(deleteVideoState);
  const [viewVideo, setViewVideo] = useRecoilState(viewVideoState);
  const [videoState, setVideoState] = useState(video);
  const [deleteState, setDeleteState] = useState(false);
  const classes = useStyles();

  const handleSongConfirm = async() => {
    await fetch(!deleteState ? `${process.env.NEXT_PUBLIC_API_ADDRESS}/videos` : null, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: videoState.id,
        songConfirm: !videoState.songConfirm,
      }),
    }).then((res) => res.json());
    //setSongConfirmState(true);
    setVideoState({
      ...videoState,
      songConfirm: !videoState.songConfirm,
    });
  };

  const handleDeleteVideo = () => {
    !deleteState ? setDeleteVideo({videoId: video.id, open: true}) : ""
    setDeleteState(true);
  }

  const handleViewVideo = () => {
    setViewVideo({videoId: videoState.id, open: true})
  }

  return (
    <Card className={classes.videos}>
      <Link
        href={`https://www.youtube.com/watch?v=${video.id}`}
        target="_blank"
        rel="noopener"
        underline="none"
      >
        <CardMedia
          component="img"
          alt={video.title}
          image={video.thumbnail.medium || ""}
          title={video.title}
        />
      </Link>
      <div className={""}>
        <CardContent style={{ backgroundColor: "" }}>
          <Typography variant="overline" className={classes.title}>
            <Box lineHeight={1}>{video.title}</Box>
          </Typography>
        </CardContent>
        <CardActions
          style={{
            backgroundColor: "",
            paddingTop: "0px",
            paddingBottom: "0px",
          }}
        >
          <IconButton
            aria-label="change to songConfirm"
            onClick={handleSongConfirm}
          >
            <MusicNoteIcon
              color={videoState.songConfirm ? "primary" : "default"}
            />
          </IconButton>
          <IconButton
            aria-label="delete to video"
            onClick={handleDeleteVideo}
          >
            <Delete color={deleteState ? "primary" : "default"} />
          </IconButton>
          <IconButton
            aria-label="delete to video"
            onClick={handleViewVideo}
          >
            <YouTubeIcon />
          </IconButton>
        </CardActions>
      </div>
    </Card>
  );
}