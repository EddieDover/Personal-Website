import { Box, Button, CircularProgress, Grid, LinearProgress, Link, Theme, Tooltip, Typography, withStyles } from "@material-ui/core";
import { LinkedIn, GitHub, Twitter } from "@material-ui/icons";
import React from "react";
import './AboutMe.css';

class coord_data {
  lat: number = 0;
  lon: number = 0;

  constructor(lat:number=0, lon:number=0) {
      this.lat = lat;
      this.lon = lon;
  }
}

class WakatimeData {
  languages: string[];
  wakablocks: string[];

  constructor(languages:string[] = [], wakablocks: string[] = []) {
      this.languages = languages;
      this.wakablocks = wakablocks;
  }

}
class WeatherData {

  coord: coord_data;
  current_temp: number;
  description:string;

  constructor(coord:coord_data = new coord_data(), current_temp:number = 0, description:string = "") {
      this.coord = coord;
      this.current_temp = current_temp;
      this.description = description;
  }
}

interface AboutMeProps {
}

interface AboutMeState {
    loadedWeatherData: boolean,
    loadedWakatimeData: boolean,
    weatherData: WeatherData,
    wakatimeData: WakatimeData
}

const WeatherTooltip = withStyles((theme: Theme) => ({
    tooltip: {
      backgroundColor: theme.palette.common.white,
      maxWidth:220,
      color: 'rgba(1,1,1,1)',
      fontSize: theme.typography.pxToRem(12),
      border: '1px solid #dadde9',
    }
  }))(Tooltip);

export default class AboutMe extends React.Component<AboutMeProps,AboutMeState> {

    constructor(props:AboutMeProps) {
        super(props);
        this.state = {
            weatherData: new WeatherData(),
            wakatimeData: new WakatimeData(),
            loadedWeatherData: false,
            loadedWakatimeData: false,
        }
    }

    componentDidMount() {
        fetch('https://www.eddiedover.net/api/weather')
        .then(response => response.json())
        .then(data => 
            {
                this.setState({
                    weatherData:data,
                    loadedWeatherData:true,
                });
            }
        )

        fetch('https://www.eddiedover.net/api/wakatime')
        .then(response => response.json())
        .then(data => 
            {
                this.setState({
                    wakatimeData:data,
                    loadedWakatimeData:true,
                });
            }
        )
    }

    render() {
        return (
            <>
            <Grid item xs={12}>
                <Typography id="about_me" align="center" component="h2" variant="h3">About Me</Typography>
                </Grid>
            <Grid item xs={12}>
                <Grid container direction="row" alignItems="center" justify="center" spacing={3}>
                    <Grid item>
                    <Link href="https://linkedin.com/in/EddieDover" target="_blank" rel="noopener" aria-label="LinkedIn profile">
                        <LinkedIn fontSize="large" />
                    </Link>
                    </Grid>
                    <Grid item>
                    <Link href="https://github.com/EddieDover" target="_blank" rel="noopener" aria-label="Github profile">
                        <GitHub fontSize="large" />
                    </Link>
                    </Grid>
                    <Grid item>
                    <Link href="https://hackerrank.com/edover" target="_blank" rel="noopener" aria-label="HackerRank profile">
                        <i className="fab fa-hackerrank fa-3x"></i>
                    </Link>
                    </Grid>
                    <Grid item>
                    <Link href="https://qoto.org/@EddieDover" target="_blank" rel="noopener" aria-label="Mastadon page">
                        <Twitter fontSize="large" />
                    </Link>
                    </Grid>
                </Grid>
                </Grid>
            <Grid item xs={12}>
              <Box m={2}>
                <Typography component="div">
                  I'm a software developer living in, 
                    {!this.state.loadedWeatherData && <><CircularProgress/><Typography>Las Vegas, Nevada</Typography></>}
                    {this.state.loadedWeatherData &&
                      <WeatherTooltip title={
                        <React.Fragment>
                          <Typography color="inherit">Las Vegas Weather</Typography>
                          {"Right now it's " + this.state.weatherData.current_temp + "F and " + this.state.weatherData.description + "." }
                        </React.Fragment>
                      }><Button className="locButton" >[Las Vegas, Nevada]</Button>
                      </WeatherTooltip>
                    }
                    and I have over 25 years of experience.
                </Typography>
                <Typography component="div">
                  According to my <Link href='http://www.wakatime.com'>Wakatime</Link> stats, the languages I've used the most in the past 30 days are:<br/>
                  <div hidden={this.state.loadedWakatimeData === true}>
                      <Typography variant="h5" component="div">
                          Gathering Data...
                      </Typography>
                      <LinearProgress hidden={this.state.wakatimeData != null} />
                  </div>
                    {this.state.loadedWakatimeData && <Typography component="div"> 
                    [{this.state.wakatimeData.languages.join(", ") }]
                  </Typography>}
                </Typography>
                <Typography component="div">
                  While I am happily employed <span className="green">I am also open to hearing about new opportunities</span>, so if any of my work interests you, please reach out.
                </Typography>
                <Typography component="div">
                  If you would like to know more about my work history, I highly suggest giving my <Link href="https://www.linkedin.com/in/EddieDover">Linked.In</Link> profile a visit.
                </Typography>
              </Box>
            </Grid>
            </>
        ) 
    }
}