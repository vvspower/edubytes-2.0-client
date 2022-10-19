import React, { useState } from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import { PropsFor } from '@mui/system';

interface Props {
    open: boolean
    handleClose(): any
    text: string
}


const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props,
    ref,
) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const SnackBar = (props: Props) => {


    return (
        <>
            <Snackbar open={props.open} autoHideDuration={6000} onClose={props.handleClose}>
                <Alert onClose={props.handleClose} severity="success" sx={{ width: '100%' }}>
                    {props.text}
                </Alert>
            </Snackbar>
        </>
    )
}

export default SnackBar