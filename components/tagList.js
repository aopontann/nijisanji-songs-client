import React from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { searchCheckBoxState, searchValueState } from "./searchVideos";
import { all_videoListState, filtered_videoListState } from "./videoList";
import { tagsListExpandedState } from "./accordion";
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

export default function TagList({ tags }) {
  const all_videoList = useRecoilValue(all_videoListState);
  const searchCheckBox = useRecoilValue(searchCheckBoxState);
  const set_filtered_videoListState = useSetRecoilState(filtered_videoListState);
  const set_tagsListExpandedState = useSetRecoilState(tagsListExpandedState);
  const [searchValue, setSearchValue] = useRecoilState(searchValueState);
  const classes = useStyles();

  const tagClick = (event) => {
    setSearchValue(event.target.textContent);
    const reg = new RegExp(event.target.textContent);
    const result = all_videoList.filter(
      (video) =>
        video.title.match(reg) ||
        (searchCheckBox ? video.description.match(reg) : false) ||
        video.tags.map((tagData) => tagData.name).includes(searchValue)
    );
    set_filtered_videoListState([...result]);
    set_tagsListExpandedState(false);
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
