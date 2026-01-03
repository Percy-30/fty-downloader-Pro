'use client'

import Script from 'next/script'
import { usePlatform } from '@/hooks/usePlatform'
import AdMobBanner from '@/components/AdMobBanner'

export default function AdManager() {
    const { isNative } = usePlatform()

    return (
        <>
            {/* WEB: Mostrar AdSense solo si NO es nativo */}
            {!isNative && (
                <>
                    <Script
                        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5414009811868137"
                        strategy="afterInteractive"
                        crossOrigin="anonymous"
                    />
                </>
            )}

            {/* APP: Mostrar AdMob solo si ES nativo */}
            {isNative && (
                <div className="fixed bottom-0 left-0 right-0 z-50 bg-white">
                    <AdMobBanner />
                </div>
            )}
        </>
    )
}
