import React from 'react'
import { UIMessagePreview } from 'ui-elements'
import renderer from 'react-test-renderer'

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

describe('Snapshot test for the "UIMessagePreview" component', () => {
  it('renders correctly', () => {
    const element = renderer
      .create(
        <>
          {[...Array(30)].map((val, idx) => (
            <UIMessagePreview
              key={idx}
              from="João Carmo"
              subject="Cat: Snowball"
              read={idx % 4}
              favourite={!(idx % 5)}>
              {ipsumLorem}
            </UIMessagePreview>
          ))}
        </>,
      )
      .toJSON()
    expect(element).toMatchSnapshot()
  })
})
