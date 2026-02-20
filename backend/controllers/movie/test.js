const test = (req, res) => {
  res.json({
    success: true,
    message: 'Movies controller working!',
    timestamp: new Date().toISOString()
  });
};

module.exports = test;