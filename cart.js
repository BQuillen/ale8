'use strict';
(function () {
    const KEY = 'ale8Cart';

    function getCart() {
        try { return JSON.parse(localStorage.getItem(KEY) || '[]'); }
        catch (_) { return []; }
    }

    function _save(cart) { localStorage.setItem(KEY, JSON.stringify(cart)); }

    function addItem(product) {
        const cart = getCart();
        const idx = cart.findIndex(i => i.id === product.id);
        if (idx >= 0) {
            cart[idx].qty += (product.qty || 1);
        } else {
            cart.push({
                id:    product.id,
                name:  product.name,
                label: product.label || '',
                price: Number(product.price),
                image: product.image || 'images/ale8logo.png',
                qty:   product.qty || 1,
                note:  product.note || ''
            });
        }
        _save(cart);
    }

    function removeItem(id) {
        _save(getCart().filter(i => i.id !== id));
    }

    function updateQty(id, qty) {
        if (qty < 1) { removeItem(id); return; }
        const cart = getCart();
        const item = cart.find(i => i.id === id);
        if (item) { item.qty = qty; _save(cart); }
    }

    function getCount() {
        return getCart().reduce((s, i) => s + i.qty, 0);
    }

    function getTotal() {
        return getCart().reduce((s, i) => s + i.price * i.qty, 0);
    }

    function clearCart() { localStorage.removeItem(KEY); }

    window.Cart = { getCart, addItem, removeItem, updateQty, getCount, getTotal, clearCart };
})();
