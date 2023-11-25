
'use client'
import React, { useEffect, useState } from 'react';

import { useQuery } from '@tanstack/react-query';
import { getAnalyticDashboard } from '@/apis/page';



// ... (import statements)

const AnalyticsPage: React.FC = () => {
  const { data: analyticDashboard, isLoading: analyticLoading } = useQuery({
    queryKey: ["analytics"],
    queryFn: getAnalyticDashboard,
  });

  if (analyticLoading) {
    return <div>Loading...</div>;
  }

  console.log(analyticDashboard);
  return (
    <div>
      <h1 style={{ fontSize: '2em', textAlign: 'center', fontWeight: 'bold', marginBottom: '20px' }}>Admin Analytics Page</h1>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <div style={{ 
          border: '1px solid #ccc', 
          padding: '100px', 
          marginRight: '80px', 
          backgroundColor: 'green', 
          color: 'white',
          borderRadius: '30px', 
          boxShadow: '0 0 30 rgba(0, 0, 0, 0.5)' 
        }}>
          <p style={{ margin: '0', fontWeight: 'bold', fontSize: '1.2em' }}>Total Sale: {analyticDashboard.total}</p>
        </div>
        <div style={{ 
          border: '1px solid #ccc', 
          padding: '100px', 
          marginLeft: '80px', 
          backgroundColor: 'orange',
          borderRadius: '30px', 
          boxShadow: '0 0 30 rgba(0, 0, 0, 0.5)'  
        }}>
          <p style={{ margin: '0', fontWeight: 'bold', fontSize: '1.2em' }}>Order: {analyticDashboard.count}</p>
        </div>
      </div>
    </div>
  );
  
  
  
  
  
  
  
  
  
  
};

export default AnalyticsPage;

