import React, { useCallback, useState } from 'react'
import ListItem from '@mui/material/ListItem'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import Checkbox from '@mui/material/Checkbox'
import IconButton from '@mui/material/IconButton'
import { makeStyles } from '@mui/styles'
import { Cancel, Check, Delete, Edit } from '@mui/icons-material'
import { Reminder } from '../types/Reminder'
import { TextField } from '@mui/material'
import TimeDatePick from './TimeDatePick'
import { timeAgo } from '../util/timeConvert'

const useStyles = makeStyles(
  (theme) => ({
    root: {},
    editItem: {
      display: 'flex',
      justifyContent: 'space-evenly',
      width: '80%',
    },
    done: {
      textDecoration: 'line-through',
    },
  }),
  { name: 'ReminderCard' },
)

export interface ReminderCardProps {
  reminder: Reminder
  deleteReminder: (id: number) => void
  setEditingId: (id: number | null) => void
  editing: boolean
  updateReminder: (reminder: Reminder) => void
}

export const ReminderCard = ({
  reminder,
  deleteReminder,
  setEditingId,
  editing,
  updateReminder,
}: ReminderCardProps) => {
  const classes = useStyles()

  const [editText, setEditText] = useState<string>(reminder.text)
  const [editDate, setEditDate] = useState<Date>(reminder.date)

  const handleDone = useCallback(() => {
    updateReminder({
      ...reminder,
      done: !reminder.done,
    })
  }, [reminder, updateReminder])

  const removeReminder = () => {
    deleteReminder(reminder.id)
  }

  const toggleEdit = () => {
    if (editing) {
      setEditingId(null)
      return
    }
    setEditingId(reminder.id)
  }

  const confirmEdit = () => {
    updateReminder({
      ...reminder,
      text: editText,
      date: editDate,
    })
    setEditingId(null)
  }
  return (
    <ListItem
      secondaryAction={
        <>
          {editing ? (
            <>
              <IconButton edge="end" aria-label="Edit" onClick={confirmEdit}>
                <Check color="success" />
              </IconButton>
              <IconButton onClick={toggleEdit}>
                <Cancel color="warning" fontSize="large" />
              </IconButton>
            </>
          ) : (
            <>
              <IconButton edge="end" aria-label="Edit" onClick={toggleEdit}>
                <Edit color="primary" />
              </IconButton>
              <IconButton onClick={removeReminder}>
                <Delete color="error" fontSize="large" />
              </IconButton>
            </>
          )}
        </>
      }
      disablePadding
    >
      <ListItemIcon>
        <Checkbox edge="start" checked={reminder.done} onClick={handleDone} />
      </ListItemIcon>
      {editing ? (
        <div className={classes.editItem}>
          <TextField
            id="outlined-basic"
            label={reminder.text}
            variant="outlined"
            value={editText}
            onChange={(e) => {
              setEditText(e.target.value)
            }}
            sx={{ width: '70%', paddingRight: '32px' }}
          />
          <TimeDatePick date={editDate} setDate={setEditDate} />
        </div>
      ) : reminder.done ? (
        <ListItemText
          className={classes.done}
          primary={reminder.text}
          secondary={timeAgo.format(reminder.date)}
        />
      ) : (
        <ListItemText
          primary={reminder.text}
          secondary={timeAgo.format(reminder.date)}
        />
      )}
    </ListItem>
  )
}
