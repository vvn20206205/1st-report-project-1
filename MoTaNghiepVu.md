Mô tả nghiệp vụ:
- Một cửa hàng bán tranh cần xây dựng website quản lí và bán hàng. 
- Trang chủ:
    + Trang chủ có các chức năng: Thông báo, Đăng nhập, Đăng kí ở header và các thông tin giới thiệu, liên hệ của cửa hàng ở footer. 
    + Trang chủ hiển thị các danh mục: Tất cả sản phẩm, Thể loại, Họa sĩ, Tìm kiếm, Giỏ hàng. 
    + Nếu khách hàng xem sản phẩm mà muốn chọn mua hoặc giỏ hàng thì yêu cầu đăng nhập. 
    + Mô tả thêm thông tin:
        
        Thông báo: Hiển thị thông báo (Xem tất cả thông báo, Xem chi tiết thông báo). 
        
        Đăng nhập: Đăng nhập tài khoản. 
        
        Đăng kí: Đăng kí tài khoản mới. 
        
        Tất cả sản phẩm: Hiển thị tất cả các sản phẩm có chức năng xem chi tiết sản phẩm (có chức năng đánh giá của khách hàng đã từng mua). 
        
        Thể loại: Hiển thị sản phẩm theo thể loại.
        
        Họa sĩ: Hiển thị sản phẩm theo tác giả.
        
        Tìm kiếm: Tìm kiếm sản phẩm theo từ khóa.
        
        Giỏ hàng: Chức năng giỏ hàng của khách hàng có các chức năng: Quản lí giỏ hàng, Mua hàng, Thanh toán, Đơn đã hủy, Đơn đã mua.
- Đăng nhập: 
    + Trong trang đăng nhập có 3 chức năng: Đăng nhập, Đăng kí, Quên mật khẩu và có nhiều vai trò: customer, sales, warehouse, accountant, adminUI.
- Chức năng chung người dùng: 
    + Đối với tất cả các vai trò đều có các chức năng chung: Thông báo, Hồ sơ, Cài đặt, Đăng xuất. 
    + Mô tả thêm thông tin: 
        
        Hồ sơ: Liên quan hồ sơ người dùng (Xem, Sửa, Xóa thông tin). 
        
        Cài đặt: Đổi mật khẩu người dùng.
        
        Đăng xuất: Chức năng đăng xuất trở về trang đăng nhập nhiều vai trò.
- Đối với khách hàng có các danh mục: Tất cả sản phẩm, Thể loại, Họa sĩ, Tìm kiếm, Giỏ hàng. 

- Đối với nhân viên bán hàng: 
    + Đối với nhân viên bán hàng có các chức năng: Tạo hóa đơn bán, Tư vấn khách hàng, Thay đổi giá bán
    + Mô tả thêm thông tin: 
        
        Tạo hóa đơn bán: Tạo hóa đơn bán hàng. 
        
        Tư vấn khách hàng: Nhắn tin tư vấn khách hàng. 
        
        Thay đổi giá bán: Thay đổi giá bán sản phẩm. 
        
        Và có các chức năng Tất cả sản phẩm, Thể loại, Họa sĩ, Tìm kiếm của khách hàng.
- Đối với nhân viên nhập kho: 
    + Đối với nhân viên nhập kho có các chức năng: Tạo hóa đơn nhập, Thay đổi giá nhập 
    + Mô tả thêm thông tin:
        
        Tạo hóa đơn nhập: Tạo hóa đơn nhập kho.
        
        Thay đổi giá nhập: Thay đổi giá nhập sản phẩm. 
- Đối với nhân viên kế toán: 
    + Đối với nhân viên kế toán có các chức năng: 
        
        Báo cáo bán hàng.
        
        Báo cáo kho hàng.
        
        Xuất báo cáo excel, csv hoặc pdf. 
- Đối với Admin UI: 
    + Đối với Admin UI có Dashboard tổng quan: Quản lí người dùng, Quản lí sản phẩm, Quản lí thông báo, Quản lí đơn hàng 
    + Mô tả thêm thông tin: 
        
        Quản lí người dùng: Quản lí khách hàng, Quản lí nhân viên 
        
        Quản lí sản phẩm: Quản lí theo sản phẩm, Quản lí theo thể loại, Quản lí theo tác giả 
        
        Quản lí thông báo 
        
        Quản lí đơn hàng: Quản lí hóa đơn bán, Quản lí hóa đơn nhập 

=> Sử dụng microservice chia nhỏ hệ thống thành nhều service riêng.