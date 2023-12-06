import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ConfigurationPage from './ConfigurationPage';
import './App.css';

function App() {
  const [showConfig, setShowConfig] = useState(false);
  const [fields, setFields] = useState([]);
  const [selectedFields, setSelectedFields] = useState([]);
  const [formData, setFormData] = useState({});
  const [submittedData, setSubmittedData] = useState([]);

  useEffect(() => {
    fetchAvailableFields();
    fetchSubmittedData();
  }, []);

  const fetchAvailableFields = async () => {
    try {
      const response = await axios.get('http://localhost:5000/available-fields');
      setFields(response.data.fields);
      setSelectedFields(response.data.fields);
    } catch (error) {
      console.error('Error fetching available fields:', error);
    }
  };

  const fetchSubmittedData = async () => {
    try {
      const response = await axios.get('http://localhost:5000/submitted-data');
      setSubmittedData(response.data);
    } catch (error) {
      console.error('Error fetching submitted data:', error);
    }
  };

  const toggleConfig = () => {
    setShowConfig(!showConfig);
  };

  const handleFieldSelection = (event) => {
    const { name, checked } = event.target;
    if (checked) {
      setSelectedFields((prevFields) => [...prevFields, name]);
    } else {
      setSelectedFields((prevFields) => prevFields.filter((field) => field !== name));
    }
  };

  const saveSelectedFields = () => {
    setShowConfig(false);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const filteredData = Object.fromEntries(
        Object.entries(formData).filter(([key, value]) => selectedFields.includes(key) && value !== '')
      );

      const response = await axios.post('http://localhost:5000/submit-form', filteredData);
console.log(response.data);
      alert('Form submitted successfully!');
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <div className="home">
      <h1>Please fill the details</h1>
      {showConfig ? (
        <ConfigurationPage
          fields={fields}
          selectedFields={selectedFields}
          handleFieldSelection={handleFieldSelection}
          saveSelectedFields={saveSelectedFields}
        />
      ) : (
        <div>
          <form className = "container" onSubmit={handleSubmit}>
            {selectedFields.map((field) => (
              <div key={field} className="form-group">
                <label>
                  {field.charAt(0).toUpperCase() + field.slice(1)}:
                  <input
                    type={field === 'name' ? 'text' : field === 'age' ? 'number' : 'text'}
                    name={field}
                    onChange={handleChange}
                    className="form-control"
                  />
                </label>
              </div>
            ))}
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
            <button onClick={toggleConfig} className="btn btn-secondary">
            Configure Fields
          </button>
          </form>
         
        </div>
      )}
    </div>
  );
}

export default App;
