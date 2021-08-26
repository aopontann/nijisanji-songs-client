import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import Box from "@material-ui/core/Box";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Collapse from "@material-ui/core/Collapse";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import Chip from "@material-ui/core/Chip";
import { red } from "@material-ui/core/colors";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ShareIcon from "@material-ui/icons/Share";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import EditIcon from "@material-ui/icons/Edit";
import MusicNoteIcon from "@material-ui/icons/MusicNote";
import { get_time, toDatetime } from "../lib/get_times";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345 * 0.8,
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
  title: {
    display: "-webkit-box",
    overflow: "hidden",
    "-webkit-line-clamp": 2,
    "-webkit-box-orient": "vertical",
  },
  tags: {
    display: "flex",
    flexWrap: "wrap",
    "& > *": {
      margin: theme.spacing(0.3),
    },
  },
}));

export default function TestVideo() {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(true);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const startTime = toDatetime({
    time: video.startTime,
    format: "公開時間: HH時mm分",
  });

  return (
    <Card className={classes.root}>
      <CardMedia
        className={classes.media}
        alt={video.title}
        image={video.thumbnail.medium || ""}
        title={video.title}
      />

      <CardContent style={{ backgroundColor: "", height: "" }}>
        <Typography className={classes.title}>
          <Box lineHeight={1.1}>{video.title}</Box>
        </Typography>
        <Typography variant="body" color="textSecondary" component="body">
          {type == "statistics"
            ? `視聴回数: ${video.statistic.viewCount.toLocaleString()}`
            : `${startTime}`}
        </Typography>
        <Typography variant="body2" component="body2">
          タグ
        </Typography>
        <IconButton
          size="small"
          className={clsx(classes.expand, {
            [classes.expandOpen]: expanded,
          })}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </IconButton>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <div className={classes.tags}>
            <Chip
              size="small"
              variant="outlined"
              label="タグ編集"
              onClick={() => window.alert("このページでは編集できないよ")}
            />
            {video.tags.map((tagData) => (
              <Chip
                key={tagData.name}
                label={tagData.name}
                size="small"
              />
            ))}
          </div>
        </Collapse>
      </CardContent>
    </Card>
  );
}

const type = "statistics";
const video = {
  id: "oPAcjv__fbc",
  title: "【】歌ってみた KING 葛葉 【】",
  description:
    "▼ 原曲 / Kanaria様\n　https://twitter.com/kanaria390\n　https://www.youtube.com/watch?v=cm-l2h6GB8Q\n▼ MIX / そらる様\n　https://twitter.com/soraruru\n　https://www.youtube.com/channel/UCrALFGPubY9rNwVOOJUYu4g\n▼ Illust / AKKE様\n　https://twitter.com/akke299\n▼ Movie / CNR+様\n　https://twitter.com/CNR_Plus\n\n▼俺/葛葉様\n　https://twitter.com/Vamp_Kuzu",
  startTime: "2020-11-10T20:00:00.000Z",
  createdAt: "2021-06-23T13:56:38.000Z",
  songConfirm: true,
  thumbnail: {
    id: "oPAcjv__fbc",
    defaultUrl: "https://i.ytimg.com/vi/oPAcjv__fbc/default.jpg",
    medium: "https://i.ytimg.com/vi/oPAcjv__fbc/mqdefault.jpg",
    high: "https://i.ytimg.com/vi/oPAcjv__fbc/hqdefault.jpg",
    standard: "https://i.ytimg.com/vi/oPAcjv__fbc/sddefault.jpg",
    maxres: "https://i.ytimg.com/vi/oPAcjv__fbc/maxresdefault.jpg",
  },
  statistic: {
    id: "oPAcjv__fbc",
    createdAt: "2021-06-23T13:56:38.000Z",
    updatedAt: "2021-06-23T13:58:09.000Z",
    viewCount: 20888555,
    likeCount: 336413,
    dislikeCount: 2790,
    commentCount: 22412,
  },
  tags: [
    {
      name: "葛葉",
      type: null,
    },
    {
      name: "kuzuha",
      type: null,
    },
    {
      name: "KING",
      type: null,
    },
  ],
};
