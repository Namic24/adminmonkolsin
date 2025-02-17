import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { backendUrl, currency } from '../App';
import { toast } from 'react-toastify';

const List = ({ token }) => {
  const [list, setList] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const fetchList = async () => {
    try {
      const response = await axios.get(backendUrl + '/api/product/list');
      if (response.data.success) {
        setList(response.data.products);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const removeProduct = async (id) => {
    try {
      const response = await axios.post(backendUrl + '/api/product/remove', { id }, { headers: { token } });
      if (response.data.success) {
        toast.success(response.data.message);
        await fetchList();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const confirmDelete = (item) => {
    setSelectedItem(item);
    setShowModal(true);
  };

  const handleDelete = () => {
    if (selectedItem) {
      removeProduct(selectedItem._id);
    }
    setShowModal(false);
  };

  useEffect(() => {
    fetchList();
  }, []);

  return (
    <>
      <p className='mb-2'>รายการสินค้า</p>
      <div className='flex flex-col gap-2'>
        <div className='hidden md:grid grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center py-1 px-2 border bg-gray-100 text-sm'>
          <b>รูปภาพ</b>
          <b>ชื่อสินค้า</b>
          <b>รายละเอียด</b>
          <b>ราคา</b>
          <b className='text-center'>Action</b>
        </div>

        {list.map((item, index) => (
          <div className='grid grid-cols-[1fr_3fr_1fr] md:grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center gap-2 py-1 px-2 border text-sm' key={index}>
            <img className='w-12' src={item.image[0]} alt={item.name} />
            <p>{item.name}</p>
            <p>{item.category}</p>
            <p>{currency}{item.price}</p>
            <p onClick={() => confirmDelete(item)} className='text-right md:text-center cursor-pointer text-lg text-red-600'>X</p>
          </div>
        ))}

        {showModal && (
          <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50 z-50">
            <div className="bg-white rounded-lg p-4 shadow-lg w-[90%] sm:w-1/3">
              <h2 className="text-xl font-bold">ยืนยันการลบสินค้า</h2>
              <p>คุณต้องการลบสินค้า <strong>"{selectedItem.name}"</strong> หรือไม่?</p>
              <p>รายละเอียด: {selectedItem.category}, ราคา: {currency}{selectedItem.price}</p>
              <div className="flex justify-end gap-4 mt-4">
                <button className="btn btn-secondary" onClick={() => setShowModal(false)}>ยกเลิก</button>
                <button className="btn btn-error" onClick={handleDelete}>ลบสินค้า</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default List;
