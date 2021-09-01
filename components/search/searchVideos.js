import React from "react";
import {
  useRecoilState,
  useRecoilValue,
  useSetRecoilState,
  atom,
} from "recoil";
import {
  all_videoListState,
  filtered_videoListState,
  thisPageState,
} from "../videoList";
import { makeStyles } from "@material-ui/styles";
import Paper from "@material-ui/core/Paper";
import ClearIcon from "@material-ui/icons/Clear";
import FilterListIcon from "@material-ui/icons/FilterList";
import IconButton from "@material-ui/core/IconButton";
import Search from "@material-ui/icons/Search";
import Divider from "@material-ui/core/Divider";
import InputBase from "@material-ui/core/InputBase";
import { get_time } from "../../lib/get_times";

import CondidateList, { condidateListState } from "./condidateList";
import SearchFilter, { searchScopeState, orderState, sortVideos } from "./searchfilter";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: "2px 4px",
    display: "flex",
    alignItems: "center",
    maxWidth: 700,
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
  divider: {
    height: 28,
    margin: 4,
  },
}));

export const searchValueState = atom({
  key: "searchValueState",
  default: "",
});

export default function SearchVideos({ time, vtuberList }) {
  // APIから取得した全ての動画データ
  const all_videoList = useRecoilValue(all_videoListState);
  // 条件にあった動画を保存 videoListで表示される
  const set_filtered_videoList = useSetRecoilState(filtered_videoListState);
  const setThisPage = useSetRecoilState(thisPageState);
  const setCondidateList = useSetRecoilState(condidateListState);
  const [searchValue, setSearchValue] = useRecoilState(searchValueState);
  const searchScope = useRecoilValue(searchScopeState);
  const order = useRecoilValue(orderState);
  const [searchFilterOpen, setSearchFilterOpen] = React.useState(false);
  const classes = useStyles();

  const searchClick = () => {
    const clickTime = get_time({ format: "YYYY-MM-DD" });
    clickTime > time ? window.alert("ページを更新してください") : "";
    const reg = new RegExp(searchValue);
    const result = searchValue
      ? all_videoList.filter(
          (video) =>
            (searchScope.title ? video.title.match(reg) : false) ||
            (searchScope.description ? video.description.match(reg) : false) ||
            (searchScope.tag ? video.tags.map((tag) => tag.name).includes(searchValue) : false)
        )
      : [...all_videoList];
    const sortedVideos = sortVideos({order, videos: result});
    set_filtered_videoList([...sortedVideos]);
    setThisPage(1);
  };

  const searchChange = (event) => {
    setSearchValue(event.target.value);
    searchFilterOpen ? setSearchFilterOpen(false) : ""
    const reg = new RegExp(event.target.value);
    const filtered_list =
    event.target.value != ""
      ? vtuberList.filter((vtuber) => vtuber.readname.match(reg) || vtuber.name.match(reg))
      : [];
    setCondidateList([...filtered_list]);
  };

  const searchDelete = () => {
    setSearchValue("");
    setThisPage(1);
    const sortedVideos = sortVideos({order, videos: [...all_videoList]});
    set_filtered_videoList([...sortedVideos]);
  };

  return (
    <Paper component="div" style={{ maxWidth: "700px", marginBottom: "2rem" }}>
      <Paper component="form" className={classes.root}>
        <IconButton
          className={classes.iconButton}
          aria-label="search"
          onClick={searchClick}
        >
          <Search />
        </IconButton>
        <InputBase
          className={classes.input}
          placeholder="曲名,ライバー名,タグ..."
          inputProps={{ "aria-label": "Search Videos" }}
          value={searchValue}
          onChange={searchChange}
        />
        {searchValue ? (
          <IconButton
            className={classes.iconButton}
            aria-label="delete"
            onClick={searchDelete}
          >
            <ClearIcon />
          </IconButton>
        ) : (
          ""
        )}
        <Divider className={classes.divider} orientation="vertical" />
        <IconButton
          className={classes.iconButton}
          aria-label="filter"
          onClick={() => {
            setSearchFilterOpen(!searchFilterOpen);
            setCondidateList([])
          }}
        >
          <FilterListIcon color={searchFilterOpen ? "primary" : "default"}/>
        </IconButton>
      </Paper>
      { searchFilterOpen ? <SearchFilter /> : null }
      <CondidateList vtuberList={vtuberList}/>
    </Paper>
  );
}
