import React, { Component } from 'react';
import Autosuggest from 'react-autosuggest';
const theme = {
	container: {
		position: 'relative'
	},
	input: {
		width: "7rem",
		height: 30,
		padding: '10px 20px',
		fontFamily: 'Helvetica, sans-serif',
		fontWeight: 300,
		fontSize: 16,
		border: '1px solid #aaa',
		borderTopLeftRadius: 4,
		borderTopRightRadius: 4,
		borderBottomLeftRadius: 4,
		borderBottomRightRadius: 4
	},
	inputFocused: {
		outline: 'none'
	},
	inputOpen: {
		borderBottomLeftRadius: 0,
		borderBottomRightRadius: 0
	},
	suggestionsContainer: {
		display: 'none'
	},
	suggestionsContainerOpen: {
		display: 'block',
		position: 'absolute',
		top: 51,
		width: 280,
		border: '1px solid #aaa',
		backgroundColor: '#fff',
		fontFamily: 'Helvetica, sans-serif',
		fontWeight: 300,
		fontSize: 16,
		borderBottomLeftRadius: 4,
		borderBottomRightRadius: 4,
		zIndex: 2,
		color: 'black'
	},
	suggestionsList: {
		margin: 0,
		padding: 0,
		listStyleType: 'none'
	},
	suggestion: {
		cursor: 'pointer',
		padding: '10px 20px'
	},
	suggestionHighlighted: {
		backgroundColor: '#ddd'
	}
};

const languages = [
	{
		name: 'C',
		year: 1972
	},
	{
		name: 'C#',
		year: 2000
	},
	{
		name: 'C++',
		year: 1983
	},
	{
		name: 'Clojure',
		year: 2007
	},
	{
		name: 'Elm',
		year: 2012
	},
	{
		name: 'Go',
		year: 2009
	},
	{
		name: 'Haskell',
		year: 1990
	},
	{
		name: 'Java',
		year: 1995
	},
	{
		name: 'Javascript',
		year: 1995
	},
	{
		name: 'Perl',
		year: 1987
	},
	{
		name: 'PHP',
		year: 1995
	},
	{
		name: 'Python',
		year: 1991
	},
	{
		name: 'Ruby',
		year: 1995
	},
	{
		name: 'Scala',
		year: 2003
	}
];

// https://developer.mozilla.org/en/docs/Web/JavaScript/Guide/Regular_Expressions#Using_Special_Characters
function escapeRegexCharacters(str) {
	return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function getSuggestions(value) {
	const escapedValue = escapeRegexCharacters(value.trim());

	if (escapedValue === '') {
		return [];
	}

	const regex = new RegExp('^' + escapedValue, 'i');

	return languages.filter(language => regex.test(language.name));
}

function getSuggestionValue(suggestion) {
	return suggestion.name;
}

function renderSuggestion(suggestion) {
	return <span>{suggestion.name}</span>;
}

class SearchBar extends Component {
	state = {
		value: '',
		suggestions: []
	};

	onChange = (event, { newValue, method }) => {
		this.setState({
			value: newValue
		});
	};

	onSuggestionsFetchRequested = ({ value }) => {
		this.setState({
			suggestions: getSuggestions(value)
		});
	};

	onSuggestionsClearRequested = () => {
		this.setState({
			suggestions: []
		});
	};

	render() {
		const { value, suggestions } = this.state;
		const inputProps = {
			placeholder: "Type 'c'",
			value,
			onChange: this.onChange
		};

		return (
			<Autosuggest
				suggestions={suggestions}
				onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
				onSuggestionsClearRequested={this.onSuggestionsClearRequested}
				getSuggestionValue={getSuggestionValue}
				renderSuggestion={renderSuggestion}
				inputProps={inputProps}
				theme={theme}
			/>
		);
	}
}

export default SearchBar; //component class name to export
