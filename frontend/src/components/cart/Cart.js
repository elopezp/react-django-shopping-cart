import React, { useEffect } from 'react'
import { connect } from "react-redux";
import { Link } from 'react-router-dom'
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { FormattedMessage } from "react-intl"
import { Row, Col, ListGroup, Form, Button, Card, Image } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Message from '../../components/Message'
import { addToCart, removeFromCart } from './actions/cartActions'
import { createOrder } from '../order/actions/orderActions'


function Cart({ addToCart, removeFromCart, createOrder, userToken, cart }) {

    const { cartItems } = cart

    const navigate = useNavigate()
    const { isAuthenticated } = userToken

    useEffect(() => {
        if (!isAuthenticated) {
            navigate("/login")
        }
    }, [navigate, isAuthenticated])


    const removeFromCartHandler = (id) => {
        removeFromCart(id)
    }

    const addToCartHandler = (product, qty) => {
        addToCart(product, qty)
    }

    const orderNowHandler = () => {
        createOrder({
            orderItems: cart.cartItems,
            totalPrice: cart.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0).toFixed(2),
        })
    }

    return (
        <div>
            <h1><FormattedMessage id="cart.title" /></h1>
            <Row >
                <Col md={8} xs={12}>
                    {cartItems.length === 0 ? (
                        <Message variant='info'>
                            <FormattedMessage id="cart.cartIsEmpty" /> <Link to='/products'><FormattedMessage id="cart.goBackToProducts" /></Link>
                        </Message>
                    ) : (
                        <ListGroup variant='flush'>
                            {cartItems.map(item => (
                                <ListGroup.Item key={item.product}>
                                    <Row>
                                        <Col md={3} xs={3}>
                                            <Image src={item.image} alt={item.title} rounded fluid style={{width: '100%',height: '100px',}}/>
                                        </Col>
                                        <Col md={3} xs={3}>
                                            {item.title}
                                        </Col>
                                        <Col md={2} xs={2}>
                                            ${item.price}
                                        </Col>

                                        <Col md={2} xs={4}>
                                            <Form.Control
                                                as="select"
                                                value={item.qty}
                                                onChange={(e) => addToCartHandler(item.product, Number(e.target.value))}
                                            >
                                                {

                                                    [...Array(item.countInStock).keys()].map((x) => (
                                                        <option key={x + 1} value={x + 1}>
                                                            {x + 1}
                                                        </option>
                                                    ))
                                                }

                                            </Form.Control>
                                        </Col>

                                        <Col md={1} xs={1} >
                                            <Button
                                                type='button'
                                                variant='light'
                                                onClick={() => removeFromCartHandler(item.product)}
                                            >
                                                <FontAwesomeIcon icon="trash" className="text-secondary" />
                                            </Button>
                                        </Col>
                                    </Row>
                                </ListGroup.Item>
                            ))}
                        </ListGroup>
                    )}
                </Col>

                <Col md={4} xs={12}>
                    <Card>
                        <ListGroup variant='flush'>
                            <ListGroup.Item>
                                <h3><FormattedMessage id="cart.subtotalTitle"
                                /> ({cartItems.reduce((acc, item) => acc + item.qty, 0)}) <FormattedMessage id="cart.items"
                                    /></h3>
                                ${cartItems.reduce((acc, item) => acc + item.qty * item.price, 0).toFixed(2)}
                            </ListGroup.Item>
                        </ListGroup>

                        <ListGroup.Item>
                            <Button
                                type='button'
                                className='btn-block'
                                disabled={cartItems.length === 0}
                                onClick={orderNowHandler}
                            >
                                <FormattedMessage id="cart.orderNow"
                                />
                            </Button>
                        </ListGroup.Item>


                    </Card>
                </Col>
            </Row>
        </div>
    )
}

Cart.propTypes = {
    addToCart: PropTypes.func.isRequired,
    removeFromCart: PropTypes.func.isRequired,
    createOrder: PropTypes.func.isRequired,
    userToken: PropTypes.object.isRequired,
    cart: PropTypes.object.isRequired,
};
  
const mapStateToProps = state => ({
    userToken: state.userToken,
    cart: state.cart,
  });
  
export default connect(mapStateToProps, {
    addToCart, 
    removeFromCart,
    createOrder
})(Cart);