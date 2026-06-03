Sales Dashboard
A full-stack React application built to manage and visualize a B2B sales pipeline. Originally developed as an internal tool to track my own commercial activity, then extended and refactored as a portfolio project.
What it does
The dashboard gives a real-time view of sales performance across a team of salespeople. Core features:

Sales entry — add a new sale to an existing salesperson, selecting product category and value
Live chart update — the salesperson comparison chart updates instantly after each entry
Salesperson comparison — bar chart comparing individual performance across product categories
Pipeline overview — KPI cards showing total leads, closed deals, conversion rate, and total value
Filters — filter the client table by month, status (lead / appointment / closed), and free text search
Data persistence — sales data is stored in a SQLite database via a local Node.js server, so entries survive page reloads

Tech stack
Frontend

React 18 + Vite
Recharts for data visualization
useState / useMemo for state management and derived data

Backend

Node.js local server
SQLite database for data persistence
REST API consumed by the React frontend

Architecture
src/          → React frontend (components, state, charts)
server/       → Node.js server (REST endpoints, SQLite persistence)
Background
I built the first version of this tool while working as a digital consultant, to track my own pipeline and monitor conversion rates across different product lines. The KPI structure reflects real metrics I was measuring daily.
I later used it as a hands-on learning project to solidify React patterns — component decomposition, state management with hooks, and integration with a charting library. I also used it to practice AI-assisted development workflows, breaking features into isolated pieces and iterating incrementally.
Roadmap

Migrate from SQLite to SQL Server for multi-user production use
Rebuild backend with .NET Core Web API
Add authentication for multi-user access
Export to CSV
Mobile responsive layout

Run locally
Frontend
bashnpm install
npm run dev
Backend
bashcd server
node server.js
Frontend at http://localhost:5173, server at http://localhost:3001.
