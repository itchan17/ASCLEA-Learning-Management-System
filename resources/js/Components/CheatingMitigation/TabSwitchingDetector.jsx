import React, { useEffect, useState } from 'react';

const TabSwitchingDetector = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const handleVisibilityChange = () => {
      const time = new Date().toLocaleTimeString();
      const event = document.hidden 
        ? `${time} - User switched away from tab` 
        : `${time} - User returned to tab`;

      setEvents(prev => {
        const updated = [...prev, event];
        console.log("Tab Events:", updated);
        return updated;
      });
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  return null; // no UI
};

export default TabSwitchingDetector;
TabSwitchingDetector.layout = null;
