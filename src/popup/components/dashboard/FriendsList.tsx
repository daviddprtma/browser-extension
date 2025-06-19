import React from 'react';

interface Friend {
  id: string;
  username: string;
  displayName?: string;
  status: 'online' | 'offline' | 'away';
  currentActivity?: string;
}

interface FriendsListProps {
  friends: Friend[];
  isLoading?: boolean;
}

const FriendsList: React.FC<FriendsListProps> = ({ friends, isLoading = false }) => {
  return (
    <div className="mb-6">
      <h2 className="text-lg font-semibold text-gray-700 mb-3">Friends</h2>
      
      {isLoading ? (
        <div className="bg-gray-100 rounded-lg p-4 flex justify-center">
          <div className="animate-pulse h-5 w-5 rounded-full bg-blue-400"></div>
        </div>
      ) : friends.length > 0 ? (
        <div className="bg-white border border-gray-200 rounded-lg divide-y divide-gray-200">
          {friends.map(friend => (
            <div key={friend.id} className="p-3 flex items-center justify-between">
              <div className="flex items-center">
                <div className={`w-2 h-2 rounded-full mr-3 ${
                  friend.status === 'online' ? 'bg-green-500' : 
                  friend.status === 'away' ? 'bg-yellow-500' : 'bg-gray-400'
                }`}></div>
                <span className="font-medium">{friend.displayName || friend.username}</span>
              </div>
              {friend.currentActivity && (
                <span className="text-xs text-gray-500">{friend.currentActivity}</span>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-gray-100 rounded-lg p-8 text-center">
          <p className="text-gray-500">No friends online right now</p>
          <button className="mt-3 text-blue-600 text-sm font-medium">
            Add Friends
          </button>
        </div>
      )}
    </div>
  );
};

export default FriendsList;