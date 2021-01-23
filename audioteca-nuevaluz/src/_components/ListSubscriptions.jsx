import React from "react";
import {
  CircularProgress,
  Button,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  TextField,
} from "@material-ui/core";
import { audiotecaService } from "../_services/audioteca.service";
import { ListBySubscription } from ".";

import "./ListSubscriptions.scss";
import { audiotecaConstants } from "../_constants/audioteca.constants";

export class ListSubscriptions extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      index: 1,
      loading: false,
      Total: 0,
      Subscriptions: [],
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

  next() {
    this.setState({ loading: true });
    audiotecaService
      .getSubscriptions()
      .then((result) => {
        this.setState({
          index: this.state.index + result.subscriptions.length,
          loading: false,
          Total: result.subscriptions.length,
          Subscriptions: this.state.Subscriptions.concat(result.subscriptions),
        });
      });
  }


  render() {
    const { Total, Subscriptions, loading, expanded } = this.state;
    return (
      <div>
        <List className="list list__item" component="nav">
          {Subscriptions.map((item, i) => (
            <div key={`block${i}`}>
              <ListItem button key={`item${i}`} onClick={() => this.switch(i)}>
                <ListItemText primary={item.description} />
              </ListItem>
              {expanded == i ? (
                <ListBySubscription key={`subs${i}`} code={`${item.code}`}  />
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
        ) : Total > Subscriptions.length ? (
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
