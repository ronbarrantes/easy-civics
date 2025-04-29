'use client'

import { useEffect, useState } from 'react'
import { ResultsSummary } from '@/components/citizenship/results-summary'
import { TestResults } from '@/lib/types'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Home } from 'lucide-react'

export default function ResultsPage() {
  const router = useRouter()
  const [results, setResults] = useState<TestResults | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    try {
      const storedResults = localStorage.getItem('testResults')
      if (storedResults) {
        const parsedResults = JSON.parse(storedResults)
        setResults(parsedResults)
      } else {
        // No results found, redirect to test page
        router.push('/test')
      }
    } catch (error) {
      console.error('Error loading test results:', error)
    } finally {
      setIsLoading(false)
    }
  }, [router])

  if (isLoading) {
    return (
      <div className="container max-w-md mx-auto px-4 py-12 text-center">
        <p>Loading your results...</p>
      </div>
    )
  }

  if (!results) {
    return (
      <div className="container max-w-md mx-auto px-4 py-12 text-center">
        <h1 className="text-2xl font-bold mb-4">No Results Found</h1>
        <p className="mb-6">
          It looks like you haven't taken a test yet or your results have
          expired.
        </p>
        <Button onClick={() => router.push('/test')}>Take a Test</Button>
      </div>
    )
  }

  return (
    <div className="container max-w-4xl mx-auto px-4 py-8 md:py-12">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-4">Your Test Results</h1>
        <p className="text-muted-foreground max-w-xl mx-auto">
          Review your performance and see where you can improve.
        </p>
      </div>

      <ResultsSummary results={results} />

      <div className="flex justify-center mt-12">
        <Button variant="outline" onClick={() => router.push('/')}>
          <Home className="mr-2 h-4 w-4" /> Return to Home
        </Button>
      </div>
    </div>
  )
}
