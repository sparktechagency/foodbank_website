import React from 'react'
import { useUpdateCancelQuery } from '../redux/api/eventApi';
import { useParams } from 'react-router-dom';

export const Cancel = () => {
    const{eventId, type, userId} = useParams()
      const {data:cancel} = useUpdateCancelQuery({ eventId, type, userId},
                  { refetchOnMountOrArgChange: true });
 
  return (
    <div className='text-4xl font-bold text-center'>
        Cancel
        
    </div>
  )
}
