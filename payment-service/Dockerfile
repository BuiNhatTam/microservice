# Chọn Node.js image làm base
FROM node:16

# Thiết lập thư mục làm việc
WORKDIR /app

# Cài đặt dependencies
COPY package.json .
RUN npm install

# Sao chép mã nguồn vào container
COPY . .

# Mở port 3003
EXPOSE 3004

# Chạy ứng dụng
CMD ["node", "app.js"]



