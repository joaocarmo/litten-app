import Camera from './camera.svg'
import Cog from './cog.svg'
import ContactEmail from './contact-email.svg'
import ContactInApp from './contact-in-app.svg'
import ContactPhoneCall from './contact-phone-call.svg'
import ContactSMS from './contact-sms.svg'
import Cross from './cross.svg'
import Edit from './edit.svg'
import ErrorStroke from './error.svg'
import Eye from './eye.svg'
import HeartFill from './heart-fill.svg'
import HeartOutlineStroke from './heart-outline.svg'
import Location from './location.svg'
import MoreOptions from './more-options.svg'
import Organization from './organization.svg'
import Share from './share.svg'
import Success from './success.svg'
import VerifiedFill from './verified-fill.svg'
import VerifiedOutline from './verified-outline.svg'

const Error = ({ fill, ...otherProps }) => (
  <ErrorStroke stroke={fill} {...otherProps} />
)

const HeartOutline = ({ fill, ...otherProps }) => (
  <HeartOutlineStroke stroke={fill} {...otherProps} />
)

export {
  Camera,
  Cog,
  ContactEmail,
  ContactInApp,
  ContactPhoneCall,
  ContactSMS,
  Cross,
  Edit,
  Error,
  Eye,
  HeartFill,
  HeartOutline,
  Location,
  MoreOptions,
  Organization,
  Share,
  Success,
  VerifiedFill,
  VerifiedOutline,
}
