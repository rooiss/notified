// import React, {
//   createContext,
//   ReactNode,
//   useCallback,
//   useContext,
//   useMemo,
//   useState,
// } from 'react'
// import { Reminder } from '../types/Reminder'

// export interface NotificationContext {
//   addReminder: () => void
//   deleteReminder: () => void
//   updateReminder: () => void
//   reminders: Reminder[]
//   editingId: number
//   setEditingId: () => void
// }

// const notificationContext = createContext<NotificationContext>(
//   {} as NotificationContext,
// )

// export const NotificationProvider = ({ children }: { children: ReactNode }) => {
//   const [reminders, setReminders] = useState([])

//   const addReminder = useCallback(({reminder}: {reminder: Reminder}) => {

//   },[])

//   const value: NotificationContext = useMemo(
//     () => ({
//       reminders,
//       addReminder,
//       deleteReminder,
//       updateReminder,
//       editingId,
//       setEditingId,
//     }),
//     [
//       reminders,
//       addReminder,
//       deleteReminder,
//       updateReminder,
//       editingId,
//       setEditingId,
//     ],
//   )
//   return (
//     <notificationContext.Provider value={value}>
//       {children}
//     </notificationContext.Provider>
//   )
// }

// export const useNotifications = () => useContext(notificationContext)
export {}
