import { Modal } from 'antd'
import React from 'react'

const Download = ({openAddModal,setOpenAddModal}) => {
    const handleCancel = () => {
        
      
        setOpenAddModal(false);
      };
  return (
    <Modal
    centered
    open={openAddModal}
    onCancel={handleCancel}
    footer={null}
    width={600}
  >
    <div className="mb-6 mt-4">
      <h2 className="text-center font-bold text-lg mb-4">Download CV</h2>
      
    </div>
  </Modal>
  )
}

export default Download