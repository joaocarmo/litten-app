import type { ThemeFunction } from '@styles/types'

const styles: ThemeFunction = ({ colors, typography }) => ({
  uiMessagePreviewUnread: {
    backgroundColor: colors.primary,
  },
  uiMessagePreviewContentMainContainer: {
    flex: 1,
  },
  uiMessagePreviewHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  uiMessagePreviewMessageContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 3,
  },
  uiMessagePreviewText: {
    flex: 1,
    fontSize: typography.fontSize.base,
    fontWeight: typography.fontWeight.regular,
    color: colors.text,
    paddingBottom: 3,
  },
  uiMessagePreviewTextUnread: {
    color: colors.textAlt,
  },
  uiMessagePreviewTitle: {
    fontWeight: typography.fontWeight.bolder,
  },
  uiMessagePreviewFrom: {
    fontSize: typography.fontSize.small,
    fontWeight: typography.fontWeight.bolder,
    color: colors.text,
  },
  uiMessagePreviewMessage: {
    flex: 1,
    fontSize: typography.fontSize.small,
    fontWeight: typography.fontWeight.lighter,
    color: colors.text,
  },
  uiMessagePreviewLastActivity: {
    textAlign: 'right',
  },
})

export default styles
