import React, { useState } from 'react';
import { Hero } from './Hero';
import { QuickNav } from './QuickNav';
import { WhoWeAre } from './WhoWeAre';
import { VisionMission } from './VisionMission';
import { OrganizationalDNA } from './OrganizationalDNA';
import { NewsSection } from './NewsSection';
import { OurValues } from './OurValues';
import { WeAreDifferent } from './WeAreDifferent';
import { GallerySection } from './GallerySection';
import { VideoSection } from './VideoSection';
import { ArticleModal } from './ArticleModal';
import { InfoModal } from './InfoModal';
import { NewsPost } from '../../types/aboutOverviewTypes';

interface AboutOverviewViewProps {
  onOpenTalk?: () => void;
  onOpenCollaborate?: (area?: string) => void;
  onNavigateContact?: () => void;
  onNavigateFocus?: (focusId?: string) => void;
  onNavigateApproach?: () => void;
}

export const AboutOverviewView: React.FC<AboutOverviewViewProps> = ({
  onOpenTalk,
  onOpenCollaborate,
  onNavigateContact,
  onNavigateFocus,
  onNavigateApproach,
}) => {
  const [activeSection, setActiveSection] = useState<string>('whoweare');
  const [selectedPost, setSelectedPost] = useState<NewsPost | null>(null);
  const [infoModalData, setInfoModalData] = useState<{
    title: string;
    description: string;
  } | null>(null);

  const handleNavigate = (sectionId: string) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleLearnMoreWhoWeAre = () => {
    setInfoModalData({
      title: 'Translational Policy Studio Model',
      description:
        'IP3 bridges visionary ideas and grounded execution. Founded in 2018, we combine systems thinking, data & digital ecosystems, and participatory research to deliver adaptive, resilient solutions across the entire policy advisory value chain in the Global South.',
    });
  };

  const handleLearnMoreAI = () => {
    setInfoModalData({
      title: 'AI in Public Policy & Systems Modeling',
      description:
        'IP3 harnesses applied predictive intelligence, machine learning models, and geospatial data analytics to anticipate economic shocks, model climate vulnerability, and optimize municipal service delivery in real time.',
    });
  };

  const handleCheckServices = () => {
    handleNavigate('wearedifferent');
  };

  const handleActionClick = (title: string) => {
    setInfoModalData({
      title,
      description: `IP3's approach to ${title.toLowerCase()} provides governments, development partners, and community leaders with rigorous evidence-based frameworks, pilot testing environments, and continuous monitoring cycles.`,
    });
  };

  const handleOpenContactModal = () => {
    if (onOpenCollaborate) {
      onOpenCollaborate('IP3 Institutional Advisory');
    } else if (onOpenTalk) {
      onOpenTalk();
    } else if (onNavigateContact) {
      onNavigateContact();
    }
  };

  return (
    <div className="bg-[#0E1A22] text-[#F3F0E8] font-sans selection:bg-[#EF715A] selection:text-white">
      {/* 1. Hero Section */}
      <Hero />

      {/* 2. Quick Navigation Buttons */}
      <QuickNav activeSection={activeSection} onNavigate={handleNavigate} />

      {/* 3. Who We Are */}
      <WhoWeAre onLearnMore={handleLearnMoreWhoWeAre} />

      {/* 4. Our Purpose: Vision & Mission */}
      <VisionMission onLearnMoreAI={handleLearnMoreAI} />

      {/* 5. Our Organizational DNA */}
      <OrganizationalDNA
        onSelectPromo={(title, desc) => setInfoModalData({ title, description: desc })}
        onCheckServices={handleCheckServices}
      />

      {/* 6. Latest Posts & News */}
      <NewsSection onSelectPost={(post) => setSelectedPost(post)} />

      {/* 7. Our Values Accordion */}
      <OurValues />

      {/* 8. We Are Different & What Sets Us Apart */}
      <WeAreDifferent onActionClick={handleActionClick} />

      {/* 9. Photo Gallery with Fullscreen Lightbox */}
      <GallerySection />

      {/* 10. Choose IP3 Video Section */}
      <VideoSection />

      {/* Interactive Modals */}
      <ArticleModal post={selectedPost} onClose={() => setSelectedPost(null)} />
      
      <InfoModal
        data={infoModalData}
        onClose={() => setInfoModalData(null)}
        onAction={handleOpenContactModal}
      />
    </div>
  );
};
export default AboutOverviewView;
