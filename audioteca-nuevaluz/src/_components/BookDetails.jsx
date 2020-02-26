import React from 'react'
import { CircularProgress, Button, Card, CardContent, Typography, withStyles}  from '@material-ui/core';
import PropTypes from 'prop-types';
import { audiotecaService } from '../_services/audioteca.service';

import './BookDetails.scss'

export class BookDetails extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: false,
            downloading: false
        }

        this.copyLink = this.copyLink.bind(this);
    }

    componentDidMount() {
        this.setState({ loading: true });
        audiotecaService.getBookDetails(this.props.id)
            .then(response => {
                this.setState({
                    loading: false,
                    Id: response.id,
                    Title: response.title,
                    Author: response.author.name,
                    Editorial: response.editorial,
                    Comments: response.comments,
                    LengthHours: response.lengthHours,
                    LengthMins: response.lengthMins
                });
            });
    }

    download(id) {
        if (!this.state.link) {
            this.setState({ downloading: true });
            audiotecaService.getLink(id)
                .then(response => {
                    this.setState({ downloading: false, link: response.audioBookLink });
                    document.getElementById('link').click();
                });
        } else {
            document.getElementById('link').click();
        }
    }

    copyLink(id) {
        if (!this.state.link) {
            this.setState({ downloading: true });
            audiotecaService.getLink(id)
                .then(response => {
                    this.setState({ downloading: false, link: response.audioBookLink });
                    navigator.clipboard.writeText(response.audioBookLink);
                });
        } else {
            navigator.clipboard.writeText(this.state.link);
        }
    }

    render() {
        const { loading, downloading, link, Id, Title, 
                Author, Editorial, Comments, LengthHours, LengthMins } = this.state;
        return (
            <div>
                {
                    loading ?
                    <div className="form__loading">
                        <CircularProgress />
                    </div> : 
                    <Card>
                        <CardContent>
                            <div className="row row--centered">
                                {
                                    downloading ? 
                                        <CircularProgress /> :
                                        <div>
                                            <Button
                                                id="enter" 
                                                variant="contained"
                                                onClick={() => { this.download(Id) }}
                                                color="primary">Descargar</Button>
                                            {/* <Button
                                                id="enter" 
                                                variant="contained"
                                                onClick={() => { this.copyLink(Id) }}
                                                color="primary">Copiar enlace</Button> */}
                                        </div>
                                }
                                <a id="link" href={link}></a>
                            </div>
                            <Typography color="textSecondary" gutterBottom>Duración: {LengthHours} horas {LengthMins} minutos</Typography>
                            <Typography color="textSecondary" gutterBottom>Autor: {Author}</Typography>
                            <Typography color="textSecondary" gutterBottom>Editorial: {Editorial}</Typography>
                            <Typography component="p">{Comments}</Typography>
                        </CardContent>
                    </Card>
                }
                <input className="block--hidden" value="" id="copytext" onChange={() => {}}/>
            </div>
        )
    }
}

BookDetails.propTypes = {
    id: PropTypes.number.isRequired,
};
