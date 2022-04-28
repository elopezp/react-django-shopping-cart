import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Navbar, Container,Nav } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { FormattedMessage } from "react-intl"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { logout } from './login/actions/loginActions'

function Header() {

    const dispatch = useDispatch()

    const userToken = useSelector(state => state.userToken)
    const { isAuthenticated } = userToken

    const cart = useSelector(state => state.cart)
    const items = cart.cartItems.reduce((acc, item) => acc + item.qty, 0)

    const logoutHandler = () => {
        dispatch(logout())
    }
    return (
        <header>
            <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect className="flex-nowrap flex-row">
                <Container>
                    <LinkContainer to='/' className="mx-auto pr-2">
                        <Navbar.Brand ><FormattedMessage id="component.header.brand" /></Navbar.Brand>
                    </LinkContainer>
                    <Nav activeKey={window.location.pathname} className="order-lg-2 order-sm-1 flex-row align-items-center pr-2">
                        {isAuthenticated && (<LinkContainer to='/cart' className="mr-2">
                            <Nav.Link  >
                                <FontAwesomeIcon icon="shopping-cart" size="lg" />
                                <span className="badge badge-pill count">{items > 0 ? items : ""}</span>
                                <span className="sr-only">(current)</span>
                            </Nav.Link>
                        </LinkContainer>
                        )}
                        {!isAuthenticated && (
                            <LinkContainer to='/login'>
                                <Nav.Link><FontAwesomeIcon icon="user" size="lg" /></Nav.Link>
                            </LinkContainer>
                        )}
                    </Nav>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" className="order-first" />
                    <Navbar.Collapse id="basic-navbar-nav" className="flex-shrink-1 flex-grow-0 order-lg-1 order-last">
                        <Nav activeKey={window.location.pathname}>
                        {isAuthenticated && (
                                <Nav.Link onClick={logoutHandler}><FormattedMessage id="component.header.logout" /> <FontAwesomeIcon icon="sign-out-alt" size="lg" /></Nav.Link>
                        )}
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

        </header>
    )
}

export default Header
