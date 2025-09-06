const express = require ('express');
const { default: mongoose } = require('mongoose');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT|| 3000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://mongo:27017/studentsdb';

app.use(express.json());

mongoose.connect(MONGO_URI)
.then(()=> console.log('Connected to MongoDB'))
.catch(err => console.error('MongoDB error while connecting:', err));

// schema
const StudentSchema = new mongoose.Schema({
  name: String,
  age: Number
});

const Student = mongoose.model('Student', StudentSchema);

// Routes
app.get('/', (req, res) => {
  res.send('Hello from Students assistant app!');
});

app.post('/students', async (req, res) => {
  const student = new Student(req.body);
  await student.save();
  res.send(student);
});
app.get('/students', async (req, res) => {
    const students = await student.find();
    res.send(students);
    
    //res.send('Hello from Students assistant app!');
})

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server is running on port ${PORT}`);
});

