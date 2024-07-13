import path from 'path';
import express from 'express';
import fetch from 'node-fetch';
import cors from 'cors'; // Import middleware CORS

// Lấy đường dẫn thư mục hiện tại
const __dirname = path.dirname(new URL(import.meta.url).pathname);
// Tạo ứng dụng Express
const app = express();
// Cổng mặc định là 3000, hoặc sử dụng cổng từ biến môi trường nếu có
const PORT = process.env.PORT || 3000;
// Khóa API của OpenWeatherMap để truy cập dữ liệu thời tiết
const API_KEY = 'f8e60900c140a218bb5d04c85993a082';
// Tên thành phố (Ho Chi Minh City) để truy vấn thời tiết
const CITY = 'Ho Chi Minh City';

// Sử dụng middleware để phục vụ các file tĩnh từ thư mục 'public'
app.use(express.static(path.join(__dirname, 'public')));
// Sử dụng middleware CORS để cho phép các yêu cầu từ các domain khác nhau
app.use(cors());

// Định nghĩa route '/weather' để lấy dữ liệu thời tiết
app.get('/weather', async (req, res) => {
    try {
        // Xây dựng URL API để lấy dữ liệu thời tiết từ OpenWeatherMap
        const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${CITY}&appid=${API_KEY}&units=metric`;
        // Gửi yêu cầu đến API và đợi phản hồi
        const response = await fetch(apiUrl);
        // Chuyển đổi phản hồi thành đối tượng JSON
        const data = await response.json();
        // Trích xuất thông tin thời tiết cần thiết từ dữ liệu nhận được
        const weather = {
            temperature: data.main.temp,
            description: data.weather[0].description
        };
        // Trả về thông tin thời tiết dưới dạng JSON
        res.json(weather);
    } catch (error) {
        // Xử lý lỗi nếu có và trả về thông báo lỗi
        console.error('Lỗi khi lấy dữ liệu thời tiết:', error);
        res.status(500).json({ error: 'Lỗi khi lấy dữ liệu thời tiết' });
    }
});

// Khởi động server và lắng nghe các yêu cầu tới cổng 
app.listen(PORT, () => {
    console.log(`Server đang chạy tại http://localhost:${PORT}`);
});
