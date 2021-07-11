import React, { useContext, useState } from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import Chip from "@material-ui/core/Chip";
import { Paper } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { FormControl } from "@material-ui/core";
import { Input } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import IconButton from "@material-ui/core/IconButton";
import { ContextVideos } from "../pages/search";
import useSWR from "swr";

const useStyles = makeStyles((theme) => ({
  root: {
    width: 345 * 0.8,
    height: 310 * 0.8,
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
  tags: {
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap",
    "& > *": {
      margin: theme.spacing(0.3),
    },
  },
  addTag: {
    margin: theme.spacing(0.3),
  },
}));

export default function EditTagDialog() {
  const { videos, setVideos, DialogProps, setDialogProps } =
    useContext(ContextVideos);
  const [addName, setAddName] = useState("");
  // DialogProps = {open: false, videoId: "", tags: []}
  const classes = useStyles();

  console.log("DialogProps", DialogProps);

  const handleChange = (event) => {
    setAddName(event.target.value);
  };

  const handleClose = () => {
    setDialogProps({ open: false, videoId: "", tags: [] });
  };

  const handleAdd = () => {
    setDialogProps({
      open: DialogProps.open,
      videoId: DialogProps.videoId,
      tags: [...DialogProps.tags, { description: "", tag: { name: addName } }],
    });
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
              description: null,
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
          動画に出演しているライバーや、動画やイラスト提供している人の名前を編集できるよ
        </DialogContentText>
        <FormControl className={clsx(classes.addtag)}>
          <Input
            onChange={handleChange}
            endAdornment={
              <IconButton onClick={handleAdd}>
                <AddIcon fontsize="small" />
              </IconButton>
            }
          />
        </FormControl>
        <br />
        <DialogContentText align="center">保存するタグ</DialogContentText>
        <Paper component="ui" className={classes.chips}>
          {DialogProps.tags.map((data) => {
            return (
              <li>
                <Chip
                  label={data.tag.name}
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
