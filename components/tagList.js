import React from "react";
import { useRecoilState } from "recoil";
import { videoListState, searchValueState } from "../src/atoms";
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

export default function TagList({ tags }) {
  const [videoList, setVideoList] = useRecoilState(videoListState);
  const [searchValue, setSearchValue] = useRecoilState(searchValueState);
  const classes = useStyles();

  const tagClick = (event) => {
    setSearchValue(event.target.textContent);
  };

  return videoList.length == 0 ? (
    <Card style={{ maxWidth: "700px" }}>
      <CardContent>
        <Typography variant="body2" component="p" gutterBottom>
          タグ
        </Typography>
        <Typography component="ui" className={classes.chips}>
          {tags.map((tag) => {
            return (
              <li>
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
      </CardContent>
    </Card>
  ) : (
    <div></div>
  );
}
