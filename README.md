# CIPHER_TOOL_WEB
# CryptoVault - Classical Cipher Application

## Overview

CryptoVault is a full-stack web application that demonstrates classical cryptographic techniques, specifically Rail Fence and Row Transposition ciphers. The application is built as an educational tool to help users understand historical encryption methods through interactive visualization and hands-on experience.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite for fast development and optimized builds
- **Styling**: Tailwind CSS with custom dark theme and cipher-specific color gradients
- **UI Components**: Radix UI primitives with shadcn/ui component library
- **State Management**: React hooks with TanStack Query for server state
- **Routing**: Wouter for lightweight client-side routing
- **Forms**: React Hook Form with Zod validation

### Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Language**: TypeScript with ES modules
- **API**: RESTful API with `/api` prefix routing
- **Database**: PostgreSQL with Drizzle ORM
- **Database Provider**: Neon serverless PostgreSQL
- **Session Management**: PostgreSQL-based session storage

### Key Design Decisions

1. **Monorepo Structure**: Client, server, and shared code in single repository for simplified development
2. **Type Safety**: Full TypeScript implementation across all layers
3. **Component-First UI**: Reusable UI components with consistent styling system
4. **Educational Focus**: Visual cipher demonstrations with step-by-step algorithm visualization

## Key Components

### Frontend Components
- **CipherSection**: Reusable wrapper for cipher implementations
- **RailFenceCipher**: Interactive Rail Fence cipher with visualization grid
- **RowTranspositionCipher**: Columnar transposition with matrix display
- **AboutSection**: Educational content about cipher history and security
- **ComparisonSection**: Side-by-side cipher feature comparison

### Backend Components
- **Storage Interface**: Abstracted data layer with memory and database implementations
- **Route Registration**: Modular API route organization
- **Vite Integration**: Development server with HMR support

### Shared Components
- **Schema Definitions**: Drizzle schema with Zod validation
- **Type Definitions**: Shared TypeScript types between client and server

## Data Flow

1. **User Input**: Forms capture plaintext and cipher parameters
2. **Client-Side Processing**: Cipher algorithms execute in browser for immediate feedback
3. **Visualization Updates**: Real-time display of encryption steps and patterns
4. **Result Display**: Encrypted output with copy functionality
5. **Educational Content**: Static information about cipher mechanics and history

### Cipher Processing Flow
- Input validation using Zod schemas
- Algorithm execution with step-by-step tracking
- Visual matrix/grid generation for educational display
- Error handling with user-friendly toast notifications

## External Dependencies

### Core Dependencies
- **@neondatabase/serverless**: Serverless PostgreSQL connection
- **drizzle-orm**: Type-safe database ORM
- **@tanstack/react-query**: Server state management
- **@radix-ui/***: Accessible UI primitives
- **wouter**: Lightweight React router

### Development Tools
- **@replit/vite-plugin-runtime-error-modal**: Enhanced error reporting in Replit
- **@replit/vite-plugin-cartographer**: Development tooling integration
- **tsx**: TypeScript execution for development server

### UI/Styling
- **tailwindcss**: Utility-first CSS framework
- **class-variance-authority**: Component variant management
- **lucide-react**: Consistent icon system

## Deployment Strategy

### Build Process
1. **Frontend Build**: Vite builds React application to `dist/public`
2. **Backend Build**: esbuild bundles server code to `dist/index.js`
3. **Asset Optimization**: Automatic code splitting and minification

### Environment Configuration
- **Development**: Hot module replacement with Vite dev server
- **Production**: Static file serving with Express
- **Database**: Environment-based PostgreSQL connection string

### Replit Integration
- Custom Vite plugins for Replit-specific development features
- Environment detection for development vs. production modes
- Automatic database provisioning through environment variables

### Session Management
- PostgreSQL-based session storage using `connect-pg-simple`
- Secure session configuration with environment-specific settings

## Notable Architectural Choices

1. **Client-Side Cipher Processing**: Algorithms run in browser for educational visualization rather than server-side processing
2. **Memory Storage Fallback**: Development-friendly in-memory storage with database interface compatibility
3. **Component Composition**: Reusable cipher section wrapper promotes consistent UI patterns
4. **Educational First**: Architecture prioritizes learning experience over enterprise security features
5. **Dark Theme Default**: Cipher-themed dark UI with custom color palette for technical aesthetic
