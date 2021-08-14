import React from "react";
import { useRecoilState } from "recoil";
import { videoListState, searchValueState, searchCheckBoxState } from "../src/atoms";
import { makeStyles } from "@material-ui/styles";
import Paper from "@material-ui/core/Paper";
import DeleteIcon from "@material-ui/icons/Delete";
import IconButton from "@material-ui/core/IconButton";
import Search from "@material-ui/icons/Search";
import Divider from "@material-ui/core/Divider";
import InputBase from "@material-ui/core/InputBase";
import Typography from "@material-ui/core/Typography";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import { get_time, toDatetime } from "../lib/get_times";

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

export default function SearchVideos({ videos, time }) {
  const [videoList, setVideoList] = useRecoilState(videoListState);
  const [searchCheckBox, setSearchCheckBox] = useRecoilState(searchCheckBoxState);
  const [searchValue, setSearchValue] = useRecoilState(searchValueState);
  const classes = useStyles();

  const searchClick = () => {
    const clickTime = get_time({format: "YYYY-MM-DD"});
    clickTime > time ? window.alert("ページを更新してください") : ""
    const reg = new RegExp(searchValue);
    const result = searchValue
      ? videos.filter(
          (video) =>
            video.title.match(reg) ||
            (searchCheckBox ? video.description.match(reg) : false) ||
            video.tags.map((tagData) => tagData.name).includes(searchValue)
        )
      : [];
    setVideoList([...result]);
  };

  const searchChange = (event) => {
    setSearchValue(event.target.value);
  };

  const searchDelete = () => {
    setSearchValue("");
    setVideoList([]);
  };

  const checkBoxChange = (event) => {
    setSearchCheckBox(event.target.checked);
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
          value={searchValue}
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
      <Typography variant="body2" component="body2" style={{marginLeft: "1rem"}}>
          {"検索範囲："}
      </Typography>
      <FormControlLabel
        style={{ marginLeft: "2px" }}
        control={
          <Checkbox
            checked={searchCheckBox}
            onChange={checkBoxChange}
            color="primary"
          />
        }
        label="概要欄も含める"
      />
    </Paper>
  );
}
