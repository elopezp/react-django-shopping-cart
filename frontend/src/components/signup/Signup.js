import React, { useState, useEffect } from 'react'
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
import Message from '../Message'
import FormContainer from '../FormContainer'
import { signupNewUser } from "./actions/signupActions";
import { setCurrentUser, setToken } from "../login/actions/loginActions";


const Signup = ({ signupNewUser, setCurrentUser, setToken, userToken, signup }) => {

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState('')
  const [gender, setGender] = useState('')
  const [dob, setDob] = useState(new Date().toISOString().split('T')[0])
  const [role, setRole] = useState(1)
  const [message, setMessage] = useState('')
  const navigate = useNavigate()
  const { error, loading, userSignedin } = signup
  const { isAuthenticated } = userToken
  const intl = useIntl()

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/")
    }
    else {
      if (userSignedin) {
        setCurrentUser(userSignedin.user)
        setToken(userSignedin.token)
      }
    }
  }, [navigate, setCurrentUser, setToken, isAuthenticated, userSignedin])

  const submitHandler = (e) => {
    e.preventDefault()
    const userData = {
      email: email,
      name: name,
      password: password,
      gender: gender,
      dob: dob,
      role: Number(role),
    };
    if (password !== confirmPassword) {
      setMessage(intl.formatMessage({ id: "signup.passwordDoNotMatch" }))
    } else {
      signupNewUser(userData);
      setMessage("")
    }
  }

  return (
    <FormContainer>
      <h1><FormattedMessage id="signup.title" /></h1>
      {message && <Message variant='danger'>{message}</Message>}
      {loading && <Loader />}
      {error && error.fieldErrors && <Message variant='danger'>{error.fieldErrors}</Message>}
      <Form onSubmit={submitHandler}>
        <Form.Group controlId="name">
          <Form.Label><FormattedMessage id="signup.nameLabel" /></Form.Label>
          <Form.Control
            isInvalid={error?.nameError}
            required
            type="text"
            name="name"
            placeholder={intl.formatMessage({ id: "signup.namePlaceholder" })}
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <FormControl.Feedback type="invalid">
            {error?.nameError}
          </FormControl.Feedback>
        </Form.Group>

        <Form.Group controlId="gender">
          <Form.Label><FormattedMessage id="signup.genderLabel" /></Form.Label>
          <Form.Control
            as="select"
            custom
            required
            value={gender}
            onChange={(e) => setGender(e.target.value)}
          >
            <option value="">-</option>
            <option value="M">{intl.formatMessage({ id: "signup.genderMale" })}</option>
            <option value="F">{intl.formatMessage({ id: "signup.genderFemale" })}</option>
            <option value="U">{intl.formatMessage({ id: "signup.genderUnsure" })}</option>
          </Form.Control>
        </Form.Group>

        <Form.Group controlId="dob">
          <Form.Label><FormattedMessage id="signup.dobLabel" /></Form.Label>
          <Form.Control type="date" name="dob" required
            placeholder={intl.formatMessage({ id: "signup.dobPlaceholder" })} value={dob}
            onChange={(e) => setDob(e.target.value)} />
        </Form.Group>

        <Form.Group controlId="role">
          <Form.Label><FormattedMessage id="signup.roleLabel" /></Form.Label>
          <Form.Control
            as="select"
            custom
            required
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >
            <option value="1">{intl.formatMessage({ id: "signup.roleBuyer" })}</option>
            <option value="2">{intl.formatMessage({ id: "signup.roleSeller" })}</option>
          </Form.Control>
        </Form.Group>

        <Form.Group controlId="email">
          <Form.Label><FormattedMessage id="signup.emailLabel" /></Form.Label>
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
          <Form.Label><FormattedMessage id="signup.passwordLabel" /></Form.Label>
          <Form.Control
            isInvalid={error?.passwordError}
            required
            type="password"
            name="password"
            placeholder={intl.formatMessage({ id: "signup.passwordPlaceholder" })}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Form.Control.Feedback type="invalid">
            {error?.passwordError}
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group controlId='passwordConfirm'>
          <Form.Label><FormattedMessage id="signup.passwordConfirmLabel" /></Form.Label>
          <Form.Control
            required
            type='password'
            placeholder={intl.formatMessage({ id: "signup.passwordConfirmPlaceholder" })}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          >
          </Form.Control>
        </Form.Group>
        <Button color="primary" type='submit' variant='primary'>
          <FormattedMessage id="signup.submitButton" />
        </Button>
      </Form>

      <p className="mt-2">
        <FormattedMessage id="signup.haveAnAccount" /> <Link to="/login"><FormattedMessage id="signup.redirectLogin" /></Link>
      </p>
    </FormContainer>
  );
}

Signup.propTypes = {
  signupNewUser: PropTypes.func.isRequired,
  setCurrentUser: PropTypes.func.isRequired,
  setToken: PropTypes.func.isRequired,
  userToken: PropTypes.object.isRequired,
  signup: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  userToken: state.userToken,
  signup: state.signup,
});

export default connect(mapStateToProps, {
  signupNewUser,
  setCurrentUser,
  setToken,
})(Signup);
