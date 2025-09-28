# AT Protocol Browser

A web-based explorer for AT Protocol (Bluesky) repositories, allowing users to browse and inspect AT Protocol data structures including DIDs, collections, and records.

## Features

- **DID Resolution**: Resolve AT Protocol handles and DIDs to view DID documents
- **Repository Browsing**: Explore user repositories and their collections
- **Record Inspection**: View individual records within collections with syntax highlighting
- **Audit Log Viewing**: Access PLC Directory audit logs for DIDs
- **Breadcrumb Navigation**: Easy navigation through the AT Protocol data hierarchy

## Tech Stack

- **Next.js 14**: React framework with App Router
- **TypeScript**: Type-safe development
- **AT Protocol Libraries**: Official AT Protocol SDK for identity resolution
- **Tailwind CSS**: Utility-first CSS framework
- **Shiki**: Syntax highlighting for JSON data
- **React Query**: Data fetching and caching

## Getting Started

### Prerequisites

- Node.js 18+
- pnpm (or npm/yarn)

### Installation

1. Clone the repository:

```bash
git clone https://github.com/yourusername/at-browser.git
cd at-browser
```

2. Install dependencies:

```bash
pnpm install
```

3. Run the development server:

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to start browsing.

## Usage

Navigate to `/at/[identifier]` where `[identifier]` can be:

- An AT Protocol handle (e.g., `alice.bsky.social`)
- A DID (e.g., `did:plc:...`)

From there, you can:

- View the resolved DID document
- Browse available collections in the repository
- Inspect individual records within collections
- View audit logs from the PLC Directory

## Project Structure

```
src/
├── app/                  # Next.js app router pages
│   └── at/              # AT Protocol browser routes
├── components/          # React components
├── lib/                 # Utility functions and AT Protocol API
│   ├── atproto.ts      # Client-side AT Protocol functions
│   └── server/         # Server-side utilities
└── types/              # TypeScript type definitions
```

## Development

```bash
# Run development server with Turbo
pnpm dev

# Build for production
pnpm build

# Start production server
pnpm start

# Run linting
pnpm lint
```
