#!/bin/bash

# Test script to simulate iOS Shortcut posting a note
# This does exactly what the iOS Shortcut does via GitHub API

echo "🧪 Testing Note Posting (simulating iOS Shortcut)"
echo "================================================"
echo ""

# Check if GitHub token is provided
if [ -z "$GITHUB_TOKEN" ]; then
    echo "❌ Error: GITHUB_TOKEN environment variable not set"
    echo ""
    echo "Usage:"
    echo "  export GITHUB_TOKEN='your_github_token_here'"
    echo "  ./test-note-post.sh"
    echo ""
    echo "Get your token at: https://github.com/settings/tokens"
    exit 1
fi

# Check if username is provided
if [ -z "$GITHUB_USERNAME" ]; then
    echo "❌ Error: GITHUB_USERNAME environment variable not set"
    echo ""
    echo "Usage:"
    echo "  export GITHUB_USERNAME='your_github_username'"
    echo "  export GITHUB_TOKEN='your_github_token_here'"
    echo "  ./test-note-post.sh"
    exit 1
fi

# Get note content
echo "💭 What's on your mind?"
read -p "> " NOTE_CONTENT

if [ -z "$NOTE_CONTENT" ]; then
    echo "❌ Note content cannot be empty"
    exit 1
fi

# Generate timestamp
TIMESTAMP=$(date -u +"%Y-%m-%dT%H:%M:%S")
FILENAME_TIMESTAMP=$(date -u +"%Y-%m-%d-%H%M%S")
FILENAME="note-${FILENAME_TIMESTAMP}.mdx"

# Create note content with frontmatter
NOTE_FILE_CONTENT="---
date: ${TIMESTAMP}
tags: ['note']
---

${NOTE_CONTENT}"

echo ""
echo "📝 Creating note:"
echo "   Filename: ${FILENAME}"
echo "   Date: ${TIMESTAMP}"
echo "   Content: ${NOTE_CONTENT}"
echo ""

# Base64 encode the content (this is what iOS Shortcut does)
ENCODED_CONTENT=$(echo "$NOTE_FILE_CONTENT" | base64)

# Create JSON payload
JSON_PAYLOAD=$(cat <<EOF
{
  "message": "Add note via test script",
  "content": "${ENCODED_CONTENT}",
  "branch": "main"
}
EOF
)

# Make API call to GitHub
echo "🚀 Posting to GitHub..."
RESPONSE=$(curl -s -w "\n%{http_code}" \
  -X PUT \
  -H "Authorization: token ${GITHUB_TOKEN}" \
  -H "Accept: application/vnd.github.v3+json" \
  -H "Content-Type: application/json" \
  -d "$JSON_PAYLOAD" \
  "https://api.github.com/repos/${GITHUB_USERNAME}/sithira.me/contents/posts/notes/${FILENAME}")

# Extract HTTP status code
HTTP_CODE=$(echo "$RESPONSE" | tail -n1)
RESPONSE_BODY=$(echo "$RESPONSE" | sed '$d')

echo ""
if [ "$HTTP_CODE" -eq 201 ]; then
    echo "✅ Success! Note posted to GitHub"
    echo ""
    echo "📍 File created at: posts/notes/${FILENAME}"
    echo "🔗 GitHub URL: https://github.com/${GITHUB_USERNAME}/sithira.me/blob/main/posts/notes/${FILENAME}"
    echo ""
    echo "⏳ Wait 1-2 minutes for your site to rebuild"
    echo "🌐 Then check: https://sithira.me/notes"
    echo ""
    echo "💻 Or run locally: npm run dev"
elif [ "$HTTP_CODE" -eq 422 ]; then
    echo "⚠️  File already exists (422)"
    echo "This is normal if you posted in the same second. Try again!"
else
    echo "❌ Failed with HTTP code: ${HTTP_CODE}"
    echo ""
    echo "Response:"
    echo "$RESPONSE_BODY" | jq '.' 2>/dev/null || echo "$RESPONSE_BODY"
    echo ""
    echo "Troubleshooting:"
    echo "  • 401: Check your GITHUB_TOKEN is correct and has 'repo' permission"
    echo "  • 404: Check your GITHUB_USERNAME is correct"
    echo "  • 422: File already exists (post again in a few seconds)"
fi
