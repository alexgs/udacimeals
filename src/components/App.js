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

function mapStateToProps( { calendar, food } ) {
    const dayOrder = [ 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday' ];
    return {
        calendar: dayOrder.map( day => ( {
            day,
            meals: Object.keys( calendar[day] ).reduce( ( todaysMeals, currentMeal ) => {
                todaysMeals[currentMeal] = calendar[day][currentMeal] ? food[ calendar[day][currentMeal] ] : null;
                return todaysMeals;
            }, {} )
        } ) )
    };
}

function mapDispatchToProps( dispatch ) {
    return {
        addRecipeToCalendar: ( day, recipe, meal ) => dispatch( addRecipe( { day, recipe, meal } ) ),
        removeRecipeFromCalendar: ( day, meal ) => dispatch( removeFromCalendar( { day, meal } ) )
    };
}

export default connect( mapStateToProps, mapDispatchToProps )( App );
