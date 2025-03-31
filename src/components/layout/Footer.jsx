import React from 'react';

export const Footer = () => {
  return (
    <footer className="bg-teal-500 text-white py-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-bold text-lg mb-4">Về chúng tôi</h3>
            <p className="text-white/80">
              BaoVeSucKhoe - Nền tảng y tế chăm sóc sức khỏe toàn diện hàng đầu Việt Nam
            </p>
          </div>
          <div>
            <h3 className="font-bold text-lg mb-4">Liên hệ</h3>
            <ul className="space-y-2 text-white/80">
              <li>Điện thoại: 1900 xxxx</li>
              <li>Email: contact@baovesuckhoe.vn</li>
              <li>Địa chỉ: Hà Nội, Việt Nam</li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-lg mb-4">Dịch vụ</h3>
            <ul className="space-y-2 text-white/80">
              <li>Đặt lịch khám</li>
              <li>Tư vấn sức khỏe</li>
              <li>Khám bệnh từ xa</li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-lg mb-4">Theo dõi chúng tôi</h3>
            <div className="flex space-x-4">
              <a href="/facebook.com" className="text-white hover:text-white/80">Facebook</a>
              <a href="/youtube.com" className="text-white hover:text-white/80">Youtube</a>
              <a href="/linkedin.com" className="text-white hover:text-white/80">LinkedIn</a>
            </div>
          </div>
        </div>
        <div className="text-center mt-8 pt-8 border-t border-white/20">
          <p>© 2025 DoctorLink. Tất cả quyền được bảo lưu.</p>
        </div>
      </div>
    </footer>
  );
};