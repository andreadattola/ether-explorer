import * as React from 'react';
import axios from 'axios';
import { config } from "../../config/index.config";
import PropTypes from 'prop-types';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';

function FeaturedPost(props) {
  const { post } = props;
  const [loading, setLoading] = React.useState();
  const [totalNodesCount, setTotalNodesCount] = React.useState();
  const callTotalNodesCount = async () => {
    const response = await axios.get(config.homeApi.getTotalNodesCount);
    console.log("response", response);
    
    setTotalNodesCount(response.data);
  };

  React.useEffect(() => {
    setLoading(true);
    callTotalNodesCount();
  }, []);
  React.useEffect(() => {
    if (!totalNodesCount) return;
    setLoading(false);
    console.log("totalNodesCount", totalNodesCount);
  }, [totalNodesCount]);
  return (
    <Grid item xs={12} md={6}>
      <CardActionArea component="a" href="#">
        <Card sx={{ display: "flex" }}>
          <CardContent sx={{ flex: 1 }}>
            <Typography component="h2" variant="h5">
              {post.title}
            </Typography>
            {totalNodesCount ? (
              <>
            <Typography component="h2" variant="h3" color="text.primary">
              {` ${totalNodesCount.result.TotalNodeCount} `} 
            </Typography>
             <Typography component="p" variant="p" color="text.primary">
             {`${new Date(totalNodesCount.result.UTCDate).toLocaleDateString('en-US')}`} 
           </Typography>           
           </>
          ) : (
            "Loading price..."
          )}

          </CardContent>
         
          <CardMedia
            component="img"
            sx={{ width: 160, display: { xs: "none", sm: "block" } }}
            image={post.image}
            alt={post.imageLabel}
          />
        </Card>
      </CardActionArea>
    </Grid>
  );
}

FeaturedPost.propTypes = {
  post: PropTypes.shape({
    date: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    imageLabel: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
  }).isRequired,
};

export default FeaturedPost;