
// Fix: Import React to provide the React namespace for React.ReactNode
import React from 'react';

export interface Feature {
  title: string;
  description: string;
  icon: React.ReactNode;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface ProgramStep {
  step: number;
  title: string;
  description: string;
}