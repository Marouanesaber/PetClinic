
// Get all products
export const getAllProducts = async (req, res) => {
  try {
    const [rows] = await req.db.promise().query(`
      SELECT p.*, pc.name as category
      FROM products p
      JOIN product_categories pc ON p.category_id = pc.id
      WHERE p.is_active = TRUE
      ORDER BY p.created_at DESC
    `);
    
    // Format data for frontend
    const products = rows.map(product => ({
      id: product.id,
      name: product.name,
      description: product.description,
      price: parseFloat(product.price),
      image: product.image || `https://placehold.co/300x300?text=${encodeURIComponent(product.name)}`,
      category: product.category,
      stock: product.stock
    }));
    
    res.json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ error: 'Failed to fetch products' });
  }
};

// Get product by ID
export const getProductById = async (req, res) => {
  try {
    const [rows] = await req.db.promise().query(`
      SELECT p.*, pc.name as category 
      FROM products p
      JOIN product_categories pc ON p.category_id = pc.id
      WHERE p.id = ? AND p.is_active = TRUE
    `, [req.params.id]);
    
    if (rows.length === 0) {
      return res.status(404).json({ error: 'Product not found' });
    }
    
    const product = rows[0];
    
    res.json({
      id: product.id,
      name: product.name,
      description: product.description,
      price: parseFloat(product.price),
      image: product.image || `https://placehold.co/300x300?text=${encodeURIComponent(product.name)}`,
      category: product.category,
      stock: product.stock,
      sku: product.sku,
      weight: product.weight,
      dimensions: product.dimensions
    });
  } catch (error) {
    console.error('Error fetching product:', error);
    res.status(500).json({ error: 'Failed to fetch product' });
  }
};
