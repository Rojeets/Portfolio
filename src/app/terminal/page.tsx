'use client'
import { useRouter } from 'next/navigation'
import Terminal from '../../components/Terminal'

export default function TerminalPage() {
  const router = useRouter()
  return <Terminal setMode={() => router.push('/')} />
}
