import React, {useEffect, useState } from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import { makeStyles, createStyles, Theme, Container, AppBar,
         Typography, Toolbar, Button, Card, CardContent, CardHeader,
         Grid, LinearProgress, Link, Table, TableCell, TableContainer,
         TableHead, TableRow, Box, CircularProgress, withStyles, Tooltip,
         useScrollTrigger, Zoom, Fab } from '@material-ui/core';
import { ArrowUpward, GitHub, LinkedIn, Twitter } from '@material-ui/icons';

interface Props {
  children: React.ReactElement;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
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
    locButton: {
      marginBottom:"2px",
    },
    scrolltotop: {
      position:"fixed",
      bottom: theme.spacing(2),
      right:theme.spacing(2),
    },
    green: {
      color:"green",
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

const WeatherTooltip = withStyles((theme: Theme) => ({
  tooltip: {
    backgroundColor: theme.palette.common.white,
    maxWidth:220,
    color: 'rgba(1,1,1,1)',
    fontSize: theme.typography.pxToRem(12),
    border: '1px solid #dadde9',
  }
}))(Tooltip);

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
  const [githubData, setGithubData] = useState<any>();
  const [wakatimeData, setWakatimeData] = useState<any>();
  const [weatherData, setWeatherData] = useState<any>();
  const [destinyData, setDestinyData] = useState<any>();

  const classes = useStyles();
  const MenuItems = ["About Me", "My Work","Fun"];

  useEffect(() => {

    fetch('https://www.eddiedover.net/api/github')
    .then(response => response.json())
    .then(data => 
        {
            setGithubData(data);
        }
    )
    
    fetch('https://www.eddiedover.net/api/wakatime')
    .then(response => response.json())
    .then(data => 
        {
            setWakatimeData(data);
        }
    )

    fetch('https://www.eddiedover.net/api/weather')
    .then(response => response.json())
    .then(data => 
        {
            setWeatherData(data);
        }
    )

    fetch('https://www.eddiedover.net/api/destiny')
    .then(response => response.json())
    .then( data => 
      {
        setDestinyData(data);
      }
    )

  }, []);

  return (
    <>
    <Container>
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <Typography id="top" variant="h4" className={classes.title}>
              EddieDover.net
            </Typography>
          </Toolbar>
          <Toolbar className={classes.tabBar}>
            {
              MenuItems.map( (text, index) => (
              <Button href={"#"+text.toLowerCase().replace(/ /g,"_")} variant="contained" color="primary" disableElevation key={index}>{text}</Button>
            )
            )}
          </Toolbar>
        </AppBar>
        <main role="main">
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Typography id="about_me" align="center" component="h2" variant="h3">About Me</Typography>
            </Grid>
            <Grid item xs={12}>
              <Grid container direction="row" alignItems="center" justify="center" spacing={3}>
                <Grid item>
                  <Link href="https://linkedin.com/in/EddieDover" target="_blank" rel="noopener">
                    <LinkedIn fontSize="large" />
                  </Link>
                </Grid>
                <Grid item>
                  <Link href="https://github.com/EddieDover" target="_blank" rel="noopener">
                    <GitHub fontSize="large" />
                  </Link>
                </Grid>
                <Grid item>
                  <Link href="https://twitter.com/EddieDover" target="_blank" rel="noopener">
                    <Twitter fontSize="large" />
                  </Link>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Box m={2}>
                <Typography component="div">
                  I'm a software developer living in, 
                    {!weatherData && <><CircularProgress/><Typography>Las Vegas, Nevada</Typography></>}
                    {weatherData &&
                      <WeatherTooltip title={
                        <React.Fragment>
                          <Typography color="inherit">Las Vegas Weather</Typography>
                          {"Right now it's " + weatherData['current_temp'] + "F and " + weatherData["description"] + "." }
                        </React.Fragment>
                      }><Button className={classes.locButton} >[Las Vegas, Nevada]</Button>
                      </WeatherTooltip>
                    }
                </Typography>
                <Typography component="p">
                  I have over 25 years of experience designing and developing software. I started with BASIC and worked my way up to C/C++. My favorites are C# and ColdFusion, however these days I'm using mostly Python, Java, JavaScript, and TypeScript.
                </Typography>
                <Typography component="p">
                  According to my <Link href='http://www.wakatime.com'>Wakatime</Link> stats, the languages I've used the most in the past 30 days are:<br/>
                  <div hidden={wakatimeData != null}>
                      <Typography variant="h5">
                          Gathering Data...
                      </Typography>
                      <LinearProgress hidden={wakatimeData != null} />
                  </div>
                  { wakatimeData && <Typography component="p"> 
                    {wakatimeData.languages.join(", ") }
                  </Typography>}
                </Typography>
                <Typography component="p">
                  If you would like to know more about my work history, I highly suggest giving my <Link href="https://www.linkedin.com/in/EddieDover">Linked.In</Link> profile a visit.
                </Typography>
                <Typography component="p">
                  While I am happily employed <span className={classes.green}>I am also open to hearing about new opportunities</span>, so if any of my work interests you, please reach out.
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12}>
                <Typography id="my_work" align="center" component="h2" variant="h3" >My Work</Typography>
            </Grid>
            <Grid item xs={12} md={6}>
                <Card>
                    <CardHeader className={classes.cardTitle} title="Github Projects"></CardHeader>
                    <Box m={2}>
                      <Typography component={'p'}>
                          My public <Link target="_blank" rel="noopener" href="https://github.com/EddieDover">Github</Link> repositories are listed below.
                      </Typography>
                      <Typography  component={'p'}>
                          If you enjoy my work, I am available for <Link target="_blank" rel="noopener" href='https://github.com/sponsors/EddieDover'>Github Sponsorship.</Link>
                      </Typography>
                    </Box>
                    <div hidden={githubData != null}>
                        <Box m={2}>
                          <br/>
                          <Typography variant="h5" component={'p'}>
                              Gathering Data...
                          </Typography>
                        </Box>
                        <LinearProgress hidden={githubData != null} />
                    </div>
                    <CardContent>
                        <List>
                            {githubData != null && githubData!.repos.map( (repo:any) => (
                                <ListItem divider={true} key={repo.name} alignItems="flex-start">
                                    <Typography component='div'>
                                        {repo.name} - {repo.description}<br/>
                                        <b>Total Commits Made</b>: {repo.commits}<br/>
                                        <b>Assigned Issues</b>: {repo.issues.length}/{repo.open_issues_count}<br/>
                                        <Button target="_blank" rel="noopener" href={repo.url} size="small" color="primary" aria-label={"go to project page for " + repo.name }>
                                            Visit Project Page
                                        </Button>
                                    </Typography>
                                </ListItem>
                            ))}
                        </List>
                      </CardContent>
                </Card>
            </Grid>
            <Grid item xs={12} md={6}>
                <Card>
                    <CardHeader  className={classes.cardTitle} title="This Site"></CardHeader>
                    <Box m={2}>
                      <Typography component={'p'}>
                          This site is open-source and may be found <Link target="_blank" rel="noopener" href="https://www.github.com/EddieDover/personal-website/">here</Link>.
                      </Typography>
                      <Typography component={'p'}>
                          It uses a combination of the following technologies:
                      </Typography>
                    </Box>
                    <TableContainer>
                        <Table aria-label="site technology table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Backend</TableCell>
                                    <TableCell>Frontend</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell><Link target="_blank" rel="noopener" href="https://www.python.org/">Python</Link></TableCell>
                                    <TableCell><Link target="_blank" rel="noopener" href="https://www.typescriptlang.org/">Typescript</Link></TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell><Link target="_blank" rel="noopener" href="https://flask.palletsprojects.com/en/1.1.x/">Flask</Link></TableCell>
                                    <TableCell><Link target="_blank" rel="noopener" href="https://reactjs.org/">React</Link></TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell></TableCell>
                                    <TableCell><Link target="_blank" rel="noopener" href="https://material-ui.com/">Material-UI</Link></TableCell>
                                </TableRow>
                            </TableHead>
                        </Table>
                    </TableContainer>
                    <Box m={2}>
                      <Typography component={'p'}>
                          All data that the backend gathers (github projects, etc,.) is cached and updated every 12 hours.<br/>
                          I do my best to make sure that the site is Accessbility compliant, using tools like <Link target="_blank" rel="noopener" href="https://www.deque.com/axe/">Axe</Link>.
                      </Typography>
                    </Box>
                </Card>
            </Grid>
            <Grid item xs={12}>
              <Card>
                  <CardHeader className={classes.cardTitle} title="Wakatime Stats"></CardHeader>
                  <Box m={2}>
                    <Typography component={'p'}>
                        A few of my projects are monitored with <Link target="_blank" rel="noopener" href='http://www.wakatime.com'>Wakatime</Link>!
                    </Typography>
                  </Box>
                  <div hidden={wakatimeData != null}>
                      <Typography variant="h5">
                          Gathering Data...
                      </Typography>
                      <LinearProgress hidden={wakatimeData != null} />
                  </div>
                  <CardContent>
                      <Grid 
                          container
                          direction="row"
                          justify="center"
                          alignItems="center"
                      >
                      {wakatimeData && wakatimeData.wakablocks.map( (item:any) => (
                              <Grid item xs={12} md={6} key={item.src} >
                                  <object type="image/svg+xml" data={item.src}>
                                      <img src={item.src} title={item.title} alt={item.title} />
                                  </object>
                              </Grid>
                      ))}
                      </Grid>
                  </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12}>
                <Typography id="fun" align="center" component="h2" variant="h3" >Fun</Typography>
            </Grid>
            <Grid item xs={12}>
              <Card>
              <Box m={2}>
                <Typography>
                  Believe it or not, I'm not always working on code. Sometimes, I like to unwind.
                  Below, I'll list some of my favorite things to do, only if I can find a way to interact
                  with their data in a 'development' manner, such as with a public API.
                </Typography>
              </Box>

              <Grid 
              container
              direction="row"
              justify="flex-start"
              alignItems="flex-start">
                <Grid item xs={12} md={6}>
                  <Card>
                    <CardHeader className={classes.cardTitle} title="Destiny 2"></CardHeader>
                    <CardContent>
                      <div hidden={destinyData != null}>
                        <Typography variant="h5">
                            Gathering Data...
                        </Typography>
                        <LinearProgress hidden={destinyData != null} />
                      </div>
                      {destinyData && <>
                      <Box m={3}>
                        <Typography>
                          I've enjoyed the Destiny franchise, through all of it's massive ups and downs, since the Destiny 1 Alpha on the Playstation.
                        </Typography>
                        <Typography>
                          I have played a total of {destinyData.total_hours_played} hours and I have reached LightLevel {destinyData.lightlevel}.<br/>
                          My last play session was {destinyData.playedLast.Hours >  0 ? destinyData.playedLast.Hours + " and " : ''} {destinyData.playedLast.Minutes} minutes long.
                        </Typography>
                      </Box>
                      </>}
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>
              </Card>
            </Grid>
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