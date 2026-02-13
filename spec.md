# Specification

## Summary
**Goal:** Build a private, cinematic, mobile-first single-page Valentine’s interactive web experience (“You Are My Favorite Love Story”) with personalization, ambient romantic animation, audio, and optional canister-backed save/load.

**Planned changes:**
- Create a fully responsive, themed single-page UI with glassmorphism cards, slow fades/smooth transitions, and elegant typography (script-like headings + sans-serif body).
- Add an ambient animated background layer (floating petals and/or glowing hearts) that runs behind content without blocking interaction.
- Implement audio: start background instrumental music only after a user gesture, provide mute/unmute, and allow user music upload for the session; play a heartbeat SFX on landing CTA tap.
- Build Landing Screen with exact intro text and glowing “Tap to feel loved” button that fades into the main experience.
- Implement “Our Story” as a scroll-animated timeline with exactly five titled entries, each supporting photo upload + preview and an editable love-note text area.
- Implement “12 Reasons I’m Crazy About You” as 12 interactive flip cards with placeholder messages; make the 12th card visually special and reveal the exact final message.
- Implement “The Love Meter” that animates 0%→100%, then breaks to show the exact error message and triggers confetti + heart-explosion animations.
- Implement the final surprise moment: dim background, music swell (respecting mute), show the prompt with two exact-label buttons; either choice triggers fireworks and then the exact final love message.
- Add a live countdown timer to the next Valentine’s Day and a floating bottom message with exact text in the final portion.
- Add hidden features: a subtle heart icon that reveals a message after 5 taps, plus an optional secret-code input that unlocks a second message when matching the configured anniversary date.
- Add a “Customize” area to edit her name, your names, anniversary date, custom messages throughout, timeline photo uploads, and background music upload with immediate UI updates.
- Persist customization locally in the browser with a “Reset to defaults” action.
- Add a minimal Motoko backend model to save/load a single text configuration per Internet Identity principal; frontend supports optional “Save to canister” / “Load from canister” while remaining fully usable without sign-in (local-only mode).

**User-visible outcome:** Users can open a romantic, animated Valentine’s single-page experience, customize names/messages/photos/music, enjoy interactive sections (timeline, flip cards, love meter, final prompt), see a Valentine’s countdown and secret unlocks, and optionally sign in to save/load their configuration from a canister.
