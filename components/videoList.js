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

export const all_videoListState = atom({
  key: "all_videoListState",
  default: [],
});

export const filtered_videoListState = atom({
  key: "filtered_videoListState",
  default: [],
});

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },
}));

export default function VideoList({ type }) {
  const [all_videoList, set_all_videoList] = useRecoilState(all_videoListState);
  const [filtered_videoList, set_filtered_videoList] = useRecoilState(
    filtered_videoListState
  );
  const setSearchValue = useSetRecoilState(searchValueState);
  const [updateVideo, setUpdateVideo] = useState(false);
  const classes = useStyles();

  const params = {
    songConfirm: true,
    maxResults: 9999,
    page: 1,
    order: "startTime",
  };
  const query = new URLSearchParams(params);
  const { data, error, isValidating } = useSWR(
    `${process.env.NEXT_PUBLIC_API_ADDRESS}/videos?${query}`,
    { revalidateOnFocus: true, focusThrottleInterval: 1000 * 60 }
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
  }

  // 1000pxより大きいと true
  const matches1000 = useMediaQuery("(min-width:1000px)");
  const matches600 = useMediaQuery("(min-width:600px)");
  const grid = matches1000 ? 3 : matches600 ? 4 : 6;

  return (
    <div>
      <Typography variant="subtitle1" component="subtitle1" paragraph>
        {`${filtered_videoList.length} 件`}
      </Typography>
      <Grid container spacing={2}>
        {filtered_videoList.map((video, index) => (
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
