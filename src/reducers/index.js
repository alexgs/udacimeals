import { combineReducers } from 'redux';
import { ADD_RECIPE, REMOVE_FROM_CALENDAR } from '../actions';

const initialCalendarState = {
    monday: {
        breakfast: null,
        lunch: null,
        dinner: null
    },
    tuesday: {
        breakfast: null,
        lunch: null,
        dinner: null
    },
    wednesday: {
        breakfast: null,
        lunch: null,
        dinner: null
    },
    thursday: {
        breakfast: null,
        lunch: null,
        dinner: null
    },
    friday: {
        breakfast: null,
        lunch: null,
        dinner: null
    },
    saturday: {
        breakfast: null,
        lunch: null,
        dinner: null
    },
    sunday: {
        breakfast: null,
        lunch: null,
        dinner: null
    }
};

const calendarReducer = function( state=initialCalendarState, action ) {
    switch ( action.type ) {
        case ADD_RECIPE:
            return {
                ...state,
                [ action.day ]: {
                    ...state[ action.day ],
                    [ action.meal ]: action.recipe.label
                }
            };
        case REMOVE_FROM_CALENDAR:
            return {
                ...state,
                [ action.day ]: {
                    ...state[ action.day ],
                    [ action.meal ]: null
                }
            };
        default:
            return state;
    }
};

const foodReducer = function( state={}, action ) {
    switch( action.type ) {
        case ADD_RECIPE:
            return {
                ...state,
                [ action.recipe.label ]: action.recipe
            };
        default:
            return state;
    }
};

export default combineReducers( {
    calendar: calendarReducer,
    food: foodReducer
} );
