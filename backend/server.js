const express = require('express');
const cors = require('cors');

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

app.post('/api/sql', (req, res) => {
  const { question } = req.body;

  if (question.toLowerCase().includes('top 5 products')) {
    res.json({ sql: 'SELECT product_name, COUNT(*) AS order_count FROM orders GROUP BY product_name ORDER BY order_count DESC LIMIT 5;' });
  } else if (question.toLowerCase().includes('total revenue')) {
    res.json({ sql: 'SELECT SUM(price) AS total_revenue FROM sales;' });
  } else if (question.toLowerCase().includes('new customers')) {
    res.json({ sql: "SELECT COUNT(*) AS new_customers FROM customers WHERE created_at >= NOW() - INTERVAL '1 month';" });
  } else {
    res.json({ sql: "Sorry, I can't answer that question. I am a mock API." });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
