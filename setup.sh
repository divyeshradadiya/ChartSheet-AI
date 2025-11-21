#!/bin/bash

echo "🚀 ChartSheet Setup Script"
echo "=========================="
echo ""

# Check if .env.local exists
if [ -f .env.local ]; then
    echo "✓ .env.local found"
else
    echo "⚠️  Creating .env.local from .env.example..."
    cp .env.example .env.local
    echo ""
    echo "📝 Please edit .env.local and add your OpenRouter API key:"
    echo "   Get your key from: https://openrouter.ai/keys"
    echo ""
    read -p "Press Enter to open .env.local in your editor..."
    ${EDITOR:-nano} .env.local
fi

echo ""
echo "📦 Installing dependencies..."
npm install

echo ""
echo "✅ Setup complete!"
echo ""
echo "🎯 Next steps:"
echo "   1. Make sure your OPENROUTER_API_KEY is set in .env.local"
echo "   2. Run: npm run dev"
echo "   3. Open: http://localhost:3000"
echo ""
