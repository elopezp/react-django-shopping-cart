import React, { useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { FormattedMessage } from "react-intl"
import { Table, Button, Image } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Loader from '../Loader'
import Message from '../Message'
import { getProductList } from "./actions/productActions";
import { addToCart } from "../cart/actions/cartActions";


const ProductList = ({ getProductList, addToCart, userToken, productList }) => {



    const navigate = useNavigate()
    const { loading, error, products } = productList
    const { isAuthenticated } = userToken

    useEffect(() => {
        if (isAuthenticated) {
            getProductList()
        }
        else {
            navigate("/login")
        }
    }, [navigate, getProductList, isAuthenticated])

    const addToCartHandler = (id) => {
        addToCart(id, 1)
    }

    return (
        <div>
            <h1><FormattedMessage id="productList.title" /></h1>
            {loading && <Loader />}
            {error && <Message variant='danger'>{error}</Message>}
            <div>
                <Table striped bordered hover responsive size="sm" className="text-center">
                    <thead>
                        <tr>
                            <th><FormattedMessage id="productList.imageTableHead" /></th>
                            <th><FormattedMessage id="productList.titleTableHead" /></th>
                            <th><FormattedMessage id="productList.priceTableHead" /></th>
                            <th><FormattedMessage id="productList.countInStockTableHead" /></th>
                            <th></th>
                        </tr>
                    </thead>

                    <tbody>
                        {products && products.map(product => (
                            <tr key={product.id}>
                                <td>
                                    <Image src={product.image} alt={product.title} rounded fluid style={{width: '24px',height: '24px',}}/>
                                </td>
                                <td>{product.title}</td>
                                <td>${product.price}</td>
                                <td>{product.countInStock}</td>
                                <td>

                                    <Button 
                                        variant='dark' size="sm" 
                                        onClick={() => addToCartHandler(product.id)}
                                        disabled={product.countInStock === 0}
                                        type='button'
                                    >
                                        <FontAwesomeIcon icon={['fa', 'cart-plus']} />
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </div>
        </div>
    );
}

ProductList.propTypes = {
    getProductList: PropTypes.func.isRequired,
    addToCart: PropTypes.func.isRequired,
    userToken: PropTypes.object.isRequired,
    productList: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
    userToken: state.userToken,
    productList: state.productList,
});

export default connect(mapStateToProps, {
    getProductList,
    addToCart
})(ProductList);
