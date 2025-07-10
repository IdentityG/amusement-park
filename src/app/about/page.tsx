import AboutHero from '@/components/about/AboutHero'
import ConstructionTimeline from '@/components/about/ConstructionTimeline'
import MasterPlanPreview from '@/components/about/MasterPlanPreview'
import ParkStats from '@/components/about/ParkStats'
import ProjectHighlights from '@/components/about/ProjectHighlights'
import ProjectVision from '@/components/about/ProjectVision'
import SustainabilitySection from '@/components/about/SustainabilitySection'
import React from 'react'

const page = () => {
  return (
    <div>
        <AboutHero />
        <ProjectVision />
        <ParkStats />
        <ProjectHighlights />
        <ConstructionTimeline />
        <MasterPlanPreview />
        <SustainabilitySection />

    </div>
  )
}

export default page