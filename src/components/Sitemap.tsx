import React from "react";

interface SitemapProps {}
interface SitemapState {
    output: string
}

export default class Sitemap extends React.Component<SitemapProps, SitemapState> {

    constructor(props: SitemapProps, state: SitemapState) {
        super(props);
        this.state = {
            output: ""
        };
    }

    async componentDidMount() {
        const posts_response = await fetch("https://www.eddiedover.dev/blog/wp-json/wp/v2/posts?_fields=link");
        const posts_json = await posts_response.json();

        let now = new Date().toISOString();
        let output_xml = `
        <?xml version="1.0" encoding="UTF-8"?>
        <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
        <url>
            <loc>https://www.eddiedover.dev</loc>
            <lastmod>${now}</lastmod>
            <priority>0.5</priority>
        </url>`;

        posts_json.forEach((post: { [x: string]: any; }) => {
            var article_link = post['link'];
            article_link = article_link.replace("/blog/","/articles/");
            output_xml += `<url>
                                <loc>${article_link}</loc>
                                <lastmod>${now}</lastmod>
                                <priority>0.5</priority>
                            </url>`;
        });

        output_xml += "</urlset>";

        this.setState({
            output: output_xml
        });
    }

    render() {
        return this.state.output;
    }
}