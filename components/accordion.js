import React from "react";
import { useRecoilState, useRecoilValue, atom } from "recoil";
import { filtered_videoListState } from "./videoList";
import { makeStyles } from "@material-ui/core/styles";
import TagList from "./tagList";
import VtuberList from "./vtuberList";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

export const tagsListExpandedState = atom({
  key: "tagsListExpandedState",
  default: false,
});

export const vtuberListExpandedState = atom({
  key: "vtuberListExpandedState",
  default: false,
});

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    marginBottom: "2rem"
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
}));

export default function TagVtuberAccordion({ tags, vtuberList }) {
  const [tagsListExpanded, set_tagsListExpanded] = useRecoilState(tagsListExpandedState);
  const [vtuberListExpanded, set_vtuberListExpanded] = useRecoilState(vtuberListExpandedState);
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Accordion expanded={tagsListExpanded} onChange={() => set_tagsListExpanded(!tagsListExpanded)}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography className={classes.heading}>タグ一覧</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <TagList tags={tags} />
        </AccordionDetails>
      </Accordion>
      <Accordion expanded={vtuberListExpanded} onChange={() => set_vtuberListExpanded(!vtuberListExpanded)}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <Typography className={classes.heading}>ライバー一覧</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <VtuberList vtuberList={vtuberList} />
        </AccordionDetails>
      </Accordion>
    </div>
  )
}
