import {Card, Box, Grid, Paper, Typography, CardContent } from "@material-ui/core";
import SaveIcon from '@material-ui/icons/Save';
import Rating, { IconContainerProps } from '@material-ui/lab/Rating';
import React from "react";

interface MySkillsProps {}
interface MySkillsState {
    skills:SkillData[];
}

class SkillData {
    skillName:string = "";
    skillValue:number = 0;
    constructor(name:string|number, rating:string|number)
    {
        this.skillName = name.toString();
        this.skillValue = typeof rating === "number" ? rating : parseInt(rating);
    }
}

const customIcons: { [index:string]: {icon: React.ReactElement; label:string}} = {
    1: {
        icon: <SaveIcon />,
        label: 'No Experience',
    },
    2: {
        icon: <SaveIcon />,
        label: 'Some Experience',
    },
    3: {
        icon: <SaveIcon />,
        label: 'Confident',
    },
    4: {
        icon: <SaveIcon />,
        label: 'Expert',
    },
    5: {
        icon: <SaveIcon />,
        label: 'Master',
    },
    
}

function IconContainer(props:IconContainerProps) {
    const {value, ...other } = props;
    return <span {...other}>{customIcons[value].icon}</span>
} 

export default class MySkills extends React.Component<MySkillsProps, MySkillsState>
{
    constructor(props: MySkillsProps) {
        super(props);
        let my_skills = [
            ["C#", 5],
            ["C/C++",4],
            [".NET", 5],
            ["Java",4],
            ["Git", 5],
            ["Github", 5],
            ["Python", 4],
            ["Angular 7-11", 4],
            ["PHP", 4],
            ["React", 4],
            ["REST", 4],
            ["HTML/CSS", 5],
            ["SASS", 4],
            ["TypeScript", 5],
            ["JavaScript", 5],
            ["jQuery",5],
            ["Go(lang)", 3],
            ["Rust", 3],
            ["ColdFusion",4],
            ["Wordpress API", 5],
        ];

        let state_skills = my_skills.map( (data) => { return new SkillData(data[0].toString(), data[1]) });

        let skillsort = function(skill1:SkillData, skill2:SkillData)
        {
            if (skill1.skillName < skill2.skillName) { return -1; }
            if (skill1.skillName > skill2.skillName) { return 1;}
            return 0;
        }

        this.state = {
            skills: state_skills.sort(skillsort),
        };
    }



    render() {
        return (
            <>
            <Grid item xs={12}>
                <Typography id="my_skills" align="center" component="h2" variant="h3">My Skills</Typography>
            </Grid>
            <Grid item xs={12}>
                <Card>
                  <CardContent>
                  <Grid spacing={3} container>
                    {
                    this.state.skills && this.state.skills.map( (skillitem:SkillData) => (
                        <Grid item xs={3}>
                            <Paper>
                                <Box component="fieldset" mb={3} borderColor="transparent">
                                    <Typography component="legend" variant="h5">
                                        {skillitem.skillName}
                                    </Typography>
                                    <Rating
                                        name= {skillitem.skillName}
                                        defaultValue={skillitem.skillValue}
                                        getLabelText={(value:number) => customIcons[value].label}
                                        size="large"
                                        IconContainerComponent={IconContainer}
                                        readOnly={true}
                                    />
                                    <Typography component="legend">
                                        {customIcons[skillitem.skillValue].label}
                                    </Typography>
                                </Box>
                            </Paper>
                        </Grid>
                    ))
                }
                </Grid>
                </CardContent>
                </Card>
            </Grid>
            </>
        )
    }
}