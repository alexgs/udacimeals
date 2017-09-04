import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addRecipe, removeFromCalendar } from '../actions';
import '../App.css';

class App extends Component {
    render() {
        return (
            <p>Hello World</p>
        );
    }
}

function mapStateToProps( state ) {
    return {
        calendar: state
    };
}

function mapDispatchToProps( dispatch ) {
    return {
        addRecipeToCalendar: ( day, recipe, meal ) => dispatch( addRecipe( { day, recipe, meal } ) ),
        removeRecipeFromCalendar: ( day, meal ) => dispatch( removeFromCalendar( { day, meal } ) )
    };
}

export default connect( mapStateToProps, mapDispatchToProps )( App );
