'use client'

import React, { useEffect, useState } from 'react';
import NotificationNavbar from '@/components/notificationNavbar';
import Image from 'next/image';
import { AiOutlineCheckCircle, AiOutlineCloseCircle } from 'react-icons/ai'; // Importing icons
import { supabase } from '@/lib/supabaseClient';
import { useRouter } from 'next/navigation';

export default function Notification() {
  const [notifications, setNotifications] = useState<any>([]);
  const [loading, setLoading] = useState(true);  // Loading state
  const router = useRouter();

  useEffect(() => {
    const fetchNotification = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user?.id) {
        router.push('/');
      } else {
        const { data, error } = await supabase
          .from('friend_requests')
          .select(`id,
            sender_id,
            status, 
            users!friend_requests_sender_id_fkey (
            username,
            avatar_url
          )
          `)
          .eq('receiver_id', user.id)
          .eq('status', 'pending')
          .order('created_at', { ascending: true });

        if (error) {
          console.error("Error fetching friend requests:", error.message);
          return;
        }

        setNotifications(data || []);
        setLoading(false); // Stop loading when data is fetched
      }
    };
    fetchNotification();
  }, []);

  const handleAccept = async (requestId: string) => {
    const { data, error } = await supabase
      .from('friend_requests')
      .update({ status: 'accepted' })
      .eq('id', requestId);
    if (error) {
      console.error("Error accepting friend request:", error.message);
      return;
    }
    setNotifications((prev: any) =>
      prev.filter((notification: any) => notification.id !== requestId)
    );
  };

  const handleReject = async (requestId: string) => {
    const { data, error } = await supabase
      .from('friend_requests')
      .delete()
      .eq('id', requestId);
    if (error) {
      console.error("Error rejecting friend request:", error.message);
      return;
    }
    setNotifications((prev: any) =>
      prev.filter((notification: any) => notification.id !== requestId)
    );
  };

  // Skeleton loader for notifications
  const SkeletonLoader = () => (
    <div className="notification-item border-b border-gray-600 py-4 opacity-100 transition-opacity duration-500 ease-in-out animate-pulse">
      <div className="flex justify-between items-center px-4">
        <div className="flex gap-4 items-center">
          <div className="w-12 h-12 bg-gray-300 rounded-full"></div>
          <div className="flex flex-col">
            <div className="h-4 bg-gray-300 w-24 mb-2"></div>
            <div className="h-4 bg-gray-300 w-40"></div>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
          <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
        </div>
      </div>
    </div>
  );

  return (
    <section className="flex flex-col h-screen overflow-hidden">
      {/* Notification Navbar */}
      <NotificationNavbar />

      {/* Notification Content */}
      {loading ? (
        <div className="space-y-4">
          <SkeletonLoader />
          <SkeletonLoader />
          <SkeletonLoader />
        </div>
      ) : notifications.length > 0 ? (
        notifications.map((notification: any) => (
          <div
            key={notification.id}
            className="notification-item border-b border-gray-600 py-4 opacity-100 transition-opacity duration-500 ease-in-out"
          >
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
                    src={notification.users.avatar_url}
                    alt="Profile picture of Dozie"
                    width={48}
                    height={48}
                    className="object-cover w-12 h-12 rounded-full overflow-hidden"
                  />
                  <div>
                    <h2><span className="font-bold">{notification.users.username} </span>sent you a friend request</h2>
                  </div>
                </div>
              </div>

              {/* Right Section: Accept and Reject Icons */}
              <div className="flex items-center gap-4">
                {/* Accept Button */}
                <button
                  className="accept-btn text-primary hover:text-accent bg-secondary rounded-full transition-transform transform hover:scale-110"
                  aria-label="Accept friend request"
                  onClick={() => { handleAccept(notification.id) }}
                >
                  <AiOutlineCheckCircle size={28} />
                </button>

                {/* Reject Button */}
                <button
                  className="reject-btn text-red-500 hover:text-red-600 bg-secondary rounded-full transition-transform transform hover:scale-110"
                  aria-label="Reject friend request"
                  onClick={() => { handleReject(notification.id) }}
                >
                  <AiOutlineCloseCircle size={28} />
                </button>
              </div>
            </div>
          </div>
        ))
      ) : (
        <div className="flex justify-center items-center py-12">
          <h2>No new friend requests</h2>
        </div>
      )}
    </section>
  );
}
