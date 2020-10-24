/**
 * @format
 * @flow
 */

import {
  clearBasic,
  clearExtra,
  setActivePosts,
  setBasic,
  setExtra,
  setMetricUnits,
  setPastPosts,
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
  clearBasic: typeof clearBasic,
  clearExtra: typeof clearExtra,
  setActivePosts: typeof setActivePosts,
  setBasic: typeof setBasic,
  setExtra: typeof setExtra,
  setMetricUnits: typeof setMetricUnits,
  setPastPosts: typeof setPastPosts,
  setShareMetrics: typeof setShareMetrics,
|}

//The main type for component type creation (`Component<Props, …>`, see below)
export type LittenProps = {|
  ...OwnProps,
  ...StateProps,
  ...DispatchProps,
|}
