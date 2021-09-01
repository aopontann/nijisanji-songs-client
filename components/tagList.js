import React from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { searchCheckBoxState, searchValueState } from "./search/searchVideos";
import { all_videoListState, filtered_videoListState, thisPageState } from "./videoList";
import { searchScopeState } from "./search/searchfilter";
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
  const searchScope = useRecoilValue(searchScopeState);
  const set_filtered_videoListState = useSetRecoilState(filtered_videoListState);
  const setThisPage = useSetRecoilState(thisPageState);
  const set_tagsListExpandedState = useSetRecoilState(tagsListExpandedState);
  const setSearchValue = useSetRecoilState(searchValueState);
  const classes = useStyles();

  const tagClick = (event) => {
    const reg = new RegExp(event.target.textContent);
    const result = all_videoList.filter(
      (video) =>
        (searchScope.title ? video.title.match(reg) : false) ||
        (searchScope.description ? video.description.match(reg) : false) ||
        (searchScope.tag ? video.tags.map((tagData) => tagData.name).includes(event.target.textContent) : false)
    );
    set_filtered_videoListState([...result]);
    setSearchValue(event.target.textContent);
    set_tagsListExpandedState(false);
    setThisPage(1);
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
