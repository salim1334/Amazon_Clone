const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const stripe = require('stripe')(process.env.STRIPE_KEY);

const app = express();
app.use(cors({ origin: true }));
app.use(express.json());

app.get('/', (req, res) => {
  res.status(200).json({
    message: 'Success',
  });
});

app.post('/payment/create', async (req, res) => {
  const total = parseInt(req.query.total); // convert to number

  if (total > 0) {
    try {
      const paymentIntent = await stripe.paymentIntents.create({
        amount: total,
        currency: 'usd',
      });

      res.status(201).json({
        clientSecret: paymentIntent.client_secret,
      });
    } catch (error) {
      logger.error('Stripe Error:', error);
      res.status(500).json({ message: 'Payment creation failed' });
    }
  } else {
    res.status(403).json({
      message: 'Total must be greater than 0',
    });
  }
});

app.listen(8000, (err) => {
  if (err) console.error(`❌ Error on Running Server ${err}`);
  console.log('✅ Amazon Server Running on => http://localhost:8000');
});
