# Website Blueprint: Dr. Kwan‑Lamar Blount‑Hill

## Overview
This document serves as a comprehensive guide to the structure, components, and content of Dr. Kwan‑Lamar Blount‑Hill's professional website. Use this blueprint for maintenance, updates, and future development.

## Site Structure
The website follows a clean, academic-focused design with the following key pages:

```
Root
├── Home (/)
├── About (/about)
├── CV (/cv)
├── Research & Projects (/research)
├── Publications (/publications)
├── Service (/service)
├── Teaching (/teaching) [Future Implementation]
├── Blog (/blog) [Future Implementation]
└── Contact (/contact)
```

## Global Components

### Navbar
- **Location**: Top of every page, sticky
- **Elements**:
  - Logo (GraduationCap icon)
  - Site title: "Dr. Kwan‑Lamar Blount‑Hill"
  - Navigation links to all main pages
  - Mobile-responsive hamburger menu
- **Styling**: White background with shadow, amber accent colors
- **Active Link Behavior**: Highlighted with amber color and underline
- **File**: `src/components/Navbar.tsx`
- **Implementation Notes**: Uses React Router's NavLink for active state management

### Footer
- **Location**: Bottom of every page
- **Elements**:
  - Contact information (Email: kbh@asu.edu)
  - Location information: "Brooklyn, NY"
  - Social media links:
    - LinkedIn: [Profile URL]
    - Twitter/X: [Profile URL]
    - Academia.edu: [Profile URL]
    - ResearchGate: [Profile URL]
  - Copyright information: "© [Current Year] Dr. Kwan‑Lamar Blount‑Hill. All rights reserved."
- **Styling**: Dark background with light text
- **File**: `src/components/Footer.tsx`
- **Implementation Notes**: Uses Lucide React icons for social media links

## Page Blueprints

### 1. Home Page
- **URL**: `/`
- **Purpose**: Create a strong first impression and provide an overview
- **Key Components**:
  - **Hero Section**:
    - Animated typing effect for name: "Dr. Kwan-Lamar Blount-Hill"
    - Professional photo (Photo-6.jpg)
    - Subtitle with staggered animation
    - Brief introduction with fade-in effect
  - **Professional Identities Section**:
    - Scholar: "Advancing criminological theory through innovative research and critical analysis"
    - Attorney: "Advocating for justice through legal expertise and policy reform"
    - Advocate: "Championing social and ecological justice for marginalized communities"
  - **Statistics Section** (with animation):
    - 8+ Years Experience
    - 33+ Publications
    - 4+ Universities
    - $1.2M+ Research Funding
  - **Featured Publications**:
    - Display of 2-3 recent publications with journal covers
    - Links to Publications page
  - **Call-to-Action Buttons**:
    - "View CV" → CV page
    - "Contact Me" → Contact page
    - "Explore Research" → Research page
- **File**: `src/pages/Home.tsx`
- **Animation Notes**: Uses React useEffect for typing animation, intersection observer for scroll-based animations

### 2. About Page
- **URL**: `/about`
- **Purpose**: Personal and professional background
- **Key Components**:
  - **Hero Section**:
    - Heading: "About Dr. Kwan‑Lamar Blount‑Hill"
    - Personal statement: "I am a Black, queer, Christian criminologist, attorney, and advocate dedicated to advancing justice through scholarship, teaching, and community engagement."
    - Professional photo
  - **Key Achievements Timeline**:
    - 2025: Ruth Shonle Cavan Young Scholar Award (American Society of Criminology)
    - 2020: Doctoral Achievement in Criminal Justice
  - **Personal Values Section**:
    - Faith & Justice: "My Christian faith calls me to work for justice and healing, seeing each person as made in the image of God with inherent dignity and worth."
    - Lived Experience: "As a Black, queer person, I bring personal understanding of marginalization to my work, grounding scholarship in authentic experience."
    - Liberation Through Learning: "I believe knowledge should serve freedom—both personal liberation and collective transformation of unjust systems."
  - **Professional Biography**:
    - Detailed academic and professional journey
    - Research philosophy and approach
  - **Download CV Button**
- **File**: `src/pages/About.tsx`
- **Implementation Notes**: Uses Lucide React icons for visual elements

### 3. CV Page
- **URL**: `/cv`
- **Purpose**: Detailed academic and professional history
- **Key Components**:
  - **Education Section**:
    - Ph.D. in Criminal Justice, Graduate Center/John Jay College, CUNY
    - J.D., University of Michigan Law School
    - B.A. in Political Science, Yale University
  - **Professional Experience**:
    - Current position: Assistant Professor, Arizona State University
    - Previous academic positions
    - Legal experience
    - Research positions
  - **Awards and Honors**:
    - Ruth Shonle Cavan Young Scholar Award
    - Other academic and professional recognitions
  - **Skills and Expertise**:
    - Research methodologies
    - Legal specializations
    - Teaching areas
  - **Downloadable PDF Version**
- **File**: `src/pages/CV.tsx`
- **Implementation Notes**: Structured with clear section headings and consistent formatting

### 4. Research & Projects Page
- **URL**: `/research`
- **Purpose**: Showcase research focus and ongoing projects
- **Key Components**:
  - **Research Areas**:
    - Social Identity and Justice
    - Environmental Criminology
    - Procedural Justice
    - Restorative Practices
    - Critical Race Theory in Criminal Justice
  - **Current Projects**:
    - Detailed descriptions of ongoing research
    - Collaborators and institutions
    - Funding sources
    - Expected outcomes
  - **Past Projects**:
    - Completed research initiatives
    - Key findings and publications
    - Impact and applications
  - **Research Methodology**:
    - Approaches and frameworks
    - Data collection methods
    - Analysis techniques
- **File**: `src/pages/Research.tsx`
- **Implementation Notes**: Uses cards or sections for each research area/project

### 5. Publications Page
- **URL**: `/publications`
- **Purpose**: List academic publications and scholarly work
- **Key Components**:
  - **Filtering System**:
    - Filter by type: All, Journal Articles, Books, Book Chapters, Conference Papers
    - Filter by year
    - Filter by topic/research area
  - **Featured Publications**:
    - "Social Identity Theory of Shared Narrative: Reimagining Community in Criminal Justice" (Criminal Justice and Behavior, 2024)
    - "Affective Architecture: How Criminal Justice Spaces Shape Emotional Experience" (Biological Conservation, 2023)
    - "Decolonizing Criminology: Toward Liberation and Healing" (University of California Press)
  - **Journal Articles Section**:
    - Complete list with:
      - Title
      - Authors
      - Journal name
      - Year, volume, issue, pages
      - Abstract
      - DOI link
      - PDF link when available
  - **Books and Book Chapters Section**:
    - Title
    - Authors/Editors
    - Publisher
    - Year
    - Abstract/Description
  - **Conference Papers and Presentations**
  - **Other Scholarly Works**
- **File**: `src/pages/Publications.tsx`
- **Implementation Notes**: Uses journal cover images for featured publications, includes filtering functionality

### 6. Service Page
- **URL**: `/service`
- **Purpose**: Highlight professional service and community involvement
- **Key Components**:
  - **Academic Service**:
    - Journal reviewer roles
    - Conference organization
    - Committee memberships
  - **Professional Memberships**:
    - American Society of Criminology
    - American Bar Association
    - Other relevant organizations
  - **Community Engagement**:
    - Volunteer work
    - Advocacy initiatives
    - Public speaking engagements
  - **Consulting Work**:
    - Policy consulting
    - Expert testimony
    - Program evaluation
- **File**: `src/pages/Service.tsx`
- **Implementation Notes**: Organized by service type with clear headings

### 7. Contact Page
- **URL**: `/contact`
- **Purpose**: Provide ways to get in touch
- **Key Components**:
  - **Contact Form**:
    - Name field
    - Email field
    - Subject dropdown
    - Message textarea
    - Submit button
    - Form validation
    - Success/error messages
  - **Direct Contact Information**:
    - Email address: kbh@asu.edu
    - Office location
    - Office hours
  - **Social Media Links**:
    - LinkedIn
    - Twitter/X
    - Academia.edu
    - ResearchGate
  - **Map or Location Information**
- **File**: `src/pages/Contact.tsx`
- **Implementation Notes**: Uses EmailJS for form submission functionality (src/utils/emailService.ts)

### 8. Future Pages (Planned)
- **Teaching Page** (`src/pages/Teaching.tsx`):
  - Courses taught
  - Teaching philosophy
  - Student resources
  - Testimonials
- **Blog Page** (`src/pages/Blog.tsx`):
  - Academic insights
  - Commentary on current events
  - Research updates
  - Personal reflections

## Technical Architecture

### Frontend Framework
- React 18.2.0 with TypeScript
- React Router 6.x for navigation
- Tailwind CSS 3.x for styling
- Vite as build tool and development server

### Key Files
- `src/App.tsx`: Main application component with routing
- `src/main.tsx`: Application entry point
- `src/index.css`: Global styles and Tailwind configuration
- `src/components/`: Reusable UI components
- `src/pages/`: Page components
- `src/utils/`: Utility functions
  - `emailService.ts`: Email functionality via EmailJS
  - `googleDocs.ts`: Google Docs integration
- `src/assets/`: Images and static assets
  - Professional photos
  - Publication covers
  - Other media

### Styling Guidelines
- **Color Palette**:
  - Primary: Amber (#b45309, #92400e)
  - Text: Stone (#1c1917, #78716c)
  - Background: Stone (#fafaf9)
  - Accents: White (#ffffff)
  - Gradients: from-stone-900 to-amber-900 (used in hero sections)
- **Typography**:
  - Headings: Sans-serif, bold, text-4xl to text-5xl
  - Subheadings: Sans-serif, semibold, text-2xl to text-3xl
  - Body: Sans-serif, regular, text-base to text-lg
  - Accents: text-amber-700 for emphasis
- **Components**:
  - Buttons: Rounded corners, amber background, hover effects
  - Cards: White background, subtle shadows, rounded corners
  - Sections: Consistent padding (py-12 to py-20)
  - Container: max-w-7xl mx-auto px-4 sm:px-6 lg:px-8
- **Responsive Design**:
  - Mobile-first approach
  - Breakpoints: sm (640px), md (768px), lg (1024px), xl (1280px)
  - Grid layouts: grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3
  - Flexible images: w-full h-auto

### Animation and Interaction
- Typing effect on homepage (useEffect)
- Scroll-triggered animations (IntersectionObserver)
- Counter animations for statistics
- Hover effects on interactive elements
- Smooth page transitions

## Content Management
- Content is primarily managed through code updates
- Email functionality via EmailJS (src/utils/emailService.ts)
- Google Docs integration for certain content sections (src/utils/googleDocs.ts)
- Publication data structured as JavaScript objects
- Image assets stored in src/assets directory

## Maintenance Guidelines
1. **Regular Updates**:
   - Keep publications list current with new articles and books
   - Update CV as new positions, awards, or qualifications are obtained
   - Refresh research projects with new developments and findings
   - Update statistics on homepage as numbers change

2. **Technical Maintenance**:
   - Keep dependencies updated via npm update
   - Test across browsers (Chrome, Firefox, Safari, Edge)
   - Test on multiple devices (desktop, tablet, mobile)
   - Optimize images for performance
   - Monitor and fix accessibility issues

3. **Content Refresh**:
   - Review and update content quarterly
   - Add new publications promptly
   - Update contact information as needed
   - Refresh professional photo annually or as needed
   - Update featured content on homepage seasonally

4. **Performance Optimization**:
   - Compress images appropriately
   - Implement lazy loading for images
   - Monitor page load times
   - Optimize JavaScript bundle size

## Development Workflow
1. **Local Development**:
   - Clone repository
   - Install dependencies with `npm install`
   - Make changes locally
   - Test using `npm run dev` (runs Vite development server)
   - Access at http://localhost:5173/

2. **Code Quality**:
   - Run linting with `npm run lint`
   - Follow TypeScript best practices
   - Maintain consistent code style
   - Document complex components

3. **Building for Production**:
   - Build for production with `npm run build`
   - Preview production build with `npm run preview`

4. **Deployment**:
   - Prepare for deployment with `npm run predeploy`
   - Deploy using `npm run deploy` (uses gh-pages)
   - Monitor deployment for any issues

## Future Enhancements
1. **Content Additions**:
   - Implement Teaching page
   - Develop Blog functionality
   - Add media gallery (videos, interviews)

2. **Technical Improvements**:
   - Implement dark mode toggle
   - Add search functionality across publications
   - Improve accessibility features
   - Implement analytics tracking

3. **User Experience**:
   - Add language translation options
   - Implement print-friendly views for CV and publications
   - Add citation export functionality for publications

---

This blueprint serves as a living document. Update it as the website evolves to maintain a consistent guide for future development and maintenance.