// src/components/Admin/Notifications.js
import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);
  useEffect(() => {
    const socket = io('http://localhost:8000');
    socket.on('notification', (data) => {
      setNotifications((prev) => [...prev, data]);
    });
    return () => socket.disconnect();
  }, []);

  return (
    <div>
      {notifications.map((note, index) => (
        <div key={index}>{note.message}</div>
      ))}
    </div>
  );
};

export default Notifications;
