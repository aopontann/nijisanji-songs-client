import Layout from "../components/Layout";
import React, { useState } from "react";
import { Box } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import Typography from "@material-ui/core/Typography";
import { Chip } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import { OutlinedInput } from "@material-ui/core";
import FormControl from "@material-ui/core/FormControl";
import { FormHelperText } from "@material-ui/core";
import VideoList from "../components/videoList";
import EditTagDialog from "../components/editTagDialog";

const useStyles = makeStyles((theme) => ({
  tags: {
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap",
    "& > *": {
      margin: theme.spacing(0.3),
    },
  },
}));

export const ContextVideos = React.createContext();

export default function Search(props) {
  const [search_tag, setSearch_tag] = useState("");
  const [videos, setVideos] = useState([]);
  const [DialogProps, setDialogProps] = React.useState({
    open: false,
    videoId: "",
    tags: [],
  });
  const useStateVideos = {
    videos,
    setVideos,
    DialogProps,
    setDialogProps,
  };
  const classes = useStyles();

  const handleChange = (event) => {
    const value = event.target.value || event.target.textContent;
    const reg = new RegExp(value);
    const result = props.videos.filter(
      (video) =>
        video.title.match(reg) ||
        video.tags.map((tagData) => tagData.tag.name).includes(value)
    );
    value != "" ? setVideos([...result]) : setVideos([]);
    setSearch_tag(value);
  };

  return (
    <Layout>
      <Typography component="div" align="center">
        <FormControl variant="outlined" style={{ margin: "1rem" }}>
          <OutlinedInput
            id="outlined-adornment-weight"
            value={search_tag}
            onChange={handleChange}
            aria-describedby="outlined-weight-helper-text"
            inputProps={{
              "aria-label": "weight",
            }}
            endAdornment={
              <Tooltip title="Delete">
                <IconButton
                  aria-label="delete"
                  onClick={() => {
                    setVideos([]);
                    setSearch_tag("");
                  }}
                >
                  <DeleteIcon />
                </IconButton>
              </Tooltip>
            }
          />
          <FormHelperText id="outlined-weight-helper-text">
            tagやライバー名、曲名を入力してね
          </FormHelperText>
        </FormControl>
        {videos.length == 0 ? (
          <div className={classes.tags}>
            {props.tags.map((tag) => {
              return (
                <Chip size="small" label={tag.name} onClick={handleChange} />
              );
            })}
          </div>
        ) : (
          ""
        )}
      </Typography>
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
