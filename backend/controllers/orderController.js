
// Checkout
export const checkout = async (req, res) => {
  const { shippingAddress, billingAddress, paymentMethod } = req.body;
  
  try {
    // Get cart items
    const [cartItems] = await req.db.promise().query(`
      SELECT ci.id, ci.product_id, ci.quantity, p.price, p.stock
      FROM cart_items ci
      JOIN products p ON ci.product_id = p.id
      WHERE ci.user_id = ?
    `, [req.user.id]);
    
    if (cartItems.length === 0) {
      return res.status(400).json({ error: 'Cart is empty' });
    }
    
    // Check stock availability
    for (const item of cartItems) {
      if (item.quantity > item.stock) {
        return res.status(400).json({ 
          error: 'Not enough stock available for some items',
          itemId: item.product_id
        });
      }
    }
    
    // Calculate totals
    let subtotal = 0;
    for (const item of cartItems) {
      subtotal += parseFloat(item.price) * item.quantity;
    }
    
    const shipping = subtotal > 50 ? 0 : 5.99;
    const tax = subtotal * 0.07; // 7% tax
    const total = subtotal + tax + shipping;
    
    // Create order
    const connection = await req.db.promise().getConnection();
    await connection.beginTransaction();
    
    try {
      // Insert order
      const [orderResult] = await connection.query(`
        INSERT INTO orders (
          user_id, subtotal, tax, shipping, total,
          shipping_address, billing_address, payment_method
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)
      `, [
        req.user.id, subtotal, tax, shipping, total,
        shippingAddress || '', billingAddress || '', paymentMethod || 'credit_card'
      ]);
      
      const orderId = orderResult.insertId;
      
      // Insert order items and update product stock
      for (const item of cartItems) {
        // Add to order items
        await connection.query(`
          INSERT INTO order_items (order_id, product_id, quantity, price)
          VALUES (?, ?, ?, ?)
        `, [orderId, item.product_id, item.quantity, item.price]);
        
        // Update product stock
        await connection.query(`
          UPDATE products SET stock = stock - ? WHERE id = ?
        `, [item.quantity, item.product_id]);
      }
      
      // Clear cart
      await connection.query('DELETE FROM cart_items WHERE user_id = ?', [req.user.id]);
      
      await connection.commit();
      
      res.status(201).json({
        orderId,
        message: 'Order placed successfully',
        total
      });
    } catch (error) {
      await connection.rollback();
      throw error;
    } finally {
      connection.release();
    }
  } catch (error) {
    console.error('Error processing checkout:', error);
    res.status(500).json({ error: 'Failed to process checkout' });
  }
};

// Get user's orders
export const getUserOrders = async (req, res) => {
  try {
    const [rows] = await req.db.promise().query(`
      SELECT o.*, COUNT(oi.id) as item_count
      FROM orders o
      JOIN order_items oi ON o.id = oi.order_id
      WHERE o.user_id = ?
      GROUP BY o.id
      ORDER BY o.created_at DESC
    `, [req.user.id]);
    
    res.json(rows);
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).json({ error: 'Failed to fetch orders' });
  }
};

// Get order details
export const getOrderDetails = async (req, res) => {
  try {
    const [orderRows] = await req.db.promise().query(`
      SELECT * FROM orders 
      WHERE id = ? AND user_id = ?
    `, [req.params.id, req.user.id]);
    
    if (orderRows.length === 0) {
      return res.status(404).json({ error: 'Order not found' });
    }
    
    const order = orderRows[0];
    
    const [itemRows] = await req.db.promise().query(`
      SELECT oi.*, p.name, p.image
      FROM order_items oi
      JOIN products p ON oi.product_id = p.id
      WHERE oi.order_id = ?
    `, [req.params.id]);
    
    const items = itemRows.map(item => ({
      id: item.id,
      productId: item.product_id,
      name: item.name,
      image: item.image || `https://placehold.co/300x300?text=${encodeURIComponent(item.name)}`,
      quantity: item.quantity,
      price: parseFloat(item.price),
      total: parseFloat(item.price) * item.quantity
    }));
    
    res.json({
      ...order,
      items
    });
  } catch (error) {
    console.error('Error fetching order details:', error);
    res.status(500).json({ error: 'Failed to fetch order details' });
  }
};
