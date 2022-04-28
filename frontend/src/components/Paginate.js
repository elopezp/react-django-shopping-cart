import React from 'react'
import { useLocation } from "react-router-dom";
import { Pagination } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

function Paginate({ pages, page, keyword = '', extra_param = '' }) {

    const location = useLocation();
    const search = location.search;

    if (keyword) {
        keyword = new URLSearchParams(search).get('keyword');
    }

    return (pages > 1 && (
        <Pagination>
            {[...Array(pages).keys()].map((x) => (
                <LinkContainer
                    key={x + 1}
                    to={keyword ? 
                        `${location.pathname}?keyword=${keyword}&page=${x + 1}${extra_param}`
                        : `${location.pathname}?page=${x + 1}${extra_param}`
                    }
                >
                    <Pagination.Item active={x + 1 === page}>{x + 1}</Pagination.Item>
                </LinkContainer>
            ))}
        </Pagination>
    )
    )
}

export default Paginate
