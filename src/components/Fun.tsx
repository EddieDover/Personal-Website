import { Grid, Typography, Card, Box, CardHeader, CardContent, LinearProgress } from "@material-ui/core";
import React from "react";
import "./Fun.css";

class DestinyPlayedLast {
  Hours: number = 0;
  Minutes: number = 0;
}

class DestinyData {
  lightlevel: number = 0;
  total_hours_played: number = 0;
  playedLast: DestinyPlayedLast = new DestinyPlayedLast();
}

interface FunProps {}
interface FunState {
    destinyData: DestinyData;
    loadedDestinyData: boolean;
}

export default class Fun extends React.Component<FunProps, FunState> {

    constructor(props:FunProps) {
        super(props);
        this.state = {
            loadedDestinyData: false,
            destinyData: new DestinyData()
        }
    }

    componentDidMount() {
        fetch("https://www.eddiedover.net/api/destiny")
        .then(response => response.json())
        .then(data=> {
            this.setState({
                destinyData: data,
                loadedDestinyData:true
            })
        })
    }

    render() {
        return (
            <>
            <Grid item xs={12}>
                <Typography id="fun" align="center" component="h2" variant="h3">Fun</Typography>
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

              <Grid container direction="row" justify="flex-start" alignItems="flex-start">
                <Grid item xs={12} md={6}>
                  <Card>
                    <CardHeader className="cardTitle" title="Destiny 2"></CardHeader>
                    <CardContent>
                      <div hidden={this.state.loadedDestinyData}>
                        <Typography variant="h5">
                            Gathering Data...
                        </Typography>
                        <LinearProgress hidden={this.state.loadedDestinyData} />
                      </div>
                      {this.state.loadedDestinyData && <>
                      <Box m={3}>
                        <Typography>
                          I've enjoyed the Destiny franchise, through all of it's massive ups and downs, since the Destiny 1 Alpha on the PlayStation.
                        </Typography>
                        <Typography>
                          I have played a total of {this.state.destinyData.total_hours_played} hours and I have reached LightLevel {this.state.destinyData.lightlevel}.<br />
                          My last play session was {this.state.destinyData.playedLast.Hours > 0 ? this.state.destinyData.playedLast.Hours + " hour(s) and " : ''} {this.state.destinyData.playedLast.Minutes} minutes long.
                        </Typography>
                      </Box>
                      </>}
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>
              </Card>
            </Grid>
        </>
        )
    }
}
