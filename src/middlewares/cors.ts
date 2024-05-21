import cors from "cors";

const corsOptions = {
    origin: "https://sms1875.github.io/BDO-Things", // 클라이언트의 도메인으로 변경
    methods: "GET,POST", // 허용할 HTTP 메서드
    allowedHeaders: "Content-Type,Authorization" // 허용할 HTTP 헤더
};

const corsMiddleware = cors(corsOptions);

export default corsMiddleware;
