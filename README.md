# Visual Product Matcher

An AI-powered visual product matching application that helps users find similar products by uploading images. Built with React, TypeScript, and Supabase.

## Features

- 🖼️ Image upload and processing
- 🔍 Visual similarity search
- 🎯 AI-powered product matching
- 📱 Responsive design
- ⚡ Real-time search results

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Supabase account

### Installation

```sh
# Clone the repository
git clone https://github.com/settipallitharun/Visual-Product-Matcher.git

# Navigate to the project directory
cd Visual-Product-Matcher

# Install dependencies
npm install

# Copy environment variables
cp .env.example .env

# Start the development server
npm run dev
```

### Environment Setup

Create a `.env` file with your Supabase credentials:

```env
VITE_SUPABASE_PROJECT_ID=your_project_id
VITE_SUPABASE_PUBLISHABLE_KEY=your_publishable_key
VITE_SUPABASE_URL=your_supabase_url
```

## Tech Stack

- **Frontend**: React 18, TypeScript, Vite
- **UI Components**: shadcn/ui, Tailwind CSS
- **Backend**: Supabase (Database, Authentication, Edge Functions)
- **AI/ML**: Google Gemini 2.5 Flash for visual analysis
- **Deployment**: Vercel/Netlify compatible

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── ui/             # shadcn/ui components
│   ├── ImageUploader.tsx
│   ├── ProductGrid.tsx
│   └── SimilaritySlider.tsx
├── integrations/       # External service integrations
│   └── supabase/      # Supabase client and types
├── pages/             # Application pages
├── hooks/             # Custom React hooks
└── lib/               # Utility functions
```

## Usage

1. Upload an image of a product
2. Adjust similarity threshold using the slider
3. View matching products in the grid
4. Click on products for more details

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request
