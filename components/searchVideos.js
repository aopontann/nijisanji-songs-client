import React, { useState } from "react";
import { useRecoilState } from "recoil";
import { videoListState } from "../src/atoms";
import { makeStyles } from "@material-ui/styles";
import { Paper } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import IconButton from "@material-ui/core/IconButton";
import Search from "@material-ui/icons/Search";
import { Divider } from "@material-ui/core";
import { InputBase } from "@material-ui/core";
import { FormControlLabel } from "@material-ui/core";
import { Checkbox } from "@material-ui/core";

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
}));

export default function SearchVideos() {
  const [videoList, setVideoList] = useRecoilState(videoListState);
  const [searchName, setSearchName] = useState("");
  const [checkState, setCheckState] = useState(true);
  const classes = useStyles();

  const searchClick = () => {
    console.log("CLICK!!!!!");
    const reg = new RegExp(searchName);
    const result = searchName
      ? props.videos.filter(
          (video) =>
            video.title.match(reg) ||
            (checkState ? video.description.match(reg) : false) ||
            video.tags.map((tagData) => tagData.tag.name).includes(search_tag)
        )
      : [];
    setVideoList([...result]);
  };

  const searchChange = (event) => {
    const value = event.target.value || event.target.textContent;
    setSearchName(value);
  };

  const searchDelete = () => {
    setSearchName("");
    videoList([]);
  };

  const checkBoxChange = (event) => {
    setCheckState(event.target.checked);
  };

  return (
    <Paper
      component="div"
      style={{ height: "5.2rem", maxWidth: "700px", marginBottom: "2rem" }}
    >
      <Paper component="form" className={classes.root}>
        <InputBase
          className={classes.input}
          placeholder="曲名,ライバー名,タグ..."
          inputProps={{ "aria-label": "Search Videos" }}
          value={search_tag}
          onChange={searchChange}
        />
        <IconButton
          className={classes.iconButton}
          aria-label="search"
          onClick={searchClick}
        >
          <Search />
        </IconButton>
        <Divider className={classes.divider} orientation="vertical" />
        <IconButton
          className={classes.iconButton}
          aria-label="delete"
          onClick={searchDelete}
        >
          <DeleteIcon />
        </IconButton>
      </Paper>
      <FormControlLabel
        style={{ marginLeft: "2px" }}
        control={
          <Checkbox
            checked={checkState}
            onChange={checkBoxChange}
            color="primary"
          />
        }
        label="概要欄も含める"
      />
    </Paper>
  );
}
