'use client'

type Platform = 'facebook' | 'youtube' | 'tiktok'

interface PlatformTabsProps {
  activePlatform: Platform
  onPlatformChange: (platform: Platform) => void
}

const platforms = [
  {
    id: 'facebook' as Platform,
    name: 'Facebook',
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
      </svg>
    ),
    color: 'bg-blue-600'
  },
  {
    id: 'youtube' as Platform,
    name: 'YouTube',
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
      </svg>
    ),
    color: 'bg-red-600'
  },
  {
    id: 'tiktok' as Platform,
    name: 'TikTok',
    icon: (
      <svg
        className="w-5 h-5"
        viewBox="0 0 24 24"
        fill="currentColor"
        aria-hidden="true"
      >
        <path d="M12 2h3.5c.1 1.2.6 2.3 1.4 3.2.8.9 1.9 1.5 3.1 1.6v3.5c-1.7-.1-3.3-.7-4.7-1.7v7.2c0 3.9-3.2 7-7.1 7-1.9 0-3.6-.7-4.9-2-1.3-1.3-2-3-2-4.9 0-3.9 3.2-7.1 7.1-7.1.4 0 .8 0 1.2.1v3.6c-.4-.1-.8-.1-1.2-.1-2 0-3.6 1.6-3.6 3.6 0 1 .4 1.9 1 2.6.7.7 1.6 1 2.6 1 2 0 3.6-1.6 3.6-3.6V2z" />
      </svg>
    ),
    color: 'bg-black'
  }
]

export default function PlatformTabs({ activePlatform, onPlatformChange }: PlatformTabsProps) {
  return (
    <div className="bg-white rounded-xl shadow-lg p-2">
      <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
        {platforms.map((platform) => (
          <button
            key={platform.id}
            onClick={() => onPlatformChange(platform.id)}
            className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-semibold transition-all duration-200 justify-center w-full sm:w-auto sm:flex-1 ${activePlatform === platform.id
              ? `${platform.color} text-white shadow-md`
              : 'text-gray-600 hover:bg-gray-100'
              }`}
          >
            {platform.icon}
            <span>{platform.name}</span>
          </button>
        ))}
      </div>
    </div>
  )
}