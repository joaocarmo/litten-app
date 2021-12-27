/**
 * @format
 */

import { Text } from 'react-native'
import TestRenderer from 'react-test-renderer'
import ThemeProvider from 'components/theme/provider'
import { UIBadge, UIText } from 'ui-elements'

describe('Snapshot test for the "UIBadge" component', () => {
  const content = 'Text'

  it('renders correctly a positive number', () => {
    const badgeContent = 10
    const element = TestRenderer.create(
      <ThemeProvider>
        <UIBadge number={badgeContent}>
          <UIText>{content}</UIText>
        </UIBadge>
      </ThemeProvider>,
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
      <ThemeProvider>
        <UIBadge number={badgeContent}>
          <UIText>{content}</UIText>
        </UIBadge>
      </ThemeProvider>,
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
      <ThemeProvider>
        <UIBadge number={badgeContent}>
          <UIText>{content}</UIText>
        </UIBadge>
      </ThemeProvider>,
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
      <ThemeProvider>
        <UIBadge number={badgeContent} showNonPositive>
          <UIText>{content}</UIText>
        </UIBadge>
      </ThemeProvider>,
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
      <ThemeProvider>
        <UIBadge number={badgeContent} showNonPositive>
          <UIText>{content}</UIText>
        </UIBadge>
      </ThemeProvider>,
    )
    const elementJson = element.toJSON()
    const elementTextComponents = element.root.findAllByType(Text)
    const [elementBadgeContent, elementContent] = elementTextComponents
    expect(elementJson).toMatchSnapshot()
    expect(elementContent.props.children).toBe(content)
    expect(elementBadgeContent.props.children).toBe(badgeContent)
  })
})
