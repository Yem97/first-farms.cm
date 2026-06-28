"use client";

import { NextStudio } from 'next-sanity/studio'
import config from '@/sanity/sanity.config'

export default function StudioPage() {
  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;

  if (!projectId || projectId === 'your_project_id') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
        <div className="max-w-lg w-full bg-white rounded-3xl shadow-xl p-10 text-center space-y-6">
          <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto">
            <svg viewBox="0 0 24 24" fill="none" stroke="#1B5E20" strokeWidth="2" className="w-8 h-8">
              <path d="m12 22 4-4-3-3"/><path d="m9 8 5.5-5.5a.5.5 0 0 1 .7 0l2.3 2.3a.5.5 0 0 1 0 .7L12 11"/>
              <path d="M16 18c0-3.3-2.7-6-6-6s-6 2.7-6 6v4h12v-4Z"/>
            </svg>
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-800 font-poppins mb-2">Studio Setup Required</h1>
            <p className="text-gray-500 text-sm leading-relaxed">
              Create a <code className="bg-gray-100 px-2 py-0.5 rounded text-primary font-mono">.env.local</code> file in the project root with your Sanity credentials to access the content management studio.
            </p>
          </div>
          <div className="text-left bg-gray-900 rounded-2xl p-5 overflow-auto">
            <pre className="text-green-400 text-xs leading-relaxed font-mono whitespace-pre">{`NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2024-01-01
NEXT_PUBLIC_WHATSAPP_NUMBER=237XXXXXXXXX`}</pre>
          </div>
          <div className="space-y-3 text-left bg-gray-50 rounded-2xl p-5 text-sm text-gray-600">
            <p className="font-bold text-gray-700">How to get your Project ID:</p>
            <ol className="list-decimal list-inside space-y-1.5 text-xs">
              <li>Go to <strong>sanity.io/manage</strong> and sign in</li>
              <li>Create a new project or select an existing one</li>
              <li>Copy the Project ID from the project settings</li>
              <li>Paste it into your <code className="bg-gray-200 px-1 rounded">.env.local</code> file</li>
              <li>Restart the dev server with <code className="bg-gray-200 px-1 rounded">npm run dev</code></li>
            </ol>
          </div>
          <p className="text-xs text-gray-400">
            The studio manages Products, Training Events, Testimonials, Team Members, Ad Packages, and Member Registrations.
          </p>
        </div>
      </div>
    );
  }

  return <NextStudio config={config} />;
}
