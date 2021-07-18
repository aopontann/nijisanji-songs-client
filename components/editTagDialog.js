import React, { useContext, useState } from "react";
import SaveTag from "./saveTag";
import { makeStyles } from "@material-ui/core/styles";
import Chip from "@material-ui/core/Chip";
import { Paper, Typography } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { FormControl, NativeSelect, FormHelperText } from "@material-ui/core";
import { OutlinedInput } from "@material-ui/core";
import MusicNoteIcon from "@material-ui/icons/MusicNote";
import AddIcon from "@material-ui/icons/Add";
import IconButton from "@material-ui/core/IconButton";
import { ContextVideos } from "../pages/search";

const useStyles = makeStyles((theme) => ({
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

export const ContextDialog = React.createContext();

export default function EditTagDialog(props) {
  const { videos, setVideos, DialogProps, setDialogProps } =
    useContext(ContextVideos);
  const [addTag, setAddTag] = useState({ name: "", description: "歌唱" });
  const [saveState, setSaveState] = useState("ready"); //ready, sending, complete
  // DialogProps = {open: false, videoId: "", tags: []}
  const classes = useStyles();

  console.log("DialogProps", DialogProps);
  console.log("addTag", addTag);
  console.log("saveState", saveState);

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
      ? setVideos(
          videos.map((video) => {
            video.id == DialogProps.videoId
              ? (video.tags = DialogProps.tags)
              : "";
            return video;
          })
        )
      : "";
    setDialogProps({ open: false, videoId: "", tags: [] });
    setAddTag({ name: "", description: "歌唱" });
    setSaveState("ready");
  };

  const handleAdd = () => {
    addTag.name !== ""
      ? setDialogProps({
          open: DialogProps.open,
          videoId: DialogProps.videoId,
          tags: [
            ...DialogProps.tags,
            { description: addTag.description, tag: { name: addTag.name } },
          ],
        })
      : "";
    setAddTag({ name: "", description: "歌唱" });
  };

  const handleDelete = (chipToDelete) => () => {
    console.log(chipToDelete);
    setDialogProps({
      open: DialogProps.open,
      videoId: DialogProps.videoId,
      tags: DialogProps.tags.filter(
        (tagData) => tagData.tag.name !== chipToDelete.tag.name
      ),
    });
  };

  return (
    <Dialog
      open={DialogProps.open}
      onClose={handleClose}
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle id="form-dialog-title">tag編集</DialogTitle>
      <DialogContent>
        <DialogContentText>
          動画に出演しているライバー名や、動画やイラスト提供している人などの名前を追加できるよ
          (動画に関係ないタグは追加しないでね)
        </DialogContentText>
        <FormControl>
          <NativeSelect
            value={addTag.description}
            onChange={handleChange("description")}
          >
            <option value={"歌唱"}>歌唱</option>
            <option value={"その他"}>その他</option>
          </NativeSelect>
          <FormHelperText>追加するタグの種類</FormHelperText>
        </FormControl>
        <FormControl className={classes.margin}>
          <OutlinedInput
            id="add-tag"
            value={addTag.name}
            onChange={handleChange("name")}
            endAdornment={
              <IconButton onClick={handleAdd}>
                <AddIcon fontsize="small" />
              </IconButton>
            }
          />
        </FormControl>
        <Typography>保存するタグ</Typography>
        <Paper component="ui" className={classes.chips}>
          {DialogProps.tags.map((data) => {
            return (
              <li>
                <Chip
                  label={data.tag.name}
                  icon={data.description == "歌唱" ? <MusicNoteIcon /> : ""}
                  className={classes.chip}
                  onDelete={handleDelete(data)}
                />
              </li>
            );
          })}
        </Paper>
      </DialogContent>
      <DialogActions>
        {saveState !== "complete" ? (
          <Button onClick={handleClose} color="primary">
            キャンセル
          </Button>
        ) : ""}
        {saveState === "ready" ? (
          <Button onClick={() => setSaveState("sending")} color="primary">
            保存
          </Button>
        ) : saveState === "sending" ? (
          <ContextDialog.Provider
            value={{ DialogProps, setDialogProps, saveState, setSaveState }}
          >
            <SaveTag address={props.address}/>
          </ContextDialog.Provider>
        ) : (
          <Button onClick={handleClose} color="primary">
            保存完了(閉じる)
          </Button>
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
