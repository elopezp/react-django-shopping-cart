import React, { useState,useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Link, useNavigate } from "react-router-dom";
import { 
  Button, 
  Form,
  FormControl 
} from "react-bootstrap";
import { useIntl, FormattedMessage } from "react-intl"
import Loader from '../Loader'
import FormContainer from '../FormContainer'
import Message from '../Message'
import { login } from "./actions/loginActions.js";

const Login = ({ login, userToken, userLogin }) => {

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const navigate = useNavigate()
  const { error, loading } = userLogin
  const { isAuthenticated } = userToken
  const intl = useIntl()

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/")
    }
  }, [navigate, isAuthenticated])

  const submitHandler = (e) => {
    e.preventDefault()
    const userData = {
      email: email,
      password: password
    };
    login(userData);
  }

  return (
    <FormContainer>
      <h1><FormattedMessage id="login.title" /></h1>
      {loading && <Loader />}
      {error && error.fieldErrors && <Message variant='danger'>{error.fieldErrors}</Message>}
      <Form onSubmit={submitHandler}>
        <Form.Group controlId="email">
          <Form.Label><FormattedMessage id="login.emailLabel" /></Form.Label>
          <Form.Control
            isInvalid={error?.emailError}
            required
            type="email"
            name="email"
            placeholder={intl.formatMessage({ id: "signup.emailPlaceholder" })}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <FormControl.Feedback type="invalid">
            {error?.emailError}
          </FormControl.Feedback>
        </Form.Group>

        <Form.Group controlId="password">
          <Form.Label><FormattedMessage id="login.passwordLabel" /></Form.Label>
          <Form.Control
            isInvalid={error?.passwordError}
            required
            type="password"
            name="password"
            placeholder={intl.formatMessage({ id: "signup.passwordPlaceholder" })}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <FormControl.Feedback type="invalid">
            {error?.passwordError}
          </FormControl.Feedback>
        </Form.Group>

        <Button color="primary" type='submit' variant='primary' >
          <FormattedMessage id="login.signInButton" />
        </Button>
      </Form>
      <p className="mt-2">
        <FormattedMessage id="login.newAccount" /> <Link to="/signup"><FormattedMessage id="login.redirectRegister" /></Link>
      </p>

    </FormContainer>
  );
}

//export default Login;
Login.propTypes = {
  login: PropTypes.func.isRequired,
  userToken: PropTypes.object.isRequired,
  userLogin: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  userToken: state.userToken,
  userLogin: state.userLogin, 
});

export default connect(mapStateToProps, {
  login
})(Login);
