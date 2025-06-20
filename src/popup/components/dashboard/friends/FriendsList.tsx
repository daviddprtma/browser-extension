import React from 'react';
import { useFriends } from '../../../context/FriendsContext';

const FriendsList: React.FC = () => {
  const { friends, loading } = useFriends();

  return (
    <div className="mb-6">
      <h2 className="text-lg font-semibold text-gray-700 mb-3">Friends</h2>
      {loading ? (
        <div className="bg-gray-100 rounded-lg p-4 flex justify-center">
          <div className="animate-pulse h-5 w-5 rounded-full bg-blue-400"></div>
        </div>
      ) : friends.length > 0 ? (
        <div className="bg-white border border-gray-200 rounded-lg divide-y divide-gray-200">
          {friends.map(friend => (
            <div key={friend.id} className="p-3 flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-2 h-2 rounded-full mr-3 bg-green-500"></div>
                <span className="font-medium">{friend.displayName || friend.username}</span>
              </div>
              <span className="text-xs text-gray-500">
                {friend.lastOnlineAt ? `Last online: ${new Date(friend.lastOnlineAt).toLocaleString()}` : ''}
              </span>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-gray-100 rounded-lg p-8 text-center">
          <p className="text-gray-500">No friends found</p>
        </div>
      )}
    </div>
  );
};

export default FriendsList;