const fs = require('fs')
const path = require('path')
const matter = require('gray-matter')
const remark = require("remark");
const html = require('remark-html')

// phones directory
const productDirectory = path.join(process.cwd(), '/products')

const getSortedProducts = () => {
  const fileNames = fs.readdirSync(productDirectory)
  const allProductsData = fileNames.map((fileName, index) => {
    const slug = fileName.replace(/\.md$/, '')
    const fullPath = path.join(productDirectory, fileName)
    const fileContent = fs.readFileSync(fullPath, 'utf8')
    const matterResult = matter(fileContent)
    return {
      slug,
      ...matterResult.data
    }
  })
  return allProductsData
    .sort((a, b) => {
      if (a.date < b.date)
        return 1
      else
        return -1
    })
}

const getProducts = () => {
  const fileNames = fs.readdirSync(productDirectory)
  return fileNames.map((fileName, index) => {
    const slug = fileName.replace(/\.md$/, '')
    const fullPath = path.join(productDirectory, fileName)
    const fileContent = fs.readFileSync(fullPath, 'utf8')
    const matterResult = matter(fileContent)
    return {
      ...matterResult.data
    }
  })
}

const getProductsSlug = () => {
  const fileNames = fs.readdirSync(productDirectory)
  return fileNames.map(fileName => {
    return {
      params: {
        slug: fileName.replace(/\.md$/, '')
      }
    }
  })
}

const getProductData = async (slug) => {
  const fullPath = path.join(productDirectory, `${slug}.md`)
  const fileContents = fs.readFileSync(fullPath, 'utf8')
  const matterResult = matter(fileContents)
  const processedContent = await remark()
    .use(html).process(matterResult.content)
  // const contentHtml = processedContent.toString()
  const contentHtml = processedContent.contents
  return {
    slug,
    contentHtml,
    ...matterResult.data
  }

}

module.exports = {getSortedProducts, getProductsSlug, getProductData, getProducts}

// getSortedProducts()
// console.log('=================')
// console.log(getProductsSlug())
// console.log('=================')
//
// getProductsData('pre-rendering')