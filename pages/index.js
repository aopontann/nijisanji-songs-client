import Layout from "../components/Layout";
import React, { useState } from "react";
import { Box, Card, CardContent } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import Typography from "@material-ui/core/Typography";
import { Chip } from "@material-ui/core";
import { Paper } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import IconButton from "@material-ui/core/IconButton";
import Search from "@material-ui/icons/Search";
import { Divider } from "@material-ui/core";
import { InputBase } from "@material-ui/core";
import Tooltip from "@material-ui/core/Tooltip";
import { OutlinedInput } from "@material-ui/core";
import {
  FormControl,
  FormControlLabel,
  FormHelperText,
} from "@material-ui/core";
import { Checkbox } from "@material-ui/core";
import VideoList from "../components/videoList";
import EditTagDialog from "../components/editTagDialog";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: "2px 4px",
    display: "flex",
    alignItems: "center",
    maxWidth: 700,
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
  divider: {
    height: 28,
    margin: 4,
  },
  tags: {
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap",
    "& > *": {
      margin: theme.spacing(0.3),
    },
  },
  chips: {
    display: "flex",
    flexWrap: "wrap",
    listStyle: "none",
    padding: theme.spacing(0.5),
  },
  chip: {
    margin: theme.spacing(0.5),
  },
}));

export const ContextVideos = React.createContext();

export default function Home(props) {
  const [search_tag, setSearch_tag] = useState("");
  const [videos, setVideos] = useState([]);
  const [DialogProps, setDialogProps] = React.useState({
    open: false,
    videoId: "",
    tags: [],
  });
  const [checkState, setCheckState] = useState(true);
  const useStateVideos = {
    videos,
    setVideos,
    DialogProps,
    setDialogProps,
  };
  const classes = useStyles();

  const searchClick = () => {
    const reg = new RegExp(search_tag);
    const result = props.videos.filter(
      (video) =>
        video.title.match(reg) ||
        (checkState ? video.description.match(reg) : false) ||
        video.tags.map((tagData) => tagData.tag.name).includes(search_tag)
    );
    search_tag != "" ? setVideos([...result]) : setVideos([]);
  };

  const searchChange = (event) => {
    const value = event.target.value || event.target.textContent;
    setSearch_tag(value);
  };

  const searchDelete = () => {
    setSearch_tag("");
    setVideos([]);
  };

  const tagClick = (event) => {
    const value = event.target.textContent;
    const reg = new RegExp(value);
    const result = props.videos.filter(
      (video) =>
        video.title.match(reg) ||
        (checkState ? video.description.match(reg) : false) ||
        video.tags.map((tagData) => tagData.tag.name).includes(value)
    );
    value != "" ? setVideos([...result]) : setVideos([]);
    setSearch_tag(value);
  };

  const checkBoxChange = (event) => {
    setCheckState(event.target.checked);
  };

  return (
    <Layout>
      <Paper component="div" style={{ height: "5.2rem", maxWidth: "700px", marginBottom: "2rem" }}>
        <Paper component="form" className={classes.root}>
          <InputBase
            className={classes.input}
            placeholder="曲名,ライバー名,タグ..."
            inputProps={{ "aria-label": "Search Videos" }}
            value={search_tag}
            onChange={searchChange}
          />
          <IconButton
            type="submit"
            className={classes.iconButton}
            aria-label="search"
            onClick={searchClick}
          >
            <Search />
          </IconButton>
          <Divider className={classes.divider} orientation="vertical" />
          <IconButton
            className={classes.iconButton}
            aria-label="directions"
            onClick={searchDelete}
          >
            <DeleteIcon />
          </IconButton>
        </Paper>
        <FormControlLabel
          style={{ marginLeft: "2px" }}
          control={
            <Checkbox
              checked={checkState}
              onChange={checkBoxChange}
              color="primary"
            />
          }
          label="概要欄も含める"
        />
      </Paper>
      {videos.length == 0 ? (
        <Card style={{ maxWidth: "700px" }}>
          <CardContent>
            <Typography variant="body2" component="p" gutterBottom>
              タグ
            </Typography>
            <Typography component="ui" className={classes.chips}>
              {props.tags.map((tag) => {
                return (
                  <li>
                    <Chip
                      size="small"
                      className={classes.chip}
                      label={tag.name}
                      onClick={tagClick}
                    />
                  </li>
                );
              })}
            </Typography>
          </CardContent>
        </Card>
      ) : (
        ""
      )}

      <ContextVideos.Provider value={useStateVideos}>
        <VideoList />
        <EditTagDialog address={props.address} />
      </ContextVideos.Provider>
    </Layout>
  );
}

export async function getStaticProps() {
  const Address = process.env.API_ADDRESS;
  const params = { songConfirm: true };
  const query = new URLSearchParams(params);
  const res = await fetch(`${Address}/videos?${query}`, {
    method: "GET",
  });
  const data = res.status === 200 ? await res.json() : [];
  res ? "" : console.error("search fetch error");

  const res_tags = await fetch(`${Address}/tags`, {
    method: "GET",
  });
  const data_tags = res_tags.status === 200 ? await res_tags.json() : [];
  res_tags ? "" : console.error("search fetch error");

  return {
    props: {
      videos: data,
      tags: data_tags,
      address: Address,
    },
    revalidate: 60,
  };
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
