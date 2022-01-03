import { Text } from 'react-native'
import { render } from '@utils/tests/react-native'
import { UIBadge, UIText } from '@ui-elements'

describe('Snapshot test for the "UIBadge" component', () => {
  const content = 'Text'

  it('renders correctly a positive number', () => {
    const badgeContent = 10
    const element = render(
      <UIBadge number={badgeContent}>
        <UIText>{content}</UIText>
      </UIBadge>,
    )
    const elementTextComponents = element.container.findAllByType(Text)
    const [elementBadgeContent, elementContent] = elementTextComponents

    expect(element.toJSON()).toMatchSnapshot()
    expect(elementContent.props.children).toBe(content)
    expect(elementBadgeContent.props.children).toBe(badgeContent)
  })

  it('renders correctly without zero', () => {
    const badgeContent = 0
    const element = render(
      <UIBadge number={badgeContent}>
        <UIText>{content}</UIText>
      </UIBadge>,
    )
    const elementTextComponents = element.container.findAllByType(Text)
    const [elementContent] = elementTextComponents

    expect(element.toJSON()).toMatchSnapshot()
    expect(elementContent.props.children).toBe(content)
  })

  it('renders correctly without a negative number', () => {
    const badgeContent = -10
    const element = render(
      <UIBadge number={badgeContent}>
        <UIText>{content}</UIText>
      </UIBadge>,
    )
    const elementTextComponents = element.container.findAllByType(Text)
    const [elementContent] = elementTextComponents

    expect(element.toJSON()).toMatchSnapshot()
    expect(elementContent.props.children).toBe(content)
  })

  it('renders correctly with zero', () => {
    const badgeContent = 0
    const element = render(
      <UIBadge number={badgeContent} showNonPositive>
        <UIText>{content}</UIText>
      </UIBadge>,
    )
    const elementTextComponents = element.container.findAllByType(Text)
    const [elementBadgeContent, elementContent] = elementTextComponents

    expect(element.toJSON()).toMatchSnapshot()
    expect(elementContent.props.children).toBe(content)
    expect(elementBadgeContent.props.children).toBe(badgeContent)
  })

  it('renders correctly with a negative number', () => {
    const badgeContent = -10
    const element = render(
      <UIBadge number={badgeContent} showNonPositive>
        <UIText>{content}</UIText>
      </UIBadge>,
    )
    const elementTextComponents = element.container.findAllByType(Text)
    const [elementBadgeContent, elementContent] = elementTextComponents

    expect(element.toJSON()).toMatchSnapshot()
    expect(elementContent.props.children).toBe(content)
    expect(elementBadgeContent.props.children).toBe(badgeContent)
  })
})
