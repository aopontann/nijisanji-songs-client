import React from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import {
  all_videoListState,
  filtered_videoListState,
  thisPageState,
} from "./videoList";
import { searchValueState } from "./search/searchVideos";
import { vtuberListExpandedState } from "./accordion";
import { searchScopeState } from "./search/searchfilter";
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

export default function VtuberList({ vtuberList }) {
  const all_videoList = useRecoilValue(all_videoListState);
  const searchScope = useRecoilValue(searchScopeState);
  const set_filtered_videoListState = useSetRecoilState(filtered_videoListState);
  const setThisPage = useSetRecoilState(thisPageState);
  const set_vtuberListExpandedState = useSetRecoilState(vtuberListExpandedState);
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
    setThisPage(1);
    set_vtuberListExpandedState(false);
  };

  return (
    <div>
      {["にじさんじ", "NIJISANJI KR", "NIJISANJI ID", "NIJISANJI EN"].map(
        (affi, index) => {
          const filtered_vtuberList = vtuberList.filter(
            (vtuber) => vtuber.affiliation === affi && vtuber.type === null
          );
          return (
            <div key={index}>
              <Typography variant="body2" component="p" gutterBottom>
                {affi}
              </Typography>
              <Typography component="ui" className={classes.chips}>
                {filtered_vtuberList.map((vtuber) => {
                  return (
                    <li key={vtuber.name}>
                      <Chip
                        size="small"
                        className={classes.chip}
                        label={vtuber.name}
                        onClick={tagClick}
                      />
                    </li>
                  );
                })}
              </Typography>
            </div>
          );
        }
      )}
      <Typography variant="body2" component="p" gutterBottom>
        {"卒業したライバー"}
      </Typography>
      <Typography component="ui" className={classes.chips}>
        {vtuberList
          .filter((vtuber) => vtuber.type == "卒業")
          .map((vtuber) => {
            return (
              <li key={vtuber.name}>
                <Chip
                  size="small"
                  className={classes.chip}
                  label={vtuber.name}
                  onClick={tagClick}
                />
              </li>
            );
          })}
      </Typography>
    </div>
  );
}
