export const backendEndpoint = 'https://b0e39128.ngrok.io/'; //Note to self: MAKE SURE TO PUT A / AFTER THE NGROK URL http://localhost:3000

export const LOGIN_URL = 'users/login';
export const REGISTER_URL = 'users/signup';
export const PROFILE_IMG_URL ='users/upload-profile-photo'; //REVIEW ROUTE PARAMETRS 

export const GET_USER_URL =  'users/get/'; 
export const DELETE_USER_URL ='users/deleteUser'; //NOT SURE HOW THIS WORKS
export const UPDATE_USER_URL ='users/updateAccount';
/*
Parameters
first_name - string (optional)
last_name - string (optional)
phone_number - string (optional)
public - 1 or 0 (optional)
*/
export const USER_FOLLOWING_URL ='users/get-following/'; 
export const USER_FOLLOWERS_URL ='users/get-followers/'; 
export const VERIFY_EMAIL_URL = 'users/verify-email'; 
export const ISFOLLOWING_URL = 'users/isFollowingUser'; 
export const FOLLOW_URL ='users/follow'; 
/*
Parameters
followUsername - string
*/
export const UNFOLLOW_URL ='users/unfollow'; 
/*
Parameters
followUsername - string
*/
//export const GET_POPULAR_TRIPS_URL =''; 
//ITINERARIES 
export const CREATE_ITINERARY_URL = 'itineraries/create-itinerary';
export const DELETE_ITINERARY_URL = 'itineraries/delete-trip';
export const USER_IT_URL ='itineraries/get/'; 
export const ALL_IT_URL ='itineraries/get-all-itineraries'; 
export const SINGLE_IT_URL ='itineraries/get-by-id/'; 


export const LIKE_IT_URL ='itineraries/like-itinerary'; 
/*
Parameters
itinerary_id - int
*/
export const DISLIKE_IT_URL ='itineraries/dislike-itinerary'; 
/*
Parameters
itinerary_id - int
*/

//TRIPS 
export const CREATE_TRIP_URL = 'trips/create-trip';
export const DELETE_TRIP_URL = 'trips/delete-trip';
export const USER_TRIPS_URL ='trips/get/'; //REVIEW 
export const ALL_TRIPS_URL ='trips/get-all-trips';
export const SINGLE_TRIP_URL= 'trips/get-by-id/' ; //REVIEW :id';
export const ADD_PLAN_TO_TRIP_URL = 'trips/add-itinerary'
export const RECOMMEND_PLANS = 'trips/recommend-plans/'