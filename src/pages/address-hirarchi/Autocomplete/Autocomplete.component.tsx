import React, { Component, Fragment } from "react";
import "./styles.css";

interface AutocompletecomponentProps {
  suggestions: string[];
  activeSuggestion: string;
  filteredSuggestions: any;
  filedlabel: string;
  parentMethod: any;
}
interface AutocompletecomponentStates {
  activeSuggestion: any;
  filteredSuggestions: any;
  showSuggestions: boolean;
  userInput: string;
}

class Autocomplete extends Component<
  AutocompletecomponentProps,
  AutocompletecomponentStates
> {
  constructor(props) {
    super(props);
    this.state = {
      activeSuggestion: 0,
      filteredSuggestions: [],
      showSuggestions: false,
      userInput: "",
    };
  }
  onChange = (e) => {
    const { suggestions } = this.props;
    const userInput = e.currentTarget.value;

    const filteredSuggestions = suggestions.filter(
      (suggestion) =>
        suggestion.toLowerCase().indexOf(userInput.toLowerCase()) > -1
    );

    this.setState({
      activeSuggestion: 0,
      filteredSuggestions,
      showSuggestions: true,
      userInput: e.currentTarget.value,
    });
  };
  onClick = (e) => {
    this.setState({
      activeSuggestion: 0,
      filteredSuggestions: [],
      showSuggestions: false,
      userInput: e.currentTarget.innerText,
    });
  };
  onKeyDown = (e) => {
    const { activeSuggestion, filteredSuggestions }: any = this.state;

    if (e.keyCode === 13) {
      this.setState({
        activeSuggestion: 0,
        showSuggestions: false,
        userInput: filteredSuggestions[activeSuggestion],
      });
    } else if (e.keyCode === 38) {
      if (activeSuggestion === 0) {
        return;
      }
      this.setState({ activeSuggestion: activeSuggestion - 1 });
    }
    // User pressed the down arrow, increment the index
    else if (e.keyCode === 40) {
      if (activeSuggestion - 1 === filteredSuggestions.length) {
        return;
      }
      this.setState({ activeSuggestion: activeSuggestion + 1 });
    }
  };
  render() {
    const {
      onChange,
      onClick,
      onKeyDown,
      state: {
        activeSuggestion,
        filteredSuggestions,
        showSuggestions,
        userInput,
      },
    } = this;

    const { filedlabel } = this.props;
    let suggestionsListComponent;
    if (showSuggestions && userInput) {
      if (filteredSuggestions.length) {
        suggestionsListComponent = (
          <ul className="suggestions">
            {filteredSuggestions.map((suggestion, index) => {
              let className;

              // Flag the active suggestion with a class
              if (index === activeSuggestion) {
                className = "suggestion-active";
              }
              return (
                <li className={className} key={suggestion} onClick={onClick}>
                  {suggestion}
                </li>
              );
            })}
          </ul>
        );
      } else {
        suggestionsListComponent = (
          <div className="no-suggestions">
            <em>No suggestions available.</em>
          </div>
        );
      }
    }
    return (
      <Fragment>
        <div className="bx--form-item bx--text-input-wrapper">
          <label className="bx--label">{filedlabel}</label>
        </div>
        <div className="bx--text-input__field-wrapper">
          <input
            type="text"
            onChange={onChange}
            onKeyDown={onKeyDown}
            value={userInput}
            className="bx--text-input bx--text-input--md"
            style={{ width: "30%" }}
            placeholder={filedlabel}
          />
        </div>
        {suggestionsListComponent}
      </Fragment>
    );
  }
}

export default Autocomplete;
