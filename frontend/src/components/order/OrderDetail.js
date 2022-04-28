import React, { useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Link } from 'react-router-dom'
import { useNavigate, useParams } from "react-router-dom";
import { FormattedMessage } from "react-intl"
import { Card, Row, Col, ListGroup, Image } from 'react-bootstrap'
import Loader from '../Loader'
import Message from '../Message'
import { getOrderDetails } from "./actions/orderActions";


const OrderDetail = ({ getOrderDetails, userToken, orderDetails }) => {

    const { id } = useParams();
    const navigate = useNavigate()
    const { loading, error, order } = orderDetails
    const { isAuthenticated } = userToken

    useEffect(() => {
        if (isAuthenticated && id) {
            getOrderDetails(id)
        }
        else {
            navigate("/login")
        }
    }, [navigate, getOrderDetails, isAuthenticated, id])


    return (
        <div>
            <Link to='/orders' className='btn btn-light my-2'>
                <FormattedMessage id="order.goBackToOrders" />
            </Link>
            <h1><FormattedMessage id="order.title" /> {order && order.id} </h1>
            {loading && <Loader />}
            {error && <Message variant='danger'>{error}</Message>}
            {order && (
            <Row>
                <Col md={8}>
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                            <h2><FormattedMessage id="order.orderItemsTitle"
                            /></h2>
                            {order.orderItems.length === 0 ? <Message variant='info'>
                                <FormattedMessage id="order.orderIsEmpty"
                                />
                            </Message> : (
                                <ListGroup variant='flush'>
                                    {order.orderItems.map((item, index) => (
                                        <ListGroup.Item key={index}>
                                            <Row>
                                                <Col md={4}>
                                                    <Image src={item.image} alt={item.title} rounded fluid style={{width: '100px',height: '100px',}} />
                                                </Col>

                                                <Col md={4}>
                                                    {item.title}
                                                </Col>

                                                <Col md={4}>
                                                    {item.qty} X ${item.price} = ${(item.qty * item.price).toFixed(2)}
                                                </Col>
                                            </Row>
                                        </ListGroup.Item>
                                    ))}
                                </ListGroup>
                            )}
                        </ListGroup.Item>
                    </ListGroup>
                </Col>
                <Col md={4}>
                    <Card>
                        <ListGroup variant='flush'>
                            <ListGroup.Item>
                                <h2><FormattedMessage id="order.orderSummaryTitle"
                                /></h2>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col><FormattedMessage id="order.orderSummaryTotalTitle"
                                    /></Col>
                                    <Col>${order.totalPrice}</Col>
                                </Row>
                            </ListGroup.Item>
                        </ListGroup>
                    </Card>
                </Col>
            </Row>)}
        </div>
    );
}

OrderDetail.propTypes = {
    getOrderDetails: PropTypes.func.isRequired,
    userToken: PropTypes.object.isRequired,
    orderDetails: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
    userToken: state.userToken,
    orderDetails: state.orderDetails,
});

export default connect(mapStateToProps, {
    getOrderDetails,
})(OrderDetail);
