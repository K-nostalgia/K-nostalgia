import React from 'react';

const ChatIcon = () => {
  return (
    // <div className="absolute flex items-center justify-center rounded-full bg-primary-strong shadow w-8 h-8 p-2">
    <div className="flex items-center justify-center rounded-full bg-primary-strong shadow w-8 h-8 p-2 z-50">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="28"
        height="28"
        viewBox="0 0 22 22"
        fill="none"
        className="relative"
      >
        <path
          d="M20 3H3.50003C3.1022 3 2.72067 3.15804 2.43937 3.43934C2.15806 3.72064 2.00003 4.10218 2.00003 4.5V19.5C1.9983 19.786 2.07921 20.0665 2.23305 20.3076C2.38689 20.5488 2.6071 20.7404 2.86721 20.8594C3.06543 20.9517 3.28138 20.9997 3.50003 21C3.85216 20.9992 4.1926 20.8736 4.46096 20.6456L4.4694 20.6391L7.53128 18H20C20.3979 18 20.7794 17.842 21.0607 17.5607C21.342 17.2794 21.5 16.8978 21.5 16.5V4.5C21.5 4.10218 21.342 3.72064 21.0607 3.43934C20.7794 3.15804 20.3979 3 20 3ZM20 16.5H7.25003C7.06994 16.5001 6.8959 16.565 6.75971 16.6828L3.50003 19.5V4.5H20V16.5Z"
          fill="#F6F5F3"
        />
      </svg>
    </div>
  );
};

export default ChatIcon;
