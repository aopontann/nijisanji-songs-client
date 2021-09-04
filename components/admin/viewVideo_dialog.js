import React from "react";
import { useRecoilState, atom } from "recoil";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

export const viewVideoState = atom({
  key: "viewVideoState",
  default: {
    open: false,
    videoId: "",
  },
});

export default function ViewVideoDialog() {
  const [viewVideo, setViewVideo] = useRecoilState(viewVideoState);

  const handleClose = () => {
    setViewVideo({...viewVideo, open: false});
  };

  return (
    <Dialog
      open={viewVideo.open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogContent>
        <iframe
          width="560"
          height="315"
          src={`https://www.youtube.com/embed/${viewVideo.videoId}`}
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          閉じる
        </Button>
      </DialogActions>
    </Dialog>
  );
}
