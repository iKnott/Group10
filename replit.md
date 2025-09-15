# Company Culture Assessment Application

## Overview

This is a full-stack web application that helps organizations discover their company culture type through an interactive assessment. The app presents users with 18 workplace scenario questions and analyzes their responses to determine which of 8 core culture types (Caring, Purpose, Learning, Enjoyment, Results, Authority, Safety, Order) best defines their organization. Built with React frontend and Express backend, it provides detailed results with actionable insights for organizational development.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React with TypeScript and Vite for development and building
- **Styling**: Tailwind CSS with shadcn/ui component library for consistent, modern UI components
- **Routing**: Wouter for lightweight client-side routing with three main routes: welcome, quiz, and results
- **State Management**: TanStack Query for server state management and caching, with local React state for UI interactions
- **Form Handling**: React Hook Form with Zod validation for type-safe form management

### Backend Architecture  
- **Framework**: Express.js with TypeScript for the REST API server
- **Storage Strategy**: Currently uses in-memory storage with a configurable interface (IStorage) that can be easily swapped for database persistence
- **API Design**: RESTful endpoints for questions retrieval, assessment submission, and results fetching
- **Development Setup**: Vite middleware integration for hot reloading during development

### Data Model
- **Questions**: Pre-defined assessment questions with multiple choice options mapped to culture types
- **Assessments**: User responses and calculated culture results stored with unique IDs
- **Culture Scoring**: Algorithm calculates scores across 8 culture dimensions based on response patterns

### UI/UX Design Patterns
- **Progressive Disclosure**: Multi-step quiz interface with progress tracking
- **Responsive Design**: Mobile-first approach with Tailwind breakpoints
- **Accessibility**: Radix UI primitives ensure keyboard navigation and screen reader support
- **Error Handling**: Toast notifications for user feedback and error states

## External Dependencies

### Core Framework Dependencies
- **React Ecosystem**: React 18+ with TypeScript, TanStack Query for data fetching
- **Build Tools**: Vite for development server and bundling, ESBuild for production builds
- **UI Components**: shadcn/ui component library built on Radix UI primitives

### Database Integration (Configured)
- **ORM**: Drizzle ORM configured for PostgreSQL with type-safe schema definitions
- **Database Driver**: Neon Database serverless driver for PostgreSQL connections
- **Migrations**: Drizzle Kit for database schema migrations and management
- **Connection**: Environment-based DATABASE_URL configuration for deployment flexibility

### Styling and Design
- **CSS Framework**: Tailwind CSS with custom design tokens and CSS variables
- **Icons**: Lucide React for consistent iconography
- **Fonts**: Inter font family loaded from Google Fonts
- **Component Variants**: Class Variance Authority for component styling patterns

### Development Tools
- **Type Safety**: Zod for runtime validation and schema definitions
- **Code Quality**: TypeScript strict mode with comprehensive type checking
- **Development Experience**: Replit-specific plugins for debugging and development workflow
- **Session Management**: Connect-pg-simple configured for PostgreSQL session storage (when database is connected)

### Potential Production Integrations
The application is architected to easily integrate additional services:
- Authentication providers (Auth0, Firebase Auth, etc.)
- Analytics platforms (Google Analytics, Mixpanel)
- Email services for results delivery
- Export functionality (PDF generation, CSV reports)
- Multi-language support with internationalization libraries