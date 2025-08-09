# Music Player (YouTube)

This is a React Native (Expo) music player with YouTube search and embedded playback, offline downloads, and a mini-player.

Note: Respect YouTube Terms of Service. This app uses the embedded player for online playback. Avoid extracting direct audio.

## Setup

- Install deps: `npm install`
- Set env for YouTube Data API v3:
  - Linux/macOS: `export YOUTUBE_API_KEY=YOUR_KEY`
  - Windows PowerShell: `$env:YOUTUBE_API_KEY="YOUR_KEY"`
- Start: `npm run android` or `npm run web`

## Features (scaffolded)
- Bottom tab navigation: Home, Search, Library, Downloads, Settings
- Search via YouTube Data API (enter API key in env)
- Embedded YouTube playback (WebView)
- Mini-player with basic controls
- Downloads service (API surface only)
- Player service (TrackPlayer wiring; stream URLs required for background audio)

## Legal
- To remain compliant, keep playback within YouTube’s official embed.