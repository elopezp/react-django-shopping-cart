import React, { useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { 
  Container
} from "react-bootstrap";
import Loader from './Loader'
import Message from './Message'
import { getCurrentUser } from "./login/actions/loginActions.js";

const Home = ({ getCurrentUser, userToken, userMe }) => {

  const navigate = useNavigate()
  const { error, loading } = userMe
  const { isAuthenticated, userInfo } = userToken

  useEffect(() => {
    if (isAuthenticated) {
      if(!userInfo)
      {
        getCurrentUser()
      }
      else{
        if(userInfo.role === 2)
        {
          navigate("/orders")
        }
        else{
          navigate("/products")
        }
      }
    }
    else
    {
      navigate("/login")
    }
  }, [navigate, getCurrentUser, isAuthenticated, userInfo])


  return (
    <Container>
      <h1>Home</h1>
      {loading && <Loader />}
      {error && <Message variant='danger'>{error}</Message>}
    </Container>
  );
}

Home.propTypes = {
  getCurrentUser: PropTypes.func.isRequired,
  userToken: PropTypes.object.isRequired,
  userMe: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  userToken: state.userToken,
  userMe: state.userMe,
});

export default connect(mapStateToProps, {
  getCurrentUser
})(Home);
