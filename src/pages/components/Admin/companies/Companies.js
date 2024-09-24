import React, { useEffect, useState } from 'react';
import { fetchCompanies } from '../../../../api/admin'; // Assuming this is the correct path for the API call
import styled from 'styled-components';

const CompaniesContainer = styled.div`
  padding: 20px;
`;

const CompanyList = styled.ul`
  list-style-type: none;
  padding: 0;
`;

const CompanyListItem = styled.li`
  padding: 10px;
  border: 1px solid #ccc;
  margin-bottom: 10px;
  border-radius: 5px;
`;

const Companies = () => {
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCompanyData = async () => {
      try {
        const response = await fetchCompanies();
        console.log(response.data) // Call the fetchCompanies function
        setCompanies(response.data); // Set the companies from the response
      } catch (err) {
        setError('Failed to fetch companies'); // Handle the error
      } finally {
        setLoading(false); // Always turn off loading state
      }
    };

    fetchCompanyData(); // Fetch companies when component mounts
  }, []);

  if (loading) {
    return <div>Loading companies...</div>; // Show loading indicator
  }

  if (error) {
    return <div>{error}</div>; // Show error message
  }

  return (
    <CompaniesContainer>
      <h2>Companies List</h2>
      {companies.length > 0 ? (
        <CompanyList>
          {companies.map((company) => (
            <CompanyListItem key={company.id}>
              <strong>{company.name}</strong> - {company.company_type.name}
            </CompanyListItem>
          ))}
        </CompanyList>
      ) : (
        <div>No companies found</div> // Show this if no companies are returned
      )}
    </CompaniesContainer>
  );
};

export default Companies;
