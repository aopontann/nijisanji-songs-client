import React from "react";
import { useRecoilState, atom, useRecoilValue } from "recoil";
import { makeStyles } from "@material-ui/core/styles";
import FormLabel from "@material-ui/core/FormLabel";
import FormControl from "@material-ui/core/FormControl";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";

import { all_videoListState, filtered_videoListState } from "./videoList";
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
  const [searchScope, setSearchScope] = useRecoilState(searchScopeState);
  const [all_videoList, set_all_videoList] = useRecoilState(all_videoListState);
  const [filtered_videoList, set_filtered_videoList] = useRecoilState(
    filtered_videoListState
  );
  const searchValue = useRecoilValue(searchValueState);

  const handleChange = (event) => {
    setSearchScope({
      ...searchScope,
      [event.target.name]: event.target.checked,
    });
  };

  const handleChange2 = (event) => {
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

    if (event.target.value == "start-asc") {
      result.sort((a, b) => (a.startTime > b.startTime ? 1 : -1));
    }
    if (event.target.value == "start") {
      result.sort((a, b) => (a.startTime < b.startTime ? 1 : -1));
    }
    if (event.target.value == "viewCount-asc") {
      result.sort((a, b) => (a.statistic.viewCount > b.statistic.viewCount ? 1 : -1));
    }
    if (event.target.value == "viewCount") {
      result.sort((a, b) => (a.statistic.viewCount < b.statistic.viewCount ? 1 : -1));
    }
    set_filtered_videoList([...result]);
    setValue(event.target.value);
  };

  const { title, description, tag } = searchScope;

  return (
    <div className={classes.root}>
      <FormControl component="fieldset" className={classes.formControl}>
        <FormLabel component="legend">検索範囲</FormLabel>
        <FormGroup>
          <FormControlLabel
            control={
              <Checkbox checked={title} onChange={handleChange} name="title" />
            }
            label="タイトル"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={description}
                onChange={handleChange}
                name="description"
              />
            }
            label="概要欄"
          />
          <FormControlLabel
            control={
              <Checkbox checked={tag} onChange={handleChange} name="tag" />
            }
            label="タグ"
          />
        </FormGroup>
      </FormControl>
      <FormControl component="fieldset" className={classes.formControl}>
        <FormLabel component="legend">並べ替え</FormLabel>
        <RadioGroup
          aria-label="gender"
          name="gender1"
          value={value}
          onChange={handleChange2}
        >
          <FormControlLabel
            value="start"
            control={<Radio />}
            label="公開日(降順)"
          />
          <FormControlLabel
            value="start-asc"
            control={<Radio />}
            label="公開日(昇順)"
          />
          <FormControlLabel
            value="viewCount"
            control={<Radio />}
            label="視聴回数(降順)"
          />
          <FormControlLabel
            value="viewCount-asc"
            control={<Radio />}
            label="視聴回数(昇順)"
          />
        </RadioGroup>
      </FormControl>
    </div>
  );
}