import React, { useState } from 'react'
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
      width: '80%',
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
  // const [checked, setChecked] = useState([0])

  const [editText, setEditText] = useState<string>(reminder.text)
  const [editDate, setEditDate] = useState<Date>(reminder.date)

  // const handleToggle = (value: number) => () => {
  //   const currentIndex = checked.indexOf(value)
  //   const newChecked = [...checked]

  //   if (currentIndex === -1) {
  //     newChecked.push(value)
  //   } else {
  //     newChecked.splice(currentIndex, 1)
  //   }

  //   setChecked(newChecked)
  // }

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
        <Checkbox
          edge="start"
          // checked={checked.indexOf(value) !== -1}
          // tabIndex={-1}
          // disableRipple
        />
      </ListItemIcon>
      {editing ? (
        <div className={classes.editItem}>
          <TextField
            id="outlined-basic"
            label="wash hands, cough, spread disease, etc..."
            variant="outlined"
            // className={classes.text}
            value={editText}
            onChange={(e) => {
              setEditText(e.target.value)
            }}
          />
          <TimeDatePick date={editDate} setDate={setEditDate} />
        </div>
      ) : (
        <ListItemText
          primary={reminder.text}
          secondary={timeAgo.format(reminder.date)}
        />
      )}
    </ListItem>
  )
}
