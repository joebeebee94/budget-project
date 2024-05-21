const app = require('./app');

// set port and listen
const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
    console.log(`Go to localhost:${PORT}/`);
});
