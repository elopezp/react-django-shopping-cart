import React, { useState } from 'react'
import { Alert } from 'react-bootstrap'

function Message({ variant, dismissible, children }) {
    const [show, setShow] = useState(true);
        return (show ? (
            <Alert variant={variant} onClose={() => setShow(false)} dismissible={dismissible}>
                {children}
            </Alert>) : (<></>)
        )
}

export default Message
