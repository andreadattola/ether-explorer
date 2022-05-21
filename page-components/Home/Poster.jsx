import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import GitHubIcon from "@mui/icons-material/GitHub";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import GraphPost from "./GraphPost";
import MainFeaturedPost from "./MainFeaturedPost";
import FeaturedPost from "./FeaturedPost";
import Main from "./Main";
import Sidebar from "./Sidebar";

const mainFeaturedPost = {
  title: "Thesis project, University of Pisa: Andrea Dattola",
  description:
    "this project was born to apply the concepts of web development with state-of-the-art technology, applied to one of the hottest topics of the useful times, the blockchain",
  image: "https://source.unsplash.com/random",
  imageText: "image description",
  linkText: "what blockchain is",
};
const graphPost = [
  {
    title: "etherPrice",
    image: "https://source.unsplash.com/random",
    imageLabel: "Image Text",
  },
];
const featuredPosts = [
  {
    title: "Total node Count",
    date: "Nov 12",
    description:
      "This is a wider card with supporting text below as a natural lead-in to additional content.",
    image: "https://source.unsplash.com/random",
    imageLabel: "Image Text",
  },
];

const sidebar = {
  title: "About",
  description:
    "In trying to understand what blockchain is, we will rely in many cases on the definitions that are proposed, trying to qualify them. For some, blockchain is the next generation of the Internet, or better still, it is the New Internet. It is considered to represent a kind of Internet of Transactions. These definitions tend to place blockchain alongside the Internet of People, or the Internet of the people we use and frequent every day, which has in turn expanded to the Internet of Things or the Internet of Things to create and represent the Internet of Value on the basis of seven characteristics:",
  archives: [
    { title: "March 2020", url: "#" },
    { title: "February 2020", url: "#" },
    { title: "January 2020", url: "#" },
    { title: "November 1999", url: "#" },
    { title: "October 1999", url: "#" },
    { title: "September 1999", url: "#" },
    { title: "August 1999", url: "#" },
    { title: "July 1999", url: "#" },
    { title: "June 1999", url: "#" },
    { title: "May 1999", url: "#" },
    { title: "April 1999", url: "#" },
  ],
  social: [
    { name: "GitHub", icon: GitHubIcon , link : 'https://github.com/andreadattola'},
  ],
};

const theme = createTheme();

export default function Blog() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="lg">
        <main>
          <MainFeaturedPost post={mainFeaturedPost} />
          <Grid container spacing={4}>
            {featuredPosts.map((post) => (
              <FeaturedPost key={post.title} post={post} />
            ))}
            {graphPost.map((post) => (
              <GraphPost key={post.title} post={post} />
            ))}
          </Grid>
          <Grid container spacing={5} sx={{ mt: 3 }}>
            <Main title="What is the blockChain" />
            <Sidebar
              title={sidebar.title}
              description={sidebar.description}
              archives={sidebar.archives}
              social={sidebar.social}
            />
          </Grid>
        </main>
      </Container>
    </ThemeProvider>
  );
}
