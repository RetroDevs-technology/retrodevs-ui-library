import React, { useState, useEffect } from 'react'
import { Progress, ProgressTrack, ProgressIndicator, ProgressValue, ProgressLabel } from '../src/components/core/progress'
import { FixtureWrapper } from './FixtureWrapper'

export default function ProgressShowcase() {
  const [progress, setProgress] = useState(20)

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((current) => {
        if (current >= 100) {
          return 0
        }
        return Math.min(100, current + 10)
      })
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  return (
    <FixtureWrapper>
      <section className="space-y-4">
        <h2 className="text-2xl font-bold">Determinate Progress</h2>
        <div className="space-y-2">
          <Progress value={progress}>
            <ProgressLabel>Loading</ProgressLabel>
            <ProgressTrack>
              <ProgressIndicator />
            </ProgressTrack>
            <ProgressValue />
          </Progress>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold">Progress States</h2>
        <div className="space-y-4">
          <div className="space-y-2">
            <Progress value={0}>
              <ProgressLabel>0% Complete</ProgressLabel>
              <ProgressTrack>
                <ProgressIndicator />
              </ProgressTrack>
              <ProgressValue />
            </Progress>
          </div>
          <div className="space-y-2">
            <Progress value={25}>
              <ProgressLabel>25% Complete</ProgressLabel>
              <ProgressTrack>
                <ProgressIndicator />
              </ProgressTrack>
              <ProgressValue />
            </Progress>
          </div>
          <div className="space-y-2">
            <Progress value={50}>
              <ProgressLabel>50% Complete</ProgressLabel>
              <ProgressTrack>
                <ProgressIndicator />
              </ProgressTrack>
              <ProgressValue />
            </Progress>
          </div>
          <div className="space-y-2">
            <Progress value={75}>
              <ProgressLabel>75% Complete</ProgressLabel>
              <ProgressTrack>
                <ProgressIndicator />
              </ProgressTrack>
              <ProgressValue />
            </Progress>
          </div>
          <div className="space-y-2">
            <Progress value={100}>
              <ProgressLabel>100% Complete</ProgressLabel>
              <ProgressTrack>
                <ProgressIndicator />
              </ProgressTrack>
              <ProgressValue />
            </Progress>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold">Indeterminate Progress</h2>
        <div className="space-y-2">
          <Progress value={null}>
            <ProgressLabel>Processing...</ProgressLabel>
            <ProgressTrack>
              <ProgressIndicator />
            </ProgressTrack>
          </Progress>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold">Custom Sizes</h2>
        <div className="space-y-4">
          <div className="space-y-2">
            <Progress value={60}>
              <ProgressLabel>Small</ProgressLabel>
              <ProgressTrack className="h-1">
                <ProgressIndicator />
              </ProgressTrack>
            </Progress>
          </div>
          <div className="space-y-2">
            <Progress value={60}>
              <ProgressLabel>Default</ProgressLabel>
              <ProgressTrack>
                <ProgressIndicator />
              </ProgressTrack>
            </Progress>
          </div>
          <div className="space-y-2">
            <Progress value={60}>
              <ProgressLabel>Large</ProgressLabel>
              <ProgressTrack className="h-4">
                <ProgressIndicator />
              </ProgressTrack>
            </Progress>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold">Without Label</h2>
        <div className="space-y-2">
          <Progress value={65}>
            <ProgressTrack>
              <ProgressIndicator />
            </ProgressTrack>
            <ProgressValue />
          </Progress>
        </div>
      </section>
    </FixtureWrapper>
  )
}
