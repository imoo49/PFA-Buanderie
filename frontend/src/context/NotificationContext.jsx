import { createContext, useContext, useEffect, useState } from 'react'
import api from '../api/api'

const NotificationContext = createContext()

export function NotificationProvider({ children }) {
    const [dbNotifications, setDbNotifications] = useState([])

    const fetchNotifications = async () => {
        try {
            const token = localStorage.getItem('token')
            if (!token) return
            const res = await api.get('/notifications', {
                headers: { Authorization: `Bearer ${token}` }
            })
            setDbNotifications(res.data)
        } catch (err) {
            console.error(err)
        }
    }

    useEffect(() => {
        fetchNotifications()
        const interval = setInterval(fetchNotifications, 60000) // refresh toutes les minutes
        return () => clearInterval(interval)
    }, [])

    const markAsRead = async (id) => {
        try {
            const token = localStorage.getItem('token')
            await api.post(`/notifications/${id}/read`, {}, {
                headers: { Authorization: `Bearer ${token}` }
            })
            setDbNotifications(prev => prev.filter(n => n.id !== id))
        } catch (err) {
            console.error(err)
        }
    }

    return (
        <NotificationContext.Provider value={{ dbNotifications, markAsRead }}>
            {children}
        </NotificationContext.Provider>
    )
}

export function useNotifications() {
    return useContext(NotificationContext)
}