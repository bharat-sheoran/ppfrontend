import React, { useState } from 'react';
import { UserCircle2, ChevronDown } from 'lucide-react';

interface FormData {
  userId: string;
  email: string;
  rollNumber: string;
  username: string;
  dateOfBirth: string;
  textInput: string;
  selectedOptions: string[];
}

function App() {
  const [formData, setFormData] = useState<FormData>({
    userId: '',
    email: '',
    rollNumber: '',
    username: '',
    dateOfBirth: '',
    textInput: '',
    selectedOptions: [],
  });

  const [showResults, setShowResults] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const options = [
    { id: 'alphabets', label: 'Alphabets' },
    { id: 'numbers', label: 'Numbers' },
    { id: 'highest-alphabet', label: 'Highest alphabet' },
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const toggleOption = (optionId: string) => {
    setFormData(prev => ({
      ...prev,
      selectedOptions: prev.selectedOptions.includes(optionId)
        ? prev.selectedOptions.filter(id => id !== optionId)
        : [...prev.selectedOptions, optionId]
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowResults(true);
  };

  const getProcessedText = () => {
    let result = formData.textInput;
    
    if (formData.selectedOptions.includes('alphabets')) {
      result = result.replace(/[^a-zA-Z]/g, '');
    }
    if (formData.selectedOptions.includes('numbers')) {
      result = result.replace(/[^0-9]/g, '');
    }
    if (formData.selectedOptions.includes('highest-alphabet')) {
      const alphabets = result.match(/[a-zA-Z]/g);
      if (alphabets) {
        result = alphabets.reduce((a, b) => a > b ? a : b);
      }
    }
    
    return result;
  };

  if (showResults) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-xl shadow-2xl w-full max-w-md p-8 border border-gray-100">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6 text-center">Results</h2>
          <div className="space-y-6">
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="text-sm font-medium text-gray-600 mb-2">Original Text</h3>
              <p className="text-gray-900">{formData.textInput}</p>
            </div>
            <div className="bg-blue-50 p-4 rounded-lg">
              <h3 className="text-sm font-medium text-blue-600 mb-2">Processed Result</h3>
              <p className="text-gray-900">{getProcessedText()}</p>
            </div>
            <button
              onClick={() => setShowResults(false)}
              className="w-full bg-blue-600 text-white py-2.5 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 font-medium shadow-sm"
            >
              Back to Form
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-md p-8 border border-gray-100">
        <div className="flex flex-col items-center mb-8">
          <UserCircle2 className="w-16 h-16 text-blue-600 mb-4" strokeWidth={1.5} />
          <h1 className="text-2xl font-semibold text-gray-900">Enter Your Details</h1>
          <div className="h-1 w-12 bg-blue-600 rounded-full mt-4 mb-2"></div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-800 mb-1.5">
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
              required
              placeholder="Choose a username"
            />
          </div>

          <div>
            <label htmlFor="userId" className="block text-sm font-medium text-gray-800 mb-1.5">
              User ID
            </label>
            <input
              type="text"
              id="userId"
              name="userId"
              value={formData.userId}
              onChange={handleChange}
              className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
              required
              placeholder="Enter your user ID"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-800 mb-1.5">
              College Email ID
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
              required
              placeholder="name@college.edu"
            />
          </div>

          <div>
            <label htmlFor="rollNumber" className="block text-sm font-medium text-gray-800 mb-1.5">
              College Roll Number
            </label>
            <input
              type="text"
              id="rollNumber"
              name="rollNumber"
              value={formData.rollNumber}
              onChange={handleChange}
              className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
              required
              placeholder="Enter roll number"
            />
          </div>

          <div>
            <label htmlFor="dateOfBirth" className="block text-sm font-medium text-gray-800 mb-1.5">
              Date of Birth
            </label>
            <input
              type="date"
              id="dateOfBirth"
              name="dateOfBirth"
              value={formData.dateOfBirth}
              onChange={handleChange}
              className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
              required
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="textInput" className="block text-sm font-medium text-gray-800">
              Text Input
            </label>
            <input
              type="text"
              id="textInput"
              name="textInput"
              value={formData.textInput}
              onChange={handleChange}
              className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
              placeholder="Enter text to process"
              required
            />
          </div>

          <div className="relative">
            <label className="block text-sm font-medium text-gray-800 mb-1.5">
              Select Options
            </label>
            <button
              type="button"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 text-left flex justify-between items-center"
            >
              <span>
                {formData.selectedOptions.length
                  ? `${formData.selectedOptions.length} selected`
                  : 'Select options'}
              </span>
              <ChevronDown className="w-4 h-4" />
            </button>
            
            {isDropdownOpen && (
              <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg">
                {options.map(option => (
                  <label
                    key={option.id}
                    className="flex items-center px-4 py-2 hover:bg-gray-50 cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      checked={formData.selectedOptions.includes(option.id)}
                      onChange={() => toggleOption(option.id)}
                      className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    />
                    <span className="ml-2">{option.label}</span>
                  </label>
                ))}
              </div>
            )}
          </div>

          <button
            type="submit"
            className="w-full mt-6 bg-blue-600 text-white py-2.5 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 font-medium shadow-sm"
          >
            Process Text
          </button>
        </form>
      </div>
    </div>
  );
}

export default App;