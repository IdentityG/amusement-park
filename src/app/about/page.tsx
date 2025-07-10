import AboutHero from '@/components/about/AboutHero'
import ParkStats from '@/components/about/ParkStats'
import ProjectVision from '@/components/about/ProjectVision'
import React from 'react'

const page = () => {
  return (
    <div>
        <AboutHero />
        <ProjectVision />
        <ParkStats />
    </div>
  )
}

export default page