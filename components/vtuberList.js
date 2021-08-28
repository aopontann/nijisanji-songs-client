import React from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import { all_videoListState, filtered_videoListState } from "./videoList";
import { searchCheckBoxState, searchValueState } from "./searchVideos";
import { vtuberListExpandedState } from "./accordion";
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

export default function VtuberList({ videos, vtuberList }) {
  const all_videoList = useRecoilValue(all_videoListState);
  const searchCheckBox = useRecoilValue(searchCheckBoxState);
  const set_filtered_videoListState = useSetRecoilState(filtered_videoListState);
  const set_vtuberListExpandedState = useSetRecoilState(vtuberListExpandedState);
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
  )
}
