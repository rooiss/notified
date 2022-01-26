import React from 'react'
import { useNotification } from '../providers/NotificationProvider'
import { ReminderCard } from './ReminderCard'
import { List, ListItemText } from '@mui/material'

export const ReminderList = () => {
  const {
    reminders,
    deleteReminder,
    editingId,
    setEditingId,
    updateReminder,
  } = useNotification()

  return (
    <List sx={{ width: '80%' }}>
      {reminders.length === 0 ? (
        <ListItemText primary={`Add something to start!`} />
      ) : (
        reminders.map((reminder) => {
          return (
            <ReminderCard
              key={reminder.id}
              reminder={reminder}
              deleteReminder={deleteReminder}
              setEditingId={setEditingId}
              editing={editingId === reminder.id}
              updateReminder={updateReminder}
            />
          )
        })
      )}
    </List>
  )
}
