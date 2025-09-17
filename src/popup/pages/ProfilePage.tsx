import React from 'react';
import { FiUser, FiEdit3, FiCamera, FiMail, FiCalendar, FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const ProfilePage: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleBack = () => {
    navigate('/more');
  };

  const profileSections = [
    {
      icon: <FiEdit3 size={20} />,
      title: 'Edit Profile',
      description: 'Update your display name, bio, and email',
      path: '/profile/edit',
      available: true
    },
    {
      icon: <FiMail size={20} />,
      title: 'Social Media Links',
      description: 'Add your social media profiles and websites',
      path: '/profile/social',
      available: true
    },
    {
      icon: <FiCalendar size={20} />,
      title: 'Personal Details',
      description: 'Manage birthday and other personal information',
      path: '/profile/personal',
      available: true
    },
    {
      icon: <FiCamera size={20} />,
      title: 'Profile Picture',
      description: 'Upload or change your profile picture',
      path: '/profile/avatar',
      available: false
    }
  ];

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-gray-100 bg-white">
        <div className="flex items-center space-x-3">
          <button
            onClick={handleBack}
            className="flex items-center text-blue-600 hover:text-blue-800 transition-colors"
          >
            <FiChevronLeft size={20} className="mr-1" />
            <span className="text-sm font-medium">Back</span>
          </button>
          
          <div className="flex-1">
            <h1 className="text-lg font-bold text-gray-800">Profile Settings</h1>
            <p className="text-sm text-gray-600">Manage your profile information</p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4">
        {/* Current Profile Preview */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 mb-6 text-center">
          <div className="relative inline-block mb-4">
            <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-2xl shadow-lg">
              {user?.displayName?.[0]?.toUpperCase() || user?.username?.[0]?.toUpperCase()}
            </div>
            <button className="absolute -bottom-1 -right-1 w-7 h-7 bg-white rounded-full shadow-lg flex items-center justify-center text-blue-600 hover:text-blue-800 transition-colors">
              <FiCamera size={14} />
            </button>
          </div>
          <h2 className="text-xl font-bold text-gray-800 mb-1">
            {user?.displayName || user?.username}
          </h2>
          <p className="text-gray-600">@{user?.username}</p>
        </div>

        {/* Profile Management Sections */}
        <div className="space-y-3">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Profile Management</h3>
          
          {profileSections.map((section, index) => (
            <button
              key={index}
              onClick={() => section.available && navigate(section.path)}
              disabled={!section.available}
              className={`w-full bg-white border border-gray-200 rounded-xl p-4 text-left transition-colors ${
                section.available 
                  ? 'hover:bg-gray-50 hover:border-gray-300 cursor-pointer' 
                  : 'opacity-60 cursor-not-allowed'
              }`}
            >
              <div className="flex items-center space-x-3">
                <div className={`p-2 rounded-lg ${
                  section.available 
                    ? 'bg-blue-100 text-blue-600' 
                    : 'bg-gray-100 text-gray-500'
                }`}>
                  {section.icon}
                </div>
                <div className="flex-1">
                  <h4 className="font-medium text-gray-800">{section.title}</h4>
                  <p className="text-sm text-gray-500 mt-1">{section.description}</p>
                </div>
                <div className="flex items-center space-x-2">
                  {!section.available && (
                    <span className="text-xs bg-yellow-100 text-yellow-700 px-2 py-1 rounded-full">
                      Coming Soon
                    </span>
                  )}
                  {section.available && (
                    <FiChevronRight size={20} className="text-gray-400" />
                  )}
                </div>
              </div>
            </button>
          ))}
        </div>

        {/* Privacy Reminder */}
        <div className="mt-4 bg-blue-50 border border-blue-200 rounded-xl p-4">
          <h4 className="font-semibold text-blue-800 mb-2">Privacy Reminder</h4>
          <p className="text-sm text-blue-700">
            Remember to check your Privacy & Security settings to control who can see your profile information.
          </p>
          <button
            onClick={() => navigate('/privacy')}
            className="mt-2 text-sm text-blue-600 hover:text-blue-800 font-medium"
          >
            Go to Privacy Settings →
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;