import React from "react";
import useSWR from "swr";
import { useRecoilState } from "recoil";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
import { makeStyles } from "@material-ui/core/styles";
import { deleteVideoState } from "./videoList_admin";

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },
}));

export default function DeleteVideo() {
  const classes = useStyles();
  const [deleteVideo, setDeleteVideo] = useRecoilState(deleteVideoState);
  const address = process.env.NEXT_PUBLIC_API_ADDRESS;

  const fetcher = (url) =>
    fetch(url, {
      method: "DELETE",
    }).then((res) => res.json());
  const { data, error, isValidating } = useSWR(
    `${address}/videos?id=${deleteVideo.videoId}`,
    fetcher
  );

  if (data) {
    setDeleteVideo({...deleteVideo, open: false});
  }

  return (
    <Backdrop className={classes.backdrop} open={true}>
      <CircularProgress color="inherit" />
    </Backdrop>
  );
}
