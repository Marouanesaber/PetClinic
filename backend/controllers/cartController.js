
// Get user's cart
export const getUserCart = async (req, res) => {
  try {
    const [rows] = await req.db.promise().query(`
      SELECT ci.id, ci.quantity, p.id as product_id, p.name, p.description, p.price, p.image, p.stock
      FROM cart_items ci
      JOIN products p ON ci.product_id = p.id
      WHERE ci.user_id = ?
    `, [req.user.id]);
    
    const cartItems = rows.map(item => ({
      id: item.id,
      quantity: item.quantity,
      product: {
        id: item.product_id,
        name: item.name,
        description: item.description,
        price: parseFloat(item.price),
        image: item.image || `https://placehold.co/300x300?text=${encodeURIComponent(item.name)}`,
        stock: item.stock
      }
    }));
    
    res.json(cartItems);
  } catch (error) {
    console.error('Error fetching cart:', error);
    res.status(500).json({ error: 'Failed to fetch cart' });
  }
};

// Add item to cart
export const addToCart = async (req, res) => {
  const { productId, quantity = 1 } = req.body;
  
  if (!productId) {
    return res.status(400).json({ error: 'Product ID is required' });
  }
  
  try {
    // Check if product exists and has stock
    const [productRows] = await req.db.promise().query(
      'SELECT id, stock FROM products WHERE id = ? AND is_active = TRUE',
      [productId]
    );
    
    if (productRows.length === 0) {
      return res.status(404).json({ error: 'Product not found' });
    }
    
    if (productRows[0].stock < quantity) {
      return res.status(400).json({ error: 'Not enough stock available' });
    }
    
    // Check if item is already in cart
    const [cartRows] = await req.db.promise().query(
      'SELECT id, quantity FROM cart_items WHERE user_id = ? AND product_id = ?',
      [req.user.id, productId]
    );
    
    if (cartRows.length > 0) {
      // Update quantity if item already in cart
      const newQuantity = cartRows[0].quantity + quantity;
      
      if (newQuantity > productRows[0].stock) {
        return res.status(400).json({ error: 'Not enough stock available' });
      }
      
      await req.db.promise().query(
        'UPDATE cart_items SET quantity = ?, updated_at = NOW() WHERE id = ?',
        [newQuantity, cartRows[0].id]
      );
    } else {
      // Add new item to cart
      await req.db.promise().query(
        'INSERT INTO cart_items (user_id, product_id, quantity) VALUES (?, ?, ?)',
        [req.user.id, productId, quantity]
      );
    }
    
    res.status(201).json({ message: 'Item added to cart' });
  } catch (error) {
    console.error('Error adding to cart:', error);
    res.status(500).json({ error: 'Failed to add item to cart' });
  }
};

// Update cart item quantity
export const updateCartItem = async (req, res) => {
  const { itemId, quantity } = req.body;
  
  if (!itemId || !quantity) {
    return res.status(400).json({ error: 'Item ID and quantity are required' });
  }
  
  if (quantity < 1) {
    return res.status(400).json({ error: 'Quantity must be at least 1' });
  }
  
  try {
    // Check if cart item exists and belongs to user
    const [cartRows] = await req.db.promise().query(
      'SELECT ci.id, ci.product_id, p.stock FROM cart_items ci JOIN products p ON ci.product_id = p.id WHERE ci.id = ? AND ci.user_id = ?',
      [itemId, req.user.id]
    );
    
    if (cartRows.length === 0) {
      return res.status(404).json({ error: 'Cart item not found' });
    }
    
    if (quantity > cartRows[0].stock) {
      return res.status(400).json({ error: 'Not enough stock available' });
    }
    
    // Update quantity
    await req.db.promise().query(
      'UPDATE cart_items SET quantity = ?, updated_at = NOW() WHERE id = ?',
      [quantity, itemId]
    );
    
    res.json({ message: 'Cart updated' });
  } catch (error) {
    console.error('Error updating cart:', error);
    res.status(500).json({ error: 'Failed to update cart' });
  }
};

// Remove item from cart
export const removeFromCart = async (req, res) => {
  const { itemId } = req.body;
  
  if (!itemId) {
    return res.status(400).json({ error: 'Item ID is required' });
  }
  
  try {
    // Check if cart item exists and belongs to user
    const [cartRows] = await req.db.promise().query(
      'SELECT id FROM cart_items WHERE id = ? AND user_id = ?',
      [itemId, req.user.id]
    );
    
    if (cartRows.length === 0) {
      return res.status(404).json({ error: 'Cart item not found' });
    }
    
    // Remove item
    await req.db.promise().query(
      'DELETE FROM cart_items WHERE id = ?',
      [itemId]
    );
    
    res.json({ message: 'Item removed from cart' });
  } catch (error) {
    console.error('Error removing from cart:', error);
    res.status(500).json({ error: 'Failed to remove item from cart' });
  }
};
