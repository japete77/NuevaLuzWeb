import React from "react";
import {
  CircularProgress,
  Button,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  TextField,
  Card,
  CardContent,
  Typography,
} from "@material-ui/core";
import { audiotecaService } from "../_services/audioteca.service";

import "./ListBySubscription.scss";
import { audiotecaConstants } from "../_constants/audioteca.constants";

export class ListBySubscription extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      index: 1,
      loading: false,
      downloading: false,
      Total: 0,
      code: props.code,
      Titles: [],
      expanded: -1,
    };
  }

  componentDidMount() {
    this.next();
  }

  switch(index) {
    if (this.state.expanded === index) {
      this.setState({ expanded: -1 });
    } else {
      this.setState({ expanded: index });
    }
  }

  download(id) {
    if (!this.state.link) {
      this.setState({ downloading: true });
      audiotecaService.getSubscriptionTitleLink(id).then((response) => {
        this.setState({ downloading: false, link: response.subscriptionTitleLink });
        document.getElementById("link").click();
      });
    } else {
      document.getElementById("link").click();
    }
  }

  next() {
    this.setState({ loading: true });
    audiotecaService.getSubscriptionTitles(this.props.code).then((result) => {
      this.setState({
        index: this.state.index + result.titles.length,
        loading: false,
        Total: result.titles.length,
        Titles: this.state.Titles.concat(result.titles),
      });
    });
  }

  render() {
    const { Total, Titles, loading, expanded, code, link } = this.state;
    return (
      <div>
        <List className="list list__item--nested" component="nav">
          {Titles.map((item, i) => (
            <div key={`block${i}`}>
              <ListItem button key={`item${i}`} onClick={() => this.switch(i)}>
                <ListItemText primary={item.title} />
              </ListItem>
              {expanded == i ? (
                <Card>
                  <CardContent>
                    <div className="row row--centered">
                      {
                        <div>
                          <Button
                            id="enter"
                            variant="contained"
                            onClick={() => {
                              this.download(`${code}${item.id}`);
                            }}
                            color="primary"
                          >
                            Descargar
                          </Button>
                        </div>
                      }
                      <a id="link" href={link}></a>
                    </div>
                    <Typography color="textSecondary" gutterBottom>
                      Título: {item.title}
                    </Typography>
                    <Typography component="p">{item.description}</Typography>
                  </CardContent>
                </Card>
              ) : (
                ""
              )}
            </div>
          ))}
        </List>
        {loading ? (
          <div className="form__loading">
            <CircularProgress />
          </div>
        ) : Total > Titles.length ? (
          <div className="row row--centered">
            <Button
              id="enter"
              variant="contained"
              onClick={() => {
                this.next();
              }}
              color="primary"
            >
              Ver más
            </Button>
          </div>
        ) : (
          ""
        )}
      </div>
    );
  }
}
