import React from "react";
import useSWR from "swr";
import { useRecoilState, useSetRecoilState } from "recoil";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
import { makeStyles } from "@material-ui/core/styles";
import { updateTagOpenState, inputTagNameState } from "./editTagDialog";

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },
}));

export default function AddTag({ videoId, tagName }) {
  const classes = useStyles();
  const [updateTagOpen, setUpdateTagOpen] = useRecoilState(updateTagOpenState);
  const setInputTagName = useSetRecoilState(inputTagNameState);
  const address = process.env.NEXT_PUBLIC_API_ADDRESS;
  const send_body = {
    videoId,
    tagNames: tagName.split(","),
  };

  const fetcher = (url) =>
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(send_body),
    }).then((res) => res.json());
  const { data, error, isValidating } = useSWR(`${address}/tags`, fetcher);

  if (data) {
    setUpdateTagOpen({ ...updateTagOpen, add: false });
    setInputTagName("");
  }

  return (
    <Backdrop className={classes.backdrop} open={true}>
      <CircularProgress color="inherit" />
    </Backdrop>
  );
}
