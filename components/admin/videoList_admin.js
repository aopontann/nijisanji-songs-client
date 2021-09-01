import React from "react";
import useSWR from "swr";
import VideoCardAdmin from "./video_admin";
import { useRecoilState, atom } from "recoil";
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

  if (data?.result) {
    set_all_videoList(data.result);
    set_filtered_videoList(data.result); //初期データ
  }

  return (
    <Box
      display="flex"
      flexWrap="wrap"
      p={1}
      m={0.2}
      bgcolor="background.paper"
    >
      {filtered_videoList.map((video, index) => (
        <VideoCardAdmin key={index} video={video} />
      ))}
      <Backdrop className={classes.backdrop} open={isValidating ? true : false}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </Box>
  );
}
