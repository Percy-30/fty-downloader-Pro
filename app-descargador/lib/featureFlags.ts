// lib/featureFlags.ts
/**
 * Feature Flags for build-time configuration
 * Controls which features are enabled in different builds (Web vs Play Store)
 */

export const FEATURES = {
    /**
     * Enable YouTube platform support
     * - Web/APK builds: true
     * - Play Store builds: false (compliance with YouTube ToS)
     */
    YOUTUBE_ENABLED: process.env.NEXT_PUBLIC_ENABLE_YOUTUBE !== 'false',

    /**
     * Current app version identifier
     * - 'web': Full-featured web/APK version
     * - 'playstore': Play Store compliant version
     */
    APP_VERSION: process.env.NEXT_PUBLIC_APP_VERSION || 'web',
} as const

/**
 * Check if a feature is enabled
 */
export function isFeatureEnabled(feature: keyof typeof FEATURES): boolean {
    return FEATURES[feature] === true
}

/**
 * Get app version
 */
export function getAppVersion(): string {
    return FEATURES.APP_VERSION
}

/**
 * Check if running Play Store build
 */
export function isPlayStoreBuild(): boolean {
    return FEATURES.APP_VERSION === 'playstore'
}

/**
 * Get available platforms based on feature flags
 */
export function getAvailablePlatforms() {
    const platforms = ['facebook', 'tiktok'] as const

    if (FEATURES.YOUTUBE_ENABLED) {
        return ['facebook', 'youtube', 'tiktok'] as const
    }

    return platforms
}
