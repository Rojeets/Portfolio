import https from 'https'
import http from 'http'
import fs from 'fs'
import path from 'path'

const IMAGES_DIR = path.resolve('public/images')

const images = {
  'hero-bg.jpg': 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1920&q=80',
  'about-bg.jpg': 'https://images.unsplash.com/photo-1504639725590-34d0984388bd?w=1920&q=80',
  'blog-bg.jpg': 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=1920&q=80',
  'contact-bg.jpg': 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1920&q=80',
  'og-image.jpg': 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1200&q=80',
  'blog-rbac.jpg': 'https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=800&q=80',
  'blog-database.jpg': 'https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=800&q=80',
  'blog-multitenant.jpg': 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&q=80',
  'blog-api.jpg': 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&q=80',
  'blog-frontend.jpg': 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80',
  'blog-server-monitor.jpg': 'https://opengraph.githubassets.com/1/rojeets/servermonitortool',
  'blog-ai-referee.jpg': 'https://opengraph.githubassets.com/1/ultralytics/yolov5',
}

function download(url, dest) {
  return new Promise((resolve, reject) => {
    if (fs.existsSync(dest)) {
      console.log(`  ✓ ${path.basename(dest)} (cached)`)
      resolve()
      return
    }
    const mod = url.startsWith('https') ? https : http
    mod.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        download(res.headers.location, dest).then(resolve).catch(reject)
        return
      }
      if (res.statusCode !== 200) {
        console.error(`  ✗ ${path.basename(dest)} (HTTP ${res.statusCode})`)
        resolve()
        return
      }
      const file = fs.createWriteStream(dest)
      res.pipe(file)
      file.on('finish', () => {
        file.close()
        const stats = fs.statSync(dest)
        console.log(`  ✓ ${path.basename(dest)} (${(stats.size / 1024).toFixed(0)}KB)`)
        resolve()
      })
      file.on('error', reject)
    }).on('error', (err) => {
      console.error(`  ✗ ${path.basename(dest)} (${err.message})`)
      resolve()
    })
  })
}

async function main() {
  console.log('Downloading images...\n')
  const entries = Object.entries(images)
  for (const [name, url] of entries) {
    await download(url, path.join(IMAGES_DIR, name))
  }
  console.log('\nDone!')
}

main()
