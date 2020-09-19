import React from 'react';
import { makeStyles, createStyles, Theme, Container, AppBar,
         Typography, Toolbar, Grid, useScrollTrigger, Zoom, Fab, Button } from '@material-ui/core';
import { ArrowUpward } from '@material-ui/icons';
import Fun from './components/Fun';
import Wakatime from './components/Wakatime';
import HackerRank from './components/HackerRank';
import ThisSite from './components/ThisSite';
import AboutMe from './components/AboutMe';
import MyWork from './components/MyWork';

interface Props {
  children: React.ReactElement;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    cert: {
      width:"300px",
    },
    accordion:{
      width:"80%",
    },
    accordion_header: {
      fontSize: theme.typography.pxToRem(15),
      fontWeight: theme.typography.fontWeightRegular,
    },
    tabBar: {
      display: "flex",
      flexDirection: "row",
      flexWrap: "nowrap",
      justifyContent: "center"
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    cardTitle: {
      textAlign:"center",
    },
    hireable: {
      color:"green",
    },
    title: {
      flexGrow: 1,
      textAlign:"center"
    },
    tabPanel: {
      marginTop:"110px"
    },
    scrolltotop: {
      position:"fixed",
      bottom: theme.spacing(2),
      right:theme.spacing(2),
    },
    contact_form: {
      width:"100%",
      marginLeft: theme.spacing(5),
      marginRight: theme.spacing(5),
      marginBottom: theme.spacing(10),
    },
    topRightBanner: {
      position: "absolute",
      right: "-5px",
      top: "-10px",
      display: "block",
      height: "125px",
      width: "125px",
      backgroundImage: "url(hireable.png)",
      backgroundRepeat: "no-repeat",
      backgroundSize: "130px 130px",
      textIndent: "-999em",
      textDecoration: "none",
      zIndex:1111,
    }
  }),
);


function ScrollTop(props: Props) {
  const { children } = props;
  const classes = useStyles();
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 100,
  });

  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    const anchor = ((event.target as HTMLDivElement).ownerDocument || document).querySelector(
      '#top',
    );

    if (anchor) {
      anchor.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  return (
    <Zoom in={trigger}>
      <div onClick={handleClick} role="presentation" className={classes.scrolltotop}>
        {children}
      </div>
    </Zoom>
  );
}


function App() {
  const classes = useStyles();
  const MenuItems = ["About Me", "My Work", "Fun"];

  return (
    <>
    <Container>
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <Typography id="top" variant="h4" component="h1" className={classes.title}>
              EddieDover.net
            </Typography>
          </Toolbar>
          <Toolbar className={classes.tabBar}>
            {
              MenuItems.map( (text, index) => (
              <Button href={"#"+text.toLowerCase().replace(/ /g,"_")} variant="contained" color="primary" disableElevation key={index}>{text}</Button>
              ))
            }
          </Toolbar>
        </AppBar>
        <main role="main">
          <Grid container spacing={3}>
            <AboutMe />
            <MyWork />
            <ThisSite />
            <HackerRank  />
            <Wakatime />
            <Fun />
          </Grid>
        </main>
      </div>
    </Container>
    <ScrollTop>
      <Fab color="primary" size="small" aria-label="scroll back to top">
        <ArrowUpward />
      </Fab>
    </ScrollTop>
    </>
  );
}

export default App;