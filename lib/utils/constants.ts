import { vh, vw } from 'react-native-expo-viewport-units'
// UI
export const DEVICE_HEIGHT: number = vh(100)
export const DEVICE_WIDTH: number = vw(100)
export const POST_PHOTO_SIZE_HEIGHT = 1000
export const POST_PHOTO_SIZE_WIDTH = 1000
export const RECOMMENDED_MINIMUM_TAPPABLE_SIZE = 44
export const STRUCTURE_GO_BACK_BUTTON_SIZE = 24
export const STRUCTURE_SHARE_BUTTON_SIZE = 24
export const STRUCTURE_LITTEN_POST_IMAGE_TO_CONTENT_RATIO = 0.55
export const STRUCTURE_PADDING_MULTIPLIER = 1.2
export const STRUCTURE_TAB_NAV_ACTIVE_INDICATOR_SIZE = 6
export const STRUCTURE_TAB_NAV_BORDER_RADIUS = 40
export const STRUCTURE_TAB_NAV_HEIGHT = 70
export const STRUCTURE_PADDING_EXTRA =
  STRUCTURE_TAB_NAV_HEIGHT * (STRUCTURE_PADDING_MULTIPLIER - 1)
export const STRUCTURE_TAB_NAV_ICON_INDICATOR_DISTANCE = 8
export const STRUCTURE_TAB_NAV_ICON_SIZE = 28
export const STRUCTURE_TEMPLATE_SCREEN_BORDER_RADIUS = 26
export const STRUCTURE_TEMPLATE_SCREEN_HEADER_HEIGHT: number = vh(
  (1 / 10) * 100,
)
export const STRUCTURE_TEMPLATE_SCREEN_HEADER_PADDING_BOTTOM = 24
export const STRUCTURE_TEMPLATE_SCREEN_HEADER_PROFILE_WIDTH: number = vw(85)
export const STRUCTURE_TEMPLATE_SCREEN_HEADER_WIDTH: number = vw(90)
export const STRUCTURE_TEMPLATE_SCREEN_HEADER_MARGIN =
  (DEVICE_WIDTH - STRUCTURE_TEMPLATE_SCREEN_HEADER_WIDTH) / 2
export const STRUCTURE_TEMPLATE_SCREEN_PADDING = 24
export const UI_ABOUT_LOGO_HEIGHT: number = vh(5)
export const UI_ABOUT_LOGO_RATIO = 3.625
export const UI_ABOUT_LOGO_WIDTH: number = vw(100 * UI_ABOUT_LOGO_RATIO)
export const UI_BADGE_ELEMENT_OFFSET = 15
export const UI_BADGE_SIZE = 20
export const UI_BADGE_PADDING = UI_BADGE_SIZE / 4
export const UI_BOTTOM_LOADER_HEIGHT = 40
export const UI_BUTTON_BORDER_RADIUS = 24
export const UI_BUTTON_FIXED_WIDTH: number = vw(77)
export const UI_DROPDOWN_MARGIN = 6
export const UI_ELEMENT_BORDER_MARGIN = 8
export const UI_ELEMENT_BORDER_RADIUS = 6
export const UI_ELEMENT_LIST_HEIGHT = 64
export const UI_EMPTY_PLACEHOLDER_IMAGE: number = vw(30)
export const UI_EXTRA_OPTION_SIZE = 20
export const UI_HIDDEN_OPTION_WIDTH = 100
export const UI_ICON_SIZE_MEDIUM = 64
export const UI_ICON_SIZE_MICRO = 12
export const UI_ICON_SIZE_MINI = 24
export const UI_ICON_SIZE_SMALL = 40
export const UI_IMAGE_PLACEHOLDER_ITEM_MARGIN: number = vw(0.5)
export const UI_IMAGE_PLACEHOLDER_ITEM_SIZE: number = vw(21)
export const UI_LITTEN_CARD_BORDER_RADIUS = 20
export const UI_LITTEN_CARD_CONTENT_TO_CONTAINER_RATIO = 0.75
export const UI_LITTEN_CARD_HEIGHT = 240
export const UI_LITTEN_CARD_IMAGE_TO_CONTENT_RATIO = 0.47
export const UI_LITTEN_CARD_SPACING = 28
export const UI_MAP_BORDER_RADIUS = 8
export const UI_MAP_MIN_HEIGHT: number = vh(55)
export const UI_MESSAGE_MIN_INPUT_TOOLBAR_HEIGHT = 54
export const UI_MODAL_MIN_HEIGHT = 215
export const UI_OPERATION_STATUS_ICON_SIZE = 80
export const UI_PRESSED_OPACITY = 0.6
export const UI_SCREEN_NOAUTH_CTA_HEIGHT = 24
export const UI_SELECT_OPTION_HEIGHT = 60
export const USER_AVATAR_SIZE_LARGE = 200
export const USER_AVATAR_SIZE_MEDIUM = 82
export const USER_AVATAR_SIZE_MINI = 36
// Screens
export const SCREEN_DEV_HACKS = 'dev/hacks'
export const SCREEN_HOME_FILTER = 'home/filter'
export const SCREEN_HOME_FILTER_SET = 'home/filter/set'
export const SCREEN_HOME_INDEX = 'home/index'
export const SCREEN_LITTEN_POST = 'litten/post'
export const SCREEN_LITTEN_POST_SHARED = 'litten/post/shared'
export const SCREEN_MESSAGE_PRIVATE = 'message/private'
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
export const SCREEN_PROFILE_VERIFICATION = 'profile/verification'
export const SCREEN_PROFILE_WEBVIEW = 'profile/webview'
export const SCREEN_TAB_NAV_FAVOURITES = 'tabnav/favourites'
export const SCREEN_TAB_NAV_FAVOURITES_POSTS = 'tabnav/favourites/posts'
export const SCREEN_TAB_NAV_FAVOURITES_SEARCHES = 'tabnav/favourites/searches'
export const SCREEN_TAB_NAV_INDEX = 'tabnav/index'
export const SCREEN_TAB_NAV_HOME = 'tabnav/home'
export const SCREEN_TAB_NAV_MESSAGES = 'tabnav/messages'
export const SCREEN_TAB_NAV_NEW = 'tabnav/new'
export const SCREEN_TAB_NAV_PROFILE = 'tabnav/profile'
export const SCREEN_USER_PROFILE = 'profile/view'
// WebViews
export const WEB_APP_HELP_AND_CONTACT = '/faq?inapp=true'
export const WEB_APP_TERMS_AND_CONDITIONS = '/terms-and-conditions?inapp=true'
export const WEB_APP_PRIVACY_POLICY = '/privacy-policy?inapp=true'
// Messages
export const CONVERSATION_DELETE_CONVERSATION =
  'CONVERSATION_DELETE_CONVERSATION'
export const CONVERSATION_REPORT_CONVERSATION =
  'CONVERSATION_REPORT_CONVERSATION'
export const CONVERSATION_VIEW_LITTEN = 'CONVERSATION_VIEW_LITTEN'
export const CONVERSATION_VIEW_PROFILE = 'CONVERSATION_VIEW_PROFILE'
// Feedback
export const FEEDBACK_TYPE_ABUSE = 'FEEDBACK_TYPE_ABUSE'
export const FEEDBACK_TYPE_BUG = 'FEEDBACK_TYPE_BUG'
export const FEEDBACK_TYPE_OTHER = 'FEEDBACK_TYPE_OTHER'
// Data
export const DB_CHAT_COLLECTION = 'chats'
export const DB_LITTEN_COLLECTION = 'littens'
export const DB_MESSAGE_COLLECTION = 'messages'
export const DB_USER_COLLECTION = 'users'
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
export const LITTEN_TYPE_LOST = 'LITTEN_TYPE_LOST'
export const LITTEN_TYPE_FOUND = 'LITTEN_TYPE_FOUND'
// Search filters
export const LITTEN_FILTER_LOCATION_RADIUS = 'LITTEN_FILTER_LOCATION_RADIUS'
export const LITTEN_FILTER_SPECIES = 'LITTEN_FILTER_SPECIES'
export const LITTEN_FILTER_TYPE = 'LITTEN_FILTER_TYPE'
export const LITTEN_FILTER_USER_TYPE = 'LITTEN_FILTER_USER_TYPE'
export const LITTEN_FILTER_LOCATION_RADIUS_STORE = 'locationRadius'
export const LITTEN_FILTER_SPECIES_STORE = 'littenSpecies'
export const LITTEN_FILTER_TYPE_STORE = 'littenType'
export const LITTEN_FILTER_USER_TYPE_STORE = 'userType'
// In kilometers
export const LITTEN_FILTER_LOCATION_RADIUS_MIN = 1
export const LITTEN_FILTER_LOCATION_RADIUS_INITIAL = 0
export const LITTEN_FILTER_LOCATION_RADIUS_DEFAULT = 60
export const LITTEN_FILTER_LOCATION_RADIUS_MAX = 100
// User types
export const USER_TYPE_ALL = 'USER_TYPE_ALL'
export const USER_TYPE_INDIVIDUAL = 'USER_TYPE_INDIVIDUAL'
export const USER_TYPE_ORGANIZATION = 'USER_TYPE_ORGANIZATION'
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
// Placeholders
export const PLACEHOLDER_USER_DISPLAY_NAME = 'User'
// Store actions
export const FORM_PROFILE_SET_LOCATION = 'formProfile/setProfileLocation'
export const FORM_NEW_SET_LOCATION = 'formNew/setLocation'
// Other
export const WEB_APP_BASE = 'https://litten.app'
export const NUM_TAPS_FOR_SURPRISE = 19
export const NETWORK_TIMEOUT = 30000 // ms

export const LITTEN_URI = 'litten://'
export const MAILTO_URI = 'mailto:'
export const SMS_URI = 'sms:'
export const TEL_URI = 'tel:'
export const STORAGE_USER_AVATAR = '/images/avatar'
export const STORAGE_LITTEN_PHOTOS = '/images/littens'
export const STORAGE_FILE_NOT_FOUND = 'storage/file-not-found'
export const STORAGE_OBJECT_NOT_FOUND = 'storage/object-not-found'
export const STORAGE_OBJECT_UNAUTHORIZED = 'storage/unauthorized'
export const STORAGE_IGNORED_ERRORS = [
  STORAGE_FILE_NOT_FOUND,
  STORAGE_OBJECT_NOT_FOUND,
  STORAGE_OBJECT_UNAUTHORIZED,
]
export const NO_RESULTS_REFRESH_TIMEOUT_IN = 3500 // ms

export const NEW_POST_NUM_OF_PHOTOS = 8
export const DB_MESSAGE_BATCH_AMOUNT = 20
export const DEBOUNCE_TIMEOUT = 400 // ms

export const NUM_OF_REPORT_IMAGES = 1
export const MAX_NUM_OF_REPORT_IMAGES = 3
export const CHATS_INITIAL_NUM_TO_RENDER = 10
export const SEARCH_INITIAL_NUM_TO_RENDER = 4
export const RECURSION_LIMIT = 3
export const RECURSION_LIMIT_SEARCH = 10
export const MINIMUM_FETCH_INTERVAL = 15 // min

export const CHANNELS_GENERAL_MESSAGES_ID = 'general-notifications'
export const CHANNELS_PRIVATE_MESSAGES_ID = 'private-messages-notifications'
export const JIRA_TICKET_URL =
  'https://litten.atlassian.net/rest/servicedeskapi/request'
export const JIRA_UPLOAD_ATTACHMENT =
  'https://litten.atlassian.net/rest/servicedeskapi/servicedesk/{serviceDeskId}/attachTemporaryFile'
export const JIRA_APPEND_ATTACHMENT =
  'https://litten.atlassian.net/rest/servicedeskapi/request/{issueIdOrKey}/attachment'
