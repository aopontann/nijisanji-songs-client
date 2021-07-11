import React from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import { Box } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";
import Chip from "@material-ui/core/Chip";
import { Paper } from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { FormControl } from "@material-ui/core";
import { Input } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import Fab from "@material-ui/core/Fab";
import DeleteIcon from "@material-ui/icons/Delete";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import EditTags from "./editTag";
import { get_time, toDatetime } from "../lib/get_times";

const useStyles = makeStyles((theme) => ({
  root: {
    width: 345 * 0.8,
    height: 310 * 0.8,
  },
  chips: {
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap",
    listStyle: "none",
    padding: theme.spacing(0.5),
    margin: 0,
  },
  chip: {
    margin: theme.spacing(0.5),
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

export default function ImgMediaCard(props) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const classes = useStyles();
  const video = props.video;
  const type = props.type; // "statistics", "startTime"
  const startTime = toDatetime({
    time: video.startTime,
    format: "公開時間: HH時mm分",
  });

  return (
    <div>
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
          <Typography noWrap={true}>
            <Box lineHeight={1}>{video.title}</Box>
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {type == "statistics"
              ? `視聴回数: ${video.statistic.viewCount.toLocaleString()}`
              : `${startTime}`}
          </Typography>
          <div className={classes.tags}>
            <Chip size="small" label="Basic" />
            <Chip size="small" label="Basic123" />
            <Chip
              size="small"
              label="tag"
              icon={<EditIcon />}
              onClick={handleClickOpen}
            />
          </div>
        </CardContent>
      </Card>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <EditTags tags={video.tags} />
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            キャンセル
          </Button>
          <Button onClick={handleClose} color="primary">
            保存
          </Button>
        </DialogActions>
      </Dialog>
    </div>
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
