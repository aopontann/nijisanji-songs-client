import React, { useContext, useState } from "react";
import clsx from "clsx";
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
import useSWR from "swr";

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

export default function EditTagDialog() {
  const { videos, setVideos, DialogProps, setDialogProps } =
    useContext(ContextVideos);
  const [addTag, setAddTag] = useState({name: "", description: "歌唱"});
  // DialogProps = {open: false, videoId: "", tags: []}
  const classes = useStyles();

  console.log("DialogProps", DialogProps);
  console.log("addTag", addTag);

  const handleChange = (event) => {
    setAddTag({name: event.target.value || addTag.name, description: addTag.description});
  };

  const handleChangeDesc = (event) => {
    setAddTag({name: addTag.name, description: event.target.value || addTag.description});
  };

  const handleClose = () => {
    setDialogProps({ open: false, videoId: "", tags: [] });
  };

  const handleAdd = () => {
    addTag.name !== ""
    ?
    setDialogProps({
      open: DialogProps.open,
      videoId: DialogProps.videoId,
      tags: [...DialogProps.tags, { description: addTag.description, tag: { name: addTag.name } }],
    })
    : ""
    setAddTag({name: "", description: "歌唱"});
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

  const handleSave = async () => {
    setVideos(
      videos.map((video) => {
        video.id == DialogProps.videoId ? (video.tags = DialogProps.tags) : "";
        return video;
      })
    );
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
    const delete_res = await fetch(`http://localhost:8081/tags?videoId=${DialogProps.videoId}`, {
      method: "DELETE",
    }).then((res) => res.json());
    const response = await fetch("http://localhost:8081/tags", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(send_body),
    }).then((res) => res.json());
    console.log(delete_res, response);
    /*
    const fetcher = (url) =>
      fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(send_body),
      }).then((res) => res.json());
    const { data, isValidating } = useSWR('http://localhost:8081/tags', fetcher);
    */
    setDialogProps({ open: false, videoId: "", tags: [] });
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
          <NativeSelect value={addTag.description} onChange={handleChangeDesc}>
            <option value={"歌唱"}>歌唱</option>
            <option value={"その他"}>その他</option>
          </NativeSelect>
          <FormHelperText>追加するタグの種類</FormHelperText>
        </FormControl>
        <FormControl className={classes.margin}>
          <OutlinedInput
            id="add-tag"
            value={addTag.name}
            onChange={handleChange}
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
        <Button onClick={handleClose} color="primary">
          キャンセル
        </Button>
        <Button onClick={handleSave} color="primary">
          保存
        </Button>
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
