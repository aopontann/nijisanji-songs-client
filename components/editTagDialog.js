import React, { useState } from "react";
import { useRecoilState } from "recoil";
import SaveTag from "./saveTag";
import { makeStyles } from "@material-ui/core/styles";
import Chip from "@material-ui/core/Chip";
import { Paper, Typography } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import { Card, CardContent } from "@material-ui/core";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { Divider } from "@material-ui/core";
import { InputBase } from "@material-ui/core";
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
  const [addTag, setAddTag] = useState({ name: "", description: "その他" });

  const classes = useStyles();

  const handleChange = (target) => (event) => {
    target == "name"
      ? setAddTag({ name: event.target.value, description: addTag.description })
      : "";
    target == "description"
      ? setAddTag({
          name: addTag.name,
          description: event.target.value || addTag.description,
        })
      : "";
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
    setAddTag({ name: "", description: "その他" });
    setSaveState("ready");
  };

  const handleAdd = () => {
    setDialogTags([
      ...dialogTags,
      { description: addTag.description, tag: { name: addTag.name } },
    ]);
    setAddTag({ name: "", description: "その他" });
  };

  const handleDelete = (chipToDelete) => () => {
    console.log(chipToDelete);
    setDialogTags(
      dialogTags.filter((tagData) => tagData.tag.name !== chipToDelete.tag.name)
    );
  };

  const tagTypeChange = () => {
    addTag.description == "歌唱"
      ? setAddTag({ ...addTag, description: "その他" })
      : setAddTag({ ...addTag, description: "歌唱" });
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
          <IconButton
            className={classes.iconButton}
            aria-label="tag Type"
            onClick={tagTypeChange}
          >
            <MusicNoteIcon color={addTag.description == "歌唱" ? "primary" : "disabled"}/>
          </IconButton>
          <Divider className={classes.divider} orientation="vertical" />
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
                      label={data.tag.name}
                      size="small"
                      icon={data.description == "歌唱" ? <MusicNoteIcon /> : ""}
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
