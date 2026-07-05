# 🛠️ Helpdesk Tools - Tampermonkey Script

[![Version](https://img.shields.io/badge/version-1.1.0-blue.svg)](https://github.com/voz261/crownx-hdmmmb-helpdesk-tools)
[![Tampermonkey](https://img.shields.io/badge/Tampermonkey-Supported-green.svg)](https://www.tampermonkey.net/)
[![GitHub](https://img.shields.io/badge/GitHub-Repository-black.svg)](https://github.com/voz261/crownx-hdmmmb-helpdesk-tools)

> Script Tampermonkey hỗ trợ tự động hóa các tác vụ trên Helpdesk CrownX

---

## 📋 Mục lục

- [🚀 Giới thiệu](#-giới-thiệu)
- [✨ Tính năng](#-tính-năng)
- [📥 Cài đặt](#-cài-đặt)
- [🔐 Cấu hình Discord Webhook](#-cấu-hình-discord-webhook)
- [🔄 Cập nhật](#-cập-nhật)
- [⚠️ Lưu ý](#️-lưu-ý)
- [📝 Version History](#-version-history)
- [👤 Tác giả](#-tác-giả)

---

## 🚀 Giới thiệu

Script Tampermonkey giúp tối ưu hóa quy trình xử lý ticket trên hệ thống Helpdesk CrownX, giảm thiểu thao tác thủ công và tăng hiệu suất làm việc.

**Repository**: [github.com/voz261/crownx-hdmmmb-helpdesk-tools](https://github.com/voz261/crownx-hdmmmb-helpdesk-tools)

---

## ✨ Tính năng

### 📤 Bước 1: Gửi thông tin
- **Send Discord**: Gửi nội dung ticket hiện tại lên Discord qua Webhook

### 👷 Bước 2: Xử lý ticket
| Nút | Chức năng | Mô tả |
|:---|:---|:---|
| **Reply (+clipboard)** | Dán nội dung reply | Lấy nội dung từ clipboard và dán vào khung reply |
| **Close (Đăng nhập)** | Đóng ticket | Đóng ticket với category *"Dịch vụ Đăng nhập"* |
| **⚡ SuperFast-1Click** | Reply + Close | Kết hợp cả 2 chức năng trên chỉ trong 1 click |

### 🚀 Gán ticket
- **Assign VHUD**: Gán ticket cho team VHUD
- **Assign Tuanna3**: Gán ticket cho Tuanna3 ⚠️ *Cẩn thận khi sử dụng!*

### 🛠️ Các chức năng khác
- **Close (Máy tính)**: Đóng ticket với category *"Dịch vụ Máy tính"*
- **Close (Cân điện tử)**: Đóng ticket với category *"Hỗ trợ Cân"*

---

## 📥 Cài đặt

### Cách 1: Cài tự động từ GitHub (Khuyến nghị)

1. Cài extension [Tampermonkey](https://www.tampermonkey.net/) trên trình duyệt
2. Click vào link cài đặt trực tiếp:
   👉 **[Install Helpdesk Tools](https://github.com/voz261/crownx-hdmmmb-helpdesk-tools/raw/refs/heads/main/helpdesk-tools.user.js)**
3. Tampermonkey sẽ tự động nhận diện và hiện cửa sổ cài đặt
4. Click **Install** để hoàn tất

### Cách 2: Cài thủ công

1. Mở Tampermonkey → Chọn **Create a new script**
2. Copy toàn bộ code từ file `helpdesk-tools.user.js` trong repository
3. Paste vào và lưu (Ctrl+S / Cmd+S)

---

## 🔐 Cấu hình Discord Webhook

**Lần đầu sử dụng**, script sẽ tự động hiện popup yêu cầu nhập Discord Webhook:

1. Nhập Webhook URL vào ô prompt
2. Click **OK** để lưu

> **Lưu ý**: 
> - Chỉ cần nhập **1 lần duy nhất**, script sẽ lưu vào localStorage của trình duyệt
> - Webhook chỉ được lưu trên máy tính cá nhân, **không gửi đi đâu khác**
> - Để thay đổi webhook, bạn có thể xóa key `discord_webhook` trong localStorage (F12 → Application → Local Storage)

---

## 🔄 Cập nhật

### Tự động
Tampermonkey tự động kiểm tra và cập nhật script khi có version mới (mặc định mỗi ngày).

### Thủ công
1. Mở Tampermonkey → Dashboard
2. Click vào script **Helpdesk Tools**
3. Chọn **Check for updates**

---

## ⚠️ Lưu ý

- ✅ Script chỉ hoạt động trên domain: `https://helpdesk.crownx.com.vn/*`
- ✅ Không chứa thông tin nhạy cảm, backdoor hay thu thập dữ liệu
- ✅ Webhook được lưu cục bộ, an toàn và riêng tư
- ✅ Mã nguồn mở, bạn có thể kiểm tra và tùy chỉnh

---

## 📝 Version History

### v1.1.0 (2026-01-05)
- ✨ Thêm nút **SuperFast-1Click** (Reply + Close)
- ✨ Thêm chức năng **Close (Cân điện tử)**
- 🎨 Cải thiện giao diện toolbar với bố cục 4 cột
- 🔧 Thêm auto-submit cho reply (có thể tùy chỉnh)
- 📝 Cập nhật documentation

### v1.0.2 (2025-12-20)
- 🚀 Initial release
- 📤 Send Discord Webhook
- 💬 Reply với clipboard
- 📌 Close ticket với các category cơ bản
- 🔄 Assign VHUD và Tuanna3

---

## 🤝 Đóng góp

Mọi đóng góp đều được chào đón! 

1. Fork repository
2. Tạo branch mới (`git checkout -b feature/AmazingFeature`)
3. Commit thay đổi (`git commit -m 'Add some AmazingFeature'`)
4. Push lên branch (`git push origin feature/AmazingFeature`)
5. Mở Pull Request

---

## 📄 License

MIT License - Xem file [LICENSE](LICENSE) để biết thêm chi tiết.

---

## 👤 Tác giả

**tuanna3** - CrownX IT Department

- GitHub: [@voz261](https://github.com/voz261)
- Repository: [crownx-hdmmmb-helpdesk-tools](https://github.com/voz261/crownx-hdmmmb-helpdesk-tools)

---

⭐ **Star repository nếu thấy hữu ích!** ⭐

---

*Last updated: 2026-01-05*