import express from 'express';
import cors from 'cors';
import fs from 'fs/promises';
import { write } from 'fs';



const app = express();
app.use(express.json());
app.use(cors());

const users = [];

app.post('/users', (req, res) => {
    const user = req.body;
    users.push(user);
    writeUsersToFile(users);
    console.log('Neuer Benutzer hinzugefügt:', user);
    res.status(201).send(user);
});

async function writeUsersToFile(users) {
    const data = JSON.stringify(users, null, 2);
    await fs.writeFile('users.json', data);
    console.log('Benutzerdaten wurden in users.json gespeichert');      
}
    


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
 
