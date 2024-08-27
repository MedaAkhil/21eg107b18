var express = require('express');
var router = express.Router();
const axios = require('axios');




//api route for filtering the data based on the company name and product category given by the user and top n products and the minprice of the product and the maxprice
router.get('/filter', async (req, res, next) => {
  try {
    const { companyName, category, top, minPrice, maxPrice } = req.query;
    const authToken = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiZXhwIjoxNzI0NzQ1NDc1LCJpYXQiOjE3MjQ3NDUxNzUsImlzcyI6IkFmZm9yZG1lZCIsImp0aSI6IjQ1ZGY3MDg4LWRjMmUtNDI2Ny1hYzRiLWZlZWZjZjU1ZjYyNiIsInN1YiI6Im1lZGFha2hpbGFlc2hjaG93ZGFyeUBnbWFpbC5jb20ifSwiY29tcGFueU5hbWUiOiJlQ29tbSIsImNsaWVudElEIjoiNDVkZjcwODgtZGMyZS00MjY3LWFjNGItZmVlZmNmNTVmNjI2IiwiY2xpZW50U2VjcmV0IjoiS0VBU1RGRWJjQmx2VklKeSIsIm93bmVyTmFtZSI6IkFraGlsIiwib3duZXJFbWFpbCI6Im1lZGFha2hpbGFlc2hjaG93ZGFyeUBnbWFpbC5jb20iLCJyb2xsTm8iOiIyMWVnMTA3YjE4In0.VdJUjsoG_uebcloTto1_lrh1olpAanofM9qeOEFYUFE';

    const url = `http://20.244.56.144/test/companies/${companyName}/categories/${category}/products?top=${top}&minPrice=${minPrice}&maxPrice=${maxPrice}`;

    const response = await axios.get(url, {
      headers: {
        'Authorization': authToken,
      }
    });

    res.json(response.data);
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).send('Error fetching data');
  }
});

// API route to sort the product results based on the user's request
router.get('/sort', async (req, res, next) => {
  try {
    const { companyName, category, sortBy, sortOrder = 'asc', top, minPrice, maxPrice } = req.query;
    const authToken = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiZXhwIjoxNzI0NzQ1NDc1LCJpYXQiOjE3MjQ3NDUxNzUsImlzcyI6IkFmZm9yZG1lZCIsImp0aSI6IjQ1ZGY3MDg4LWRjMmUtNDI2Ny1hYzRiLWZlZWZjZjU1ZjYyNiIsInN1YiI6Im1lZGFha2hpbGFlc2hjaG93ZGFyeUBnbWFpbC5jb20ifSwiY29tcGFueU5hbWUiOiJlQ29tbSIsImNsaWVudElEIjoiNDVkZjcwODgtZGMyZS00MjY3LWFjNGItZmVlZmNmNTVmNjI2IiwiY2xpZW50U2VjcmV0IjoiS0VBU1RGRWJjQmx2VklKeSIsIm93bmVyTmFtZSI6IkFraGlsIiwib3duZXJFbWFpbCI6Im1lZGFha2hpbGFlc2hjaG93ZGFyeUBnbWFpbC5jb20iLCJyb2xsTm8iOiIyMWVnMTA3YjE4In0.VdJUjsoG_uebcloTto1_lrh1olpAanofM9qeOEFYUFE';

    const url = `http://20.244.56.144/test/companies/${companyName}/categories/${category}/products?top=${top}&minPrice=${minPrice}&maxPrice=${maxPrice}`;

    const response = await axios.get(url, {
      headers: {
        'Authorization': authToken,
      }
    });

    let products = response.data;

    // Perform sorting based on the `sortBy` field
    if (sortBy) {
      products.sort((a, b) => {
        if (['rating', 'price', 'discount'].includes(sortBy)) {
          return sortOrder === 'asc' ? a[sortBy] - b[sortBy] : b[sortBy] - a[sortBy];
        } else if (sortBy === 'company') {
          return sortOrder === 'asc' ? a.company.localeCompare(b.company) : b.company.localeCompare(a.company);
        } else {
          return 0;
        }
      });
    }

    res.json(products);
  } catch (error) {
    console.error('Error fetching or sorting data:', error);
    res.status(500).send('Error fetching or sorting data');
  }
});





/* GET home page. */


router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
