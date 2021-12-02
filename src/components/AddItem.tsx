import React, { useState } from 'react'
import { makeStyles } from '@mui/styles'
import { IconButton, TextField } from '@mui/material'
import TimeDatePick from './TimeDatePick'
import { AddAlert } from '@mui/icons-material'
import { useNotification } from '../providers/NotificationProvider'

const useStyles = makeStyles(
  (theme) => ({
    root: {
      display: 'flex',
      justifyContent: 'space-evenly',
      // alignItems: 'center',
      paddingBottom: '16px',
      paddingTop: '16px',
      // backgroundColor: '#fffef5',
      width: '90%',
    },
    text: {
      width: '60%',
    },
  }),
  { name: 'AddItem' },
)

export interface AddItemProps {}

export const AddItem = ({}: AddItemProps) => {
  const classes = useStyles()

  const { addReminder } = useNotification()

  const [text, setText] = useState<string>('')
  const [date, setDate] = useState<Date | null>(null)

  const addItem = () => {
    if (!date || text.trim() === '') {
      return
    }
    addReminder({
      date,
      text,
      done: false,
      notified: false,
    })
    setText('')
    setDate(null)
  }

  return (
    <div className={classes.root}>
      <TextField
        id="outlined-basic"
        label="wash hands, cough, spread disease, etc..."
        variant="outlined"
        className={classes.text}
        value={text}
        onChange={(e) => {
          setText(e.target.value)
        }}
      />
      <TimeDatePick date={date} setDate={setDate} />
      <IconButton onClick={addItem}>
        <AddAlert color="primary" fontSize="large" />
      </IconButton>
    </div>
  )
}
