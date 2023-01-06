import { render } from '@utils/tests/react-native'
import { UIMessage } from '@ui-elements'
import dayjs from '@utils/day'

const ipsumLorem = `\
It is a long established fact that a reader will be distracted by
the readable content of a page when looking at its layout. The
point of using Lorem Ipsum is that it has a more-or-less normal
distribution of letters, as opposed to using 'Content here,
content here', making it look like readable English. Many desktop
publishing packages and web page editors now use Lorem Ipsum as
their default model text, and a search for 'lorem ipsum' will
uncover many web sites still in their infancy. Various versions
have evolved over the years, sometimes by accident, sometimes on
purpose (injected humour and the like). \
`

describe('Snapshot test for the "UIMessage" component', () => {
  it('renders correctly', () => {
    const element = render(
      <>
        {[...Array(30)].map((val, idx) => (
          <UIMessage.Preview
            // eslint-disable-next-line react/no-array-index-key
            key={idx}
            from="johnnyeyelash"
            header="Cat: Snowball"
            read={Boolean(idx % 4)}
            lastActivity={dayjs().subtract(2, 'day').valueOf()}
          >
            {ipsumLorem}
          </UIMessage.Preview>
        ))}
      </>,
    )

    expect(element.toJSON()).toMatchSnapshot()
  })
})
