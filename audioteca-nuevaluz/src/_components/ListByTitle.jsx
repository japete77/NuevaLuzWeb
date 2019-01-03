import React from 'react';
import { CircularProgress, Button, List, ListItem, ListItemIcon, ListItemText, TextField }  from '@material-ui/core';
import { audiotecaService } from '../_services/audioteca.service';
import { BookDetails } from '../_components'

import './ListByTitle.scss'
import { audiotecaConstants } from '../_constants/audioteca.constants';
import { setTimeout, clearTimeout } from 'timers';

export class ListByTitle extends React.Component {

    constructor(props) {
        super(props);

        this.state = { 
            index: 1,
            loading: false, 
            Total: 0, 
            Titles: [],
            expanded: -1
        };

        this.searchChange = this.searchChange.bind(this);
    }

    componentDidMount() {
        this.next();
    }

    next() {
        this.setState({ loading: true });

        if (!this.props.author) {
            if (this.state.text) {
                audiotecaService.searchByTitle(this.state.text, this.state.index, audiotecaConstants.pageSize).then(result => {
                    this.setState({
                        index: this.state.index + result.Titles.length,
                        loading: false,
                        Total: result.Total, 
                        Titles: this.state.Titles.concat(result.Titles)
                    });
                });
            } else {
                audiotecaService.getTitles(this.state.index, audiotecaConstants.pageSize).then(result => {
                    this.setState({
                        index: this.state.index + result.Titles.length,
                        loading: false,
                        Total: result.Total, 
                        Titles: this.state.Titles.concat(result.Titles)
                    });
                });
            }
        } else {
            audiotecaService.getTitlesByAuthor(this.props.author, this.state.index, audiotecaConstants.pageSize)
                .then(result => {
                    this.setState({
                        index: this.state.index + result.Titles.length,
                        loading: false,
                        Total: result.Total, 
                        Titles: this.state.Titles.concat(result.Titles)
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
                this.setState({ timer: null, index: 1, Titles: [], Total: 0, expanded: -1 });
                this.next();
            }
            .bind(this), 
            500
        );

        this.setState({timer: timer});
    }

    switch(index) {
        if (this.state.expanded === index) {
            this.setState({ expanded: -1 });
        } else {
            this.setState({ expanded: index });
        }
    }

    render() {
        const { Total, Titles, loading, expanded } = this.state;
        return (
            <div>
                {
                    this.props.author ?
                        <List className="list list__item--nested">
                        {
                            Titles.map((item, i) =>
                                <div key={`block${i}`}>
                                    <ListItem button key={`item${i}`} onClick={() => this.switch(i)}>
                                        <ListItemText primary={item.Title} />
                                    </ListItem>
                                    { expanded == i ? <BookDetails key={`details${i}`} id={item.Id}/> : '' }
                                </div>
                            )
                        }
                        </List>:
                        <div>
                            <div className="list__searchbox">
                                <TextField
                                    fullWidth
                                    id="standard-search"
                                    label="Buscar por título"
                                    type="search"
                                    margin="normal"
                                    onChange={this.searchChange}
                                    />
                            </div>
                            <List className="list list__item">
                            {
                                Titles.map((item, i) =>
                                    <div key={`block${i}`}>
                                        <ListItem button key={`item${i}`} onClick={() => this.switch(i)}>
                                            <ListItemText primary={item.Title} />
                                        </ListItem>
                                        { expanded == i ? <BookDetails key={`details${i}`} id={item.Id}/> : '' }
                                    </div>
                                )
                            }
                            </List>
                        </div>
                }
                { loading ?
                    <div className="form__loading">
                        <CircularProgress />
                    </div> :
                    Total > Titles.length ?
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