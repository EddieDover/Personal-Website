import { Typography } from "@material-ui/core";
import React from "react";

import './ContactMe.css';

interface ContactMeProps {}
interface ContactMeState {}

class ContactMethod {
    MethodName:string;
    MethodURL:string;
    MethodData:string;
    MethodLink:string;
    constructor(name:string, data:string, url:string = "", link:string = "")
    {
        this.MethodName = name;
        this.MethodURL = url;
        this.MethodData = data;
        this.MethodLink = link;
    }
    public GetDataName()
    {
        if (this.MethodURL !== "") {
            return <a href={this.MethodURL} target="_blank">{this.MethodName}</a>
        } else {
            return this.MethodName;
        }
    }
    public GetDataLink()
    {
        if (this.MethodLink !== "")
        {
            return <a href={this.MethodLink} target="_blank">{this.MethodData}</a>
        } else {
            return this.MethodData;
        }
    }
}

export default class ContactMe extends React.Component<ContactMeProps,ContactMeState>
{
    methods:ContactMethod[] = [
        new ContactMethod("Email", "ed@eddiedover.dev", "", "mailto:ed@eddiedover.dev"),
        new ContactMethod("Mastodon", "@EddieDover@qoto.org", "https://joinmastodon.org", "https://qoto.org/@EddieDover"),
        new ContactMethod("Matrix", "@eddiedover:matrix.org", "https://matrix.org"),
        new ContactMethod("XMPP (E2E/OMEMO)", "eddiedover@e2e.ee", "https://omemo.top/")
    ]

    render() {
        return(
            <span className='contactMeContainer'>
            <Typography component="h1" variant="h4" align="center">Contact me using any of the methods below.</Typography>
            <div className="contactItems">
            {
                this.methods && this.methods.map( (method,idx)=>(
                    <div className={ "contactItem"}>
                        <span className={ (idx%2) ? "even":"odd"}>
                            {method.GetDataName()} - {method.GetDataLink()}
                        </span>
                    </div>
                ))
            }
            </div>
            <div className='pgpkey'>
                If you need my public PGP Key, it's available from <a href='https://keys.openpgp.org'>keys.openpgp.org</a>:<br/>
                <a href='https://keys.openpgp.org/search?q=ed%40eddiedover.dev'>
                    https://keys.openpgp.org/search?q=ed@eddiedover.dev
                </a>
            </div>
            </span>
        )
    }
}