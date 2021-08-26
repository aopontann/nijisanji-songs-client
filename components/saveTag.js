import React from "react";
import useSWR from "swr";
import { useRecoilState } from "recoil";
import ErrorIcon from "@material-ui/icons/Error";
import CircularProgress from "@material-ui/core/CircularProgress";
import {
  dialogOpenState,
  dialogVideoIdState,
  dialogTagsState,
  saveTagsState,
} from "../src/atoms";

// ContextDialog.DialogProps = {open: false, videoId: "", tags: []}
export default function SaveTag(props) {
  console.log("-------saveTag---------");
  const [dialogOpen, setDialogOpen] = useRecoilState(dialogOpenState);
  const [dialogVideoId, setDialogVideoId] = useRecoilState(dialogVideoIdState);
  const [dialogTags, setDialogTags] = useRecoilState(dialogTagsState);
  const [saveState, setSaveState] = useRecoilState(saveTagsState);

  const send_body = {
    videoId: dialogVideoId,
    tagNames: dialogTags
  };

  const fetcher = (url) =>
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(send_body),
    }).then((res) => res.json());
  const { data, error, isValidating } = useSWR(
    `${props.address}/tags`,
    fetcher
  );

  if (error) {
    return <ErrorIcon />;
  }
  if (isValidating) {
    return <CircularProgress />;
  }
  if (data) {
    setSaveState("complete");
  }
  return <CircularProgress />;
}
