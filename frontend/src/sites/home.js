import MainSearchAppBar from "../components/main_navbar";
import LeftNavbar from "../components/left_navbar";
import { Grid } from "@mui/material";


export default function Home(props) {

  return (
    <Grid container spacing={4}>
      <Grid item md={2}>
        <LeftNavbar />
      </Grid>
      <Grid item md={10}>
        <MainSearchAppBar userInfo={props.user} />
        <h1>homepage</h1>
      </Grid>
    </Grid>
  );
};
