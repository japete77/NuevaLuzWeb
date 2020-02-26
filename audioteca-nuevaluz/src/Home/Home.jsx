import React from 'react'
import { AppBar, Toolbar, Typography, BottomNavigationAction, BottomNavigation } from '@material-ui/core'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import PersonIcon from '@material-ui/icons/Person'
import BookIcon from '@material-ui/icons/Book'
import { ListByTitle, ListByAuthor } from '../_components'

import './Home.scss'

const styles = {
    root: {
      flexGrow: 1,
    },
    grow: {
      flexGrow: 1,
    }
};

const theme = createMuiTheme({
    palette: {
      primary: {
          main: '#169ae8',
      },
      secondary: {
        main: '#f44336',
      },
    },
    typography: {
      useNextVariants: true
    }
});

export class Home extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            value: 0
        }
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event, value) {
        this.setState({ value: value });
    };

    render() {
        const { value } = this.state;

        return (
            <MuiThemeProvider theme={theme}>
                <AppBar position="static" color="primary">
                    <Toolbar>
                        <Typography variant="h6" color="inherit">
                            Fonoteca Nueva Luz
                        </Typography>
                    </Toolbar>
                </AppBar>
                <BottomNavigation
                    value={value}
                    onChange={this.handleChange}
                    showLabels
                >
                    <BottomNavigationAction label="Por Título" icon={<BookIcon />} />
                    <BottomNavigationAction label="Por Autor" icon={<PersonIcon />} />
                </BottomNavigation>
                {
                    value === 0 ? 
                    <ListByTitle /> : 
                    <ListByAuthor />
                }
            </MuiThemeProvider>
        )
    }
}
