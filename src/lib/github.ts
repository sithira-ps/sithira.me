const REPO_OWNER = 'sithira-ps'
const REPO_NAME = 'sithira.me'
const BRANCH = 'main'

interface CommitFileOptions {
  path: string
  content: string
  message: string
}

export async function commitFile({ path, content, message }: CommitFileOptions) {
  const token = process.env.GITHUB_PAT

  const base = `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/contents/${path}`

  let sha: string | undefined
  const existing = await fetch(`${base}?ref=${BRANCH}`, {
    headers: { Authorization: `Bearer ${token}` },
  })
  if (existing.ok) {
    const data = await existing.json()
    sha = data.sha
  }

  const response = await fetch(base, {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      message,
      content: Buffer.from(content).toString('base64'),
      branch: BRANCH,
      ...(sha ? { sha } : {}),
    }),
  })

  if (!response.ok) {
    const error = await response.json()
    throw new Error(`GitHub API error: ${error.message}`)
  }

  return response.json()
}
