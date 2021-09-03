import React from "react";
import useSWR from "swr";
import { useRecoilState, atom } from "recoil";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import { makeStyles } from "@material-ui/core/styles";
import { inputTagNameState } from "./editTagDialog";

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

export const tagListState = atom({
  key: "tagListState",
  default: []
});

export const tagListOpenState = atom({
  key: "tagListOpen",
  default: true
});

export default function CondidateTagList() {
  const classes = useStyles();
  const [tagList, setTagList] = useRecoilState(tagListState);
  const [open, setOpen] = useRecoilState(tagListOpenState);
  const [inputTagName, setInputTagName] = useRecoilState(inputTagNameState);
  const address = process.env.NEXT_PUBLIC_API_ADDRESS;
  const { data, error, isValidating } = useSWR(`${address}/tags`);

  if (data && tagList.length == 0) {
    setTagList([...data]);
  }

  const listClick = (TagName) => () => {
    setInputTagName(TagName);
    setOpen(false);
  }

  const reg = new RegExp(inputTagName);
  const filtered_tagList = inputTagName != "" ? tagList.filter(tag => tag.name.match(reg)) : []

  return filtered_tagList.length == 0 || !open ? null : (
    <div className={classes.root}>
      <List component="nav" aria-label="secondary mailbox folders">
        {filtered_tagList.slice(0, 5).map((tag) => (
          <React.Fragment key={tag.name}>
            <ListItem button onClick={listClick(tag.name)}>
              <ListItemText primary={tag.name} />
            </ListItem>
            <Divider />
          </React.Fragment>
        ))}
      </List>
    </div>
  );
}
