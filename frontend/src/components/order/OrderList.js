import React, { useEffect } from "react";
import { LinkContainer } from 'react-router-bootstrap'
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { useNavigate, useLocation } from "react-router-dom";
import { FormattedMessage } from "react-intl"
import { Table, Button } from 'react-bootstrap'
import Loader from '../Loader'
import Message from '../Message'
import Paginate from '../Paginate'
import { getOrderList } from "./actions/orderActions";


const OrderList = ({ getOrderList, userToken, orderList }) => {

    const navigate = useNavigate()
    const { loading, error, orders, pages, page, } = orderList
    const { isAuthenticated } = userToken
    const { search } = useLocation()

    useEffect(() => {
        if (isAuthenticated) {
            getOrderList(search)
        }
        else {
            navigate("/login")
        }
    }, [navigate, getOrderList, isAuthenticated, search])


    return (
        <div>
            <h1><FormattedMessage id="orderList.title" /></h1>
            {loading && <Loader />}
            {error && <Message variant='danger'>{error}</Message>}
            <div>
                <Table striped bordered hover responsive size="sm" className="text-center">
                    <thead>
                        <tr>
                            <th><FormattedMessage id="orderList.idTableHead" /></th>
                            <th><FormattedMessage id="orderList.userTableHead" /></th>
                            <th><FormattedMessage id="orderList.dateTableHead" /></th>
                            <th><FormattedMessage id="orderList.totalTableHead" /></th>
                            <th></th>
                        </tr>
                    </thead>

                    <tbody>
                        {orders && orders.map(order => (
                                    <tr key={order.id}>
                                        <td>{order.id}</td>
                                        <td>{order.user && order.user.name}</td>
                                        <td>{order.createdAt && order.createdAt.substring(0, 10)}</td>
                                        <td>${order.totalPrice}</td>
                                        <td>
                                            <LinkContainer to={`/order/${order.id}`}>
                                                <Button variant='light' size="sm">
                                                    <FormattedMessage id="orderList.orderDetails"
                                                    />
                                                </Button>
                                            </LinkContainer>
                                        </td>
                                    </tr>
                                ))}
                    </tbody>
                </Table>
                <Paginate pages={pages} page={page} />
            </div>
        </div>
    );
}

OrderList.propTypes = {
    getOrderList: PropTypes.func.isRequired,
    userToken: PropTypes.object.isRequired,
    orderList: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
    userToken: state.userToken,
    orderList: state.orderList,
});

export default connect(mapStateToProps, {
    getOrderList,
})(OrderList);
