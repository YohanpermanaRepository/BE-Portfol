#!/bin/bash
# Prisma Setup Script for Portfolio Backend

echo "🚀 Starting Prisma Setup..."
echo ""

# Step 1: Install dependencies
echo "📦 Installing dependencies..."
npm install

echo ""
echo "✅ Dependencies installed!"
echo ""

# Step 2: Generate Prisma Client
echo "🔧 Generating Prisma Client..."
npx prisma generate

echo ""
echo "✅ Prisma Client generated!"
echo ""

# Step 3: Push schema to database
echo "📊 Pushing schema to database..."
echo "   This will create all the tables in your PostgreSQL database"
npx prisma db push

echo ""
echo "✅ Database schema pushed!"
echo ""

# Step 4: Verify connection
echo "🔍 Verifying database connection..."
npx prisma db execute --stdin < nul

echo ""
echo "✅ Setup complete!"
echo ""
echo "Next steps:"
echo "1. Update your controllers to use Prisma (see PRISMA_MIGRATION_GUIDE.md)"
echo "2. Test your API endpoints"
echo ""
echo "Optional:"
echo "   - View and manage data: npx prisma studio"
echo "   - Seed database: npx prisma db seed (if you have seed files)"
echo ""
