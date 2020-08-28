import React, { useState, useEffect } from 'react'
import Toast from './toast'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons'
import Activity from './reactact';


export default function Modal(props) {
   const [open, setOpen] = useState(props.parent.state.open)
    useEffect(() => {
        setOpen(props.parent.state.open)
    }, [props.parent.state.open])

    return (

        <div className={`${'modal-overlay'} ${open ? 'open-dialog' : ''}`}>
            <div className={`${'modal-container'} ${open ? 'open-dialog' : ''}`}>
        
                <div className="modal-body">
                    <div className="modal-head ">
                        <div className="modal-title">
                            {props.parent.state.modalTitle}
                        </div>
                        <div className="modal-close" onClick={async() => {
                          await  props.parent.setState({ open: false})
                          
                        }}>
                            <FontAwesomeIcon icon={faTimesCircle} />
                        </div>
                    </div>
                    <hr />
                    <div className="modal-content">
                        {props.child}
                    </div>
                </div>
            </div>
        </div>
    )
}