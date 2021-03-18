import { Grid, Card, CardHeader, Box, Typography, Link, TableContainer, Table, TableHead, TableRow, TableCell } from "@material-ui/core";
import React from "react";
import "./ThisSite.css";

export default class ThisSite extends React.Component {

    render() {
        return (
            <Grid item xs={12} md={6}>
                <Card>
                    <CardHeader className="cardTitle" title="This Site"></CardHeader>
                    <Box m={2}>
                      <Typography component={'p'}>
                          This site is open-source and may be found on <Link target="_blank" rel="noopener" href="https://www.github.com/EddieDover/personal-website/">My Github</Link>.
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
                                    <TableCell>&nbsp;</TableCell>
                                    <TableCell><Link target="_blank" rel="noopener" href="https://material-ui.com/">Material-UI</Link></TableCell>
                                </TableRow>
                            </TableHead>
                        </Table>
                    </TableContainer>
                    <Box m={2}>
                      <Typography component={'p'}>
                          All data that the backend gathers (github projects, etc,.) is cached and updated every 12 hours.<br />
                          I do my best to make sure that the site is Accessbility compliant, using tools like <Link target="_blank" rel="noopener" href="https://www.deque.com/axe/">Axe</Link>.
                      </Typography>
                    </Box>
                </Card>
            </Grid>
        )
    }
}
  