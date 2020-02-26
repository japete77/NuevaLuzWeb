import React from 'react'
import { Button, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@material-ui/core';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import lightBlue from '@material-ui/core/colors/lightBlue';
import CircularProgress from '@material-ui/core/CircularProgress';
import { history } from '../_helpers';

import './ChangePassword.scss'
import { userService } from '../_services/user.service.js';

const theme = createMuiTheme({
    palette: {
      primary: lightBlue,
      secondary: {
        main: '#f44336',
      },
    },
    typography: {
      useNextVariants: true
    }
});

export class ChangePassword extends React.Component {

    constructor(props) {
        super(props);
        this.state = { submitted: false, open: false }
        this.submit = this.submit.bind(this);
        this.handleClose = this.handleClose.bind(this);
    }

    submit(e) {
        e.preventDefault();

        this.setState({ submitted: true });
        
        // match checking
        var matches = this.refs.password.value == this.refs.repassword.value;
        if (!matches)
        {
            // clean up and focus in the password
            this.setState({ submitted: false, open: true });
            this.refs.password.value = '';
            this.refs.repassword.value = '';
            this.refs.password.focus();
            return;
        }
        
        userService.updatePassword(this.refs.password.value)
            .then(result => {
                if (!result.success) {
                    // clean up and focus in the username
                    this.setState({ submitted: false, open: true });
                    this.refs.password.value = '';
                    this.refs.repassword.value = '';
                    this.refs.password.focus();
                } else {
                    // navigate to home page
                    window.location.href = '/';
                }
            });
    }

    handleClose() {
        this.setState({ open: false });
    }

    render() {
        const { submitted } = this.state;
        return (
            <MuiThemeProvider theme={theme}>
                <div className="login">
                    <Dialog
                        open={this.state.open}
                        onClose={this.handleClose}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                        >
                        <DialogTitle id="alert-dialog-title">{"Error de acceso"}</DialogTitle>
                        <DialogContent>
                            <DialogContentText id="alert-dialog-description">
                            Las contraseñas no coinciden
                            </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={this.handleClose} color="primary">
                            Cerrar
                            </Button>
                        </DialogActions>
                    </Dialog>
                    <form onSubmit={this.submit} className="form">
                        <div className="form__logo"></div>
                        <div className="form__title">Cambio de contraseña</div>
                        { 
                            submitted ? 
                            <div className="form__loading">
                                <CircularProgress />
                            </div> :
                            <div>
                                <div className="row row--centered">
                                    <label className="form__label-big">Nueva contraseña</label>
                                    <input className="form__input-small" type="password" required ref="password"/>
                                </div>
                                <div className="row row--centered">
                                    <label className="form__label-big">Repita contraseña</label>
                                    <input className="form__input-small" type="password" required ref="repassword"/>
                                </div>
                                <div className="row row--centered">
                                    <Button className="form__enterButton"
                                        id="enter" 
                                        variant="contained"
                                        type="submit"
                                        color="primary">Actualizar</Button>
                                </div>
                            </div> 
                        }
                    </form>
                </div>
            </MuiThemeProvider>
        )
    }
}