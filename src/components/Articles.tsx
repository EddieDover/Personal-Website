import React from "react";
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import he from 'he';
import { SRLWrapper } from 'simple-react-lightbox';
import { withRouter } from "react-router-dom";

import "./Articles.css";

const DEBUG = false;

interface ArticlesProps {
    history: any,
    location: any,
    match:any,
}

interface ArticlesState {
    location: string,
    singleArticle: boolean,
    articleList: any[],
    articleObject: { [x:string]: any },
    editedArticleObject: { [x:string]: any},
    tags_map: { [id:number]: string },
    srl_data: { src: any; thumbnail: any; caption: string; }[],
    loading: boolean
}

class Articles extends React.Component<ArticlesProps,ArticlesState> {

    sitePrefix: string = DEBUG ? "https://eddiedover.dev/" : "http://localhost:3000/" ;

    constructor(props: ArticlesProps, state: ArticlesState) {
        super(props);
        let blink = (props.location.state !== undefined && props.location.state.singleArticle !== undefined) ? props.location.state.singleArticle : false;
        this.state = {
            location: window.location.href,
            singleArticle: blink,
            articleList:[],
            articleObject: [],
            editedArticleObject: [],
            tags_map: {},
            srl_data: [],
            loading: true
        }
    }

    async componentDidUpdate(prevProps: ArticlesProps, prevState: ArticlesState) {
        if (prevProps.location.key !== this.props.location.key) {
            const posts_response = await fetch("https://www.eddiedover.dev/blog/wp-json/wp/v2/posts?_fields=id,title,link,tags,content");
            const posts_json = await posts_response.json();
            this.setState({
                singleArticle:false,
                articleList: posts_json,
                loading: true
            });
        }
    }

    async componentDidMount() {
        const tags_response = await fetch("https://www.eddiedover.dev/blog/wp-json/wp/v2/tags");
        const tags_json = await tags_response.json();
        let t_tags_map: { [id:number]: string } = {};
        tags_json.forEach( (tag: {[x:string]:any; }) => {
            t_tags_map[tag['id']] = tag['name'];
        });
        this.setState({
            tags_map: t_tags_map
        });

        const posts_response = await fetch("https://www.eddiedover.dev/blog/wp-json/wp/v2/posts?_fields=id,title,link,tags,content");
        const posts_json = await posts_response.json();

        this.setState({
            articleList: posts_json,
            loading: true
        });

        posts_json.forEach((article_object: { [x: string]: any; }) => {
            const thisArticleObject = Object.assign({}, article_object);
            var article_link = thisArticleObject['link'];

            if (DEBUG) {
                article_link = article_link.replace("https://eddiedover.dev/blog/", 'http://localhost:3000/articles/');
                thisArticleObject['link'] = article_link;
            }
            const statelocationCheck = article_link.replace("/blog/","/articles/");

            if (statelocationCheck === this.state.location) {
                this.setState({
                    articleObject: article_link,
                });

                const thisPost = this.parseArticle(article_object);

                this.setState({
                    singleArticle: true,
                    editedArticleObject: thisPost,
                    srl_data: thisPost.srldata,
                    loading:false
                });
                
                article_link = article_link.replace(this.sitePrefix,"/");
            } else {
                this.setState({
                    loading:false
                });
            }
        });
        
    }

    parseArticle(post: {[x: string]: any}) {
        const thisPost = Object.assign({}, post);
        let gallerytest = '<p>(<a.+href="(.*?)".+><img.+src="(.*?)".*alt="(.*?)".*>.*?</a>)</p>';

        if (DEBUG) {
            thisPost['link'] =thisPost['link'].replace("https://eddiedover.dev/blog/", 'http://localhost:3000/articles/');
        } else {
            thisPost['link'] = thisPost['link'].replace("/blog/", "/articles/");
        }

        const matches = thisPost.content.rendered.matchAll(gallerytest);
        
        let srldata = [];
        for (const match of matches)
        {
            const anchor_href = match[2];
            let img_src = match[3];
            let alt_tag = match[4];

            srldata.push({
                src:anchor_href,
                thumbnail:img_src,
                caption: alt_tag,
            });
            thisPost.content.rendered = thisPost.content.rendered.replace(match[1],'');
        }
        thisPost.srldata = srldata;
        return thisPost;

    }

    showArticle(post: {[x: string]: any}) {
        this.setState({
            singleArticle: true,
            loading: true
        });

        const thisPost: {[x:string]: any} = this.parseArticle(post);

        this.setState({
            singleArticle: true,
            editedArticleObject: thisPost,
            srl_data: thisPost.srldata,
            loading:false
        });

        window.history.pushState("", thisPost.title.rendered, thisPost.link);

    }
    render() {
        return (
            <>
            {this.state.loading && (
                <h3>Loading...</h3>
            )}
            {this.state.singleArticle && (
                <>
                <h1 className="article_title">{he.decode(this.state.editedArticleObject['title']['rendered'])}</h1>
                <div dangerouslySetInnerHTML={{__html:this.state.editedArticleObject['content']['rendered']}}></div>
                <br/>
                <SRLWrapper>
                    <div className="article_images">
                    {this.state.srl_data.map( (element, index) => (
                        <a href={element.src} key={index}><img src={element.thumbnail} alt={element.caption}></img></a>
                    ))
                    }
                    </div>
                </SRLWrapper>
                </>
            )}
            {!this.state.singleArticle && (
                <Grid container spacing={2} className="cardsContainer">
                    {this.state.articleList.map((post, index) => (
                        <Grid item xs={4} key={index}>
                            <span className="cardLink" onClick={() => this.showArticle(post)}>
                                <Card>
                                    <CardContent>
                                        <Typography
                                            color="textSecondary"
                                            gutterBottom
                                            dangerouslySetInnerHTML={{__html:post['title']['rendered']}} />
                                        Tags: {post['tags'].map( (id:string, index:number) => (
                                            <span key={index}>{this.state.tags_map[parseInt(id)]}</span>
                                        )).reduce((prev: any, curr: any) => {
                                            return prev === null ? [curr] : [...prev, ', ', curr]
                                            }, null) }
                                    </CardContent>
                                </Card>
                            </span>
                        </Grid>
                    ))}
                </Grid>
            )}
            </>
        );
    }
}

export default withRouter(Articles);