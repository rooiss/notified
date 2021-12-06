import React, {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react'
import { Reminder } from '../types/Reminder'

export interface NotificationContext {
  addReminder: (reminder: Omit<Reminder, 'id'>) => void
  reminders: Reminder[]
  deleteReminder: (id: number) => void
  updateReminder: (reminder: Reminder) => void
  editingId: number | null
  setEditingId: (id: number | null) => void
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
  const [editingId, setEditingId] = useState<number | null>(null)

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
      localStorage.setItem('localReminders', JSON.stringify(newReminders))
      localStorage.setItem('nextId', JSON.stringify(nextId + 1))
    },
    [nextId, reminders],
  )

  const deleteReminder = useCallback(
    (id: number) => {
      const newReminders = reminders.filter((r) => r.id !== id)
      setReminders(newReminders)
      localStorage.setItem('localReminders', JSON.stringify(newReminders))
      const newNextId = newReminders.length
      setNextId(newNextId)
      localStorage.setItem('nextId', JSON.stringify(newNextId))
    },
    [reminders],
  )

  const updateReminder = useCallback(
    (reminder: Reminder) => {
      const newReminders = reminders
        .map((r) => {
          if (r.id !== reminder.id) {
            return r
          }
          return {
            ...r,
            ...reminder,
          }
        })
        .sort(sortReminders)
      setReminders(newReminders)
      localStorage.setItem('localReminders', JSON.stringify(newReminders))
    },
    [reminders],
  )

  useEffect(() => {
    // retrieve reminders on page refresh
    try {
      const localReminders = localStorage.getItem('localReminders')
      const localNextId = localStorage.getItem('nextId')
      if (localReminders !== null && localNextId !== null) {
        const newReminders = JSON.parse(localReminders)
        newReminders.forEach((r: any) => {
          const newDate = new Date(r.date)
          r.date = newDate
        })
        setReminders(newReminders)
        setNextId(Number(localNextId))
        // update the nextId since on page reload the id will become 1 by default
      }
    } catch (e) {
      console.log(e)
    }
  }, [])

  const value: NotificationContext = useMemo(
    () => ({
      reminders,
      addReminder,
      deleteReminder,
      updateReminder,
      editingId,
      setEditingId,
    }),
    [
      reminders,
      addReminder,
      deleteReminder,
      updateReminder,
      editingId,
      setEditingId,
    ],
  )
  return (
    <notificationContext.Provider value={value}>
      {children}
    </notificationContext.Provider>
  )
}

export const useNotification = () => useContext(notificationContext)
