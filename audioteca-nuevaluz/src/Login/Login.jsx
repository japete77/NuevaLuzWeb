import React from 'react'
import { Button, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@material-ui/core';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import lightBlue from '@material-ui/core/colors/lightBlue';
import CircularProgress from '@material-ui/core/CircularProgress';
import { history } from '../_helpers';

import './Login.scss'
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

export class Login extends React.Component {

    constructor(props) {
        super(props);
        this.state = { submitted: false, open: false }
        this.submit = this.submit.bind(this);
        this.handleClose = this.handleClose.bind(this);
    }

    submit(e) {
        e.preventDefault();

        this.setState({ submitted: true });
        
        // check username (must be a number)
        var user = Number(this.refs.username.value);
        user = (isNaN(user) ? -1: user);
        
        userService.login(user , this.refs.password.value)
            .then(result => {
                if (!result.Success) {
                    // clean up and focus in the username
                    this.setState({ submitted: false, open: true });
                    this.refs.username.value = '';
                    this.refs.password.value = '';
                    this.refs.username.focus();
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
                            Usuario o contraseña no válidos
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
                        <div className="form__title">Acceso Audioteca</div>
                        { 
                            submitted ? 
                            <div className="form__loading">
                                <CircularProgress />
                            </div> :
                            <div>
                                <div className="row row--centered">
                                    <label className="form__label">Usuario</label>
                                    <input className="form__input" type="text" required ref="username"/>
                                </div>
                                <div className="row row--centered">
                                    <label className="form__label">Contraseña</label>
                                    <input className="form__input" type="password" required ref="password"/>
                                </div>
                                <div className="row row--centered">
                                    <Button className="form__enterButton"
                                        id="enter" 
                                        variant="contained"
                                        type="submit"
                                        color="primary">Entrar</Button>
                                </div>
                            </div> 
                        }
                    </form>
                </div>
            </MuiThemeProvider>
        )
    }
}