import React from 'react';
import { CircularProgress, Button, List, ListItem, ListItemIcon, ListItemText, TextField }  from '@material-ui/core';
import { audiotecaService } from '../_services/audioteca.service';
import { ListByTitle } from '.'

import './ListByAuthor.scss'
import { audiotecaConstants } from '../_constants/audioteca.constants';

export class ListByAuthor extends React.Component {

    constructor(props) {
        super(props);
        this.state = { 
            index: 1,
            loading: false, 
            Total: 0, 
            Authors: [],
            expanded: -1
        };

        this.searchChange = this.searchChange.bind(this);
    }

    componentDidMount() {
        this.next();
    }

    switch(index) {
        if (this.state.expanded === index) {
            this.setState({ expanded: -1 });
        } else {
            this.setState({ expanded: index });
        }
    }

    next() {
        this.setState({ loading: true });
        if (this.state.text) {
            audiotecaService.searchByAuthor(this.state.text, this.state.index, audiotecaConstants.pageSize).then(result => {
                this.setState({
                    index: this.state.index + result.Authors.length,
                    loading: false,
                    Total: result.Total, 
                    Authors: this.state.Authors.concat(result.Authors)
                });
            });
        } else {
            audiotecaService.getAuthors(this.state.index, audiotecaConstants.pageSize).then(result => {
                this.setState({
                    index: this.state.index + result.Authors.length,
                    loading: false,
                    Total: result.Total, 
                    Authors: this.state.Authors.concat(result.Authors)
                });
            });
        }
    }

    searchChange(e) {
        this.setState({text: e.target.value});
        
        if (this.state.timer) {
            clearTimeout(this.state.timer);
        }

        var timer = setTimeout(
            function() {
                this.setState({ timer: null, index: 1, Authors: [], Total: 0, expanded: -1 });
                this.next();
            }
            .bind(this), 
            500
        );

        this.setState({timer: timer});
    }

    render() {
        const { Total, Authors, loading, expanded } = this.state;
        return (
            <div>
                <div className="list__searchbox">
                    <TextField
                        fullWidth
                        id="standard-search"
                        label="Buscar por autor"
                        type="search"
                        margin="normal"
                        onChange={this.searchChange}
                        />
                </div>
                <List className="list list__item" component="nav">
                {
                    Authors.map((item, i) =>
                        <div key={`block${i}`}>
                            <ListItem button key={`item${i}`} onClick={() => this.switch(i)}>
                                <ListItemText primary={item.Name} />
                            </ListItem>
                            { expanded == i ? <ListByTitle key={`titles${i}`} author={item.Id}/> : '' }
                        </div>
                    )
                }
                </List>
                { loading ?
                    <div className="form__loading">
                        <CircularProgress />
                    </div> :
                    Total > Authors.length ?
                    <div className="row row--centered">
                        <Button
                            id="enter" 
                            variant="contained"
                            onClick={() => { this.next() }}
                            color="primary">Ver más</Button>
                    </div> : ''
                }
            </div>
        )
    }
}