import React, { useState } from "react";
import { useRecoilState } from "recoil";
import SaveTag from "./saveTag";
import { makeStyles } from "@material-ui/core/styles";
import Chip from "@material-ui/core/Chip";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Divider from "@material-ui/core/Divider";
import InputBase from "@material-ui/core/InputBase";
import ErrorIcon from "@material-ui/icons/Error";
import MusicNoteIcon from "@material-ui/icons/MusicNote";
import AddIcon from "@material-ui/icons/Add";
import IconButton from "@material-ui/core/IconButton";
import {
  dialogOpenState,
  dialogVideoIdState,
  dialogTagsState,
  videoListState,
  saveTagsState,
} from "../src/atoms";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: "2px 4px",
    display: "flex",
    alignItems: "center",
    maxWidth: 700,
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
  divider: {
    height: 28,
    margin: 4,
  },
  chips: {
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap",
    listStyle: "none",
    padding: theme.spacing(0.5),
    margin: 0,
  },
  chip: {
    margin: theme.spacing(0.5),
  },
  margin: {
    margin: theme.spacing(1),
  },
}));

export default function EditTagDialog(props) {
  const [videoList, setVideoList] = useRecoilState(videoListState);
  const [dialogOpen, setDialogOpen] = useRecoilState(dialogOpenState);
  const [dialogVideoId, setDialogVideoId] = useRecoilState(dialogVideoIdState);
  const [dialogTags, setDialogTags] = useRecoilState(dialogTagsState);
  const [saveState, setSaveState] = useRecoilState(saveTagsState);
  const [addTag, setAddTag] = useState({ name: "", type: null });

  const classes = useStyles();

  const handleChange = (target) => (event) => {
    console.log({ ...addTag, [target]: event.target.value });
    setAddTag({ ...addTag, [target]: event.target.value });
  };

  const handleClose = () => {
    saveState === "complete"
      ? setVideoList(
          videoList.map((video) =>
            video.id == dialogVideoId ? { ...video, tags: dialogTags } : video
          )
        )
      : "";
    setDialogOpen(false);
    setDialogVideoId("");
    setDialogTags([]);
    setAddTag({ name: "", type: null });
    setSaveState("ready");
  };

  const handleAdd = () => {
    const names = dialogTags.map((tag) => tag.name);
    // 重複するタグは追加しない
    names.includes(addTag.name) ? "" : setDialogTags([...dialogTags, addTag]);
    setAddTag({ name: "", type: null });
  };

  const handleDelete = (chipToDelete) => () => {
    console.log(chipToDelete);
    setDialogTags(
      dialogTags.filter((tagData) => tagData.name !== chipToDelete.name)
    );
  };

  return (
    <Dialog
      open={dialogOpen}
      onClose={handleClose}
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle>タグ編集</DialogTitle>
      <DialogContent>
        <DialogContentText>
          動画に関係するタグを追加してください。詳しくは「このサイトについて」ページで確認してください。
        </DialogContentText>
        <Paper component="form" className={classes.root}>
          <InputBase
            className={classes.input}
            placeholder="追加するタグ名..."
            inputProps={{ "aria-label": "Add Tag" }}
            value={addTag.name}
            onChange={handleChange("name")}
          />
          <IconButton
            className={classes.iconButton}
            aria-label="search"
            onClick={handleAdd}
          >
            <AddIcon />
          </IconButton>
        </Paper>
        <Card style={{ maxWidth: "700px", marginTop: "1rem" }}>
          <CardContent>
            <Typography variant="body2" component="p" gutterBottom>
              タグ
            </Typography>
            <Typography component="ui" className={classes.chips}>
              {dialogTags.map((data) => {
                return (
                  <li>
                    <Chip
                      label={data.name}
                      size="small"
                      className={classes.chip}
                      onDelete={handleDelete(data)}
                    />
                  </li>
                );
              })}
            </Typography>
          </CardContent>
        </Card>
      </DialogContent>
      <DialogActions>
        {saveState !== "complete" ? (
          <Button onClick={handleClose} color="primary">
            キャンセル
          </Button>
        ) : (
          ""
        )}
        {saveState === "ready" ? (
          <Button onClick={() => setSaveState("sending")} color="primary">
            保存
          </Button>
        ) : saveState === "sending" ? (
          <SaveTag address={props.address} />
        ) : saveState === "complete" ? (
          <Button onClick={handleClose} color="primary">
            {`保存完了(閉じる)`}
          </Button>
        ) : (
          <ErrorIcon />
        )}
      </DialogActions>
    </Dialog>
  );
}

/*
{
        "tags": [
            {
                "description": "歌",
                "tag": {
                    "name": "葛葉"
                }
            }
        ]
    }
*/
