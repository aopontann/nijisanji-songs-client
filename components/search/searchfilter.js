import React from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { atom } from "recoil";
import { makeStyles } from "@material-ui/core/styles";
import FormLabel from "@material-ui/core/FormLabel";
import FormControl from "@material-ui/core/FormControl";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";

import { all_videoListState, filtered_videoListState } from "../videoList";
import { searchValueState } from "./searchVideos";

export const searchScopeState = atom({
  key: "searchScopeState",
  default: {
    title: true,
    description: true,
    tag: true,
  },
});

export const orderState = atom({
  key: "orderState",
  default: "start",
});

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  formControl: {
    margin: theme.spacing(3),
  },
}));

export default function SearchFilter() {
  const classes = useStyles();
  const [value, setValue] = useRecoilState(orderState);
  const all_videoList = useRecoilValue(all_videoListState);
  const [searchScope, setSearchScope] = useRecoilState(searchScopeState);
  const searchValue = useRecoilValue(searchValueState);
  const set_filtered_videoList = useSetRecoilState(filtered_videoListState);

  const handleChange = (event) => {
    setSearchScope({
      ...searchScope,
      [event.target.name]: event.target.checked,
    });
  };

  const handleChange2 = (event) => {
    const reg = new RegExp(searchValue);
    const result =
      searchValue != ""
        ? all_videoList.filter(
            (video) =>
              (searchScope.title ? video.title.match(reg) : false) ||
              (searchScope.description
                ? video.description.match(reg)
                : false) ||
              (searchScope.tag
                ? video.tags.map((tag) => tag.name).includes(searchValue)
                : false)
          )
        : [...all_videoList];

    const sortedVideos = sortVideos({
      order: event.target.value,
      videos: result,
    });
    set_filtered_videoList([...sortedVideos]);
    setValue(event.target.value);
  };

  const { title, description, tag } = searchScope;

  return (
    <div className={classes.root}>
      <FormControl component="fieldset" className={classes.formControl}>
        <FormLabel component="legend">????????????</FormLabel>
        <FormGroup>
          <FormControlLabel
            control={
              <Checkbox checked={title} onChange={handleChange} name="title" />
            }
            label="????????????"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={description}
                onChange={handleChange}
                name="description"
              />
            }
            label="?????????"
          />
          <FormControlLabel
            control={
              <Checkbox checked={tag} onChange={handleChange} name="tag" />
            }
            label="??????"
          />
        </FormGroup>
      </FormControl>
      <FormControl component="fieldset" className={classes.formControl}>
        <FormLabel component="legend">????????????</FormLabel>
        <RadioGroup
          aria-label="gender"
          name="gender1"
          value={value}
          onChange={handleChange2}
        >
          <FormControlLabel
            value="start"
            control={<Radio />}
            label="?????????(??????)"
          />
          <FormControlLabel
            value="start-asc"
            control={<Radio />}
            label="?????????(??????)"
          />
          <FormControlLabel
            value="viewCount"
            control={<Radio />}
            label="????????????(??????)"
          />
          <FormControlLabel
            value="viewCount-asc"
            control={<Radio />}
            label="????????????(??????)"
          />
        </RadioGroup>
      </FormControl>
    </div>
  );
}

export function sortVideos({ order, videos }) {
  if (order == "start-asc") {
    videos.sort((a, b) => (a.startTime > b.startTime ? 1 : -1));
  }
  if (order == "start") {
    videos.sort((a, b) => (a.startTime < b.startTime ? 1 : -1));
  }
  if (order == "viewCount-asc") {
    videos.sort((a, b) =>
      a.statistic.viewCount > b.statistic.viewCount ? 1 : -1
    );
  }
  if (order == "viewCount") {
    videos.sort((a, b) =>
      a.statistic.viewCount < b.statistic.viewCount ? 1 : -1
    );
  }
  return videos;
}
