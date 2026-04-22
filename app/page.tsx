'use client';
import { useRef } from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import {
  CareerAdvisor,
  Ecosystem,
  WhyOmniQuest,
  Results,
  GlobalMap,
  Blog,
  FinalCta,
  Footer,
} from '@/components/Sections';
import PersonalityTest from '@/components/PersonalityTest';
import ChatBox, { ChatBoxHandle } from '@/components/ChatBox';
import ScrollReveal from '@/components/ScrollReveal';

export default function Home() {
  const chatRef = useRef<ChatBoxHandle>(null);
  const openChat = (msg: string) => chatRef.current?.openWithMessage(msg);

  return (
    <>
      <ScrollReveal />
      <Navbar onOpenChat={openChat} />
      <main>
        {/* 1. Hero — aspiration & vision */}
        <Hero />

        {/* 2. Psychometric Test — entry gate (FIRST ACTION) */}
        <PersonalityTest />

        {/* 3. Career Advisor — trust layer */}
        <CareerAdvisor />

        {/* 4. Ecosystem Divisions — clarity */}
        <Ecosystem onOpenChat={openChat} />

        {/* 5. Why OmniQuest — differentiation */}
        <WhyOmniQuest />

        {/* 6. Results / Outcomes — proof */}
        <Results />

        {/* 7. Global Map */}
        <GlobalMap />

        {/* 8. Blog / Insights */}
        <Blog />

        {/* 9. Final CTA — conversion */}
        <FinalCta />
      </main>
      <Footer />
      <ChatBox ref={chatRef} />
    </>
  );
}
