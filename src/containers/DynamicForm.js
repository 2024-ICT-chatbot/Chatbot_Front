import React, { useState, useEffect } from 'react';
import axios from 'axios';

const DynamicForm = ({ formId }) => {
  console.log('DynamicForm rendering, formId:', formId);
  const [form, setForm] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [formData, setFormData] = useState({});

  useEffect(() => {
    const fetchFormData = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/v1/forms/${formId}`);
        console.log('API Response:', JSON.stringify(response.data, null, 2));
        setForm(response.data);
      } catch (error) {
        console.error('Error fetching form data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchFormData();
  }, [formId]);

  useEffect(() => {
    console.log('Form state updated:', form);
  }, [form]);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const formattedData = {
      contact_person: formData.person,
      visit_location: formData.location,
      visit_purpose: formData.purpose,
      start_time: formData.startTime,
      end_time: formData.endTime,
      visitor_name: formData.name,
      visitor_phone: formData.phone,
      visitor_birthdate: formData.dob,
      visitor_company: formData.company,
      business_registration_number: formData.businessNumber,
      visitor_gender: formData.gender
    };
      
          // 필수 필드 확인
          const requiredFields = ['contact_person', 'visit_location', 'visit_purpose', 'start_time', 'end_time', 'visitor_name', 'visitor_phone', 'visitor_birthdate', 'visitor_company', 'business_registration_number', 'visitor_gender'];
          const missingFields = requiredFields.filter(field => !formattedData[field]);
      
          if (missingFields.length > 0) {
            alert(`다음 필드를 채워주세요: ${missingFields.join(', ')}`);
            return;
          }
    console.log('Submitting form data:', JSON.stringify(formData, null, 2));

    try {
        console.log('Sending request to:', 'http://localhost:8000/api/v1/submit-form');
        const response = await axios.post('http://localhost:8000/api/v1/submit-form', formattedData);
        console.log('Form submitted successfully. Response:', response.data);
        alert('폼이 성공적으로 제출되었습니다.');
      } catch (error) {
        console.error('Error submitting form:', error);
        console.error('Error response:', error.response);
        console.error('Error request:', error.request);
        console.error('Error message:', error.message);
        alert('폼 제출 중 오류가 발생했습니다: ' + (error.response?.data?.detail || error.message));
      }
    };

  if (isLoading) return <p className="text-center">Loading...</p>;
  if (!form) return <p className="text-center">Form not found</p>;

  const renderField = (field) => {
    switch (field.field_type) {
      case 'text':
      case 'tel':
      case 'email':
        return (
          <input
            type={field.field_type}
            id={field.field_name}
            name={field.field_name}
            required={field.is_required}
            placeholder={field.placeholder || ''}
            onChange={handleInputChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
        );
      case 'datetime-local':
        return (
          <input
            type="datetime-local"
            id={field.field_name}
            name={field.field_name}
            required={field.is_required}
            onChange={handleInputChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
        );
      case 'date':
        return (
          <input
            type="date"
            id={field.field_name}
            name={field.field_name}
            required={field.is_required}
            onChange={handleInputChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
        );
      case 'select':
        return (
          <select
            id={field.field_name}
            name={field.field_name}
            required={field.is_required}
            onChange={handleInputChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          >
            <option value="">Select {field.label}</option>
            <option value="male">남성</option>
            <option value="female">여성</option>
          </select>
        );
      default:
        return null;
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-4">방문자 출입증 등록</h1>
      <p className="text-gray-600 mb-6">방문자 출입증 등록을 위한 양식입니다</p>
      <form onSubmit={handleSubmit} className="space-y-4">
        {form.fields && form.fields.length > 0 ? (
          form.fields.map((field) => (
            <div key={field.id} className="flex flex-col">
              <label htmlFor={field.field_name} className="text-sm font-medium text-gray-700 mb-1">
                {field.label}
              </label>
              {renderField(field)}
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">사용 가능한 필드가 없습니다</p>
        )}
        <button
          type="submit"
          className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          제출
        </button>
      </form>
    </div>
  );
};

export default DynamicForm;