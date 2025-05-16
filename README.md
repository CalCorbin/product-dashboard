# Product Dashboard

A visualization tool that displays products based on performance metrics, featuring two product carousels:
- Most reviewed products
- Best rated products

![productDashboard.png](assets/productDashboard.png)

## Table of Contents
- [Getting Started](#getting-started)
- [Linting and Testing](#linting-and-testing)
- [Pull Request Workflows](#pull-request-workflows)
- [Architecture](#architecture)
   - [Overview](#overview)
   - [System Components](#system-components)
      - [Backend (Express)](#backend-express)
      - [Frontend (Next.js)](#frontend-nextjs)
   - [Data Flow](#data-flow)
   - [Development & Testing Architecture](#development--testing-architecture)

## Getting Started
1. Create an `.env` file with value `PORT=3000`.
2. Run `npm ci`.
3. In your first terminal tab, run `npm run api`.
4. In your second terminal tab, run `npm run dev`.
5. Assuming everything went well, navigate to http://localhost:3001/product-dashboard, where you should see the
product dashboard.

## Linting and Testing
1. To run lint locally, in the root of the project the following.
   - `npm run lint`
2. Backend tests can be run using `npm run test:be`, these use Jest.
3. Frontend tests can be run headlessly using `npm run test:fe`.
4. If you need to add new cypress tests, you can open the cypress UI via `npm run cypress`.

## Pull Request Workflows
All PRs must pass CI checks before merging. Run the following locally to verify: `npm run test:ci`.

## Architecture

### Overview
This full stack application implements a modern web architecture with a clear separation between frontend and backend services:

- **Backend**: Built with Express.js
- **Frontend**: Developed using Next.js

### System Components

#### Backend (Express)
- RESTful API endpoints serving product information and metrics
- Server-side validation and data processing
- API middleware for logging (Morgan) and cross-origin requests (CORS)

#### Frontend (Next.js)
- React component architecture for UI rendering
- React Query (Tanstack) for state management and data fetching
- Responsive product carousels displaying product information
- Client-side routing with Next.js for navigation

### Data Flow
1. Express backend processes requests and serves product data from the database
2. Next.js frontend fetches data through API calls
3. React components render product information in the dashboard carousels

### Development & Testing Architecture
- Jest for backend unit and integration testing
- Cypress component testing for unit and integration testing
- ESLint and Prettier for code quality and consistency
- CI/CD pipeline validation through GitHub Actions