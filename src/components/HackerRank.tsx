import { Grid, Card, CardHeader, Box, Typography, Link, CardContent } from "@material-ui/core";
import React from "react";
import {SRLWrapper} from 'simple-react-lightbox';
//import ModalImage from "react-modal-image";
import "./HackerRank.css";

interface HackerRankProps {}
interface HackerRankState {}

export default class HackerRank extends React.Component<HackerRankProps, HackerRankState> {
    certs = [
        {
          "img":process.env.PUBLIC_URL + "/certs/js_basic.jpg",
          "thumb": process.env.PUBLIC_URL + "/certs/js_basic_lntesx_c_scale,w_454.jpg",
          "alt": "Javascripts Certification from HackerRank"
        },
        {
          "img":process.env.PUBLIC_URL + "/certs/ps_basic.jpg",
          "thumb": process.env.PUBLIC_URL + "/certs/ps_basic_lmiobq_c_scale,w_486.jpg",
          "alt": "Problem Solving Certification from HackerRank"
        },
        {
          "img":process.env.PUBLIC_URL + "/certs/python_basic.jpg",
          "thumb": process.env.PUBLIC_URL + "/certs/python_basic_ohppbv_c_scale,w_471.jpg",
          "alt": "Python 3 Certification from HackerRank"
        },
        {
          "img":process.env.PUBLIC_URL + "/certs/java_basic.jpg",
          "thumb": process.env.PUBLIC_URL + "/certs/java_basic_kaugay_c_scale,w_471.jpg",
          "alt": "Java Certification from HackerRank"
        },
        {
          "img":process.env.PUBLIC_URL + "/certs/react_basic.jpg",
          "thumb": process.env.PUBLIC_URL + "/certs/react_basic_k6vrjx_c_scale,w_471.jpg",
          "alt": "React Certification from HackerRank"
        },
        {
          "img":process.env.PUBLIC_URL + "/certs/rest_int.jpg",
          "thumb": process.env.PUBLIC_URL + "/certs/rest_int_hszuod_c_scale,w_485.jpg",
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
                        <SRLWrapper>
                        {
                          this.certs.map( (cert, idx) => (
                            // <ModalImage key={idx} className="cert" small={cert.thumb} large={cert.img} alt={cert.alt} />
                            <a href={cert.img}>
                              <img width="200" height="150" src={cert.thumb} alt={cert.alt}/>
                            </a>
                          ))
                        }
                        </SRLWrapper>
                      </Grid>
                    </CardContent>
                  </Card>
            </Grid>
        )
    }
}
  