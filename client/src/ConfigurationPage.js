import React from 'react';

function ConfigurationPage({ fields, selectedFields, handleFieldSelection, saveSelectedFields }) {
  return (
    <div className="container">
      <h1>Please select the fields</h1>
      <form>
        {fields.map((field) => (
          <div key={field} className="form-check">
            <input
              type="checkbox"
              name={field}
              id={field}
              checked={selectedFields.includes(field)}
              onChange={handleFieldSelection}
              className="form-check-input"
            />
            <label htmlFor={field} className="form-check-label">
              {field.charAt(0).toUpperCase() + field.slice(1)}
            </label>
          </div>
        ))}
        <button type="button" onClick={saveSelectedFields} className="btn btn-primary">
          Save Fields
        </button>
      </form>
    </div>
  );
}

export default ConfigurationPage;
