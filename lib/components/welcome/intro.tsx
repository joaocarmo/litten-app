import Carousel from '@components/carousel'
import IntroCarouselItemTemplate from '@templates/intro-carousel-item'
import { welcomeStepOne, welcomeStepTwo, welcomeStepThree } from '@images'
import { translate } from '@utils/i18n'

const messages = translate('welcome.carousel') as unknown as Record<
  string,
  Record<string, string>
>

const items = [
  {
    key: 'step-one',
    item: (
      <IntroCarouselItemTemplate
        header={messages.stepOne.header}
        image={welcomeStepOne}
        footer={messages.stepOne.footer}
      />
    ),
  },
  {
    key: 'step-two',
    item: (
      <IntroCarouselItemTemplate
        header={messages.stepTwo.header}
        image={welcomeStepTwo}
        footer={messages.stepTwo.footer}
      />
    ),
  },
  {
    key: 'step-three',
    item: (
      <IntroCarouselItemTemplate
        header={messages.stepThree.header}
        image={welcomeStepThree}
        footer={messages.stepThree.footer}
      />
    ),
  },
]

const Intro = () => <Carousel items={items} />

export default Intro
