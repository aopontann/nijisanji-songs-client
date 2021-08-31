import React, { useState } from "react";
import useSWR from "swr";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { VideoCard } from "./video";
import { useRecoilState, useSetRecoilState, atom } from "recoil";
import { searchValueState } from "./searchVideos";
import Typography from "@material-ui/core/Typography";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";

export const all_videoListState = atom({
  key: "all_videoListState",
  default: [],
});

export const filtered_videoListState = atom({
  key: "filtered_videoListState",
  default: [],
});

export const thisPageState = atom({
  key: "thisPageState",
  default: 1
});

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  }
}));

export default function VideoList({ type }) {
  const [all_videoList, set_all_videoList] = useRecoilState(all_videoListState);
  const [filtered_videoList, set_filtered_videoList] = useRecoilState(
    filtered_videoListState
  );
  const [thisPage, setThisPage] = useRecoilState(thisPageState);
  const setSearchValue = useSetRecoilState(searchValueState);
  const [updateVideo, setUpdateVideo] = useState(false);
  const classes = useStyles();

  const maxResult = 50;
  const params = {
    songConfirm: true,
    maxResults: 9999,
    page: 1,
    order: "startTime",
  };
  const query = new URLSearchParams(params);
  const { data, error, isValidating } = useSWR(
    `${process.env.NEXT_PUBLIC_API_ADDRESS}/videos?${query}`,
    { focusThrottleInterval: 1000 * 60 * 5 }
  );

  if (isValidating && !updateVideo) {
    console.log("データ更新");
    setUpdateVideo(true);
  }

  if (!isValidating && data && updateVideo) {
    console.log("データ初期化");
    set_all_videoList([...data.result]);
    set_filtered_videoList([...data.result]); //初期データ
    setUpdateVideo(false);
    setSearchValue("");
    setThisPage(1);
  }

  // 1000pxより大きいと true
  const matches1000 = useMediaQuery("(min-width:1000px)");
  const matches600 = useMediaQuery("(min-width:600px)");
  const grid = matches1000 ? 3 : matches600 ? 4 : 6;

  const sliceStart = (thisPage - 1) * maxResult;
  const sliceEnd =
    thisPage * maxResult < filtered_videoList.length
      ? thisPage * maxResult
      : filtered_videoList.length;

  return (
    <div>
      <div style={{marginBottom: "1rem"}}>
        <Typography variant="subtitle1" component="subtitle1" paragraph>
          {`${sliceStart+1}-${sliceEnd} / ${
            filtered_videoList.length
          } 件`}
        </Typography>
        <ButtonGroup color="primary" aria-label="outlined primary button group">
          <Button
            onClick={() => {
              thisPage > 1 ? setThisPage(thisPage - 1) : "";
            }}
          >
            前
          </Button>
          <Button
            onClick={() => {
              filtered_videoList.length / maxResult >= thisPage
                ? setThisPage(thisPage + 1)
                : "";
            }}
          >
            次
          </Button>
        </ButtonGroup>
      </div>
      <Grid container spacing={2}>
        {filtered_videoList
          .slice(sliceStart, sliceEnd)
          .map((video, index) => (
            <Grid item xs={grid} key={index}>
              <VideoCard video={video} type={type} />
            </Grid>
          ))}
        <Backdrop
          className={classes.backdrop}
          open={isValidating ? true : false}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      </Grid>
    </div>
  );
}
