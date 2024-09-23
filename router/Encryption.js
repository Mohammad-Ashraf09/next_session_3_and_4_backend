const router = require('express').Router();
const forge = require('node-forge');

// Generate RSA key pair
const { publicKey, privateKey } = forge.pki.rsa.generateKeyPair(2048);

// Endpoint to fetch the public key
router.get('/public-key', (req, res) => {
    const publicKeyPem = forge.pki.publicKeyToPem(publicKey);
    res.json({ publicKey: publicKeyPem });
});

// Endpoint to encrypt data
router.post('/encrypt', (req, res) => {
    const { message, publicKey } = req.body;
    const publicKeyPem = forge.pki.publicKeyFromPem(publicKey);
    const encrypted = publicKeyPem.encrypt(message, 'RSA-OAEP');
    res.json({ encrypted: forge.util.encode64(encrypted) });
});

// Protected decryption endpoint, requires JWT
router.post('/decrypt', (req, res) => {
    const { encrypted } = req.body;
    const encryptedBytes = forge.util.decode64(encrypted);
    const decrypted = privateKey.decrypt(encryptedBytes, 'RSA-OAEP');
    res.json({ decrypted });
});

module.exports = router;
