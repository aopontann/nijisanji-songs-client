import React, {useState} from 'react';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import InboxIcon from '@material-ui/icons/Inbox';
import DraftsIcon from '@material-ui/icons/Drafts';
import { all_videoListState, filtered_videoListState, thisPageState } from "./videoList";
import { searchCheckBoxState, searchValueState } from "./searchVideos";
import { searchScopeState } from './searchfilter';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: 360,
    marginLeft: "1rem",
    paddingTop: "0rem",
    backgroundColor: theme.palette.background.paper, // theme.palette.background.paper "lightPink"
  },
}));

export default function SearchList({ vtuberList }) {
  const all_videoList = useRecoilValue(all_videoListState);
  const searchScope = useRecoilValue(searchScopeState);
  const set_filtered_videoListState = useSetRecoilState(filtered_videoListState);
  const setThisPage = useSetRecoilState(thisPageState);
  const [searchValue, setSearchValue] = useRecoilState(searchValueState);
  const [resultList, setResultList] = useState([]);
  const classes = useStyles();

  const reg = new RegExp(searchValue);
  const filtered_list = searchValue != "" ? vtuberList.filter(vtuber => vtuber.readname.match(reg)) : [];
  console.log("searchList value=", searchValue);

  if (filtered_list.length > 0 && resultList.length == 0) {
    setResultList([...filtered_list]);
  }
  if (filtered_list.length == 0 && resultList.length > 0) {
    setResultList([]);
  }

  const listClick = (name) => () => {
    const reg = new RegExp(name);
    const result = all_videoList.filter(
      (video) =>
        (searchScope.title ? video.title.match(reg) : false) ||
        (searchScope.description ? video.description.match(reg) : false) ||
        (searchScope.tag ? video.tags.map((tagData) => tagData.name).includes(name) : false)
    );
    set_filtered_videoListState([...result]);
    setThisPage(1);
    console.log("name", name);
    setSearchValue(name);
  }

  return (
    <div className={classes.root}>
      <List component="nav" aria-label="secondary mailbox folders">
        {resultList.slice(0, 5).map(vtuber => (
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
