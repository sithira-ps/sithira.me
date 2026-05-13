const REPO_OWNER = 'sithira-ps'
const REPO_NAME = 'sithira.me'
const BRANCH = 'main'

interface CommitFileOptions {
  path: string
  content: string
  message: string
  sha?: string
}

export async function getFileContent(path: string): Promise<{ sha: string; content: string } | null> {
  const token = process.env.GITHUB_PAT
  if (!token) throw new Error('GITHUB_PAT not configured')

  const url = `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/contents/${path}?ref=${BRANCH}`
  const resp = await fetch(url, { headers: { Authorization: `Bearer ${token}` }, cache: 'no-store' })
  if (!resp.ok) return null

  const data = await resp.json()
  return { sha: data.sha, content: Buffer.from(data.content, 'base64').toString() }
}

export async function commitFile({ path, content, message, sha: existingSha }: CommitFileOptions) {
  const token = process.env.GITHUB_PAT
  if (!token) throw new Error('GITHUB_PAT not configured')

  const base = `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/contents/${path}`

  let sha = existingSha
  if (!sha) {
    const existing = await getFileContent(path)
    if (existing) sha = existing.sha
  }

  const response = await fetch(base, {
    method: 'PUT',
    cache: 'no-store',
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
    let errorMessage: string
    try {
      const error = await response.json()
      errorMessage = error.message
    } catch {
      errorMessage = await response.text()
    }
    throw new Error(`GitHub API error (${response.status}): ${errorMessage}`)
  }

  return response.json()
}
