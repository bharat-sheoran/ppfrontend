import React, { useState } from 'react';
import axios from 'axios';
import { UserCircle2 } from 'lucide-react';

interface FormData {
  username: string;
  email: string;
  rollNumber: string;
  dateOfBirth: string;
  textInput: string;
  numberInput: string;
}

function App() {
  const [formData, setFormData] = useState<FormData>({
    username: '',
    email: '',
    rollNumber: '',
    dateOfBirth: '',
    textInput: '',
    numberInput: '',
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [responseData, setResponseData] = useState<any>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    setResponseData(null);

    const userId = `${formData.username}_${formData.dateOfBirth.replace(/\//g, '')}`;
    const numbers = formData.numberInput.match(/[0-9]/g)?.map(Number) || [];
    const alphabets = formData.textInput.match(/[a-zA-Z]/g) || [];

    const payload = {
      dob: formData.dateOfBirth.toString(),
      username: formData.username,
      userId,
      collegeEmail: formData.email,
      collegeRollNumber: formData.rollNumber,
      numbers,
      alphabets,
    };

    try {
      const response = await axios.post('https://api.finnlet.com/bfhl', payload);
      setMessage(response.data.message || 'Data submitted successfully!');
      setResponseData(response.data);
    } catch (error) {
      setMessage('Failed to submit data. Please try again.');
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-md p-8 border border-gray-100">
        <div className="flex flex-col items-center mb-8">
          <UserCircle2 className="w-16 h-16 text-blue-600 mb-4" strokeWidth={1.5} />
          <h1 className="text-2xl font-semibold text-gray-900">Enter Your Details</h1>
        </div>

        {message && <p className="text-center text-sm text-red-500 mb-4">{message}</p>}

        <form onSubmit={handleSubmit} className="space-y-5">
          <input type="text" name="username" value={formData.username} onChange={handleChange} placeholder="Username" required className="w-full p-2 border rounded" />
          <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="College Email" required className="w-full p-2 border rounded" />
          <input type="text" name="rollNumber" value={formData.rollNumber} onChange={handleChange} placeholder="Roll Number" required className="w-full p-2 border rounded" />
          <input type="date" name="dateOfBirth" value={formData.dateOfBirth} onChange={handleChange} required className="w-full p-2 border rounded" />
          <input type="text" name="textInput" value={formData.textInput} onChange={handleChange} placeholder="Enter alphabets" required className="w-full p-2 border rounded" />
          <input type="text" name="numberInput" value={formData.numberInput} onChange={handleChange} placeholder="Enter numbers" required className="w-full p-2 border rounded" />

          <button type="submit" disabled={loading} className="w-full bg-blue-600 text-white py-2 rounded">
            {loading ? 'Submitting...' : 'Submit'}
          </button>
        </form>
      </div>

      {responseData && (
        <div className="bg-gray-50 mt-6 p-4 rounded-lg w-full max-w-md border border-gray-200">
          <h3 className="text-lg font-medium text-gray-700">Response Data</h3>
          <p><strong>User ID:</strong> {responseData.userId}</p>
          <p><strong>Email:</strong> {responseData.collegeEmail}</p>
          <p><strong>Roll Number:</strong> {responseData.collegeRollNumber}</p>
          <p><strong>Numbers:</strong> {responseData.numbers.join(', ')}</p>
          <p><strong>Alphabets:</strong> {responseData.alphabets.join(', ')}</p>
        </div>
      )}
    </div>
  );
}

export default App;