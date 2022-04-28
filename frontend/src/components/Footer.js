import React from 'react'
import { Row, Col } from 'react-bootstrap'
import { FormattedMessage,  } from "react-intl"


function Footer() {

    return (
        <footer className="mt-auto bg-dark text-white">
            <hr className="p-0 m-0 b-0"></hr>
            <Row>
                <Col className="text-center py-3"><FormattedMessage id="component.footer.copyright" /></Col>
            </Row>
        </footer>
    )
}

export default Footer
