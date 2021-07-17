import React, { useContext } from "react";
import { ContextVideos } from "../pages/search";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import { Box } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";
import Chip from "@material-ui/core/Chip";
import EditIcon from "@material-ui/icons/Edit";
import MusicNoteIcon from "@material-ui/icons/MusicNote";
import { get_time, toDatetime } from "../lib/get_times";

// height: 310 * 0.87
const useStyles = makeStyles((theme) => ({
  root: {
    width: 345 * 0.8,
    margin: theme.spacing(0.5),
  },
  title: {
    display: "-webkit-box",
    overflow: "hidden",
    "-webkit-line-clamp": 2,
    "-webkit-box-orient": "vertical",
  },
  tags: {
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap",
    "& > *": {
      margin: theme.spacing(0.3),
    },
  },
  addTag: {
    margin: theme.spacing(0.3),
  },
}));

export default function VideoList(props) {
  const { videos, setVideos, DialogProps, setDialogProps } =
    useContext(ContextVideos);

  const handleClickOpen = (video) => () => {
    console.log("open", video);
    setDialogProps({ open: true, videoId: video.id, tags: video.tags });
  };

  const handleClose = () => {
    setOpen({ open: false, videoId: "", tags: [] });
  };

  const classes = useStyles();
  const type = props.type || "statistics"; // "statistics", "startTime"

  console.log("videoList");
  console.log(videos);

  return (
    <Box
      display="flex"
      flexWrap="wrap"
      p={1}
      m={0.2}
      bgcolor="background.paper"
      justifyContent="center"
    >
      {videos.map((video) => {
        const startTime = toDatetime({
          time: video.startTime,
          format: "公開時間: HH時mm分",
        });
        return (
          <Card className={classes.root}>
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

            <CardContent>
              <Typography className={classes.title}>
                <Box lineHeight={1.1}>{video.title}</Box>
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                {type == "statistics"
                  ? `視聴回数: ${video.statistic.viewCount.toLocaleString()}`
                  : `${startTime}`}
              </Typography>
              <div className={classes.tags}>
                {video.tags.map((tagData) => (
                  <Chip
                    icon={tagData.description == "歌唱" ? <MusicNoteIcon /> : ""}
                    label={tagData.tag.name}
                    size="small"
                  />
                ))}
                <Chip
                  size="small"
                  label="編集"
                  icon={<EditIcon />}
                  onClick={handleClickOpen(video)}
                />
              </div>
            </CardContent>
          </Card>
        );
      })}
    </Box>
  );
}

/*
{
        "id": "oPAcjv__fbc",
        "title": "【】歌ってみた KING 葛葉 【】",
        "description": "▼ 原曲 / Kanaria様\n　https://twitter.com/kanaria390\n　https://www.youtube.com/watch?v=cm-l2h6GB8Q\n▼ MIX / そらる様\n　https://twitter.com/soraruru\n　https://www.youtube.com/channel/UCrALFGPubY9rNwVOOJUYu4g\n▼ Illust / AKKE様\n　https://twitter.com/akke299\n▼ Movie / CNR+様\n　https://twitter.com/CNR_Plus\n\n▼俺/葛葉様\n　https://twitter.com/Vamp_Kuzu",
        "startTime": "2020-11-10T20:00:00.000Z",
        "createdAt": "2021-06-23T13:56:38.000Z",
        "songConfirm": true,
        "thumbnail": {
            "id": "oPAcjv__fbc",
            "defaultUrl": "https://i.ytimg.com/vi/oPAcjv__fbc/default.jpg",
            "medium": "https://i.ytimg.com/vi/oPAcjv__fbc/mqdefault.jpg",
            "high": "https://i.ytimg.com/vi/oPAcjv__fbc/hqdefault.jpg",
            "standard": "https://i.ytimg.com/vi/oPAcjv__fbc/sddefault.jpg",
            "maxres": "https://i.ytimg.com/vi/oPAcjv__fbc/maxresdefault.jpg"
        },
        "statistic": {
            "id": "oPAcjv__fbc",
            "createdAt": "2021-06-23T13:56:38.000Z",
            "updatedAt": "2021-06-23T13:58:09.000Z",
            "viewCount": 20888555,
            "likeCount": 336413,
            "dislikeCount": 2790,
            "commentCount": 22412
        },
        "tags": [
            {
                "description": "歌",
                "tag": {
                    "name": "葛葉"
                }
            }
        ]
    }
*/
