/**
 * @format
 * @flow
 */

import { vh, vw } from 'react-native-expo-viewport-units'

// UI
export const DEVICE_HEIGHT = vh(100)
export const DEVICE_WIDTH = vw(100)
export const POST_PHOTO_SIZE_HEIGHT = 1000
export const POST_PHOTO_SIZE_WIDTH = 1000
export const STRUCTURE_GO_BACK_BUTTON_SIZE = 24
export const STRUCTURE_LITTEN_POST_IMAGE_TO_CONTENT_RATIO = 0.55
export const STRUCTURE_TAB_NAV_BORDER_RADIUS = 40
export const STRUCTURE_TAB_NAV_HEIGHT = 100
export const STRUCTURE_TEMPLATE_SCREEN_BORDER_RADIUS = 26
export const STRUCTURE_TEMPLATE_SCREEN_HEADER_HEIGHT = vh((1 / 10) * 100)
export const STRUCTURE_TEMPLATE_SCREEN_HEADER_PADDING_BOTTOM = 24
export const STRUCTURE_TEMPLATE_SCREEN_HEADER_WIDTH = vw(90)
export const STRUCTURE_TEMPLATE_SCREEN_HEADER_MARGIN =
  (DEVICE_WIDTH - STRUCTURE_TEMPLATE_SCREEN_HEADER_WIDTH) / 2
export const UI_ABOUT_LOGO_HEIGHT = vh(5)
export const UI_ABOUT_LOGO_WIDTH = vw(60)
export const UI_EMPTY_PLACEHOLDER_IMAGE = vw(30)
export const UI_EXTRA_OPTION_SIZE = 18
export const UI_HIDDEN_OPTION_WIDTH = 100
export const UI_ICON_SIZE_MEDIUM = 64
export const UI_ICON_SIZE_MINI = 24
export const UI_ICON_SIZE_SMALL = 40
export const UI_IMAGE_PLACEHOLDER_ITEM_SIZE = vw(21)
export const UI_LITTEN_CARD_BORDER_RADIUS = 20
export const UI_LITTEN_CARD_CONTENT_TO_CONTAINER_RATIO = 0.75
export const UI_LITTEN_CARD_HEIGHT = 240
export const UI_LITTEN_CARD_IMAGE_TO_CONTENT_RATIO = 0.47
export const UI_LITTEN_CARD_SPACING = 28
export const UI_MESSAGE_MIN_INPUT_TOOLBAR_HEIGHT = 54
export const UI_MODAL_MIN_HEIGHT = 215
export const UI_SELECT_OPTION_HEIGHT = 60
export const USER_AVATAR_SIZE_LARGE = 200
export const USER_AVATAR_SIZE_MEDIUM = 82
export const USER_AVATAR_SIZE_MINI = 36

// Screens
export const SCREEN_DEV_HACKS = 'dev/hacks'
export const SCREEN_DEV_STORYBOOK = 'dev/storybook'
export const SCREEN_HOME_FILTER = 'home/filter'
export const SCREEN_HOME_FILTER_SET = 'home/filter/set'
export const SCREEN_HOME_INDEX = 'home/index'
export const SCREEN_LITTEN_POST = 'litten/post'
export const SCREEN_MESSAGE_PRIVATE = 'message/private'
export const SCREEN_NEW_INDEX = 'new/index'
export const SCREEN_NEW_LOCATION = 'new/location'
export const SCREEN_NOAUTH_LOGIN = 'noauth/login'
export const SCREEN_NOAUTH_RECOVER = 'noauth/recover'
export const SCREEN_NOAUTH_REGISTER = 'noauth/register'
export const SCREEN_NOAUTH_WELCOME = 'noauth/welcome'
export const SCREEN_PROFILE_ABOUT = 'profile/about'
export const SCREEN_PROFILE_EDIT = 'profile/edit'
export const SCREEN_PROFILE_INDEX = 'profile/index'
export const SCREEN_PROFILE_POSTS = 'profile/posts'
export const SCREEN_PROFILE_REPORT = 'profile/report'
export const SCREEN_PROFILE_SETTINGS = 'profile/settings'
export const SCREEN_PROFILE_WEBVIEW = 'profile/webview'
export const SCREEN_TAB_NAV_FAVOURITES = 'tabnav/favourites'
export const SCREEN_TAB_NAV_FAVOURITES_POSTS = 'tabnav/favourites/posts'
export const SCREEN_TAB_NAV_FAVOURITES_SEARCHES = 'tabnav/favourites/searches'
export const SCREEN_TAB_NAV_HOME = 'tabnav/home'
export const SCREEN_TAB_NAV_MESSAGES = 'tabnav/messages'
export const SCREEN_TAB_NAV_NEW = 'tabnav/new'
export const SCREEN_TAB_NAV_PROFILE = 'tabnav/profile'
export const SCREEN_USER_PROFILE = 'profile/view'

// WebViews
export const WEB_APP_HELP_AND_CONTACT = '/help-and-contacts'
export const WEB_APP_TERMS_AND_CONDITIONS = '/terms-and-conditions'
export const WEB_APP_PRIVACY_POLICY = '/privacy-policy'

// Messages
export const CONVERSATION_DELETE_CONVERSATION =
  'CONVERSATION_DELETE_CONVERSATION'
export const CONVERSATION_VIEW_LITTEN = 'CONVERSATION_VIEW_LITTEN'
export const CONVERSATION_VIEW_PROFILE = 'CONVERSATION_VIEW_PROFILE'

// Data
export const DB_CHAT_COLLECTION = 'chats'
export const DB_LITTEN_COLLECTION = 'littens'
export const DB_MESSAGE_COLLECTION = 'messages'
export const DB_USER_COLLECTION = 'users'
export const DB_USER_KEY_ID = 'userUid'

// User preferences
export const USER_PREFERENCES_CONTACT_CALL = 'USER_PREFERENCES_CONTACT_CALL'
export const USER_PREFERENCES_CONTACT_EMAIL = 'USER_PREFERENCES_CONTACT_EMAIL'
export const USER_PREFERENCES_CONTACT_INAPP = 'USER_PREFERENCES_CONTACT_INAPP'
export const USER_PREFERENCES_CONTACT_SMS = 'USER_PREFERENCES_CONTACT_SMS'

// Litten species
export const LITTEN_SPECIES_DOG = 'LITTEN_SPECIES_DOG'
export const LITTEN_SPECIES_CAT = 'LITTEN_SPECIES_CAT'
export const LITTEN_SPECIES_BIRD = 'LITTEN_SPECIES_BIRD'
export const LITTEN_SPECIES_RABBIT = 'LITTEN_SPECIES_RABBIT'
export const LITTEN_SPECIES_RODENT = 'LITTEN_SPECIES_RODENT'
export const LITTEN_SPECIES_OTHER = 'LITTEN_SPECIES_OTHER'

// Litten types
export const LITTEN_TYPE_ADOPT = 'LITTEN_TYPE_ADOPT'
export const LITTEN_TYPE_BREED = 'LITTEN_TYPE_BREED'
export const LITTEN_TYPE_LOST = 'LITTEN_TYPE_LOST'
export const LITTEN_TYPE_FOUND = 'LITTEN_TYPE_FOUND'

// Search filters
export const LITTEN_FILTER_SPECIES = 'LITTEN_FILTER_SPECIES'
export const LITTEN_FILTER_TYPE = 'LITTEN_FILTER_TYPE'
export const LITTEN_FILTER_LOCATION_RADIUS = 'LITTEN_FILTER_LOCATION_RADIUS'
export const LITTEN_FILTER_SPECIES_STORE = 'littenSpecies'
export const LITTEN_FILTER_TYPE_STORE = 'littenType'
export const LITTEN_FILTER_LOCATION_RADIUS_STORE = 'locationRadius'
// In kilometers
export const LITTEN_FILTER_LOCATION_RADIUS_MIN = 1
export const LITTEN_FILTER_LOCATION_RADIUS_DEFAULT = 35
export const LITTEN_FILTER_LOCATION_RADIUS_MAX = 100

// Universal constans
export const EARTH_CIRCUMFERENCE_EQUATOR = 40075 // km
export const EARTH_CIRCUMFERENCE_POLES = 40007 // km
export const EARTH_RADIUS = 6371 // km

// Measurement units
export const MEASURE_KM = 'km'
export const MEASURE_MI = 'mi'
export const KM_PER_MI = 1.609344
export const LAT_DEGREES_PER_KM = 360 / EARTH_CIRCUMFERENCE_POLES
export const LNG_DEGREES_PER_KM = 360 / EARTH_CIRCUMFERENCE_EQUATOR

// Other
export const LITTEN_URI = 'litten://'
export const STORAGE_USER_AVATAR = '/images/avatar'
export const STORAGE_LITTEN_PHOTOS = '/images/littens'
export const STORAGE_OBJECT_NOT_FOUND = 'storage/object-not-found'
export const NO_RESULTS_REFRESH_TIMEOUT_IN = 3.5 // seconds
export const NEW_POST_NUM_OF_PHOTOS = 8
