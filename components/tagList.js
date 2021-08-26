import React from "react";
import { useRecoilState } from "recoil";
import {
  videoListState,
  searchValueState,
  searchCheckBoxState,
} from "../src/atoms";
import { makeStyles } from "@material-ui/styles";
import Typography from "@material-ui/core/Typography";
import Chip from "@material-ui/core/Chip";

const useStyles = makeStyles((theme) => ({
  chips: {
    display: "flex",
    flexWrap: "wrap",
    listStyle: "none",
    padding: theme.spacing(0.5),
  },
  chip: {
    margin: theme.spacing(0.5),
  },
}));

export default function TagList({ videos, tags }) {
  const [videoList, setVideoList] = useRecoilState(videoListState);
  const [searchValue, setSearchValue] = useRecoilState(searchValueState);
  const [searchCheckBox, setSearchCheckBox] =
    useRecoilState(searchCheckBoxState);
  const classes = useStyles();

  const tagClick = (event) => {
    setSearchValue(event.target.textContent);
    const reg = new RegExp(event.target.textContent);
    const result = videos.filter(
      (video) =>
        video.title.match(reg) ||
        (searchCheckBox ? video.description.match(reg) : false) ||
        video.tags.map((tagData) => tagData.name).includes(searchValue)
    );
    setVideoList([...result]);
  };
  return (
    <Typography component="ui" className={classes.chips}>
      {tags.map((tag) => {
        return (
          <li key={tag.name}>
            <Chip
              size="small"
              className={classes.chip}
              label={tag.name}
              onClick={tagClick}
            />
          </li>
        );
      })}
    </Typography>
  );
}
