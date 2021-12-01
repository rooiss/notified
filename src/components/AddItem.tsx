import React, { useState } from 'react'
import { makeStyles } from '@mui/styles'
import { IconButton, TextField } from '@mui/material'
import TimeDatePick from './TimeDatePick'
import { AddAlert } from '@mui/icons-material'

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

  const [text, setText] = useState<string>('')
  const [date, setDate] = useState<Date | null>(null)

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
          console.log(text)
        }}
      />
      <TimeDatePick date={date} setDate={setDate} />
      <IconButton>
        <AddAlert color="primary" fontSize="large" />
      </IconButton>
    </div>
  )
}
