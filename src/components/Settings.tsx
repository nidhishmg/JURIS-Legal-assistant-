import { User, Bell, Lock, Database, Palette, Globe, HelpCircle } from 'lucide-react';

export function Settings() {
  return (
    <div className="h-full overflow-y-auto bg-gray-50">
      <div className="max-w-4xl mx-auto p-6">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-gray-900 mb-2">Settings</h1>
          <p className="text-gray-600">Manage your account and application preferences</p>
        </div>

        {/* Settings Sections */}
        <div className="space-y-4">
          {/* Profile Settings */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <User className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <h2 className="text-gray-900">Profile Settings</h2>
                <p className="text-sm text-gray-600">Manage your personal information</p>
              </div>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-gray-700 mb-2">Full Name</label>
                <input
                  type="text"
                  defaultValue="Adv. Rajesh Kumar"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-700 mb-2">Email</label>
                <input
                  type="email"
                  defaultValue="rajesh.kumar@example.com"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-700 mb-2">Bar Council ID</label>
                <input
                  type="text"
                  defaultValue="D/1234/2010"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-700 mb-2">Court</label>
                <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option>Delhi High Court</option>
                  <option>Supreme Court of India</option>
                  <option>District Court</option>
                  <option>Other</option>
                </select>
              </div>
              <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                Save Changes
              </button>
            </div>
          </div>

          {/* Notifications */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                <Bell className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <h2 className="text-gray-900">Notifications</h2>
                <p className="text-sm text-gray-600">Configure notification preferences</p>
              </div>
            </div>
            <div className="space-y-4">
              <label className="flex items-center justify-between">
                <div>
                  <p className="text-gray-900">Hearing Reminders</p>
                  <p className="text-sm text-gray-600">Get notified before court hearings</p>
                </div>
                <input type="checkbox" defaultChecked className="w-5 h-5" />
              </label>
              <label className="flex items-center justify-between">
                <div>
                  <p className="text-gray-900">Case Updates</p>
                  <p className="text-sm text-gray-600">Notifications for case status changes</p>
                </div>
                <input type="checkbox" defaultChecked className="w-5 h-5" />
              </label>
              <label className="flex items-center justify-between">
                <div>
                  <p className="text-gray-900">Document Uploads</p>
                  <p className="text-sm text-gray-600">Alert when documents are uploaded</p>
                </div>
                <input type="checkbox" defaultChecked className="w-5 h-5" />
              </label>
              <label className="flex items-center justify-between">
                <div>
                  <p className="text-gray-900">Deadline Alerts</p>
                  <p className="text-sm text-gray-600">Reminders for filing deadlines</p>
                </div>
                <input type="checkbox" defaultChecked className="w-5 h-5" />
              </label>
            </div>
          </div>

          {/* Security */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                <Lock className="w-5 h-5 text-red-600" />
              </div>
              <div>
                <h2 className="text-gray-900">Security</h2>
                <p className="text-sm text-gray-600">Manage password and security settings</p>
              </div>
            </div>
            <div className="space-y-4">
              <button className="w-full px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 text-left">
                Change Password
              </button>
              <button className="w-full px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 text-left">
                Enable Two-Factor Authentication
              </button>
              <button className="w-full px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 text-left">
                Manage Sessions
              </button>
            </div>
          </div>

          {/* Data & Privacy */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <Database className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <h2 className="text-gray-900">Data & Privacy</h2>
                <p className="text-sm text-gray-600">Control your data and privacy</p>
              </div>
            </div>
            <div className="space-y-4">
              <button className="w-full px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 text-left">
                Export All Data
              </button>
              <button className="w-full px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 text-left">
                Privacy Settings
              </button>
              <button className="w-full px-4 py-3 border border-red-300 text-red-600 rounded-lg hover:bg-red-50 text-left">
                Delete Account
              </button>
            </div>
          </div>

          {/* Appearance */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                <Palette className="w-5 h-5 text-orange-600" />
              </div>
              <div>
                <h2 className="text-gray-900">Appearance</h2>
                <p className="text-sm text-gray-600">Customize app appearance</p>
              </div>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-gray-700 mb-2">Theme</label>
                <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option>Light</option>
                  <option>Dark</option>
                  <option>System Default</option>
                </select>
              </div>
              <div>
                <label className="block text-sm text-gray-700 mb-2">Font Size</label>
                <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option>Small</option>
                  <option>Medium</option>
                  <option>Large</option>
                </select>
              </div>
            </div>
          </div>

          {/* Language & Region */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center">
                <Globe className="w-5 h-5 text-indigo-600" />
              </div>
              <div>
                <h2 className="text-gray-900">Language & Region</h2>
                <p className="text-sm text-gray-600">Set your language and region</p>
              </div>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-gray-700 mb-2">Language</label>
                <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option>English</option>
                  <option>Hindi</option>
                  <option>Bengali</option>
                  <option>Tamil</option>
                </select>
              </div>
              <div>
                <label className="block text-sm text-gray-700 mb-2">Time Zone</label>
                <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option>India Standard Time (IST)</option>
                  <option>Other</option>
                </select>
              </div>
            </div>
          </div>

          {/* Help & Support */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
                <HelpCircle className="w-5 h-5 text-yellow-600" />
              </div>
              <div>
                <h2 className="text-gray-900">Help & Support</h2>
                <p className="text-sm text-gray-600">Get help and support</p>
              </div>
            </div>
            <div className="space-y-3">
              <button className="w-full px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 text-left">
                Help Center
              </button>
              <button className="w-full px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 text-left">
                Contact Support
              </button>
              <button className="w-full px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 text-left">
                Report a Bug
              </button>
            </div>
          </div>

          {/* About */}
          <div className="bg-white rounded-xl border border-gray-200 p-6 text-center">
            <p className="text-sm text-gray-600 mb-2">JURIS - AI Legal Assistant</p>
            <p className="text-xs text-gray-500">Version 1.0.0</p>
            <p className="text-xs text-gray-500 mt-2">
              © 2025 JURIS. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
