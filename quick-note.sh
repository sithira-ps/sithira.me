#!/bin/bash

# Quick local note creator - no GitHub API needed!
# Perfect for testing the notes feature locally

echo "📝 Quick Note Creator"
echo "===================="
echo ""

# Get note content
echo "💭 What's on your mind?"
read -p "> " NOTE_CONTENT

if [ -z "$NOTE_CONTENT" ]; then
    echo "❌ Note content cannot be empty"
    exit 1
fi

# Generate timestamp
TIMESTAMP=$(date +"%Y-%m-%dT%H:%M:%S")
FILENAME_TIMESTAMP=$(date +"%Y-%m-%d-%H%M%S")
FILENAME="note-${FILENAME_TIMESTAMP}.mdx"
FILEPATH="posts/notes/${FILENAME}"

# Create note content with frontmatter
cat > "$FILEPATH" <<EOF
---
date: ${TIMESTAMP}
tags: ['note']
---

${NOTE_CONTENT}
EOF

echo ""
echo "✅ Note created locally!"
echo "   File: ${FILEPATH}"
echo "   Date: ${TIMESTAMP}"
echo ""
echo "🔄 Restart your dev server to see it:"
echo "   npm run dev"
echo ""
echo "🌐 Then visit: http://localhost:3000"
echo "   • Homepage - colorful cards"
echo "   • Sidebar - one-line preview"
echo "   • /notes - full list"
