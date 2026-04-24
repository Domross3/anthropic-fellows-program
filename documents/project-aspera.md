# Aspera — AI Life Optimizer

## Overview
Aspera is a mobile-first AI life optimization platform built during the CBC Hackathon at the University of Michigan. It analyzes a user's daily lifestyle inputs (sleep, caffeine, exercise, music, browsing habits) and uses Claude AI to identify correlations with productivity outputs (focus, energy, task completion).

## Technical Architecture
- **Mobile App:** React Native 19.1 / Expo SDK 54 / expo-router v6 (TypeScript)
- **Web Dashboard:** Next.js 15 with Tailwind CSS and Recharts
- **Chrome Extension:** Manifest V3 extension for browsing telemetry
- **AI Engine:** Claude Sonnet via @anthropic-ai/sdk
- **Data Sync:** Firebase Realtime Database (REST API) for extension-to-app communication
- **Storage:** AsyncStorage for local-first, privacy-preserving data persistence

## Key Features
- **Three AI coaching personalities:** analytical (data-driven), unserious (casual/witty), stoic (Marcus Aurelius mode)
- **Self-compassion layer:** Automatically detects difficult weeks and adjusts tone to be supportive rather than performance-focused
- **Somatic Interceptor:** Cognitive reappraisal tool for procrastination anxiety — deliberately avoids mentioning productivity/goals
- **Multi-source data integration:** Spotify, HealthKit (sleep, daylight, workouts), Google Calendar/Tasks, browsing telemetry
- **Keystone habit detection:** Identifies single habits that cascade into improvements across multiple output metrics

## My Role
- <!-- Describe your specific contributions -->
- Led the team in system architecture and AI prompt engineering
- Designed the coaching personality system and self-compassion detection algorithm
- Built the Chrome extension for browsing data collection

## Impact & Results
<!-- What did the project achieve? Demo results, feedback, etc. -->

---
*Replace placeholder sections with your actual contributions and results.*
