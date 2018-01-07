const actionTypes = {
  GET_EVENT_REQUESTED: 'GET_EVENT_REQUESTED',
  GET_EVENT_REJECTED: 'GET_EVENT_REJECTED',
  GET_EVENT_FULFILLED: 'GET_EVENT_FULFILLED',

  GET_EVENTS_MANY_REQUESTED: 'GET_EVENTS_MANY_REQUESTED',
  GET_EVENTS_MANY_REJECTED: 'GET_EVENTS_MANY_REJECTED',
  GET_EVENTS_MANY_FULFILLED: 'GET_EVENTS_MANY_FULFILLED',

  GET_USER_EVENTS_MANY_REQUESTED: 'GET_USER_EVENTS_MANY_REQUESTED',
  GET_USER_EVENTS_MANY_REJECTED: 'GET_USER_EVENTS_MANY_REJECTED',
  GET_USER_EVENTS_MANY_FULFILLED: 'GET_USER_EVENTS_MANY_FULFILLED',

  CREATE_EVENT_REQUESTED: 'CREATE_EVENT_REQUESTED',
  CREATE_EVENT_REJECTED: 'CREATE_EVENT_REJECTED',
  CREATE_EVENT_FULFILLED: 'CREATE_EVENT_FULFILLED',

  DELETE_EVENT_REQUESTED: 'DELETE_EVENT_REQUESTED',
  DELETE_EVENT_REJECTED: 'DELETE_EVENT_REJECTED',
  DELETE_EVENT_FULFILLED: 'DELETE_EVENT_FULFILLED',

  RESTORE_EVENT_REQUESTED: 'RESTORE_EVENT_REQUESTED',
  RESTORE_EVENT_REJECTED: 'RESTORE_EVENT_REJECTED',
  RESTORE_EVENT_FULFILLED: 'RESTORE_EVENT_FULFILLED',

  UPDATE_EVENT_REQUESTED: 'UPDATE_EVENT_REQUESTED',
  UPDATE_EVENT_REJECTED: 'UPDATE_EVENT_REJECTED',
  UPDATE_EVENT_FULFILLED: 'UPDATE_EVENT_FULFILLED',

  DISMISS_NOTIFICATION: 'DISMISS_NOTIFICATION',

  SET_EVENT_STATUS_FILTER: 'SET_EVENT_STATUS_FILTER',
  SET_EVENT_TYPE_FILTER: 'SET_EVENT_TYPE_FILTER',

  UPDATE_EVENT_EDIT_REQUESTED: 'UPDATE_EVENT_EDIT_REQUESTED',
  UPDATE_EVENT_EDIT_FULFILLED: 'UPDATE_EVENT_EDIT_FULFILLED',
  UPDATE_EVENT_EDIT_REJECTED: 'UPDATE_EVENT_EDIT_REJECTED',

  CREATE_USER_REQUESTED: 'CREATE_USER_REQUESTED',
  CREATE_USER_FULFILLED: 'CREATE_USER_FULFILLED',
  CREATE_USER_REJECTED: 'CREATE_USER_REJECTED',

  GET_USER_REQUESTED: 'GET_USER_REQUESTED',
  GET_USER_FULFILLED: 'GET_USER_FULFILLED',
  GET_USER_REJECTED: 'GET_USER_REJECTED',

  SIGN_IN_REQUESTED: 'SIGN_IN_REQUESTED',
  SIGN_IN_ERROR: 'SIGN_IN_ERROR',
  SIGN_IN_SUCCESS: 'SIGN_IN_SUCCESS',

  SIGN_OUT_REQUESTED: 'SIGN_OUT_REQUESTED',
  SIGN_OUT_SUCCESS: 'SIGN_OUT_SUCCESS',
  SIGN_OUT_ERROR: 'SIGN_OUT_ERROR',

  SET_NEXT_ROUTE_REQUESTED: 'SET_NEXT_ROUTE_REQUESTED',
  SET_NEXT_ROUTE_FULFILLED: 'SET_NEXT_ROUTE_FULFILLED',
  SET_NEXT_ROUTE_REJECTED: 'SET_NEXT_ROUTE_REJECTED',

  GET_BAND_REQUESTED: 'GET_BAND_REQUESTED',
  GET_BAND_REJECTED: 'GET_BAND_REJECTED',
  GET_BAND_FULFILLED: 'GET_BAND_FULFILLED',

  GET_BANDS_MANY_REQUESTED: 'GET_BANDS_MANY_REQUESTED',
  GET_BANDS_MANY_REJECTED: 'GET_BANDS_MANY_REJECTED',
  GET_BANDS_MANY_FULFILLED: 'GET_BANDS_MANY_FULFILLED',

  CREATE_BAND_REQUESTED: 'CREATE_BAND_REQUESTED',
  CREATE_BAND_REJECTED: 'CREATE_BAND_REJECTED',
  CREATE_BAND_FULFILLED: 'CREATE_BAND_FULFILLED',

  DELETE_BAND_REQUESTED: 'DELETE_BAND_REQUESTED',
  DELETE_BAND_REJECTED: 'DELETE_BAND_REJECTED',
  DELETE_BAND_FULFILLED: 'DELETE_BAND_FULFILLED',

  RESTORE_BAND_REQUESTED: 'RESTORE_BAND_REQUESTED',
  RESTORE_BAND_REJECTED: 'RESTORE_BAND_REJECTED',
  RESTORE_BAND_FULFILLED: 'RESTORE_BAND_FULFILLED',

  UPDATE_BAND_REQUESTED: 'UPDATE_BAND_REQUESTED',
  UPDATE_BAND_REJECTED: 'UPDATE_BAND_REJECTED',
  UPDATE_BAND_FULFILLED: 'UPDATE_BAND_FULFILLED',

  UPDATE_BAND_EDIT_REQUESTED: 'UPDATE_BAND_EDIT_REQUESTED',
  UPDATE_BAND_EDIT_FULFILLED: 'UPDATE_BAND_EDIT_FULFILLED',
  UPDATE_BAND_EDIT_REJECTED: 'UPDATE_BAND_EDIT_REJECTED',

  UPLOAD_BAND_LOGO_REQUESTED: 'UPLOAD_BAND_LOGO_REQUESTED',
  UPLOAD_BAND_LOGO_FULFILLED: 'UPLOAD_BAND_LOGO_FULFILLED',
  UPLOAD_BAND_LOGO_REJECTED: 'UPLOAD_BAND_LOGO_REJECTED',

  UPLOAD_STAGE_PLOT_REQUESTED: 'UPLOAD_STAGE_PLOT_REQUESTED',
  UPLOAD_STAGE_PLOT_FULFILLED: 'UPLOAD_STAGE_PLOT_FULFILLED',
  UPLOAD_STAGE_PLOT_REJECTED: 'UPLOAD_STAGE_PLOT_REJECTED',

  DELETE_STAGE_PLOT_REQUESTED: 'DELETE_STAGE_PLOT_REQUESTED',
  DELETE_STAGE_PLOT_FULFILLED: 'DELETE_STAGE_PLOT_FULFILLED',
  DELETE_STAGE_PLOT_REJECTED: 'DELETE_STAGE_PLOT_REJECTED',

  SEARCH_USERS_REQUESTED: 'SEARCH_USERS_REQUESTED',
  SEARCH_USERS_FULFILLED: 'SEARCH_USERS_FULFILLED',
  SEARCH_USERS_REJECTED: 'SEARCH_USERS_REJECTED',

  UPDATE_USER_EDIT_REQUESTED: 'UPDATE_USER_EDIT_REQUESTED',
  UPDATE_USER_EDIT_FULFILLED: 'UPDATE_USER_EDIT_FULFILLED',
  UPDATE_USER_EDIT_REJECTED: 'UPDATE_USER_EDIT_REJECTED',

  UPDATE_USER_REQUESTED: 'UPDATE_USER_REQUESTED',
  UPDATE_USER_FULFILLED: 'UPDATE_USER_FULFILLED',
  UPDATE_USER_REJECTED: 'UPDATE_USER_REJECTED',

  GET_PROFILE_REQUESTED: 'GET_PROFILE_REQUESTED',
  GET_PROFILE_FULFILLED: 'GET_PROFILE_FULFILLED',
  GET_PROFILE_REJECTED: 'GET_PROFILE_REJECTED',

  CLEAR_PROFILE_REQUESTED: 'CLEAR_PROFILE_REQUESTED',
  CLEAR_PROFILE_FULFILLED: 'CLEAR_PROFILE_FULFILLED',
  CLEAR_PROFILE_REJECTED: 'CLEAR_PROFILE_REJECTED',

  INVITE_TO_GROUP_REQUESTED: 'INVITE_TO_GROUP_REQUESTED',
  INVITE_TO_GROUP_FULFILLED: 'INVITE_TO_GROUP_FULFILLED',
  INVITE_TO_GROUP_REJECTED: 'INVITE_TO_GROUP_REJECTED',

  UPLOAD_PROFILE_PIC_REQUESTED: 'UPLOAD_PROFILE_PIC_REQUESTED',
  UPLOAD_PROFILE_PIC_FULFILLED: 'UPLOAD_PROFILE_PIC_FULFILLED',
  UPLOAD_PROFILE_PIC_REJECTED: 'UPLOAD_PROFILE_PIC_REJECTED',
};

export default actionTypes;