import React, {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react'
import { Reminder } from '../types/Reminder'

export interface NotificationContext {
  addReminder: (reminder: Omit<Reminder, 'id'>) => void
  reminders: Reminder[]
  // deleteReminder: () => void
  // updateReminder: () => void
  // editingId: number
  // setEditingId: () => void
  // nextId: number
}

const notificationContext = createContext<NotificationContext>(
  {} as NotificationContext,
)

const sortReminders = (a: Reminder, b: Reminder) => {
  return a.date.valueOf() - b.date.valueOf()
}

export const NotificationProvider = ({ children }: { children: ReactNode }) => {
  const [reminders, setReminders] = useState<Reminder[]>([])
  const [nextId, setNextId] = useState(1)

  const addReminder = useCallback(
    (reminder: Omit<Reminder, 'id'>) => {
      const newReminders = reminders
        .concat({
          id: nextId,
          ...reminder,
        })
        .sort(sortReminders)
      setReminders(newReminders)
      setNextId(nextId + 1)
      console.log(reminders)
    },
    [nextId, reminders],
  )

  const value: NotificationContext = useMemo(
    () => ({
      reminders,
      addReminder,
      // deleteReminder,
      // updateReminder,
      // editingId,
      // setEditingId,
    }),
    [
      reminders,
      addReminder,
      // deleteReminder,
      // updateReminder,
      // editingId,
      // setEditingId,
    ],
  )
  return (
    <notificationContext.Provider value={value}>
      {children}
    </notificationContext.Provider>
  )
}

export const useNotification = () => useContext(notificationContext)
