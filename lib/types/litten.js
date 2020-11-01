/**
 * @format
 * @flow
 */

import {
  addFavourite,
  clearBasic,
  clearExtra,
  removeFavourite,
  setActivePosts,
  setBasic,
  setContactPreferences,
  setExtra,
  setIsOrganization,
  setMetricUnits,
  setPastPosts,
  setPhoneNumber,
  setShareMetrics,
} from 'store/actions/authenticated-user'
import type { AppSettings, AuthenticatedUser } from 'store/types'

// Old school props coming from component usage:
// <Component own1="foo" own2="bar" ... />
export type OwnProps = {|
  initializingStore: boolean,
|}

// Props coming from state via `mapStateToProps`
export type StateProps = {|
  appSettings: AppSettings,
  authenticatedUser: AuthenticatedUser,
|}

// Props dispatching actions from `mapDispatchToProps`
export type DispatchProps = {|
  addFavourite: typeof addFavourite,
  clearBasic: typeof clearBasic,
  clearExtra: typeof clearExtra,
  removeFavourite: typeof removeFavourite,
  setActivePosts: typeof setActivePosts,
  setBasic: typeof setBasic,
  setExtra: typeof setExtra,
  setIsOrganization: typeof setIsOrganization,
  setContactPreferences: typeof setContactPreferences,
  setMetricUnits: typeof setMetricUnits,
  setPastPosts: typeof setPastPosts,
  setPhoneNumber: typeof setPhoneNumber,
  setShareMetrics: typeof setShareMetrics,
|}

//The main type for component type creation (`Component<Props, …>`, see below)
export type LittenProps = {|
  ...OwnProps,
  ...StateProps,
  ...DispatchProps,
|}
