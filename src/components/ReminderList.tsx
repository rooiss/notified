import React from 'react'
import { makeStyles } from '@mui/styles'
import { useNotification } from '../providers/NotificationProvider'
import { ReminderCard } from './ReminderCard'
import { List, ListItemText } from '@mui/material'

const useStyles = makeStyles(
  (theme) => ({
    root: {},
  }),
  { name: 'ReminderList' },
)

export interface ReminderListProps {}

export const ReminderList = ({}: ReminderListProps) => {
  const classes = useStyles()
  const { reminders } = useNotification()

  console.log('LIST', reminders)

  return (
    <List sx={{ width: '80%' }}>
      {reminders.length === 0 ? (
        <ListItemText primary={`do somsing`} />
      ) : (
        reminders.map((reminder) => {
          return <ReminderCard reminder={reminder} />
        })
      )}
    </List>
  )
}
