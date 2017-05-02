import { SITE_TOGGLE_SUBSCRIPTION_REQUEST, SITE_ADD_SUBSCRIPTION_SUCCESS,
	SITE_REMOVE_SUBSCRIPTION_SUCCESS, SITE_TOGGLE_SUBSCRIPTION_FAILURE,
	SITE_REMOVE_START, SITE_REMOVE_SUCCESS, SITE_REMOVE_FAILURE } from "../actions/site";

/**
 * Initial state
 */

const rootState = {
	ui: {
		site: {
			removing: false,
			subscriptions: {
				error: "",
				toggling: false,
			},
		},
	},
};

/**
 * Reducers
 */

/**
 * A reducer for the site add subscription actions within the ui site object.
 *
 * @param {Object} state The current state of the object.
 * @param {Object} action The current action received.
 * @returns {Object} The updated state.
 */
export function uiSiteSubscriptionsReducer( state = rootState.ui.site.subscriptions, action ) {
	switch ( action.type ) {
		case SITE_TOGGLE_SUBSCRIPTION_REQUEST:
			return Object.assign( {}, state, {
				toggling: true,
				error: "",
			} );
		case SITE_ADD_SUBSCRIPTION_SUCCESS:
		case SITE_REMOVE_SUBSCRIPTION_SUCCESS:
			return Object.assign( {}, state, {
				toggling: false,
			} );
		case SITE_TOGGLE_SUBSCRIPTION_FAILURE:
			return Object.assign( {}, state, {
				toggling: false,
				error: action.addingSubscriptionError,
			} );
		default:
			return state;
	}
}

/**
 * A reducer for the site object within the ui object.
 *
 * @param {Object} state The current state of the object.
 * @param {Object} action The current action received.
 *
 * @returns {Object} The updated Site object.
 */
export function uiSiteReducer( state = rootState.ui.site, action ) {
	let site = Object.assign( {}, state );
	switch ( action.type ) {
		case SITE_REMOVE_START:
			site.removing = true;
			break;
		case SITE_REMOVE_SUCCESS:
			site.removing = false;
			break;
		case SITE_REMOVE_FAILURE:
			site.removing = false;
			break;
		default:
			break;
	}
	site.subscriptions = uiSiteSubscriptionsReducer( state.subscriptions, action );
	return site;
}
