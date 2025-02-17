import React, { useState } from 'react'
import { assets } from '../assets/assets'
import axios from 'axios'
import { backendUrl } from '../App'
import { toast } from 'react-toastify'

const Add = ({token}) => {

  const [image1,setImage1] = useState(false)
  const [image2,setImage2] = useState(false)
  const [image3,setImage3] = useState(false)
  const [image4,setImage4] = useState(false)

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("เหล็ก");
  const [subCatagory, setSubCategory] = useState("เหล็กเพื่องานฐานราก");
  const [bestseller, setBestseller] = useState(false);
  const [sizes, setsizes] = useState([]);

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    try {
      
      const formData = new FormData()

      formData.append("name",name)
      formData.append("description",description)
      formData.append("price",price)
      formData.append("category",category)
      formData.append("subCategory",subCatagory)
      formData.append("bestseller",bestseller)
      formData.append("sizes",JSON.stringify(sizes))

       image1 && formData.append("image1",image1)
       image2 && formData.append("image2",image2)
       image3 && formData.append("image3",image3)
       image4 && formData.append("image4",image4)

       const response = await axios.post(backendUrl + "/api/product/add",formData,{headers:{token}})

      if (response.data.success) {
        toast.success(response.data.message)
        setName('')
        setDescription('')
        setImage1(false)
        setImage2(false)
        setImage3(false)
        setImage4(false)
        setPrice('')
      }else {
        toast.error(response.data.message)
      }

    } catch (error) {
      console.log(error);
      toast.error(error.message)
    }
  }


  return (
    <form onSubmit={onSubmitHandler} className='flex flex-col w-full items-start gap-3'>
      <div>
        <p className='mb-2'>อัปโหลดรูปภาพ</p>

        <div className='flex gap-2'>
          <label htmlFor="image1">
            <img  className='w-20' src={!image1 ? assets.upload_area : URL.createObjectURL(image1)} alt="" />
            <input onChange={(e)=>setImage1(e.target.files[0])} type="file" id='image1' hidden/>
          </label>
          <label htmlFor="image2">
            <img  className='w-20' src={!image2 ? assets.upload_area : URL.createObjectURL(image2)} alt="" />
            <input onChange={(e)=>setImage2(e.target.files[0])} type="file" id='image2' hidden/>
          </label>
          <label htmlFor="image3">
            <img  className='w-20' src={!image3 ? assets.upload_area : URL.createObjectURL(image3)} alt="" />
            <input onChange={(e)=>setImage3(e.target.files[0])} type="file" id='image3' hidden/>
          </label>
          <label htmlFor="image4">
            <img  className='w-20' src={!image4 ? assets.upload_area : URL.createObjectURL(image4)} alt="" />
            <input onChange={(e)=>setImage4(e.target.files[0])} type="file" id='image4' hidden/>
          </label>
        </div>
      </div>

      <div className='w-full'>
        <p className='mb-2'>ชื่อสินค้า</p>
        <input onChange={(e)=>setName(e.target.value)} value={name} className='w-full max-w-[500px] px-3 py-2' type="text" placeholder='ชื่อสินค้า' required />
      </div>

      <div className='w-full'>
        <p className='mb-2'>รายละเอียด</p>
        <textarea onChange={(e)=>setDescription(e.target.value)} value={description} className='w-full max-w-[500px] px-3 py-2' type="text" placeholder='รายละเอียด' required />
      </div>

      <div className='flex flex-col sm:flex-row gap-2 w-full sm:gap-8'>

      <div>
          <p className='mb-2'>หมวดหมู่สินค้า</p>
          <select onChange={(e) => setCategory(e.target.value)} className='w-full px-3 py-2'>
            <option value="เหล็ก">เหล็ก</option>
            <option value="วัสดุก่อสร้าง">วัสดุก่อสร้าง</option>
            <option value="งานระบบประปา">งานระบบประปา</option>
            <option value="กระเบื้อง/อุปกรณ์">กระเบื้อง/อุปกรณ์</option>
            <option value="เคมีภัณฑ์">เคมีภัณฑ์</option>
            <option value="อุปกรณ์ทาสี">อุปกรณ์ทาสี</option>
          </select>
        </div>

        <div>
          <p className='mb-2'>ประเภทสินค้า</p>
          <select onChange={(e) => setSubCategory(e.target.value)} className='w-full px-3 py-2'>
            {/* เหล็กเพื่องานฐานราก */}
            <optgroup label="สินค้าเหล็ก">
            <option value="เหล็กเพื่องานฐานราก">เหล็กเพื่องานฐานราก</option>
            <option value="เหล็กเพื่องานโครงสร้าง">เหล็กเพื่องานโครงสร้าง</option>
            <option value="เหล็กแป๊ป">เหล็กแป๊ป</option>
            <option value="สินค้าเหล็กใช้งานทั่วไป">สินค้าเหล็กใช้งานทั่วไป</option>
            </optgroup>
            {/* ปูน/วัสดุเทพื้น */}
            <optgroup label="ปูน/วัสดุเทพื้น">
            <option value="ปูน/วัสดุเทพื้น">ปูน/วัสดุเทพื้น</option>
            <option value="อิฐ/บล็อกปูพื้น">อิฐ/บล็อกปูพื้น</option>
            <option value="หลังคา/อุปกรณ์หลังคา">หลังคา/อุปกรณ์หลังคา</option>
            </optgroup>
            {/* งานระบบประปา */}
            <optgroup label="งานระบบประปา">
            <option value="อุปกรณ์ประปา">อุปกรณ์ประปา </option>
            <option value="ท่อน้ำประปา/อุปกรณ์ข้อต่อ">ท่อน้ำประปา/อุปกรณ์ข้อต่อ </option>
            </optgroup>
            {/* กระเบื้อง/อุปกรณ์ */}
            <optgroup label="กระเบื้อง/อุปกรณ์">
            <option value="อุปกรณ์ติดตั้งกระเบื้อง">อุปกรณ์ติดตั้งกระเบื้อง</option>
            </optgroup>
            {/* ฮาร์ดแวร์ เคมีภัณฑ์ */}
            <optgroup label=" ฮาร์ดแวร์ เคมีภัณฑ์">
            <option value="เคมีภัณฑ์ก่อสร้าง">เคมีภัณฑ์ก่อสร้าง</option>
           </optgroup>
            {/* อุปกรณ์ทาสี */}
            <optgroup label="  อุปกรณ์ทาสี ">
            <option value="แปรงทาสี">แปรงทาสี</option>
           
            </optgroup>
          </select>
         
        </div>

        <div>
          <p className='mb-2'>ราคา</p>
          <input onChange={(e) => setPrice(e.target.value)} value={price} className='w-full px-3 py-2 sm:w-[120px]' type="Number" placeholder='0' />
        </div>

      </div>
{/* 
      <div>
        <p className='mb-2'>Product Sizes</p>
        <div className='flex gap-3'>
          <div onClick={()=>setsizes(prev => prev.includes("S") ? prev.filter( item => item !== "S" ) : [...prev,"S"])}>
            <p className={`${sizes.includes("S") ? "bg-pink-100" : "bg-slate-200" } px-3 py-1 cursor-pointer`}>S</p>
          </div>

          <div onClick={()=>setsizes(prev => prev.includes("M") ? prev.filter( item => item !== "M" ) : [...prev,"M"])}>
            <p className={`${sizes.includes("M") ? "bg-pink-100" : "bg-slate-200" } px-3 py-1 cursor-pointer`}>M</p>
          </div>

          <div onClick={()=>setsizes(prev => prev.includes("L") ? prev.filter( item => item !== "L" ) : [...prev,"L"])}>
            <p className={`${sizes.includes("L") ? "bg-pink-100" : "bg-slate-200" } px-3 py-1 cursor-pointer`}>L</p>
          </div>

          <div onClick={()=>setsizes(prev => prev.includes("XL") ? prev.filter( item => item !== "XL" ) : [...prev,"XL"])}>
            <p className={`${sizes.includes("XL") ? "bg-pink-100" : "bg-slate-200" } px-3 py-1 cursor-pointer`}>XL</p>
          </div>

          <div onClick={()=>setsizes(prev => prev.includes("XXL") ? prev.filter( item => item !== "XXL" ) : [...prev,"XXL"])}>
            <p className={`${sizes.includes("XXL") ? "bg-pink-100" : "bg-slate-200" } px-3 py-1 cursor-pointer`}>XXL</p>
          </div>
        </div>
      </div>
*/}

      <div className='flex gap-2 mt-2'>
        <input onChange={() => setBestseller(prev => !prev)} checked={bestseller} type="checkbox" id='bestseller' />
        <label className='cursor-pointer' htmlFor="bestseller">เพิ่มสินค้าขายดี</label>
      </div>

      <button type="submit" className='w-28 py-3 mt-4 bg-black text-white'>เพิ่มสินค้า</button>

    </form>
  )
}

export default Add
