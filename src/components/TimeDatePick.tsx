import React from 'react'
import Stack from '@mui/material/Stack'
import TextField from '@mui/material/TextField'
import AdapterDateFns from '@mui/lab/AdapterDateFns'
import LocalizationProvider from '@mui/lab/LocalizationProvider'
import DateTimePicker from '@mui/lab/DateTimePicker'

export default function TimeDatePick({
  date,
  setDate,
}: {
  date: Date | null
  setDate: (newDate: Date) => void
}) {
  const handleChange = (newDate: Date | null) => {
    if (newDate) {
      setDate(newDate)
    }
  }

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Stack spacing={3}>
        <DateTimePicker
          label="Date&Time picker"
          value={date}
          onChange={handleChange}
          renderInput={(params) => <TextField {...params} />}
        />
      </Stack>
    </LocalizationProvider>
  )
}
