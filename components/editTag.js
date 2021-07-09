import React, { useState } from "react";
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

export default function EditTags(props) {
  const [tags, setTags] = useState([...props.tags]);
  const [addName, setAddName] = useState("");
  const classes = useStyles();

  const handleChange = (event) => {
    setAddName(event.target.value);
  };

  const handleAdd = () => {
    setTags([...tags, { description: "", tag: { name: addName } }]);
  };

  const handleDelete = (chipToDelete) => () => {
    console.log(tags);
    console.log(chipToDelete);
    setTags(
      tags.filter((tagData) => tagData.tag.name !== chipToDelete.tag.name)
    );
  };

  return (
    <div>
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
          {tags.map((data) => {
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
    </div>
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
