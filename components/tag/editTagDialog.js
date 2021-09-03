import React, { useState } from "react";
import { useRecoilState, atom } from "recoil";
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
import InputBase from "@material-ui/core/InputBase";
import AddIcon from "@material-ui/icons/Add";
import IconButton from "@material-ui/core/IconButton";
import {
  dialogOpenState,
  dialogVideoIdState,
  dialogTagsState,
} from "../../src/atoms";
import { all_videoListState, filtered_videoListState } from "../videoList";
import CondidateTagList, { tagListOpenState } from "./condidateTagList";
import AddTag from "./addTag";
import DeleteTag from "./deleteTag";

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
}));

export const updateTagOpenState = atom({
  key: "updateTagOpenState",
  default: {
    add: false,
    delete: false,
  },
});

export const inputTagNameState = atom({
  key: "inputTagNameState",
  default: "",
});

export default function EditTagDialog() {
  const [all_videoList, set_all_videoList] = useRecoilState(all_videoListState);
  const [filtered_videoList, set_filtered_videoList] = useRecoilState(
    filtered_videoListState
  );

  const [dialogOpen, setDialogOpen] = useRecoilState(dialogOpenState); //boolean
  const [updateTagOpen, setUpdateTagOpen] = useRecoilState(updateTagOpenState);
  const [dialogVideoId, setDialogVideoId] = useRecoilState(dialogVideoIdState); //string
  const [dialogTags, setDialogTags] = useRecoilState(dialogTagsState); //string[]
  const [tagListOpen, setTagListOpen] = useRecoilState(tagListOpenState);

  const [inputTagName, setInputTagName] = useRecoilState(inputTagNameState);
  const [deleteTagName, setDeleteTagName] = useState("");
  const [composing, setComposing] = useState(true);
  const [pressEnter, setPressEnter] = useState(false); //送信許可

  const classes = useStyles();

  const handleClose = () => {
    const saveTags = dialogTags.map((tagName) => {
      return { name: tagName };
    });
    console.log(saveTags);
    set_all_videoList(
      all_videoList.map((video) =>
        video.id == dialogVideoId ? { ...video, tags: saveTags } : video
      )
    );
    set_filtered_videoList(
      filtered_videoList.map((video) =>
        video.id == dialogVideoId ? { ...video, tags: saveTags } : video
      )
    );
    setDialogOpen(false);
    setDialogVideoId("");
    setDialogTags([]);
    setInputTagName("");
    setDeleteTagName("");
  };

  const handleAdd = () => {
    // 重複するタグ,入力していないタグは追加しない
    if (inputTagName !== "" && !dialogTags.includes(inputTagName)) {
      console.log(`タグ名: "${inputTagName}"`);
      setDialogTags([...dialogTags, inputTagName]);
      setUpdateTagOpen({ ...updateTagOpen, add: true });
    } else {
      console.log("NG");
    }
  };

  const handleDelete = (chipToDelete) => () => {
    console.log(chipToDelete);
    setDeleteTagName(chipToDelete);
    setDialogTags(dialogTags.filter((tagName) => tagName !== chipToDelete));
    setUpdateTagOpen({ ...updateTagOpen, delete: true });
  };

  return (
    <Dialog
      open={dialogOpen}
      onClose={handleClose}
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle>タグ編集</DialogTitle>
      <DialogContent>
        {updateTagOpen.add ? (
          <AddTag videoId={dialogVideoId} tagName={inputTagName} />
        ) : null}
        {updateTagOpen.delete ? (
          <DeleteTag videoId={dialogVideoId} tagName={deleteTagName} />
        ) : null}
        <DialogContentText>
          動画に関係するタグを追加してください。詳しくは「このサイトについて」ページで確認してください。
        </DialogContentText>
        <Paper component="div" className={classes.root}>
          <InputBase
            className={classes.input}
            placeholder="追加するタグ名..."
            inputProps={{ "aria-label": "Add Tag" }}
            value={inputTagName}
            onKeyUp={(e) => {
              e.key == "Enter" && composing ? setPressEnter(true) : ""
              e.key == "Enter" && pressEnter ? handleAdd() : ""
            }}
            onCompositionStart={() => {
              setComposing(false);
              setPressEnter(false);
            }}
            onCompositionEnd={() => setComposing(true)}
            onFocus={() => setPressEnter(true)}
            onChange={(e) => {
              setInputTagName(e.target.value);
              setTagListOpen(true);
            }}
          />
          <IconButton
            className={classes.iconButton}
            aria-label="add-tag"
            onClick={handleAdd}
          >
            <AddIcon />
          </IconButton>
        </Paper>
        <CondidateTagList />
        <Card style={{ maxWidth: "700px", marginTop: "1rem" }}>
          <CardContent>
            <Typography variant="body2" component="p" gutterBottom>
              タグ
            </Typography>
            <Typography component="ui" className={classes.chips}>
              {dialogTags.map((tagName) => {
                return (
                  <li key={tagName}>
                    <Chip
                      key={tagName}
                      label={tagName}
                      size="small"
                      className={classes.chip}
                      onDelete={handleDelete(tagName)}
                    />
                  </li>
                );
              })}
            </Typography>
          </CardContent>
        </Card>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          {`閉じる`}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
