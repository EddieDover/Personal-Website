import { Grid, Card, CardHeader, Box, Typography, Link, LinearProgress, CardContent } from "@material-ui/core";
import React from "react";
import "./Wakatime.css";

class WakaBlock {
    src: string = "";
    title: string = "";
    type: string = "";

}

class WakatimeData {
    languages:string[] = [];
    wakablocks:WakaBlock[] = []
}

interface WakatimeState {
    loadedWakatimeData: boolean,
    wakatimeData: WakatimeData
}

interface WakatimeProps {}

export default class Wakatime extends React.Component<WakatimeProps, WakatimeState> {

    constructor(props:WakatimeProps) {
        super(props);
        this.state = {
            loadedWakatimeData:false,
            wakatimeData: new WakatimeData()
        }
    }

    componentDidMount() {
        fetch('https://www.eddiedover.net/api/wakatime')
        .then(response => response.json())
        .then(data => 
            {
                this.setState({
                    wakatimeData: data,
                    loadedWakatimeData:true,
                });
            }
        )
    }

    render() {
        return (
            <Grid item xs={12}>
              <Card>
                  <CardHeader className="cardTitle" title="Wakatime Stats"></CardHeader>
                  <Box m={2}>
                    <Typography component={'p'}>
                        A few of my projects are monitored with <Link target="_blank" rel="noopener" href='http://www.wakatime.com'>Wakatime</Link>!
                    </Typography>
                  </Box>
                  <div hidden={this.state.loadedWakatimeData}>
                      <Typography variant="h5">
                          Gathering Data...
                      </Typography>
                      <LinearProgress />
                  </div>
                  <CardContent>
                      <Grid container direction="row" justify="center" alignItems="center">
                        {
                            this.state.loadedWakatimeData && this.state.wakatimeData.wakablocks.map((item: any) => (
                                <Grid item xs={12} md={6} key={item.src}>
                                  <Card variant="outlined">
                                      <object type="image/svg+xml" data={item.src}>
                                          <img src={item.src} title={item.title} alt={item.title} />
                                      </object>
                                  </Card>
                                </Grid>
                            ))
                        }
                      </Grid>
                  </CardContent>
              </Card>
            </Grid>
        )
    }
}
  