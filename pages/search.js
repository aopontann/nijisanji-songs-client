import Layout from "../components/Layout";
import { useState } from "react";
import { Box } from "@material-ui/core";
import ImgMediaCard from "../components/card";
import { makeStyles } from "@material-ui/styles";
import Typography from "@material-ui/core/Typography";
import { Chip } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import { OutlinedInput } from "@material-ui/core";
import FormControl from "@material-ui/core/FormControl";
import { FormHelperText } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
    },
    textAlign: "center",
  },
  tags: {
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap",
    "& > *": {
      margin: theme.spacing(0.3),
    },
  },
}));

export default function Search(props) {
  const [videos, setVideo] = useState([]);
  const [search_tag, setSearch_tag] = useState("");
  const classes = useStyles();

  const handleChange = (event) => {
    const value = event.target.value || event.target.textContent;
    const reg = new RegExp(value);
    const result = props.videos.filter((video) => video.title.match(reg));
    value != "" ? setVideo([...result]) : setVideo([]);
    setSearch_tag(value);
  };

  return (
    <Layout>
      <Typography variant="h5">動画検索</Typography>
      <Typography component="div" align="center">
        <FormControl variant="outlined">
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
                <IconButton aria-label="delete" onClick={() => {
                  setVideo([]);
                  setSearch_tag("");
                }}>
                  <DeleteIcon />
                </IconButton>
              </Tooltip>
            }
          />
          <FormHelperText id="outlined-weight-helper-text">
            tag名やライバー名を入力してね
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
      <Box
        display="flex"
        flexWrap="wrap"
        p={1}
        m={0.2}
        bgcolor="background.paper"
        justifyContent="center"
      >
        {videos.map((video) => {
          return (
            <Box m={1}>
              <ImgMediaCard video={video} type={"statistics"} />
            </Box>
          );
        })}
      </Box>
    </Layout>
  );
}

export async function getStaticProps() {
  const Address = process.env.API_ADDRESS;
  const params = { songConfirm: true, maxResults: 200, page: 1 };
  const query = new URLSearchParams(params);
  const res = await fetch(`${Address}/videos?${query}`, {
    method: "GET",
  });
  const data = await res.json();

  const res_tags = await fetch(`${Address}/tags?`, {
    method: "GET",
  });
  const data_tags = await res_tags.json();

  return {
    props: {
      videos: data,
      tags: data_tags,
    },
    revalidate: 60 * 10,
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
