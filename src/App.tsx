import React from 'react';
import { makeStyles, createStyles, Theme, Container, AppBar,
         Typography, Toolbar, Grid, useScrollTrigger, Zoom, Fab, Button } from '@material-ui/core';
import { ArrowUpward } from '@material-ui/icons';

import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

import {HashLink as Link } from 'react-router-hash-link';

import Articles from './components/Articles';
import Fun from './components/Fun';
import Wakatime from './components/Wakatime';
import HackerRank from './components/HackerRank';
import ThisSite from './components/ThisSite';
import AboutMe from './components/AboutMe';
import MyWork from './components/MyWork';
import Sitemap from './components/Sitemap';
import MySkills from './components/MySkills';
import ContactMe from './components/ContactMe';
import ReactGA from 'react-ga';

import "./App.css"

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
    tabLink: {
      color:"#fff",
      fontSize: "0.875rem",
      fontFamily: "Roboto Mono",
      fontWeight: 500,
      lineHeight: 1.75,
      textTransform: "uppercase",
      textDecorationLine: "none"
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


ReactGA.pageview('/homepage');

class ButtonData {
  buttonText:string;
  buttonLink:any;
  constructor(text:string, mainPage:boolean = true)
  {
    this.buttonText = text;
    const linktext = text.toLowerCase().replace(/ /g,"_");
    if (mainPage)
    {
      this.buttonLink = "/#" + linktext;
    } else {
      this.buttonLink = {pathname: "/" + linktext};
    }
  }
}

function App() {
  const classes = useStyles();

  const MenuItemButtons:ButtonData[] = [
    new ButtonData("Articles", false),
    new ButtonData("About Me"),
    new ButtonData("Contact Me", false),
    new ButtonData("My Work"),
    new ButtonData("My Skills"),
    new ButtonData("Fun"),
  ];

  return (
    <Router>
      <Container>
        <div className={classes.root}>
          <AppBar position="static">
            <Toolbar>
              <Typography id="top" variant="h4" component="h1" className={classes.title}>
                EddieDover.dev
              </Typography>
            </Toolbar>
            <Toolbar className={classes.tabBar}>
              {
                MenuItemButtons.map( (buttonitem: ButtonData) => (
                  <Button
                      component={Link}
                      variant="contained"
                      color="primary"
                      singlearticle="false"
                      disableElevation
                      to={ buttonitem.buttonLink}
                    >
                  {buttonitem.buttonText}
                  </Button>
                  ))
              }
            </Toolbar>
          </AppBar>
          <main role="main">
            <Switch>
              <Route exact path="/sitemapgen">
                <Sitemap/>
              </Route>
              <Route path="/articles">
                <Articles/>
              </Route>
              <Route path="/contact_me">
                <ContactMe/>
              </Route>
              <Route exact path="/">
                <Grid container spacing={3}>
                  <AboutMe />
                  <MyWork />
                  <ThisSite />
                  <MySkills />
                  <HackerRank  />
                  <Wakatime />
                  <Fun />
                </Grid>
              </Route>
            </Switch>
          </main>
          <footer className='footer'>
            <AppBar position="static">
              <Toolbar>
                <a href={process.env.PUBLIC_URL + 'sitemap.xml'}>Sitemap</a>&nbsp;&nbsp;
                <a rel="me" href="https://qoto.org/@EddieDover">Mastodon</a>
              </Toolbar>
            </AppBar>
          </footer>
        </div>
      </Container>
      <ScrollTop>
        <Fab color="primary" size="small" aria-label="scroll back to top">
          <ArrowUpward />
        </Fab>
      </ScrollTop>
    </Router>
  );
}

export default App;