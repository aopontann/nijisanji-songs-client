import React from "react";
import { useRecoilState } from "recoil";
import {
  videoListState,
  searchValueState,
  searchCheckBoxState,
} from "../src/atoms";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
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
        video.tags.map((tagData) => tagData.tag.name).includes(searchValue)
    );
    setVideoList([...result]);
  };

  return (
    <div>
      {["にじさんじ", "NIJISANJI KR", "NIJISANJI ID", "NIJISANJI EN"].map(
          (affi) => {
            const filtered_vtuberList = vtuberList.filter(
              (vtuber) => vtuber.affiliation === affi && vtuber.type === null
            );
            return (
              <div>
                <Typography variant="body2" component="p" gutterBottom>
                  {affi}
                </Typography>
                <Typography component="ui" className={classes.chips}>
                  {filtered_vtuberList.map((vtuber) => {
                    return (
                      <li>
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
                <li>
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
  /*
  return videoList.length == 0 ? (
    <Card style={{ maxWidth: "700px", marginTop: "1rem" }}>
      <CardContent>
        <Typography variant="body" component="p" gutterBottom>
          ライバー一覧
        </Typography>
        {["にじさんじ", "NIJISANJI KR", "NIJISANJI ID", "NIJISANJI EN"].map(
          (affi) => {
            const filtered_vtuberList = vtuberList.filter(
              (vtuber) => vtuber.affiliation === affi && vtuber.type === null
            );
            return (
              <div>
                <Typography variant="body2" component="p" gutterBottom>
                  {affi}
                </Typography>
                <Typography component="ui" className={classes.chips}>
                  {filtered_vtuberList.map((vtuber) => {
                    return (
                      <li>
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
                <li>
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
      </CardContent>
    </Card>
  ) : (
    <div></div>
  );
  */
}
