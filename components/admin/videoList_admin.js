import React, { useState } from "react";
import useSWR from "swr";
import { useRecoilState, atom } from "recoil";
import VideoCardAdmin from "./video_admin";
import DeleteVideo from "./deleteVideo";
import ViewVideoDialog from "./viewVideo_dialog";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
import { makeStyles } from "@material-ui/core/styles";

export const all_videoListState = atom({
  key: "all_videoListState",
  default: [],
});

export const filtered_videoListState = atom({
  key: "filtered_videoListState",
  default: [],
});

export const deleteVideoState = atom({
  key: "deleteVideoState",
  default: {
    open: false,
    videoId: "",
  },
});

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },
}));

export default function VideoListAdmin() {
  const [all_videoList, set_all_videoList] = useRecoilState(all_videoListState);
  const [filtered_videoList, set_filtered_videoList] = useRecoilState(
    filtered_videoListState
  );
  const [deleteVideo, setDeleteVideo] = useRecoilState(deleteVideoState);
  const [updateVideo, setUpdateVideo] = useState(false);
  const classes = useStyles();

  const params = {
    songConfirm: false,
    maxResults: 50,
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
    set_all_videoList([...data.result]);
    set_filtered_videoList([...data.result]); //初期データ
    setUpdateVideo(false);
  }

  return (
    <Grid container spacing={2}>
      {filtered_videoList.map((video, index) => (
        <Grid item xs={2} key={video.id}>
          <VideoCardAdmin video={video} />
        </Grid>
      ))}
      <Backdrop className={classes.backdrop} open={isValidating ? true : false}>
        <CircularProgress color="inherit" />
      </Backdrop>
      {deleteVideo.open ? <DeleteVideo /> : null}
      <ViewVideoDialog />
    </Grid>
  );
}
