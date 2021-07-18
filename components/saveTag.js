import React, { useContext } from "react";
import useSWR from "swr";
import DoneIcon from '@material-ui/icons/Done';
import ErrorIcon from '@material-ui/icons/Error';
import CircularProgress from "@material-ui/core/CircularProgress";
import { ContextDialog } from "./editTagDialog";

// ContextDialog.DialogProps = {open: false, videoId: "", tags: []}
export default function SaveTag() {
  const { DialogProps, setDialogProps, saveState, setSaveState } = useContext(ContextDialog);

  const send_body = {
    video_tags: [
      {
        videoId: DialogProps.videoId,
        tags: DialogProps.tags.map((tagData) => {
          return {
            name: tagData.tag.name,
            description: tagData.description,
          };
        }),
      },
    ],
  };
  const fetcher = fetch("http://localhost:8081/tags", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(send_body),
  });
  const { data, error } = useSWR("http://localhost:8081/tags", fetcher);

  if (error) {
    return <ErrorIcon />
  }
  if (data) {
    // setDialogProps({open: false, videoId: "", tags: []});
    setSaveState("complete")
  }
  return <CircularProgress />

}
