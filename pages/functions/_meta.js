import { createCatchAllMeta } from 'nextra/catch-all'

const getBaseUrl = () => {
  return process.env.NODE_ENV === 'development'
    ? 'https://localhost:4000'
    : 'https://addins.boardflare.com/functions/prod'
}

async function getFilePaths() {
  const baseUrl = getBaseUrl()
  try {
    const response = await fetch(`${baseUrl}/website/filepaths.json`)
    return await response.json()
  } catch (error) {
    console.error('Error fetching file paths:', error)
    return []
  }
}

// Return an async function that fetches and creates meta data
export default async () => {
  const filePaths = await getFilePaths()
  return createCatchAllMeta(filePaths)
}