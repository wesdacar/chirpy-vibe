# Chirpy VibeSDK

## Overview
Chirpy (formerly Cloudflare VibeSDK) is an open-source full-stack AI webapp generator platform that allows users to describe apps in natural language and have them built by AI agents. The platform uses Cloudflare's developer ecosystem including Workers, Durable Objects, D1 database, R2 storage, and containerized sandboxes.

## Project Status
- **Current State**: Successfully set up in Replit environment with Chirpy branding
- **Last Updated**: October 1, 2025

## Recent Changes
- **2025-10-01**: Chirpy rebranding and deployment fixes
  - Replaced logo with Chirpy logo
  - Updated color scheme to purple gradient theme (#9333ea, #7c3aed, #a855f7)
  - Fixed deployment error by switching from rolldown-vite to standard vite 6.3.6
  - Removed conflicting package.json overrides section
  - Changed deployment type from VM to Autoscale for web application compatibility
  - Increased Node.js memory limit to 4GB for build process (--max-old-space-size=4096)
  - Added start script to serve built application with vite preview
  - Updated deployment to serve the app instead of deploying to Cloudflare Workers
  - Verified build and dev server work with standard vite
- **2025-09-30**: Initial Replit import setup completed
  - Installed all dependencies with Bun
  - Configured Vite dev server to run on 0.0.0.0:5000
  - Disabled Cloudflare plugin for Replit environment (only loads when not in Replit)
  - Added file watcher exclusions to prevent ENOSPC errors
  - Set up Vite Dev Server workflow
  - Configured deployment settings for Cloudflare Workers

## Project Architecture

### Frontend
- **Framework**: React 19 + TypeScript + Vite
- **UI Components**: Radix UI primitives
- **Styling**: Tailwind CSS 4
- **Router**: React Router 7
- **Port**: 5000 (bound to 0.0.0.0)

### Backend (Cloudflare Workers)
- **Runtime**: Cloudflare Workers
- **Database**: D1 (SQLite) with Drizzle ORM
- **Storage**: R2 buckets for templates
- **Key-Value**: KV namespaces
- **AI**: Multiple LLM providers via AI Gateway
- **Containers**: Sandboxed app previews

### Key Technologies
- **Package Manager**: Bun
- **Build Tool**: Vite 6.3.6 (standard)
- **TypeScript**: Strict mode enabled
- **Linting**: ESLint with TypeScript support
- **Code Generation**: AI agents using Durable Objects

## Development Setup

### Running Locally
The Vite dev server is configured to run automatically:
- Command: `bun run dev`
- Port: 5000
- Host: 0.0.0.0 (accessible via Replit webview)

### Important Notes
1. **Cloudflare Plugin**: Disabled in Replit environment to avoid remote binding issues
2. **File Watchers**: Configured to ignore node_modules, .cache, and dist to prevent ENOSPC errors
3. **Environment**: Uses DEV_MODE=true for local development

### Environment Variables
Copy `.dev.vars.example` to `.dev.vars` and configure:
- `GOOGLE_AI_STUDIO_API_KEY`: Required for AI functionality
- `JWT_SECRET`: For session management
- `WEBHOOK_SECRET`: For webhooks
- OAuth credentials (optional for login features)

## Deployment

### Replit Deployment (Autoscale)
Configured for Replit's Autoscale deployment:
- **Build**: `bun run build` with 4GB Node.js memory limit
- **Run**: `bun run start` (serves the built app on port 5000)
- **Target**: Autoscale (automatically scales based on traffic)

### Cloudflare Workers Deployment (Manual)
For deploying to Cloudflare infrastructure:
- **Deploy**: `bun x wrangler deploy`
- **Note**: Requires CLOUDFLARE_API_TOKEN environment variable

## File Structure
- `/src` - Frontend React application
- `/worker` - Cloudflare Worker backend
- `/shared` - Shared code between frontend and backend
- `/container` - Docker configurations for sandboxes
- `/migrations` - D1 database migrations
- `/public` - Static assets
- `/scripts` - Build and deployment scripts

## User Preferences
- Package manager: Bun (preferred)
- Port configuration: 5000 for frontend
- Environment: Replit with Cloudflare Workers deployment target
