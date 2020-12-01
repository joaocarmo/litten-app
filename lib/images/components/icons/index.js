import Camera from './camera.svg'
import Cog from './cog.svg'
import ContactEmail from './contact-email.svg'
import ContactInApp from './contact-in-app.svg'
import ContactPhoneCall from './contact-phone-call.svg'
import ContactSMS from './contact-sms.svg'
import Eye from './eye.svg'
import HeartFill from './heart-fill.svg'
import HeartOutlineStroke from './heart-outline.svg'
import Location from './location.svg'
import MoreOptions from './more-options.svg'

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
  Eye,
  HeartFill,
  HeartOutline,
  Location,
  MoreOptions,
}
