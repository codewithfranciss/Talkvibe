import React from 'react';
import NotificationNavbar from '@/components/notificationNavbar';
import Image from 'next/image';
import { AiOutlineCheckCircle, AiOutlineCloseCircle } from 'react-icons/ai'; // Importing icons

export default function Notification() {
  return (
    <section className="flex flex-col h-screen overflow-hidden">
      {/* Notification Navbar */}
      <NotificationNavbar />

      {/* Notification Content */}
      <div className="border-b border-gray-600 py-4">
        <div className="flex justify-between items-center px-4">
          {/* Left Section: Icon and Text */}
          <div className="flex gap-4 items-center">
            {/* Friend Request Icon */}
            <Image
              src="/image/notify-user.png"
              alt="Friend request notification icon"
              width={24}
              height={24}
            />
            {/* User Info */}
            <div className="flex flex-col">
              <Image
                src="/image/user.png"
                alt="Profile picture of Dozie"
                width={48}
                height={48}
                className="object-cover w-12 h-12 rounded-full overflow-hidden"
              />
              <div>
                <h2 className="font-bold">Dozie sent you a friend request</h2>
              </div>
            </div>
          </div>

          {/* Right Section: Accept and Reject Icons */}
          <div className="flex items-center gap-4">
            {/* Accept Button */}
            <button
              className="text-primary hover:text-accent bg-secondary rounded-full transition-transform transform hover:scale-110"
              aria-label="Accept friend request"
            >
              <AiOutlineCheckCircle size={28} />
            </button>

            {/* Reject Button */}
            <button
              className="text-red-500 hover:text-red-600 bg-secondary rounded-full transition-transform transform hover:scale-110"
              aria-label="Reject friend request"
            >
              <AiOutlineCloseCircle size={28} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
