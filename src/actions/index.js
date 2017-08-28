export const ADD_RECIPE = 'add-recipe-action';
export const REMOVE_FROM_CALENDAR = 'remove-from-calendar-action';

export function addRecipe( { day, recipe, meal } ) {
    return {
        type: ADD_RECIPE,
        recipe,
        day,
        meal
    }
}

export function removeFromCalendar( { day, meal } ) {
    return {
        type: REMOVE_FROM_CALENDAR,
        day,
        meal
    }
}
