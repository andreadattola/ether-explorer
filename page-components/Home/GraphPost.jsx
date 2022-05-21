import * as React from "react";
import PropTypes from "prop-types";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { config } from "../../config/index.config";
import axios from "axios";

function GraphPost(props) {
  const { post } = props;
  const [loading, setLoading] = React.useState();
  const [etherPriceData, setEheterPriceData] = React.useState();
  const callHistoricalEthPrice = async () => {
    const response = await axios.get(config.homeApi.getEthLastPrice);
    console.log("response", response);
    const etherHistoricalPrice = response.data;
    setEheterPriceData(etherHistoricalPrice);
  };

  React.useEffect(() => {
    setLoading(true);
    callHistoricalEthPrice();
  }, []);
  React.useEffect(() => {
    if (!etherPriceData) return;
    setLoading(false);
    console.log("etherpricedATA", etherPriceData);
  }, [etherPriceData]);
  return (
    <Grid item xs={12} md={6}>
      <CardActionArea component="a" href="#">
        <Card sx={{ display: "flex" }}>
          <CardContent sx={{ flex: 1 }}>
            <Typography component="h2" variant="h5">
              {post.title}
            </Typography>
            {etherPriceData ? (
              <>
            <Typography component="h2" variant="h3" color="text.primary">
              {` ${etherPriceData.result.ethusd} $`} 
            </Typography>
             <Typography component="p" variant="p" color="text.primary">
             {`${new Date(+etherPriceData.result.ethusd_timestamp).toLocaleDateString('en-US')}`} 
           </Typography>
           <Typography component="h2" variant="h3" color="text.primary">
              {` ${etherPriceData.result.ethbtc} BTC`} 
            </Typography>
             <Typography component="p" variant="p" color="text.primary">
             {`${new Date(+etherPriceData.result.ethbtc_timestamp).toLocaleDateString('en-US')}`} 
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

GraphPost.propTypes = {
  post: PropTypes.shape({
    title: PropTypes.string.isRequired,
  }).isRequired,
};

export default GraphPost;
