import React from "react";
import styled from "styled-components";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import { Box } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";
import Chip from "@material-ui/core/Chip";
import { get_time, toDatetime } from "../lib/get_times";

const useStyles = makeStyles((theme) => ({
  root: {
    width: 345 * 0.8,
    height: 310 * 0.8,
  },
  tags: {
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap",
    "& > *": {
      margin: theme.spacing(0.5),
    },
  },
}));

export default function ImgMediaCard(props) {
  const classes = useStyles();
  const video = props.video;
  const type = props.type; // "statistics", "startTime" 
  const startTime = toDatetime({
    time: video.startTime,
    format: "公開時間: HH時mm分"
  });
  /*
  const video = {
    id: "dNswz1kQUFo",
    title: "怪物 / 不破湊×三枝明那 Cover",
    description:
      "本家様｜YOASOBI　https://youtu.be/dy90tA3TT1c\nMix｜YAB　https://twitter.com/omganl\n絵＆動画｜△○□×　https://twitter.com/miwasiba\ninst｜Funtermate LaVo\n\n歌唱\n三枝明那　https://twitter.com/333akina\n不破湊　https://twitter.com/Fuwa_Minato",
    startTime: "2021-04-04T23:00:00.000Z",
    createdAt: "2021-06-23T13:56:31.000Z",
    songConfirm: true,
    thumbnail: {
      id: "dNswz1kQUFo",
      defaultUrl: "https://i.ytimg.com/vi/dNswz1kQUFo/default.jpg",
      medium: "https://i.ytimg.com/vi/dNswz1kQUFo/mqdefault.jpg",
      high: "https://i.ytimg.com/vi/dNswz1kQUFo/hqdefault.jpg",
      standard: "https://i.ytimg.com/vi/dNswz1kQUFo/sddefault.jpg",
      maxres: "https://i.ytimg.com/vi/dNswz1kQUFo/maxresdefault.jpg",
    },
    statistic: {
      id: "dNswz1kQUFo",
      createdAt: "2021-06-23T13:56:31.000Z",
      updatedAt: "2021-06-23T13:58:10.000Z",
      viewCount: 4333479,
      likeCount: 87477,
      dislikeCount: 629,
      commentCount: 3081,
    },
    tags: [],
  };
  */

  return (
    <Card className={classes.root}>
      <CardActionArea>
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
            {type == 'statistics'
              ? `視聴回数: ${video.statistic.viewCount.toLocaleString()}`
              : `${startTime}` }
          </Typography>
          <div className={classes.tags}>
            <Chip size="small" label="Basic" />
            <Chip size="small" label="Basic123" />
          </div>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

/* video
{
        "id": "dNswz1kQUFo",
        "title": "怪物 / 不破湊×三枝明那 Cover",
        "description": "本家様｜YOASOBI　https://youtu.be/dy90tA3TT1c\nMix｜YAB　https://twitter.com/omganl\n絵＆動画｜△○□×　https://twitter.com/miwasiba\ninst｜Funtermate LaVo\n\n歌唱\n三枝明那　https://twitter.com/333akina\n不破湊　https://twitter.com/Fuwa_Minato",
        "startTime": "2021-04-04T23:00:00.000Z",
        "createdAt": "2021-06-23T13:56:31.000Z",
        "songConfirm": true,
        "thumbnail": {
            "id": "dNswz1kQUFo",
            "defaultUrl": "https://i.ytimg.com/vi/dNswz1kQUFo/default.jpg",
            "medium": "https://i.ytimg.com/vi/dNswz1kQUFo/mqdefault.jpg",
            "high": "https://i.ytimg.com/vi/dNswz1kQUFo/hqdefault.jpg",
            "standard": "https://i.ytimg.com/vi/dNswz1kQUFo/sddefault.jpg",
            "maxres": "https://i.ytimg.com/vi/dNswz1kQUFo/maxresdefault.jpg"
        },
        "statistic": {
            "id": "dNswz1kQUFo",
            "createdAt": "2021-06-23T13:56:31.000Z",
            "updatedAt": "2021-06-23T13:58:10.000Z",
            "viewCount": 4333479,
            "likeCount": 87477,
            "dislikeCount": 629,
            "commentCount": 3081
        },
        "tags": []
    }
*/
