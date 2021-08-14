import React from "react";
import { useRecoilState } from "recoil";
import { videoListState } from "../src/atoms";
import { makeStyles } from "@material-ui/core/styles";
import TagList from "./tagList";
import VtuberList from "./vtuberList";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
}));

export default function TagVtuberAccordion({ videos, tags, vtuberList }) {
  const [videoList, setVideoList] = useRecoilState(videoListState);
  const classes = useStyles();
  return videoList.length == 0 ? (
    <div className={classes.root}>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography className={classes.heading}>タグ一覧</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <TagList videos={videos} tags={tags} />
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <Typography className={classes.heading}>ライバー一覧</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <VtuberList videos={videos} vtuberList={vtuberList} />
        </AccordionDetails>
      </Accordion>
    </div>
  ) : (
    <div>{null}</div>
  );
}
