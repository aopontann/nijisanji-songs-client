import React from "react";
import useSWR from "swr";
import { useRecoilState } from "recoil";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
import { makeStyles } from "@material-ui/core/styles";
import { updateTagOpenState } from "./editTagDialog";

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },
}));

export default function DeleteTag({ videoId, tagName }) {
  const classes = useStyles();
  const [updateTagOpen, setUpdateTagOpen] = useRecoilState(updateTagOpenState);
  const address = process.env.NEXT_PUBLIC_API_ADDRESS;
  const params = {
    videoId,
    names: tagName,
  };
  const query = new URLSearchParams(params);

  const fetcher = (url) =>
    fetch(url, {
      method: "DELETE",
    }).then((res) => res.json());
  const { data, error, isValidating } = useSWR(
    `${address}/tags?${query}`,
    fetcher
  );

  if (data) {
    setUpdateTagOpen({...updateTagOpen, delete: false});
  }

  return (
    <Backdrop className={classes.backdrop} open={true}>
      <CircularProgress color="inherit" />
    </Backdrop>
  );
}
