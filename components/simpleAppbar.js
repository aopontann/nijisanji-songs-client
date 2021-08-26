import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import HomeIcon from "@material-ui/icons/Home";
import DescriptionIcon from "@material-ui/icons/Description";
import ScheduleIcon from "@material-ui/icons/Schedule";
import StarIcon from "@material-ui/icons/Star";
import HelpIcon from "@material-ui/icons/Help";
import Link from "next/link";
import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";

const drawerWidth = 205;

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
}));

export default function ButtonAppBar({ children }) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const tag_name = ["ホーム", "サイトについて", "公開予定", "ランキング"];
  const tag_path = ["/", "/about", "/schedule", "/ranking"];
  const tag_icons = [
    <HomeIcon />,
    <DescriptionIcon />,
    <ScheduleIcon />,
    <StarIcon />,
  ];

  return (
    <div className={classes.root}>
      <AppBar position="sticky">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
            onClick={handleDrawerOpen}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            にじ歌まとめ(仮)
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        anchor="left"
        open={open}
        onClose={handleDrawerClose}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div
          role="presentation"
          onClick={handleDrawerClose}
          onKeyDown={handleDrawerClose}
        >
          <List>
            {["ホーム", "サイトについて", "公開予定", "ランキング"].map(
              (text, index) => (
                <Link href={tag_path[index]} key={text}>
                  <ListItem button key={text}>
                    <ListItemIcon>{tag_icons[index]}</ListItemIcon>
                    <ListItemText primary={text} />
                  </ListItem>
                </Link>
              )
            )}
          </List>
          <Divider />
          <List>
            <Link href="/contact">
              <ListItem button key="問い合わせ">
                <ListItemIcon>
                  <HelpIcon />
                </ListItemIcon>
                <ListItemText primary="問い合わせ" />
              </ListItem>
            </Link>
          </List>
        </div>
      </Drawer>
      <Container>
        <Box my={2}>{children}</Box>
      </Container>
    </div>
  );
}
