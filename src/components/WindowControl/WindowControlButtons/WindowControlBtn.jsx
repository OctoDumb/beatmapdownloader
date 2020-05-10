import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default function WindowControlBtn(props) {
    return (
        <div className="window-control__btn">
            <FontAwesomeIcon icon={props.icon} />
        </div>
    )
}