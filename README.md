# ProjectHub

A comprehensive, feature-rich Project Dashboard Web App built with Next.js, TypeScript, and modern web technologies.

## Links

- GitHub: https://github.com/ibrahimeltbakh/ProjectHub.git
- Live : https://project-hub-olive.vercel.app/

## 🚀 Features

### ✅ Authentication & Role Management

- JWT-based authentication system
- Role-based access control (Admin, Manager, Developer)
- Protected routes with role validation

### 🔐 Test Accounts

###👨‍💼 Manager Account
- please login using
- Email: manager@gmail.com
- Password: Manager2025
###🧑‍💼 Admin Account
- please login using
- Email: admin@gmail.com
- Password: Admin2026
###👨‍💻 Developer Account
- You can sign up with any email & password
- Or use existing Developer account:
- Email: ahmed@gmail.com
- Password: Ahmed2025

### ✅ Dashboard Page

- List projects with pagination, sorting, and filtering
- **Inline editing** - Double-click any cell to edit directly in the table
- Columns: Name, Status, Start Date, End Date, Progress, Budget
- Real-time project updates

### ✅ Project Details Page

- Complete project information display
- Task list with add, edit, and **bulk update** functionality
- **Real-time updates** via Supabase Realtime
- Filter tasks by priority and assigned user
- Task status management with role-based permissions

### ✅ Search & Advanced Filtering

- Search projects by name
- Filter by status (Completed, In Progress, Pending, Upcoming, Overdue)
- Sort by name, start date, and end date
- Filter tasks by priority and assigned user

### ✅ UI & Best Practices

- **Fully responsive design** - Works on mobile, tablet, and desktop
- **Accessibility (WCAG compliance)** - ARIA labels, keyboard navigation, semantic HTML
- **Form validation** using react-hook-form + Yup
- **Skeleton loaders** for better loading experience
- **Optimistic updates** for instant UI feedback
- Beautiful animations with Framer Motion

### ✅ Optional Bonus Features

- **PWA Support** - Service Worker + Manifest.json for offline capability
- **Charts** - Project progress visualization with Chart.js
- **pdf and Excel** - get your projects in pdf and Excel sheets

## 🛠️ Tech Stack

- **Framework**: Next.js 16 (LTS) with React 19
- **Language**: TypeScript
- **Styling**: TailwindCSS v4
- **UI Components**: ShadCN UI + Radix UI
- **State Management**: Redux Toolkit
- **Data Fetching**: React Query (TanStack Query)
- **Database**: Supabase (PostgreSQL)
- **Real-time**: Supabase Realtime
- **Form Validation**: react-hook-form + Yup
- **Animations**: Framer Motion
- **Charts**: Chart.js + react-chartjs-2

## 📦 Installation

1. Clone the repository:

```bash
git clone https://github.com/ibrahimeltbakh/ProjectHub.git

```

2. Install dependencies:

```bash
npm install
```

3. Set up environment variables:
   Create a `.env.local` file with:

```env
NEXT_PUBLIC_SUPABASE_URL=https://dmwuiutpnxhmmbwmjzos.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRtd3VpdXRwbnhobW1id21qem9zIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQzMjkzOTUsImV4cCI6MjA3OTkwNTM5NX0.nbC77ZM-gSZCiGjTm9G6SvJBOkAnN0Mmw3s5Y2mX9bI
```

4. Run the development server:

```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🎯 Key Features Implementation

### Inline Editing

- Double-click any editable cell in the projects table to edit
- Press Enter to save, Escape to cancel
- Available for: Name, Status, Progress, Start Date, End Date, Budget
- Only accessible to Admin and Manager roles

### Bulk Update Tasks

- Select multiple tasks using checkboxes
- Choose bulk action (Change Status or Priority)
- Update all selected tasks at once
- Available only to Admin role

### Real-time Updates

- Automatic updates when tasks are added, modified, or deleted
- Uses Supabase Realtime subscriptions
- No page refresh needed

### Form Validation

- All forms use Yup schema validation
- Real-time error messages
- Accessible error announcements

### PWA Support

- Service Worker for offline caching
- Web App Manifest for installability
- Works offline after first visit

## 📱 Responsive Design

The application is fully responsive and optimized for:

- Mobile devices (320px+)
- Tablets (768px+)
- Desktop (1024px+)
- Large screens (1440px+)

## ♿ Accessibility

- WCAG 2.1 AA compliance
- Keyboard navigation support
- ARIA labels and roles
- Semantic HTML structure
- Screen reader friendly
- Focus indicators

## 📊 Performance

- Optimized bundle size
- Code splitting
- Image optimization
- Lazy loading
- Service Worker caching

## 🔐 Security

- JWT token authentication
- Role-based access control
- Protected API routes
- Input validation and sanitization

## 📝 License

This project is private and proprietary.

## 👨‍💻 Development

### Project Structure

```
├── app/                    # Next.js app directory
│   ├── (Auth)/            # Authentication pages
│   └── dashboard/         # Dashboard pages
├── Components/            # React components
│   ├── dashboard/         # Dashboard-specific components
│   └── ui/                # Reusable UI components
├── lib/                   # Utilities and configurations
│   ├── features/          # Redux slices
│   ├── supabase/          # Supabase hooks and functions
│   └── validations/       # Yup validation schemas
└── types/                 # TypeScript type definitions
```

## 🎨 Design Features

- Modern gradient backgrounds
- Smooth animations
- Dark theme optimized
- Glassmorphism effects
- Responsive grid layouts
- Interactive hover states

---

Built with ❤️ using Next.js and TypeScript
