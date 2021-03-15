/**
 * @format
 * @flow
 */

import type { Node } from 'react'
import ReportForm from 'forms/report'
import { getFromListByKey } from 'utils/functions'
import { reportTypes } from 'utils/litten'
import { FEEDBACK_TYPE_OTHER } from 'utils/constants'

const ProfileReportScreen: (args: any) => Node = ({
  initialContent = '',
  type = FEEDBACK_TYPE_OTHER,
}) => {
  const header = getFromListByKey(reportTypes, type)?.label

  return (
    <ReportForm header={header} initialContent={initialContent} type={type} />
  )
}

export default ProfileReportScreen
