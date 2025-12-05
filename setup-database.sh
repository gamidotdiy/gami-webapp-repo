#!/bin/bash

echo "🎮 Gami Protocol - Database & Email Setup"
echo "=========================================="
echo ""

# Check if .env.local exists
if [ ! -f .env.local ]; then
    echo "⚠️  .env.local not found. Creating from example..."
    cp .env.example .env.local
    echo "✅ Created .env.local file"
    echo ""
    echo "📝 Next steps:"
    echo "   1. Edit .env.local and add your credentials:"
    echo "      - DATABASE_URL (get from Neon, Supabase, etc.)"
    echo "      - RESEND_API_KEY (get from resend.com)"
    echo "      - ADMIN_EMAIL (your email for notifications)"
    echo ""
    echo "   2. Run this script again: ./setup-database.sh"
    exit 0
fi

echo "✅ Found .env.local"

# Check if Prisma is installed
if ! command -v npx &> /dev/null; then
    echo "❌ npm/npx not found. Please install Node.js first."
    exit 1
fi

# Check if dependencies are installed
if [ ! -d "node_modules/@prisma/client" ]; then
    echo "📦 Installing dependencies..."
    npm install
    echo "✅ Dependencies installed"
fi

# Generate Prisma client
echo ""
echo "🔧 Generating Prisma client..."
npx prisma generate

# Push schema to database
echo ""
echo "📊 Creating database tables..."
npx prisma db push

if [ $? -eq 0 ]; then
    echo ""
    echo "🎉 Setup complete!"
    echo ""
    echo "✨ Your database is ready. You'll now receive emails when:"
    echo "   • Someone joins the waitlist"
    echo "   • Someone tests the platform"
    echo ""
    echo "🔍 View your data anytime with:"
    echo "   npx prisma studio"
    echo ""
    echo "📖 For more info, read DATABASE_SETUP.md"
else
    echo ""
    echo "❌ Database setup failed."
    echo "   Check your DATABASE_URL in .env.local"
    echo "   Make sure your database is accessible"
fi
