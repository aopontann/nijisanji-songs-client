import React, { useState } from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState, atom } from "recoil";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import InboxIcon from "@material-ui/icons/Inbox";
import DraftsIcon from "@material-ui/icons/Drafts";
import {
  all_videoListState,
  filtered_videoListState,
  thisPageState,
} from "../videoList";
import { searchValueState } from "./searchVideos";
import { searchScopeState, orderState, sortVideos } from "./searchfilter";

export const condidateListState = atom({
  key: "condidateListState",
  default: []
});

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: 360,
    marginLeft: "1rem",
    paddingTop: "0rem",
    marginTop: "0.1rem",
    backgroundColor: theme.palette.background.paper, // theme.palette.background.paper "lightPink"
  },
}));

export default function CondidateList({ vtuberList }) {
  const all_videoList = useRecoilValue(all_videoListState);
  const searchScope = useRecoilValue(searchScopeState);
  const order = useRecoilValue(orderState);
  const set_filtered_videoList = useSetRecoilState(
    filtered_videoListState
  );
  const setThisPage = useSetRecoilState(thisPageState);
  const [searchValue, setSearchValue] = useRecoilState(searchValueState);
  const [condidateList, setCondidateList] = useRecoilState(condidateListState);
  const classes = useStyles();

  const listClick = (name) => () => {
    const reg = new RegExp(name);
    const result = all_videoList.filter(
      (video) =>
        (searchScope.title ? video.title.match(reg) : false) ||
        (searchScope.description ? video.description.match(reg) : false) ||
        (searchScope.tag
          ? video.tags.map((tagData) => tagData.name).includes(name)
          : false)
    );
    const sortedVideos = sortVideos({order, videos: result});
    set_filtered_videoList([...sortedVideos]);
    setThisPage(1);
    setCondidateList([]);
    setSearchValue(name);
  };

  return condidateList.length == 0 ? null : (
    <div className={classes.root}>
      <List component="nav" aria-label="secondary mailbox folders">
        {condidateList.slice(0, 5).map((vtuber) => (
          <React.Fragment key={vtuber.name}>
            <ListItem button onClick={listClick(vtuber.name)}>
              <ListItemText primary={vtuber.name} />
            </ListItem>
            <Divider />
          </React.Fragment>
        ))}
      </List>
    </div>
  );
}

/*
[
    {
        "id": "UC0WwEfE-jOM2rzjpdfhTzZA",
        "name": "愛園愛美",
        "readname": "あいぞのまなみ",
        "affiliation": "にじさんじ",
        "birthday": "1108",
        "type": null,
        "image": null
    },
]
*/
