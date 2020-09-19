import { Grid, Card, CardHeader, Box, Typography, Link, CardContent } from "@material-ui/core";
import React from "react";
import ModalImage from "react-modal-image";
import "./HackerRank.css";

interface HackerRankProps {}
interface HackerRankState {}

export default class HackerRank extends React.Component<HackerRankProps, HackerRankState> {

    certs = [
        {
          "img":process.env.PUBLIC_URL + "/certs/js_basic.jpg",
          "alt": "Javascripts Certification from HackerRank"
        },
        {
          "img":process.env.PUBLIC_URL + "/certs/ps_basic.jpg",
          "alt": "Problem Solving Certification from HackerRank"
        },
        {
          "img":process.env.PUBLIC_URL + "/certs/python_basic.jpg",
          "alt": "Python 3 Certification from HackerRank"
        },
        {
          "img":process.env.PUBLIC_URL + "/certs/java_basic.jpg",
          "alt": "Java Certification from HackerRank"
        },
        {
          "img":process.env.PUBLIC_URL + "/certs/react_basic.jpg",
          "alt": "React Certification from HackerRank"
        },
        {
          "img":process.env.PUBLIC_URL + "/certs/rest_int.jpg",
          "alt": "Restful A.P.I. Certification from HackerRank"
        },
      ]

    render() {
        return (
            <Grid item xs={12}>
                <Card>
                    <CardHeader className="cardTitle" title="HackerRank"></CardHeader>
                    <Box m={2}>
                      <Typography> I also enjoy a little <Link href="https://hackerrank.com/edover" target="_blank" rel="noopener" aria-label="HackerRank profile">HackerRank</Link> from time to time.</Typography>
                    </Box>
                    <CardContent>
                      <Grid container>
                        {
                          this.certs.map( (cert, idx) => (
                            <ModalImage key={idx} className="cert" small={cert.img} large={cert.img} alt={cert.alt} />
                          ))
                        }
                      </Grid>
                    </CardContent>
                  </Card>
            </Grid>
        )
    }
}
  