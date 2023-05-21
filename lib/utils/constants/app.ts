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
export const USER_PREFERENCES_CONTACT_CALL = 'call'
export const USER_PREFERENCES_CONTACT_EMAIL = 'email'
export const USER_PREFERENCES_CONTACT_INAPP = 'inApp'
export const USER_PREFERENCES_CONTACT_SMS = 'sms'
export const DEFAULT_CONTACT_PREFERENCES = {
  [USER_PREFERENCES_CONTACT_CALL]: false,
  [USER_PREFERENCES_CONTACT_EMAIL]: false,
  [USER_PREFERENCES_CONTACT_INAPP]: true,
  [USER_PREFERENCES_CONTACT_SMS]: false,
}

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

// Themes
export const THEME_DARK = 'dark' as const
export const THEME_LIGHT = 'light' as const
export const THEME_SYSTEM = 'system' as const

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
export const LITTEN_TEAM_EMAIL_SUFFIX = '@litten.app'
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
