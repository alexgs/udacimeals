import React, { Component } from 'react';
import ArrowRightIcon from 'react-icons/lib/fa/arrow-circle-right';
import CalendarIcon from 'react-icons/lib/fa/calendar-plus-o';
import Loading from 'react-loading';
import Modal from 'react-modal';
import { connect } from 'react-redux';
import { addRecipe, removeFromCalendar } from '../actions';
import { fetchRecipes } from '../utils/api';
import { capitalize } from '../utils/helpers';
import FoodList from "./FoodList";

class App extends Component {
    constructor( props ) {
        super( props );
        this.state = {
            foodModalOpen: false,
            meal: null,
            day: null,
            food: null,
        };
        this.closeFoodModal = this.closeFoodModal.bind( this );
        this.openFoodModal = this.openFoodModal.bind( this );
        this.searchFood = this.searchFood.bind( this );
    }

    openFoodModal( { meal, day } ) {
        this.setState( {
            foodModalOpen: true,
            meal,
            day
        } );
    }

    closeFoodModal() {
        this.setState( {
            foodModalOpen: false,
            meal: null,
            day: null,
            food: null,
        } );
    }

    searchFood( event ) {
        if ( !this.input.value) {
            return undefined;
        }
        event.preventDefault();
        this.setState( { loadingFood: true } );

        fetchRecipes( this.input.value )
            .then( food => this.setState( {
                food,
                loadingFood: false
            } ) );
    }

    render() {
        const { foodModalOpen, loadingFood, food } = this.state;
        const calendar = this.props.calendar;
        const addRecipe = this.props.addRecipeToCalendar;
        const removeRecipe = this.props.removeRecipeFromCalendar;
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
                                                    <button onClick={() => removeRecipe( {
                                                        meal: mealName,
                                                        day: today
                                                    } )}>
                                                        Clear
                                                    </button>
                                                </div>
                                                : <button
                                                    className='icon-btn'
                                                    onClick={() => this.openFoodModal( {
                                                        meal: mealName,
                                                        day:today
                                                    } )}
                                                >
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

                <Modal
                    className="modal"
                    overlayClassName="overlay"
                    isOpen={ foodModalOpen }
                    onRequestClose={ this.closeFoodModal }
                    contentLabel="Modal"
                >
                    <div>
                        { loadingFood === true
                            ? <Loading delay={200} type='spin' color='#222' className='loading' />
                            : <div className='search-container'>
                                <h3 className='subheader'>
                                    Find a meal for {capitalize(this.state.day)} {this.state.meal}.
                                </h3>
                                <div className='search'>
                                    <input
                                        className='food-input'
                                        type='text'
                                        placeholder='Search Foods'
                                        ref={(input) => this.input = input}
                                    />
                                    <button
                                        className='icon-btn'
                                        onClick={this.searchFood}>
                                        <ArrowRightIcon size={30}/>
                                    </button>
                                </div>
                                {food !== null && (
                                    <FoodList
                                        food={food}
                                        onSelect={(recipe) => {
                                            // console.log( JSON.stringify( recipe, null, 2 ) );
                                            addRecipe({ recipe, day: this.state.day, meal: this.state.meal });
                                            this.closeFoodModal();
                                        }}
                                    />
                                )}
                            </div>
                        }
                    </div>
                </Modal>
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
        addRecipeToCalendar: ( { day, recipe, meal } ) => dispatch( addRecipe( { day, recipe, meal } ) ),
        removeRecipeFromCalendar: ( { day, meal } ) => dispatch( removeFromCalendar( { day, meal } ) )
    };
}

export default connect( mapStateToProps, mapDispatchToProps )( App );
