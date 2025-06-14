# Bill Genius - AI-Powered Expense Tracking

## Overview
Bill Genius is a modern expense tracking application designed for mobile-first usage. The application provides AI-powered receipt scanning, expense categorization, and financial analytics. It follows a full-stack architecture with a React frontend and Express.js backend, using PostgreSQL for data persistence.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Styling**: Tailwind CSS with shadcn/ui component library
- **State Management**: TanStack Query (React Query) for server state
- **Routing**: Wouter for client-side navigation
- **Form Handling**: React Hook Form with Zod validation
- **Build Tool**: Vite for development and production builds

### Backend Architecture
- **Framework**: Express.js with TypeScript
- **Database ORM**: Drizzle ORM for type-safe database operations
- **Database**: PostgreSQL with persistent storage
- **API Pattern**: RESTful API design
- **Validation**: Zod schemas shared between frontend and backend
- **Storage**: DatabaseStorage class implementing full CRUD operations

### Mobile-First Design
- Responsive design optimized for mobile devices
- Bottom navigation pattern for mobile UX
- Touch-friendly interface components
- Progressive Web App capabilities

## Key Components

### Database Schema
The application uses three main entities:
- **Users**: Authentication and user management
- **Categories**: Expense categorization with icons and colors
- **Expenses**: Core expense tracking with receipt support

### API Routes
- `GET /api/categories` - Retrieve expense categories
- `GET /api/expenses` - List expenses with optional filtering
- `POST /api/expenses` - Create new expenses
- `PUT /api/expenses/:id` - Update existing expenses
- `DELETE /api/expenses/:id` - Remove expenses

### Frontend Pages
- **Dashboard**: Overview of spending and recent transactions
- **Analytics**: Visual spending insights and category breakdowns
- **Scan**: AI-powered receipt scanning interface
- **Expenses**: Complete expense management
- **Settings**: User preferences and account management

## Data Flow

### Expense Creation Flow
1. User initiates expense creation via floating action button
2. Modal form captures expense details with validation
3. Data is validated using shared Zod schemas
4. API request creates expense in database
5. UI updates automatically via React Query cache invalidation

### Receipt Scanning Flow (Planned)
1. User captures receipt image via camera or file upload
2. Image is processed using AI/OCR services
3. Extracted data populates expense form
4. User reviews and confirms extracted information
5. Expense is saved with AI-extracted metadata

## External Dependencies

### UI and Styling
- Radix UI primitives for accessible components
- Font Awesome for iconography
- Google Fonts (Inter) for typography
- Tailwind CSS for utility-first styling

### Data and State Management
- TanStack Query for server state synchronization
- React Hook Form for form state management
- Zod for runtime type validation

### Database and Backend
- Drizzle ORM for database operations
- Neon Database for serverless PostgreSQL
- Express.js for API server

## Deployment Strategy

### Development Environment
- Replit-based development with hot reloading
- Vite development server with HMR
- PostgreSQL module for database services
- Environment variable configuration for database connections

### Production Build
- Vite builds optimized frontend bundle
- esbuild compiles server-side TypeScript
- Static assets served from Express server
- Database migrations handled via Drizzle Kit

### Replit Configuration
- Node.js 20 runtime environment
- Web and PostgreSQL modules enabled
- Automatic deployments to Replit's autoscale infrastructure
- Port configuration for development and production

## Changelog
- June 14, 2025: Initial setup with in-memory storage
- June 14, 2025: Added time period analytics (Day/Week/Month/Year filtering)
- June 14, 2025: Migrated from in-memory storage to PostgreSQL database with persistent data storage

## User Preferences
Preferred communication style: Simple, everyday language.