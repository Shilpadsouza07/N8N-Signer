import express from 'express';
import crypto from 'crypto';

const app = express();
// JSON body parser
app.use(express.json());

 
app.post('/sign', async (req, res) =>{
  console.log('Received:', req.body);

  const { baseString, signingKey } = req.body;

  if (!baseString || !signingKey) {
    return res.status(400).json({ error: 'Missing baseString or signingKey' });
  }

  const signature = crypto
    .createHmac('sha256', signingKey)
    .update(baseString)
    .digest('base64');

  res.json({ signature });

});



app.get('/debug', (req, res) => {
  res.json({
    routes: [
      '/',
      '/query',
      '/signer',
      '/ingest',
      '/sign' // Add this only if it's defined
    ]
  });
});


// Start server
app.listen(3000, () => console.log('✅ Oauth 1 signer js running 3000'));
