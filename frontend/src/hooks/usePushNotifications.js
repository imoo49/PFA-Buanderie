import { useEffect } from 'react'
import api from '../api/api'

const VAPID_PUBLIC_KEY = 'BM_LNQMhsb5vQz_7Ig-lqIidNEMa9xAUp5T4iyS9IReZTwxf11keyhPFN6yXbTV3TQ-oxcxQK0O3_qiSWsjYHhM'

function urlBase64ToUint8Array(base64String) {
    const padding = '='.repeat((4 - base64String.length % 4) % 4)
    const base64  = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/')
    return Uint8Array.from([...window.atob(base64)].map(c => c.charCodeAt(0)))
}

export function usePushNotifications() {
    useEffect(() => {
        if (!('serviceWorker' in navigator) || !('PushManager' in window)) return

        const subscribe = async () => {
            try {
                const reg = await navigator.serviceWorker.register('/sw.js')
                const permission = await Notification.requestPermission()
                if (permission !== 'granted') return

                const sub = await reg.pushManager.subscribe({
                    userVisibleOnly:      true,
                    applicationServerKey: urlBase64ToUint8Array(VAPID_PUBLIC_KEY),
                })

                const s = sub.toJSON()
                await api.post('/push/subscribe', {
                    endpoint:        s.endpoint,
                    publicKey:       s.keys?.p256dh,
                    authToken:       s.keys?.auth,
                    contentEncoding: 'aesgcm',
                })
            } catch (err) {
                console.error('Push error:', err)
            }
        }

        subscribe()
    }, [])
}