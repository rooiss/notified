import React, { useState } from 'react'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import Checkbox from '@mui/material/Checkbox'
import IconButton from '@mui/material/IconButton'
import { makeStyles } from '@mui/styles'
import { Delete, Edit } from '@mui/icons-material'
import { Reminder } from '../types/Reminder'

const useStyles = makeStyles(
  (theme) => ({
    root: {},
  }),
  { name: 'ReminderCard' },
)

export interface ReminderCardProps {
  reminders: Reminder[]
}

export const ReminderCard = ({ reminders }: ReminderCardProps) => {
  const classes = useStyles()
  const [checked, setChecked] = useState([0])

  const handleToggle = (value: number) => () => {
    const currentIndex = checked.indexOf(value)
    const newChecked = [...checked]

    if (currentIndex === -1) {
      newChecked.push(value)
    } else {
      newChecked.splice(currentIndex, 1)
    }

    setChecked(newChecked)
  }

  return (
    <List sx={{ width: '80%' }}>
      {reminders ? (
        reminders.map((r) => {
          return (
            <ListItem
              secondaryAction={
                <>
                  <IconButton edge="end" aria-label="Edit">
                    <Edit color="primary" />
                  </IconButton>
                  <IconButton>
                    <Delete color="error" fontSize="large" />
                  </IconButton>
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
              <ListItemText primary={r.text} />
            </ListItem>
          )
        })
      ) : (
        <ListItemText primary={`do somsing`} />
      )}
    </List>
  )
}
