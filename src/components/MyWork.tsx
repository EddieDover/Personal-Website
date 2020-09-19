import { Grid, Typography, Card, CardHeader, Box, Link,
         LinearProgress, CardContent, List, ListItem, Button } from "@material-ui/core";
import React from "react";
import './MyWork.css';

class GithubRepo {
    name: string = "";
    description: string = "";
    commits: number = 0;
    issues: string[] = [];
    open_issues_count: number = 0;
    url: string = "";
}

class GithubData {
    repos: GithubRepo[] = [];
}

interface MyWorkProps {}
interface MyWorkState {
  loadedGithubData: boolean;
  githubData: GithubData;
}

export default class MyWork extends React.Component<MyWorkProps, MyWorkState> {
  constructor(props: MyWorkProps) {
    super(props);
    this.state = {
      loadedGithubData: false,
      githubData: new GithubData()
    };
  }

  componentDidMount() {
    fetch('https://www.eddiedover.net/api/github')
    .then(response => response.json())
    .then(data => {
      this.setState({
        githubData: data,
        loadedGithubData: true
      });
    });
  }

  render() {
    return (
            <>
                <Grid item xs={12}>
                    <Typography id="my_work" align="center" component="h2" variant="h3">My Work</Typography>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Card>
                        <CardHeader className="cardTitle" title="Github Projects"></CardHeader>
                        <Box m={2}>
                        <Typography component={'p'}>
                            My public <Link target="_blank" rel="noopener" href="https://github.com/EddieDover">Github</Link> repositories are listed below.
                        </Typography>
                        <Typography component={'p'}>
                            If you enjoy my work, I am available for <Link target="_blank" rel="noopener" href='https://github.com/sponsors/EddieDover'>Github Sponsorship.</Link>
                        </Typography>
                        </Box>
                        <div hidden={this.state.loadedGithubData}>
                            <Box m={2}>
                            <br />
                            <Typography variant="h5" component={'p'}>
                                Gathering Data...
                            </Typography>
                            </Box>
                            <LinearProgress />
                        </div>
                        <CardContent>
                            <List>
                                {
                                    this.state.loadedGithubData && this.state.githubData.repos.map((repo: GithubRepo) => 
                                    ( 
                                        <ListItem divider={true} key={repo.name} alignItems="flex-start">
                                            <Typography component='div'>
                                                {repo.name} - {repo.description}<br />
                                                <b>Total Commits Made</b>: {repo.commits}<br />
                                                <b>Assigned Issues</b>: {repo.issues.length}/{repo.open_issues_count}<br />
                                                <Button target="_blank" rel="noopener" href={repo.url} size="small" color="primary" aria-label={"go to project page for " + repo.name}>
                                                    Visit Project Page
                                                </Button>
                                            </Typography>
                                        </ListItem>
                                    ))
                                }
                            </List>
                        </CardContent>
                    </Card>
                </Grid>
            </>
        );
    }
}