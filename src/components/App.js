import React, { Component } from 'react';
import CalendarIcon from 'react-icons/lib/fa/calendar-plus-o';
import { connect } from 'react-redux';
import { addRecipe, removeFromCalendar } from '../actions';
import { capitalize } from '../utils/helpers'

class App extends Component {
    render() {
        const { calendar, addRecipe, removeRecipe } = this.props;
        const mealOrder = [ 'breakfast', 'lunch', 'dinner' ];


        return (
            <div className="container">
                <ul className="meal-types">
                    { mealOrder.map( mealName =>
                        <li key={ mealName } className="subheader">
                            { capitalize( mealName ) }
                        </li>
                    ) }
                </ul>

                <div className="calendar">
                    <div className='days'>
                        { calendar.map( ({ day }) =>
                            <h3 key={day} className='subheader'>
                                { capitalize(day) }
                            </h3>
                        ) }
                    </div>
                    <div className='icon-grid'>
                        { calendar.map( ( calendarData ) => {
                            const today = calendarData.day;
                            const todaysMeals = calendarData.meals;
                            return (
                                <ul key={today}>
                                    { mealOrder.map( mealName =>
                                        <li key={ mealName } className="meal">
                                            { todaysMeals[mealName]
                                                ? <div className='food-item'>
                                                    <img
                                                        src={todaysMeals[mealName].image}
                                                        alt={todaysMeals[mealName].label}
                                                    />
                                                    <button onClick={ () => removeRecipe( {
                                                        meal: mealName,
                                                        day:today
                                                    } ) }>
                                                        Clear
                                                    </button>
                                                </div>
                                                : <button className='icon-btn'>
                                                    <CalendarIcon size={30}/>
                                                </button>
                                            }
                                        </li>
                                    ) }
                                </ul>
                            );
                        } ) }
                    </div>
                </div>
            </div>
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
