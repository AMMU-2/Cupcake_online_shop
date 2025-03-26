const API_BASE_URL = 'http://localhost:5000/api/cart'; 
 
// Get Cart Items for a Specific User
export const getCartItems = async (userId) => {
    try {
        const response = await fetch(`${API_BASE_URL}/${userId}`);
        if (!response.ok) {
            throw new Error('Failed to fetch cart items');
        }
        const data = await response.json();
        return data.cartItems;
    } catch (error) {
        console.error('Error fetching cart items:', error);
        return [];
    }
};
 
// Add Item to Cart
export const addToCart = async (userId, cakeId, quantity) => {
    try {
        const response = await fetch(`${API_BASE_URL}/add`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ userId, cakeId, quantity })
        });
 
        if (!response.ok) {
            throw new Error('Failed to add item to cart');
        }
 
        return await response.json();
    } catch (error) {
        console.error('Error adding item to cart:', error);
        return null;
    }
};
 
// Update Item Quantity in Cart
export const updateCartQuantity = async (userId, cakeId, quantity) => {
    try {
        const response = await fetch(`${API_BASE_URL}/update`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ userId, cakeId, quantity })
        });
 
        if (!response.ok) {
            throw new Error('Failed to update cart quantity');
        }
 
        return await response.json();
    } catch (error) {
        console.error('Error updating cart quantity:', error);
        return null;
    }
};
 
// Remove Item from Cart
export const removeFromCart = async (userId, cakeId) => {
    try {
        const response = await fetch(`${API_BASE_URL}/remove`, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ userId, cakeId })
        });
 
        if (!response.ok) {
            throw new Error('Failed to remove item from cart');
        }
 
        return await response.json();
    } catch (error) {
        console.error('Error removing item from cart:', error);
        return null;
    }
};
 
// Clear Entire Cart
export const clearCart = async (userId) => {
    try {
        const response = await fetch(`${API_BASE_URL}/clear/${userId}`, {
            method: 'DELETE'
        });
 
        if (!response.ok) {
            throw new Error('Failed to clear cart');
        }
 
        return await response.json();
    } catch (error) {
        console.error('Error clearing cart:', error);
        return null;
    }
};
 