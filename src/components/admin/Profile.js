import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import UserAvatar from "../images/user.svg";

import { startGetUserInfo } from "../../redux/actions/userActions";

const useStyles = makeStyles({
  media: {
    height: 380,
    widows: 200
  },
});

const Profile = (props) => {
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.userInfo);
  const classes = useStyles();

  useEffect(() => {
    dispatch(startGetUserInfo());
  }, [dispatch]);

  //console.log(userInfo);
  return (
    <Container maxWidth="xs">
      <Card>
        <CardActionArea>
          <CardMedia
            className={classes.media}
            image={UserAvatar}
            title="Profile"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              {userInfo?.username}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              Joined On: {userInfo?.createdAt?.slice(0, 10)}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              Emai: {userInfo?.email}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              Business Name: {userInfo?.businessName}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              Address: {userInfo?.address}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </Container>
  );
};

export default Profile;
