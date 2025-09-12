import express from 'express';
import cors from 'cors';


const app = express();
app.use(express.json());
app.use(cors());

const users = [];

app.post('/users', (req, res) => {
    const user = req.body;
    users.push(user);
    res.status(201).send(user);
});

app.post('/api/user', (req, res) => {
  // Query-Parameter aus der URL
  const role = req.query.role;
  console.log(`Empfangene Rolle: ${role}`);
  // Daten aus dem Request-Body
  const { name, age } = req.body;
  if(role === undefined) {
    return res.status(400).json({ error: 'Rolle ist erforderlich' });
  };
  res.json({
    message: `Benutzer ${name} (${age}) mit Rolle ${role} wurde empfangen.`,
    data: { name, age, role }
  });
});


app.get('/users', (req, res) => {
    res.send(users);
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
 
