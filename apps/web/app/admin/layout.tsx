import type { Metadata } from 'next'
import AdminProviders from './providers'
import React from 'react'

export const metadata: Metadata = {
  title: {
    template: '%s | ASV Labs Learn Admin',
    default: 'ASV Labs Learn Admin',
  },
}

export default function AdminRootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <AdminProviders>{children}</AdminProviders>
}
