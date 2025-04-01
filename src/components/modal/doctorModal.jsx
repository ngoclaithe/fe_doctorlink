import React, { useState, useEffect } from "react";

const DoctorModal = ({ isOpen, onClose, onSave, doctor }) => {
  const [formData, setFormData] = useState({
    full_name: "",
    gender: "male",
    dob: "",
    phone: "",
    address: "",
    specialty_id: "",
    experience_years: 0,
    bio: "",
    avg_rating: 0,
    image_url: "",
    user_id: ""
  });

  useEffect(() => {
    if (doctor) {
      setFormData({
        full_name: doctor.full_name || "",
        gender: doctor.gender || "male",
        dob: doctor.dob ? new Date(doctor.dob).toISOString().split('T')[0] : "",
        phone: doctor.phone || "",
        address: doctor.address || "",
        specialty_id: doctor.specialty_id || "",
        experience_years: doctor.experience_years || 0,
        bio: doctor.bio || "",
        avg_rating: doctor.avg_rating || 0,
        image_url: doctor.image_url || "",
        user_id: doctor.user_id || ""
      });
    } else {
      // Reset form when adding a new doctor
      setFormData({
        full_name: "",
        gender: "male",
        dob: "",
        phone: "",
        address: "",
        specialty_id: "",
        experience_years: 0,
        bio: "",
        avg_rating: 0,
        image_url: "",
        user_id: ""
      });
    }
  }, [doctor]);

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    
    // Handle numeric inputs
    if (type === 'number') {
      setFormData((prev) => ({
        ...prev,
        [name]: parseFloat(value) || 0,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      console.log("Tên file:", file.name);
      // In a real application, you would upload the file to a server and get a URL
      setFormData((prev) => ({
        ...prev,
        image_url: file.name, // This should be a URL in production
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await onSave(formData);
  };

  return (
    <div
      className={`${
        isOpen ? "fixed" : "hidden"
      } inset-0 bg-black bg-opacity-50 overflow-y-auto h-full w-full z-50 flex items-center justify-center`}
    >
      <div className="relative p-4 w-full max-w-2xl mx-auto bg-white rounded-lg shadow-lg">
        {/* Modal header */}
        <div className="flex justify-between items-center pb-4 mb-4 border-b">
          <h3 className="text-xl font-semibold text-gray-900">
            {doctor ? "Chỉnh sửa bác sĩ" : "Thêm bác sĩ mới"}
          </h3>
          <button
            type="button"
            className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5"
            onClick={onClose}
          >
            <svg
              className="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              ></path>
            </svg>
          </button>
        </div>

        {/* Modal body */}
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 mb-4 sm:grid-cols-2">
            <div>
              <label
                htmlFor="full_name"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Họ và tên
              </label>
              <input
                type="text"
                name="full_name"
                id="full_name"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="Nhập tên bác sĩ"
                value={formData.full_name}
                onChange={handleChange}
                required
              />
            </div>
            
            <div>
              <label
                htmlFor="gender"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Giới tính
              </label>
              <select
                name="gender"
                id="gender"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                value={formData.gender}
                onChange={handleChange}
                required
              >
                <option value="male">Nam</option>
                <option value="female">Nữ</option>
                <option value="other">Khác</option>
              </select>
            </div>
            
            <div>
              <label
                htmlFor="dob"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Ngày sinh
              </label>
              <input
                type="date"
                name="dob"
                id="dob"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                value={formData.dob}
                onChange={handleChange}
                required
              />
            </div>
            
            <div>
              <label
                htmlFor="phone"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Số điện thoại
              </label>
              <input
                type="text"
                name="phone"
                id="phone"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="Nhập số điện thoại"
                value={formData.phone}
                onChange={handleChange}
                required
              />
            </div>
            
            <div>
              <label
                htmlFor="specialty_id"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Chuyên khoa
              </label>
              <input
                type="number"
                name="specialty_id"
                id="specialty_id"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="ID chuyên khoa"
                value={formData.specialty_id}
                onChange={handleChange}
                required
              />
            </div>
            
            <div>
              <label
                htmlFor="experience_years"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Số năm kinh nghiệm
              </label>
              <input
                type="number"
                name="experience_years"
                id="experience_years"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                value={formData.experience_years}
                onChange={handleChange}
                required
              />
            </div>
            
            <div>
              <label
                htmlFor="user_id"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                ID người dùng
              </label>
              <input
                type="number"
                name="user_id"
                id="user_id"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="ID người dùng"
                value={formData.user_id}
                onChange={handleChange}
                required={!doctor}
              />
            </div>
            
            <div>
              <label
                htmlFor="avg_rating"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Đánh giá trung bình
              </label>
              <input
                type="number"
                step="0.1"
                min="0"
                max="5"
                name="avg_rating"
                id="avg_rating"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                value={formData.avg_rating}
                onChange={handleChange}
              />
            </div>
            
            <div className="sm:col-span-2">
              <label
                htmlFor="address"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Địa chỉ
              </label>
              <input
                type="text"
                name="address"
                id="address"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="Nhập địa chỉ"
                value={formData.address}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="sm:col-span-2">
              <label
                htmlFor="image_url"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Hình ảnh
              </label>
              <input
                type="file"
                name="image_url"
                id="image_url"
                className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none"
                onChange={handleFileChange}
              />
              {formData.image_url && (
                <p className="mt-1 text-xs text-gray-500">File hiện tại: {formData.image_url}</p>
              )}
            </div>
            
            <div className="sm:col-span-2">
              <label
                htmlFor="bio"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Tiểu sử
              </label>
              <textarea
                id="bio"
                name="bio"
                rows="4"
                className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Nhập thông tin chi tiết về bác sĩ"
                value={formData.bio}
                onChange={handleChange}
              ></textarea>
            </div>
          </div>
          
          <div className="flex items-center justify-end space-x-4">
            <button
              type="button"
              className="text-gray-500 bg-gray-100 hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5"
              onClick={onClose}
            >
              Hủy
            </button>
            <button
              type="submit"
              className="text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5"
            >
              {doctor ? "Cập nhật" : "Thêm mới"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DoctorModal;