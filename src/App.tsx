import { Container, Paper, Typography } from '@mui/material'
import React from 'react'
import './App.css'
import { AddItem } from './components/AddItem'
import { ReminderCard } from './components/ReminderCard'
import { makeStyles } from '@mui/styles'
import {
  NotificationProvider,
  useNotification,
} from './providers/NotificationProvider'

const useStyles = makeStyles(
  (theme) => ({
    root: {
      padding: '16px 0px 16px 32px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    headerText: {
      paddingTop: '16px',
    },
  }),
  { name: 'App' },
)

function App() {
  const classes = useStyles()

  const { reminders } = useNotification()

  return (
    <NotificationProvider>
      <Container>
        <Paper className={classes.root}>
          <Typography variant="h2" className={classes.headerText}>
            Notified.
          </Typography>
          <AddItem />
          <ReminderCard reminders={reminders} />
        </Paper>
      </Container>
    </NotificationProvider>
  )
}

export default App
