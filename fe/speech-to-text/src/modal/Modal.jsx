import React from 'react'

export default function Modal({ visible, medicineDetail, onClose }) {
    const handleOnClose = () => onClose();
    if (!visible) return null
    return (
        <div onClick={() => handleOnClose}
            className='flex justify-center items-center fixed inset-0 bg-black bg-opacity-5 backdrop-blur-md'
        >
            <div onClick={e => e.stopPropagation()} 
                className=' bg-slate-100 p-4 rounded-md'
            >
                <p onClick={() => handleOnClose}>X</p>
                {medicineDetail.description}
            </div>
        </div>
    )
}
