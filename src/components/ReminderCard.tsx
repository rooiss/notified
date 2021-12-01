import React, { useState } from 'react'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import Checkbox from '@mui/material/Checkbox'
import IconButton from '@mui/material/IconButton'
import { makeStyles } from '@mui/styles'
import { Edit } from '@mui/icons-material'

const useStyles = makeStyles(
  (theme) => ({
    root: {},
  }),
  { name: 'ReminderCard' },
)

export interface ReminderCardProps {}

export const ReminderCard = ({}: ReminderCardProps) => {
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
    <List sx={{ width: '80%', bgcolor: 'background.paper' }}>
      <ListItem
        secondaryAction={
          <IconButton edge="end" aria-label="Edit">
            <Edit />
          </IconButton>
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
        <ListItemText
          primary={`Finish this projectFinish this projectFinish this projectFinish this project`}
        />
      </ListItem>
    </List>
  )
}
