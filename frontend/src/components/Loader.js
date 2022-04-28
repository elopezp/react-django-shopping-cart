import React from 'react'
import { Spinner } from 'react-bootstrap'
import { FormattedMessage } from "react-intl"

function Loader() {
    return (
        <Spinner
            animation='border'
            role='status'
            style={{
                height: '100px',
                width: '100px',
                margin: 'auto',
                display: 'block'
            }}
        >
            <span className='sr-only'><FormattedMessage id="component.loader.title" /></span>
        </Spinner>
    )
}

export default Loader
