/**
 * @format
 */

import { Text } from 'react-native'
import { UIBadge, UIText } from 'ui-elements'
import TestRenderer from 'react-test-renderer'

describe('Snapshot test for the "UIBadge" component', () => {
  const content = 'Text'

  it('renders correctly a positive number', () => {
    const badgeContent = 10
    const element = TestRenderer.create(
      <UIBadge number={badgeContent}>
        <UIText>{content}</UIText>
      </UIBadge>,
    )
    const elementJson = element.toJSON()
    const elementTextComponents = element.root.findAllByType(Text)
    const [elementBadgeContent, elementContent] = elementTextComponents
    expect(elementJson).toMatchSnapshot()
    expect(elementContent.props.children).toBe(content)
    expect(elementBadgeContent.props.children).toBe(badgeContent)
  })

  it('renders correctly without zero', () => {
    const badgeContent = 0
    const element = TestRenderer.create(
      <UIBadge number={badgeContent}>
        <UIText>{content}</UIText>
      </UIBadge>,
    )
    const elementJson = element.toJSON()
    const elementTextComponents = element.root.findAllByType(Text)
    const [elementContent] = elementTextComponents
    expect(elementJson).toMatchSnapshot()
    expect(elementContent.props.children).toBe(content)
  })

  it('renders correctly without a negative number', () => {
    const badgeContent = -10
    const element = TestRenderer.create(
      <UIBadge number={badgeContent}>
        <UIText>{content}</UIText>
      </UIBadge>,
    )
    const elementJson = element.toJSON()
    const elementTextComponents = element.root.findAllByType(Text)
    const [elementContent] = elementTextComponents
    expect(elementJson).toMatchSnapshot()
    expect(elementContent.props.children).toBe(content)
  })

  it('renders correctly with zero', () => {
    const badgeContent = 0
    const element = TestRenderer.create(
      <UIBadge number={badgeContent} showNonPositive>
        <UIText>{content}</UIText>
      </UIBadge>,
    )
    const elementJson = element.toJSON()
    const elementTextComponents = element.root.findAllByType(Text)
    const [elementBadgeContent, elementContent] = elementTextComponents
    expect(elementJson).toMatchSnapshot()
    expect(elementContent.props.children).toBe(content)
    expect(elementBadgeContent.props.children).toBe(badgeContent)
  })

  it('renders correctly with a negative number', () => {
    const badgeContent = -10
    const element = TestRenderer.create(
      <UIBadge number={badgeContent} showNonPositive>
        <UIText>{content}</UIText>
      </UIBadge>,
    )
    const elementJson = element.toJSON()
    const elementTextComponents = element.root.findAllByType(Text)
    const [elementBadgeContent, elementContent] = elementTextComponents
    expect(elementJson).toMatchSnapshot()
    expect(elementContent.props.children).toBe(content)
    expect(elementBadgeContent.props.children).toBe(badgeContent)
  })
})
