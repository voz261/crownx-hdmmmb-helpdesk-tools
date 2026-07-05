# Helpdesk Tools - Tampermonkey Script

[![Version](https://img.shields.io/badge/version-1.1.0-blue.svg)](https://github.com/your-username/helpdesk-tools)
[![Tampermonkey](https://img.shields.io/badge/Tampermonkey-Supported-green.svg)](https://www.tampermonkey.net/)

## 🚀 Giới thiệu

Script Tampermonkey hỗ trợ tự động hóa các tác vụ trên Helpdesk CrownX.

## ✨ Tính năng

### 📤 Bước 1:
- **Send Discord**: Gửi nội dung ticket lên Discord qua Webhook

### 👷 Bước 2:
- **Reply (+clipboard)**: Dán nội dung từ clipboard vào reply
- **Close (Đăng nhập)**: Đóng ticket với category "Dịch vụ Đăng nhập"
- **⚡ SuperFast-1Click ⚡**: Reply + Close chỉ trong 1 click

### 🚀 Gán:
- **Assign VHUD**: Gán ticket cho team VHUD
- **Assign Tuanna3**: Gán ticket cho Tuanna3 (⚠️ Cẩn thận!)

### 🛠️ Khác:
- **Close (Máy tính)**: Đóng ticket với category "Dịch vụ Máy tính"
- **Close (Cân điện tử)**: Đóng ticket với category "Hỗ trợ Cân"

## 📥 Cài đặt

### Cách 1: Cài trực tiếp từ GitHub
1. Cài extension [Tampermonkey](https://www.tampermonkey.net/) trên trình duyệt
2. Truy cập [link script](https://raw.githubusercontent.com/your-username/helpdesk-tools/main/helpdesk-tools.user.js)
3. Tampermonkey sẽ tự động nhận diện và hỏi cài đặt
4. Click **Install**

### Cách 2: Cài thủ công
1. Mở Tampermonkey → **Create a new script**
2. Copy toàn bộ code từ `helpdesk-tools.user.js`
3. Paste vào và lưu (Ctrl+S)

## 🔐 Cấu hình Discord Webhook (Lần đầu)

- Khi truy cập helpdesk, script sẽ tự động hiện popup yêu cầu nhập Discord Webhook
- **Chỉ cần nhập 1 lần duy nhất**, script sẽ lưu vào localStorage
- Webhook chỉ lưu trên máy tính cá nhân, không gửi đi đâu khác

## 🔄 Cập nhật

Tampermonkey tự động kiểm tra và cập nhật script khi có version mới.

Hoặc cập nhật thủ công:
1. Mở Tampermonkey → Dashboard
2. Click **Check for updates**

## ⚠️ Lưu ý

- Script chỉ hoạt động trên: `https://helpdesk.crownx.com.vn/*`
- Không chứa thông tin nhạy cảm hay backdoor
- Webhook được lưu cục bộ, không chia sẻ với bất kỳ ai

## 🛠️ Phát triển

### Clone repository
```bash
git clone https://github.com/your-username/helpdesk-tools.git
cd helpdesk-tools