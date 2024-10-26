Giải thích:
- .vscode: Thư mục chạy dự án bằng Visual Studio Code.
- front-end: Thư mục chứa front end phát triển bằng ReactJS.
- shop-fan: Thư mục chứa back end phát triển bằng Java Spring Boot.
- PhatTrienUngDungJava.pptx: Tệp PowerPoint giới thiệu các công nghệ sử dụng trong dự án.
- fan.sql: Tệp tạo cơ sở dữ liệu.
- scriptShopFan.sql: Tệp script của cơ sở dữ liệu fan-database.

Điều kiện chạy dự án:
- Tải các ứng dụng phát triển Java Spring Boot (ví dụ: Visual Studio Code, IntelliJ,...).
- Tải ứng dụng cơ sở dữ liệu (khuyến nghị PostgreSQL).
- Tải JDK 17.
- Tải node.js.
- Tải npm.

Chạy dự án:
- Mở ứng dụng PostgreSQL và khôi phục cơ sở dữ liệu fan-database bằng tệp scriptShopFan.sql (nếu sử dụng ứng dụng khác thì phải cấu hình lại trong /shop-fan/src/main/resources/application.properties)
- Mở dự án bằng các ứng dụng phát triển Java Spring Boot (ví dụ: Visual Studio Code, IntelliJ,...) và chạy dự án.
- Chạy ứng dụng front end bằng cách mở Terminal và di chuyển đến thư mục front-end (cd front-end), sau đó gõ: npm start.
