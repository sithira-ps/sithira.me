# iOS Shortcut Setup for Quick Notes

This guide will help you set up an iOS Shortcut to post notes to your blog directly from your iPhone.

## Prerequisites

1. iPhone with iOS 13 or later
2. GitHub Personal Access Token with `repo` permissions

## Step 1: Create a GitHub Personal Access Token

1. Go to https://github.com/settings/tokens
2. Click "Generate new token" → "Generate new token (classic)"
3. Name it: `Blog Notes Shortcut`
4. Select scopes: **repo** (check the entire repo section)
5. Click "Generate token"
6. **IMPORTANT:** Copy the token immediately (you won't see it again)

## Step 2: Create the iOS Shortcut

### Method A: Using this link (easiest)
1. Open this link on your iPhone: [Download Shortcut](#) *(Link will be created below)*

### Method B: Manual creation
1. Open the **Shortcuts** app on your iPhone
2. Tap the **+** button to create a new shortcut
3. Add the following actions in order:

#### Action 1: Ask for Input
- Tap "Add Action" → Search "Ask for Input"
- Text: "What's on your mind?"
- Input Type: Text
- Allow Multiple Lines: **ON**

#### Action 2: Get Current Date
- Search "Get Current Date" → Add it

#### Action 3: Format Date
- Search "Format Date" → Add it
- Format: **Custom**
- Custom Format: `yyyy-MM-dd'T'HH:mm:ss`

#### Action 4: Format Date (Second one for filename)
- Add another "Format Date"
- Format: **Custom**
- Custom Format: `yyyy-MM-dd-HHmmss`

#### Action 5: Text (Create Frontmatter)
- Search "Text" → Add it
- Content:
```
---
date: [Formatted Date from Action 3]
tags: ['note']
---

[Provided Input from Action 1]
```

#### Action 6: Set Variable
- Search "Set Variable" → Add it
- Variable Name: `fileContent`
- Set to: The text from Action 5

#### Action 7: Text (Create Filename)
- Add another "Text" action
- Content: `note-[Formatted Date from Action 4].mdx`

#### Action 8: Set Variable
- Variable Name: `fileName`
- Set to: The text from Action 7

#### Action 9: URL
- Search "URL" → Add it
- URL: `https://api.github.com/repos/YOUR_GITHUB_USERNAME/sithira.me/contents/posts/notes/[fileName]`
- Replace `YOUR_GITHUB_USERNAME` with your actual GitHub username

#### Action 10: Base64 Encode
- Search "Base64 Encode" → Add it
- Encode: `fileContent` variable
- Mode: Encode

#### Action 11: Text (Create JSON Body)
- Content:
```json
{
  "message": "Add note via iOS Shortcut",
  "content": "[Base64 Encoded]",
  "branch": "main"
}
```

#### Action 12: Get Contents of URL
- Search "Get Contents of URL" → Add it
- URL: The URL from Action 9
- Method: **PUT**
- Headers:
  - `Authorization`: `token YOUR_GITHUB_TOKEN` (replace with your token from Step 1)
  - `Accept`: `application/vnd.github.v3+json`
  - `Content-Type`: `application/json`
- Request Body: **JSON** → Select the text from Action 11

#### Action 13: Show Notification (Success)
- Search "Show Notification" → Add it
- Content: "Note posted successfully! 🎉"

3. Name your shortcut: "Quick Note"
4. Done!

## Step 3: Create a Home Screen Widget (Optional but Recommended)

1. Long press on your iPhone home screen
2. Tap the **+** button in the top-left corner
3. Search for "Shortcuts"
4. Select the Shortcuts widget size you prefer
5. Add it to your home screen
6. Tap on the widget → Select "Quick Note"

Now you have a one-tap button to post notes!

## Step 4: Test It

1. Tap the shortcut
2. Type a quick message: "Testing my new notes feature!"
3. Submit
4. Wait a few seconds for GitHub to process
5. Your site will auto-deploy (if you have auto-deploy set up with Vercel/Netlify)
6. Visit `https://sithira.me/notes` to see your note!

## Troubleshooting

### "Invalid Request" Error
- Check that your GitHub token has `repo` permissions
- Make sure the token is in the format: `token ghp_xxxxx...`

### "File already exists" Error
- The shortcut creates unique filenames using timestamps, but if you post multiple notes in the same second, this can happen
- Just wait a second and try again

### Note not appearing
- Check if your site has auto-deploy enabled
- GitHub Pages/Vercel/Netlify should automatically rebuild when you push to main
- May take 1-2 minutes to appear

## Tips

- Use Siri: "Hey Siri, Quick Note" to activate the shortcut hands-free
- Add tags by modifying the frontmatter in Action 5
- Customize the notification message in Action 13

## Security Note

⚠️ Your GitHub token gives access to your repositories. Keep it secure:
- Don't share your shortcut with the token included
- If compromised, revoke the token immediately at https://github.com/settings/tokens
- Consider creating a separate GitHub account just for this if you're concerned
