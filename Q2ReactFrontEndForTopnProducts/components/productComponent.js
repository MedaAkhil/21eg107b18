import React, { useState } from 'react';
import axios from 'axios';
import { Container, TextField, Button, Grid, Card, CardContent, Typography } from '@mui/material';

function ProductComponent() {
  const [companyName, setCompanyName] = useState('');
  const [category, setCategory] = useState('');
  const [sortBy, setSortBy] = useState('');
  const [products, setProducts] = useState([]);

  const handleFilter = async () => {
    try {
      const response = await axios.get('/filter', {
        headers: {
          'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiZXhwIjoxNzI0NzQ1NDc1LCJpYXQiOjE3MjQ3NDUxNzUsImlzcyI6IkFmZm9yZG1lZCIsImp0aSI6IjQ1ZGY3MDg4LWRjMmUtNDI2Ny1hYzRiLWZlZWZjZjU1ZjYyNiIsInN1YiI6Im1lZGFha2hpbGFlc2hjaG93ZGFyeUBnbWFpbC5jb20ifSwiY29tcGFueU5hbWUiOiJlQ29tbSIsImNsaWVudElEIjoiNDVkZjcwODgtZGMyZS00MjY3LWFjNGItZmVlZmNmNTVmNjI2IiwiY2xpZW50U2VjcmV0IjoiS0VBU1RGRWJjQmx2VklKeSIsIm93bmVyTmFtZSI6IkFraGlsIiwib3duZXJFbWFpbCI6Im1lZGFha2hpbGFlc2hjaG93ZGFyeUBnbWFpbC5jb20iLCJyb2xsTm8iOiIyMWVnMTA3YjE4In0.VdJUjsoG_uebcloTto1_lrh1olpAanofM9qeOEFYUFE', // Replace with actual token
        },
        params: {
          companyName,
          category,
          sortBy,
        },
      });
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  return (
    <Container maxWidth="md" style={{ marginTop: '2rem' }}>
      <Typography variant="h4" align="center" gutterBottom>
        Product Filter
      </Typography>

      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Company Name"
            variant="outlined"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Category"
            variant="outlined"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Sort By"
            variant="outlined"
            placeholder="rating, price, discount, company"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <Button variant="contained" color="primary" fullWidth onClick={handleFilter}>
            Filter Products
          </Button>
        </Grid>
      </Grid>

      <Grid container spacing={3} style={{ marginTop: '2rem' }}>
        {products.map((product) => (
          <Grid item xs={12} sm={6} md={4} key={product.id}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  {product.name}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Company: {product.company}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Rating: {product.rating}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Price: ${product.price}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Discount: {product.discount}%
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export default ProductComponent;
