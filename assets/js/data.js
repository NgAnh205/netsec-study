/* Ngân hàng câu hỏi ôn tập An ninh mạng - 187 câu, 18 chủ đề.
   Nguồn: Tổng hợp câu hỏi (26.10.22). Đáp án đúng theo tài liệu gốc. */
window.SECTIONS = [
 {
  "id": "foundations",
  "name": "Cơ bản về an ninh thông tin",
  "en": "Fundamentals of Security",
  "color": "#6366f1",
  "from": 1,
  "to": 22
 },
 {
  "id": "netfund",
  "name": "Cơ bản về bảo mật mạng",
  "en": "Fundamentals of Network Security",
  "color": "#8b5cf6",
  "from": 23,
  "to": 32
 },
 {
  "id": "threats",
  "name": "Mối đe dọa an ninh mạng",
  "en": "Network Security Threats",
  "color": "#ef4444",
  "from": 33,
  "to": 42
 },
 {
  "id": "design",
  "name": "Thiết kế mạng",
  "en": "Network Design Considerations",
  "color": "#f59e0b",
  "from": 43,
  "to": 51
 },
 {
  "id": "fwfund",
  "name": "Cơ bản về tường lửa",
  "en": "Firewall Fundamentals",
  "color": "#0ea5e9",
  "from": 52,
  "to": 61
 },
 {
  "id": "fwimpl",
  "name": "Thực thi tường lửa",
  "en": "Firewall Implementation",
  "color": "#06b6d4",
  "from": 62,
  "to": 69
 },
 {
  "id": "fwdeploy",
  "name": "Triển khai tường lửa",
  "en": "Firewall Deployment",
  "color": "#14b8a6",
  "from": 70,
  "to": 77
 },
 {
  "id": "fwconfig",
  "name": "Cấu hình tường lửa",
  "en": "Configuring Firewalls",
  "color": "#10b981",
  "from": 78,
  "to": 87
 },
 {
  "id": "vpnfund",
  "name": "Cơ bản về VPN",
  "en": "VPN Fundamentals",
  "color": "#84cc16",
  "from": 88,
  "to": 97
 },
 {
  "id": "vpnmgmt",
  "name": "Quản lý VPN",
  "en": "VPN Management",
  "color": "#eab308",
  "from": 98,
  "to": 107
 },
 {
  "id": "vpntech",
  "name": "Công nghệ VPN",
  "en": "VPN Technologies",
  "color": "#f97316",
  "from": 108,
  "to": 117
 },
 {
  "id": "vpnimpl",
  "name": "Thực thi VPN",
  "en": "VPN Implementation",
  "color": "#ec4899",
  "from": 118,
  "to": 125
 },
 {
  "id": "fwsec",
  "name": "Quản lý bảo mật tường lửa",
  "en": "Firewall Security Management",
  "color": "#d946ef",
  "from": 126,
  "to": 135
 },
 {
  "id": "bestprac",
  "name": "Thực tiễn tốt nhất",
  "en": "Best Practices for Network Security Management",
  "color": "#a855f7",
  "from": 136,
  "to": 145
 },
 {
  "id": "emerging",
  "name": "Công nghệ mới & pháp lý",
  "en": "Emerging Technology and Regulatory Considerations",
  "color": "#64748b",
  "from": 146,
  "to": 154
 },
 {
  "id": "ethical",
  "name": "Hacking đạo đức",
  "en": "Ethical Hacking Overview",
  "color": "#22c55e",
  "from": 155,
  "to": 160
 },
 {
  "id": "attacks",
  "name": "Tấn công mạng & máy tính",
  "en": "Network and Computer Attacks",
  "color": "#f43f5e",
  "from": 161,
  "to": 174
 },
 {
  "id": "protection",
  "name": "Hệ thống bảo vệ mạng",
  "en": "Network Protection Systems",
  "color": "#3b82f6",
  "from": 175,
  "to": 187
 }
];

window.QUESTIONS = [
{
"id": 1,
"s": "foundations",
"q": "Ba thành phần của mô hình CIA là gì?",
"o": [
"Tính bí mật (Confidentiality), Tính toàn vẹn (Integrity), Tính trách nhiệm (Accountability)",
"Tính bí mật (Confidentiality), Tính toàn vẹn (Integrity), Tính sẵn sàng (Availability)",
"Kiểm soát (Control), Tính toàn vẹn (Integrity), Xác thực (Authentication)",
"Tính bí mật (Confidentiality), Định danh (Identity), Ủy quyền (Authorization)"
],
"a": 1
},
{
"id": 2,
"s": "foundations",
"q": "Định nghĩa tính bí mật (confidentiality) trong bối cảnh mô hình CIA.",
"o": [
"Đảm bảo thông tin chính xác và không bị thay đổi",
"Đảm bảo thông tin chỉ có thể được truy cập bởi những người dùng được ủy quyền",
"Đảm bảo các hệ thống và mạng luôn sẵn sàng khi cần thiết",
"Đảm bảo các hành động và sự kiện không thể bị phủ nhận"
],
"a": 1
},
{
"id": 3,
"s": "foundations",
"q": "Tính toàn vẹn dữ liệu là gì và làm thế nào để đảm bảo tính toàn vẹn đó?",
"o": [
"Đảm bảo dữ liệu chỉ có thể truy cập được bởi người dùng được ủy quyền, đạt được thông qua mã hóa",
"Đảm bảo dữ liệu luôn chính xác và không bị thay đổi, đạt được thông qua mã kiểm tra và băm",
"Đảm bảo dữ liệu luôn sẵn sàng khi cần, đạt được thông qua dự phòng và sao lưu",
"Đảm bảo dữ liệu không thể bị phủ nhận, đạt được thông qua chữ ký số và ghi nhật ký"
],
"a": 1
},
{
"id": 4,
"s": "foundations",
"q": "Giải thích khái niệm tính sẵn sàng (availability) trong an toàn thông tin.",
"o": [
"Đảm bảo dữ liệu chỉ có thể được truy cập bởi những người dùng được ủy quyền",
"Đảm bảo dữ liệu luôn chính xác và không bị thay đổi",
"Đảm bảo các hệ thống và mạng luôn hoạt động và có thể truy cập được khi cần thiết",
"Đảm bảo các hành động và sự kiện không thể bị chối bỏ"
],
"a": 2
},
{
"id": 5,
"s": "foundations",
"q": "Chống chối bỏ (non-repudiation) là gì và tại sao nó lại quan trọng?",
"o": [
"Đảm bảo dữ liệu chỉ có thể được truy cập bởi những người dùng được ủy quyền, duy trì tính bảo mật",
"Đảm bảo dữ liệu luôn chính xác và không bị thay đổi, duy trì tính toàn vẹn",
"Đảm bảo các hành động hoặc sự kiện không thể bị chối bỏ, yếu tố then chốt để xác định trách nhiệm và xây dựng lòng tin",
"Đảm bảo các hệ thống và mạng luôn hoạt động và có thể truy cập được khi cần thiết"
],
"a": 2
},
{
"id": 6,
"s": "foundations",
"q": "Sự khác biệt giữa xác thực (authentication) và ủy quyền (authorization) là gì?",
"o": [
"Xác thực giúp kiểm chứng danh tính của người dùng hoặc hệ thống; ủy quyền xác định những hành động mà họ được phép thực hiện.",
"Xác thực đảm bảo dữ liệu luôn chính xác và không bị thay đổi; ủy quyền theo dõi các hoạt động của người dùng phục vụ mục đích kiểm tra (audit).",
"Xác thực mã hóa dữ liệu để đảm bảo chỉ những người dùng được ủy quyền mới có thể truy cập; ủy quyền đảm bảo các hệ thống luôn hoạt động và có thể truy cập được.",
"Xác thực đảm bảo các hành động hoặc sự kiện không thể bị phủ nhận; ủy quyền đảm bảo dữ liệu luôn sẵn sàng khi cần thiết."
],
"a": 0
},
{
"id": 7,
"s": "foundations",
"q": "Định nghĩa về an toàn thông tin.",
"o": [
"Bảo vệ các hệ thống lưu trữ và xử lý dữ liệu quan trọng.",
"Bảo vệ dữ liệu khỏi sự truy cập, sửa đổi, gián đoạn, tiết lộ, làm hỏng hoặc phá hủy trái phép.",
"Đảm bảo các tài nguyên luôn sẵn sàng truy cập và hoạt động tốt khi cần thiết.",
"Xác minh danh tính của người dùng hoặc hệ thống."
],
"a": 1
},
{
"id": 8,
"s": "foundations",
"q": "Bảo mật hệ thống thông tin bao gồm những gì?",
"o": [
"Bảo vệ dữ liệu khỏi sự truy cập, sửa đổi, gián đoạn, tiết lộ, làm hỏng hoặc phá hủy trái phép.",
"Đảm bảo các hệ thống luôn hoạt động và có thể truy cập được.",
"Xác minh danh tính của người dùng hoặc hệ thống.",
"Theo dõi các hoạt động của người dùng và việc sử dụng tài nguyên phục vụ mục đích kiểm tra, đánh giá (auditing)."
],
"a": 0
},
{
"id": 9,
"s": "foundations",
"q": "Những thách thức chính mà các chuyên gia an ninh mạng phải đối mặt là gì?",
"o": [
"Cân bằng giữa tính bảo mật và tính tiện dụng.",
"Đảm bảo các hệ thống luôn hoạt động và có thể truy cập được.",
"Xác minh danh tính của người dùng hoặc hệ thống.",
"Bảo vệ dữ liệu khỏi sự truy cập và sửa đổi trái phép."
],
"a": 0
},
{
"id": 10,
"s": "foundations",
"q": "Tại sao việc cân bằng giữa bảo mật và khả năng sử dụng lại quan trọng trong an ninh mạng?",
"o": [
"Để đảm bảo dữ liệu luôn chính xác và không bị thay đổi.",
"Để bảo vệ các hệ thống khỏi sự truy cập và sửa đổi trái phép.",
"Để ngăn chặn các vụ rò rỉ dữ liệu gây tổn kém và đảm bảo tuân thủ các quy định.",
"Để duy trì sự bảo vệ hiệu quả, đồng thời cho phép người dùng truy cập và thực hiện các thao tác một cách thuận tiện."
],
"a": 3
},
{
"id": 11,
"s": "foundations",
"q": "Hãy đưa ra một ví dụ về biện pháp kiểm soát an ninh mạng tính phòng ngừa.",
"o": [
"Hệ thống phát hiện xâm nhập (IDS).",
"Đào tạo nâng cao nhận thức về an ninh",
"Mã hóa dữ liệu",
"Tường lửa"
],
"a": 3
},
{
"id": 12,
"s": "foundations",
"q": "Kiểm soát phát hiện (detective control) là gì và nó hoạt động như thế nào?",
"o": [
"Nó ngăn chặn các sự cố bằng cách đóng vai trò như một rào cản chống lại sự truy cập trái phép.",
"Nó ngăn ngừa các sự cố thông qua các biện cảnh báo và thông báo.",
"Nó xác định các sự cố sau khi chúng đã xảy ra thông qua việc giám sát và phân tích các hoạt động.",
"Nó khắc phục các vấn đề sau khi sự cố xảy ra thông qua các quy trình phục hồi và khôi phục."
],
"a": 2
},
{
"id": 13,
"s": "foundations",
"q": "Giải thích mục đích của các biện pháp kiểm soát khắc phục (corrective controls) trong an ninh mạng.",
"o": [
"Ngăn chặn các sự cố bằng cách đóng vai trò như một rào cản chống lại sự truy cập trái phép.",
"Hạn chế xảy ra sự cố thông qua các biện cảnh báo và thông báo.",
"Xác định các sự cố sau khi chúng đã xảy ra và giảm thiểu tác động của chúng.",
"Theo dõi hoạt động của người dùng và việc sử dụng tài nguyên phục vụ mục đích kiểm tra, đánh giá (auditing)."
],
"a": 2
},
{
"id": 14,
"s": "foundations",
"q": "Mô hình Zero Trust là gì và các nguyên tắc cốt lõi của nó bao gồm những gì?",
"o": [
"Mô hình này mặc định tin tưởng tất cả mọi người; các nguyên tắc cốt lõi bao gồm tính bảo mật, tính toàn vẹn và tính sẵn sàng.",
"Mô hình này mặc định không tin tưởng bất kỳ ai; các nguyên tắc cốt lõi bao gồm đặc quyền tối thiểu, xác minh và giám sát liên tục.",
"Mô hình này mặc định không tin tưởng bất kỳ ai; các nguyên tắc cốt lõi bao gồm mã hóa, xác thực và ủy quyền.",
"Mô hình này mặc định tin tưởng tất cả mọi người; các nguyên tắc cốt lõi bao gồm tính chống chối bỏ, trách nhiệm giải trình và kiểm tra, đánh giá (auditing)."
],
"a": 1
},
{
"id": 15,
"s": "foundations",
"q": "Khung mô hình AAA tăng cường bảo mật như thế nào?",
"o": [
"Bằng cách đảm bảo dữ liệu luôn chính xác và không bị thay đổi.",
"Bằng cách xác minh danh tính của người dùng hoặc hệ thống.",
"Bằng cách xác định các quyền dựa trên danh tính.",
"Bằng cách theo dõi các hoạt động của người dùng và việc sử dụng tài nguyên cho mục đích kiểm tra, đánh giá (auditing)."
],
"a": 2
},
{
"id": 16,
"s": "foundations",
"q": "Các biện pháp kiểm soát quản lý đóng vai trò gì trong an ninh mạng?",
"o": [
"Đảm bảo các hệ thống và mạng luôn hoạt động và có thể truy cập được.",
"Thực thi các chính sách và quy trình nhằm định hướng cho các hoạt động bảo mật.",
"Xác minh danh tính của người dùng hoặc hệ thống.",
"Theo dõi các hoạt động của người dùng và việc sử dụng tài nguyên phục vụ mục đích kiểm tra, đánh giá (auditing)."
],
"a": 1
},
{
"id": 17,
"s": "foundations",
"q": "Các biện pháp kiểm soát vật lý trong bối cảnh an toàn thông tin là gì?",
"o": [
"Chúng đảm bảo dữ liệu luôn chính xác và không bị thay đổi.",
"Chúng theo dõi các hoạt động của người dùng và việc sử dụng tài nguyên phục vụ mục đích kiểm tra, đánh giá (auditing).",
"Chúng thiết lập các rào cản vật lý để bảo vệ các tài sản như máy chủ và trung tâm dữ liệu.",
"Chúng xác minh danh tính của người dùng hoặc hệ thống."
],
"a": 2
},
{
"id": 18,
"s": "foundations",
"q": "Tại sao độ phức tạp của mật khẩu lại quan trọng đối với bảo mật?",
"o": [
"Để đảm bảo dữ liệu luôn chính xác và không bị thay đổi.",
"Để thiết lập các rào cản vật lý nhằm bảo vệ tài sản.",
"Để ngăn chặn truy cập trái phép và giảm thiểu các cuộc tấn công bẻ khóa mật khẩu.",
"Để theo dõi hoạt động của người dùng và việc sử dụng tài nguyên phục vụ mục đích kiểm tra, đánh giá (auditing)."
],
"a": 2
},
{
"id": 19,
"s": "foundations",
"q": "Trong an ninh mạng, \"các biện pháp kiểm soát bù trừ\" (compensating controls) có nghĩa là gì?",
"o": [
"Các biện pháp ngăn chặn sự cố bằng cách đóng vai trò như một rào cản chống lại sự truy cập trái phép.",
"Các biện pháp bảo mật bổ sung cung cấp sự bảo vệ thay thế khi các biện pháp kiểm soát chính không khả thi.",
"Các biện pháp theo dõi hoạt động của người dùng và việc sử dụng tài nguyên phục vụ mục đích kiểm tra, đánh giá (auditing).",
"Các biện pháp đảm bảo dữ liệu luôn chính xác và không bị thay đổi."
],
"a": 1
},
{
"id": 20,
"s": "foundations",
"q": "Hãy giải thích tầm quan trọng của các chính sách bảo mật trong một tổ chức?",
"o": [
"Các chính sách này ngăn ngừa sự cố bằng cách đóng vai trò như một rào cản chống lại sự truy cập trái phép.",
"Các chính sách này ngăn chặn sự cố thông qua các biện cảnh báo và thông báo.",
"Các chính sách này cung cấp các hướng dẫn và tiêu chuẩn nhằm định hướng hành vi và đảm bảo sự tuân thủ.",
"Các chính sách này theo dõi hoạt động của người dùng và việc sử dụng tài nguyên phục vụ cho mục đích kiểm tra, đánh giá (auditing)."
],
"a": 2
},
{
"id": 21,
"s": "foundations",
"q": "Mục tiêu chính của mô hình Zero Trust là gì?",
"o": [
"Giả định rằng mọi người đều được tin tưởng theo mặc định, nhằm đảm bảo khả năng truy cập dễ dàng vào các tài nguyên.",
"Áp dụng các tiêu chuẩn mã hóa nghiêm ngặt để bảo vệ dữ liệu.",
"Giả định rằng không ai được tin tưởng theo mặc định, đồng thời liên tục xác minh và bảo mật quyền truy cập.",
"Cung cấp cơ chế kiểm tra toàn diện đối với các hoạt động của người dùng và việc sử dụng tài nguyên."
],
"a": 2
},
{
"id": 22,
"s": "foundations",
"q": "Các hệ thống phát hiện xâm nhập (IDS) góp phần vào công tác bảo mật như thế nào?",
"o": [
"Bằng cách ngăn chặn các sự cố thông qua các rào cản vật lý và kiểm soát truy cập.",
"Bằng cách ngăn ngừa các sự cố thông qua các biện cảnh báo và thông báo.",
"Bằng cách xác định các hoạt động đáng ngờ và các mối đe dọa tiềm ẩn theo thời gian thực.",
"Bằng cách theo dõi hoạt động của người dùng và việc sử dụng tài nguyên cho mục đích kiểm tra, đánh giá (auditing)."
],
"a": 2
},
{
"id": 23,
"s": "netfund",
"q": "Phát biểu nào sau đây mô tả chính xác nhất nguyên tắc đặc quyền tối thiểu (principle of least privilege)?",
"o": [
"Cho phép người dùng chỉ truy cập vào các mục nằm trong gói thanh toán của họ",
"Cho phép người dùng truy cập vào các mục chỉ trong khung giờ làm việc theo lịch trình thông thường của họ",
"Chỉ phát triển bản vá lỗi sau khi lỗ hổng bảo mật đã được phát hiện và công bố rộng rãi",
"Chỉ cho phép người dùng truy cập vào những gì cần thiết cho các trách nhiệm công việc của họ"
],
"a": 3
},
{
"id": 24,
"s": "netfund",
"q": "Phát biểu nào sau đây mô tả chính xác nhất khái niệm rủi ro?",
"o": [
"Nội dung không được bảo mật trên mạng, có thể bị lợi dụng để truy cập vào mạng đó",
"Bề mặt tiếp xúc xuất hiện khi một mạng đang hoạt động, mà tin tặc có thể tận dụng để truy cập",
"Giải pháp kết hợp những phương án tối ưu nhất cho một mạng cụ thể",
"Khả năng một mối đe dọa sẽ khai thác lỗ hổng bảo mật trên mạng"
],
"a": 3
},
{
"id": 25,
"s": "netfund",
"q": "Đặc điểm quan trọng nhất của một mục tiêu bảo mật hiệu quả là gì?",
"o": [
"Mục tiêu đó không tốn kém.",
"Mục tiêu đó khả thi với các công nghệ hiện đang được triển khai.",
"Mục tiêu đó được ghi lại bằng văn bản.",
"Mục tiêu đó được tất cả nhân sự phê duyệt."
],
"a": 2
},
{
"id": 26,
"s": "netfund",
"q": "Phát biểu nào sau đây là đúng về bảo mật mạng?",
"o": [
"Việc sử dụng một khuôn khổ (framework) đảm bảo sự thành công trong việc bảo mật mạng.",
"Bảo mật mạng bao gồm các yếu tố ngăn chặn sự truy cập và hành động không mong muốn.",
"Việc áp dụng các bản sửa lỗi mới nhất cho bất kỳ cấu trúc mạng nào cũng đều dễ dàng.",
"Bảo mật mạng thường có thể được đảm bảo mà không cần tốn kém chi phí."
],
"a": 1
},
{
"id": 27,
"s": "netfund",
"q": "Mối quan ngại chính về bảo mật đối với các kết nối không dây là gì?",
"o": [
"Tính dư thừa (Redundancy)",
"Phạm vi tín hiệu",
"Hỗ trợ IPv6",
"Tốc độ kết nối"
],
"a": 1
},
{
"id": 28,
"s": "netfund",
"q": "Bức xạ Van Eck cho phép thực hiện điều gì?",
"o": [
"Kẻ tấn công mã hóa ở cúng của thiết bị cho đến khi nhận được tiền chuộc",
"Gửi một lượng lớn gói tin để duy trì cuộc tấn công từ chối dịch vụ (DoS)",
"Kẻ tấn công nghe lén các thiết bị điện tử từ xa",
"Hạn chế quyền truy cập vào bất kỳ thiết bị vật lý nào trên mạng"
],
"a": 2
},
{
"id": 29,
"s": "netfund",
"q": "Phát biểu nào sau đây mô tả chính xác nhất khái niệm \"hardening\" (củng cố bảo mật)?",
"o": [
"Di chuyển dữ liệu từ môi trường đám mây sang các vị trí lưu trữ vật lý",
"Cho phép người dùng truy cập vào mạng thông qua các thiết bị cá nhân của họ",
"Quá trình bảo mật hoặc thắt chặt cấu hình của một máy chủ (host) nhằm chống lại các mối đe dọa và tấn công",
"Loại bỏ các phần mềm không cần thiết khỏi các máy tính và thiết bị trong nhóm làm việc (workgroup)"
],
"a": 2
},
{
"id": 30,
"s": "netfund",
"q": "Phát biểu nào sau đây mô tả chính xác nhất về tính sẵn sàng của mạng (network availability)?",
"o": [
"Bảo vệ trước các thay đổi trái phép trong khi vẫn cho phép các thay đổi hợp lệ",
"Bảo vệ trước các chi phí không cần thiết trong khi vẫn cho phép các khoản chi tiêu hợp lý",
"Bảo vệ trước tình trạng ngừng hoạt động (downtime) trong khi vẫn hỗ trợ quyền truy cập hợp lệ vào các tài nguyên",
"Bảo vệ trước hành vi truy cập trái phép trong khi vẫn cung cấp quyền truy cập hợp lệ"
],
"a": 2
},
{
"id": 31,
"s": "netfund",
"q": "Đối với loại mối đe dọa nào mà hiện chưa có biện pháp phòng vệ?",
"o": [
"Zero-day (lỗ hổng chưa được biết đến)",
"Mã độc",
"Phần mềm trái phép",
"Hỏng hóc phần cứng"
],
"a": 0
},
{
"id": 32,
"s": "netfund",
"q": "Phát biểu nào sau đây mô tả chính xác nhất về khái niệm \"không thể chối bỏ\" (nonrepudiation)?",
"o": [
"Ngăn không cho người dùng phủ nhận việc họ đã thực hiện một hành động nào đó.",
"Kiểm soát những gì người dùng được phép hoặc không được phép thực hiện.",
"Là bảng chứng xác thực danh tính của người dùng trước khi cho phép truy cập vào một khu vực được bảo mật.",
"Đảm bảo rằng mã độc không lan tràn trên mạng của doanh nghiệp."
],
"a": 0
},
{
"id": 33,
"s": "threats",
"q": "Loại tin tặc nào gây ra mối đe dọa lớn nhất vì chúng có khả năng đã tiếp cận được mục tiêu về mặt vật lý?",
"o": [
"Tư vấn viên",
"Đối thủ cạnh tranh",
"Người dọn dẹp (Cleaner)",
"Khách hàng"
],
"a": 0
},
{
"id": 34,
"s": "threats",
"q": "Hầu hết các phương thức khai thác (exploit) đều dựa trên sự tồn tại của yếu tố nào sau đây?",
"o": [
"Tốc độ băng thông",
"Con người",
"Các giao thức lọc",
"Những điểm bất thường trong hệ thống"
],
"a": 1
},
{
"id": 35,
"s": "threats",
"q": "Giai đoạn hoặc bước đầu tiên trong quy trình tấn công mạng (hacking) là gì?",
"o": [
"Liệt kê (Enumeration)",
"Xâm nhập (Penetration)",
"Thu thập thông tin (Reconnaissance)",
"Quét (Scanning)"
],
"a": 2
},
{
"id": 36,
"s": "threats",
"q": "Hình thức tấn công nào thu giữ các gói xác thực được truyền lại chúng sau đó?",
"o": [
"Chiếm quyền điều khiển (Hijacking)",
"Chèn (Insertion)",
"Gián đoạn (Interruption)",
"Phát lại (Relay)"
],
"a": 3
},
{
"id": 37,
"s": "threats",
"q": "Hình thức tấn công nào gửi một lượng dữ liệu quá lớn đến mục tiêu nhằm gây ra việc thực thi mã tùy ý?",
"o": [
"Tràn bộ đệm (Buffer overflow)",
"Phân mảnh (Fragmentation)",
"Chèn (Insertion)",
"Gián đoạn (Interruption)"
],
"a": 0
},
{
"id": 38,
"s": "threats",
"q": "Kiểu tấn công nào dựa trên việc mạo danh một máy chủ hợp lệ?",
"o": [
"Từ chối dịch vụ (DoS)",
"Phân mảnh (Fragmentation)",
"Chiếm quyền điều khiển (Hijacking)",
"Mạo danh (Spoofing)"
],
"a": 3
},
{
"id": 39,
"s": "threats",
"q": "Phương thức giao tiếp nào không bị phát hiện, không qua bộ lọc và dựa trên việc thao túng thời gian?",
"o": [
"Tràn bộ đệm (Buffer overflow)",
"Kênh ẩn (Covert channel)",
"Chèn dữ liệu vào hệ thống phát hiện xâm nhập (IDS insertion)",
"Tấn công xen giữa (Man-in-the-middle)"
],
"a": 1
},
{
"id": 40,
"s": "threats",
"q": "Kiểu tấn công nào sử dụng các phương thức phi kỹ thuật để đạt được kết quả?",
"o": [
"Tràn bộ đệm (Buffer overflow)",
"Kênh ẩn (Covert channel)",
"Kỹ thuật thao túng tâm lý (Social engineering)",
"Tiêm mã SQL (SQL injection)"
],
"a": 2
},
{
"id": 41,
"s": "threats",
"q": "Hacker khai thác yếu tố nào trong hệ thống mục tiêu?",
"o": [
"Một mạng máy tính ma (botnet)",
"Một lỗ hổng bảo mật (vulnerability)",
"Xác thực đa yếu tố (Multifactor authentication)",
"Lọc lưu lượng truy cập (Traffic filtering)"
],
"a": 1
},
{
"id": 42,
"s": "threats",
"q": "Hacker có thể thực hiện phương thức nào sau đây nếu các nỗ lực khác không thành công?",
"o": [
"Tràn bộ đệm (Buffer overflow)",
"Tấn công dự phòng (Fallback attack)",
"Kênh ẩn (Covert channels)",
"Tấn công zombie (Zombie attack)"
],
"a": 1
},
{
"id": 43,
"s": "design",
"q": "Hành động nào sau đây nên được thực hiện như một phần của quá trình cấu hình bộ định tuyến (router)?",
"o": [
"Sao chép và dán cấu hình vào tất cả các bộ định tuyến và tường lửa",
"Bật thông báo cảnh báo (banner) cho mọi nỗ lực kết nối",
"Yêu cầu sử dụng SNMP v2 hoặc phiên bản cao hơn để đảm bảo tính nhất quán",
"Loại bỏ tất cả các gói tin đã mã hóa nằm trong phạm vi mạng (network perimeter)"
],
"a": 1
},
{
"id": 44,
"s": "design",
"q": "Loại tấn công nào sau đây không phải là loại tấn công nhằm vào việc sử dụng mật khẩu?",
"o": [
"Tấn công vét cạn (Brute-force)",
"Tấn công từ điển (Dictionary)",
"Tấn công kết hợp (Hybrid)",
"Tấn công đệ quy (Recursive)"
],
"a": 3
},
{
"id": 45,
"s": "design",
"q": "Yếu tố nào sau đây là một phần của chiến lược phòng thủ theo chiều sâu (defense-in-depth)?",
"o": [
"Tránh các điểm lỗi duy nhất (single points of failure)",
"Tránh việc có nhiều thành phần dự phòng (redundancies)",
"Tránh loại bỏ tài khoản mặc định",
"Tránh sử dụng các thiết bị từ những nhà sản xuất khác nhau"
],
"a": 0
},
{
"id": 46,
"s": "design",
"q": "Câu nào sau đây là một ví dụ về tính dự phòng?",
"o": [
"Tường lửa tại mỗi điểm kết nối vật lý",
"Sử dụng xác thực đa yếu tố",
"Mã hóa thông tin liên lạc bên ngoài mạng",
"Bộ lưu điện để không gián đoạn"
],
"a": 3
},
{
"id": 47,
"s": "design",
"q": "Định nghĩa nào sau đây mô tả chính xác nhất khái niệm \"bảo mật thông qua sự mơ hồ\" (security through obscurity)?",
"o": [
"Thay đổi tên dán trên tất cả các thiết bị vật lý",
"Thay đổi tên logic của tất cả các thiết bị",
"Che giấu mạng để bảo mật cho nó",
"Mở rộng mạng nhằm che giấu các thiết bị riêng lẻ"
],
"a": 2
},
{
"id": 48,
"s": "design",
"q": "Khi xem xét xác thực đa yếu tố, yếu tố nào sau đây thuộc loại \"thứ bạn sở hữu\" (something you have)?",
"o": [
"Quét mống mắt (iris scan)",
"Thẻ căn cước (ID card)",
"Một cụm từ được nói ra",
"Mật khẩu"
],
"a": 1
},
{
"id": 49,
"s": "design",
"q": "Thuật ngữ nào sau đây thường được gọi là kiểm soát truy cập (access control)?",
"o": [
"Kế toán (Accounting)",
"Kiểm toán (Auditing)",
"Xác thực (Authentication)",
"Ủy quyền (Authorization)"
],
"a": 3
},
{
"id": 50,
"s": "design",
"q": "Phát biểu nào sau đây là đúng khi so sánh IPv4 và IPv6?",
"o": [
"Việc triển khai IPv4 tốn kém hơn so với IPv6.",
"IPv4 tốn nhiều thời gian hơn trong quá trình tạo các gói tin (packet).",
"IPv4 được sử dụng ít hơn, do đó ít người biết về nó hơn.",
"Theo mặc định, IPv4 truyền dữ liệu dưới dạng văn bản thuần túy (plaintext)."
],
"a": 3
},
{
"id": 51,
"s": "design",
"q": "Câu nào sau đây mô tả chính xác một thiết bị mã hóa mật khẩu động?",
"o": [
"Thiết bị hiển thị mật khẩu ngẫu nhiên",
"Chip nhận dạng tần số vô tuyến (RFID)",
"Thẻ nhận dạng (ID)",
"Thẻ thông minh"
],
"a": 0
},
{
"id": 52,
"s": "fwfund",
"q": "Phát biểu nào sau đây là đúng về các quy tắc tường lửa (firewall rules)?",
"o": [
"Các quy tắc tuân theo nguyên lý: mặc định cho phép (allow by default) và từ chối dựa trên các ngoại lệ (deny by exception).",
"Không có quy tắc nào trên tường lửa được coi là ngoại lệ.",
"Tất cả các quy tắc trên tường lửa đều là các ngoại lệ.",
"Quy tắc cuối cùng quy định rằng bất kỳ nội dung nào không khớp với các ngoại lệ nêu trên đều được mặc định cho phép."
],
"a": 2
},
{
"id": 53,
"s": "fwfund",
"q": "Kiểu tấn công nào sau đây không bị ngăn chặn bởi tường lửa biên (border firewall)?",
"o": [
"Quét cổng (Port scans)",
"Lạm dụng giao thức (Protocol abuses)",
"Tấn công từ máy khách nội bộ nhằm vào máy chủ nội bộ",
"Tấn công làm tràn ngập hệ thống (Flooding attacks)"
],
"a": 2
},
{
"id": 54,
"s": "fwfund",
"q": "Phát biểu nào sau đây không đúng về tường lửa (firewall)?",
"o": [
"Tường lửa là một loại hệ thống xác thực.",
"Tường lửa có thể lọc lưu lượng truy cập.",
"Tường lửa có thể cung cấp các chức năng định tuyến.",
"Tường lửa là một thiết bị kiểm soát lưu lượng truy cập."
],
"a": 0
},
{
"id": 55,
"s": "fwfund",
"q": "Định nghĩa nào sau đây mô tả chính xác nhất về lọc lưu lượng truy cập vào (ingress filtering)?",
"o": [
"Chặn lưu lượng rời khỏi mạng",
"Giới hạn các hoạt động của máy chủ trong phạm vi máy chủ đó",
"Giám sát lưu lượng truy cập đi vào mạng",
"Cho phép tất cả lưu lượng truy cập đi vào mạng"
],
"a": 2
},
{
"id": 56,
"s": "fwfund",
"q": "Tên gọi khác của lọc gói tin động (dynamic packet filtering) là gì?",
"o": [
"Kiểm tra trạng thái (Stateful inspection)",
"Lọc gói tin tĩnh (Static packet filtering)",
"Lọc gói tin có cấu trúc (Structured packet filtering)",
"Kiểm tra tuần tự (Sequential inspection)"
],
"a": 0
},
{
"id": 57,
"s": "fwfund",
"q": "Phương pháp lọc nào sau đây tự động theo dõi các phiên dựa trên thời gian chờ giới hạn để cho phép các phản hồi truy vấn đến được các hệ thống nội bộ?",
"o": [
"Lọc ứng dụng",
"Kiểm tra gói tin chuyên sâu",
"Lọc gói tin động",
"Lọc gói tin tĩnh"
],
"a": 2
},
{
"id": 58,
"s": "fwfund",
"q": "Hình thức lọc nào sau đây cho phép truyền thông diễn ra, bất kể phiên làm việc đã được thiết lập trước đó hay chưa?",
"o": [
"Circuit proxy (Proxy mạch)",
"Dynamic packet filtering (Lọc gói tin động)",
"Deep packet inspection (Kiểm tra gói tin chuyên sâu)",
"Stateless filtering (Lọc không trạng thái)"
],
"a": 0
},
{
"id": 59,
"s": "fwfund",
"q": "Hoạt động nào tạo nên sự khác biệt giữa tường lửa ba cổng (triple-homed firewall) và tường lửa hai cổng (dual-homed firewall)?",
"o": [
"Cách ly vật lý các mạng con (subnet)",
"Triển khai thiết bị dưới dạng một thiết bị chuyên dụng (appliance)",
"Điều phối lưu lượng truy cập từ Internet vào vùng DMZ",
"Lọc nội dung, bao gồm cả việc xóa các tập tin đính kèm"
],
"a": 2
},
{
"id": 60,
"s": "fwfund",
"q": "Khi triển khai tường lửa phần mềm, số lượng tối đa tường lửa hoạt động trên một hệ thống đơn cùng một lúc là bao nhiêu?",
"o": [
"1",
"2",
"5",
"10"
],
"a": 0
},
{
"id": 61,
"s": "fwfund",
"q": "Phương pháp nào sau đây không phải là phương pháp lọc nội dung?",
"o": [
"Tên miền",
"Địa chỉ IP nguồn",
"Từ khóa trong gói tin",
"Tên tập tin"
],
"a": 1
},
{
"id": 62,
"s": "fwimpl",
"q": "Đâu là hai lĩnh vực riêng biệt cần được bảo vệ bằng tường lửa?",
"o": [
"Quyền truy cập và các biện pháp kiểm soát",
"Khả năng chia sẻ tập tin và in ấn",
"Bảo mật mạng và giao dịch",
"Lưu lượng truy cập mạng diện rộng (WAN) và tín hiệu di động"
],
"a": 2
},
{
"id": 63,
"s": "fwimpl",
"q": "Trong các lựa chọn sau, đâu không phải là một trong những loại rủi ro có sự chồng chéo trong bảo mật mạng và giao dịch?",
"o": [
"Dữ liệu giao dịch có thể bị chặn thu",
"Phần cứng máy chủ có thể gặp sự cố",
"Thông tin về máy chủ có thể bị truy cập",
"Các cá nhân không được ủy quyền có thể xâm nhập vào cấu trúc tập tin (cây tài liệu) của máy chủ"
],
"a": 1
},
{
"id": 64,
"s": "fwimpl",
"q": "Cách nào sau đây là tốt nhất để đảm bảo tính bí mật cho các tin nhắn riêng tư?",
"o": [
"Gửi tin nhắn từ các tài khoản email cá nhân",
"Gửi tin nhắn cho tất cả mọi người để tin nhắn đó không còn mang tính riêng tư nữa",
"Mã hóa tin nhắn để duy trì tính riêng tư",
"Không gửi các tin nhắn công việc mang tính riêng tư"
],
"a": 2
},
{
"id": 65,
"s": "fwimpl",
"q": "Câu nào sau đây mô tả chính xác nhất khái niệm không thể phủ nhận?",
"o": [
"Một hành động được sao chép sang nhiều hệ thống để tránh bị trùng lặp",
"Một hành động được ghi lại để có thể khôi phục nếu bị xóa",
"Một hành động được lặp lại để tránh bị trùng lặp",
"Một hành động không thể bị phủ nhận là đã xảy ra"
],
"a": 3
},
{
"id": 66,
"s": "fwimpl",
"q": "Công cụ nào sau đây không phải là công cụ khắc phục sự cố cho tường lửa?",
"o": [
"ipconfig",
"ping",
"NAT",
"traceroute"
],
"a": 2
},
{
"id": 67,
"s": "fwimpl",
"q": "Đâu không phải là chức năng của tường lửa (firewall)?",
"o": [
"Chặn lưu lượng truy cập trái phép từ Internet",
"Chặn các kết nối trái phép từ những kẻ tấn công bên ngoài",
"Ngăn một thiết bị bị sử dụng quá nhiều băng thông",
"Chặn thông tin nhạy cảm bị gửi ra Internet"
],
"a": 2
},
{
"id": 68,
"s": "fwimpl",
"q": "Phương pháp nào sau đây không phải là phương pháp cài đặt pfSense?",
"o": [
"Truyền phát qua mạng",
"Ổ đĩa quang",
"Ổ đĩa USB",
"Thẻ nhớ (Memstick)"
],
"a": 0
},
{
"id": 69,
"s": "fwimpl",
"q": "Khi lựa chọn giải pháp tường lửa, những yếu tố nào sau đây là các vấn đề bảo mật cần cân nhắc?",
"o": [
"Khả năng kiểm toán (Audit capabilities)",
"Kiểm soát đặc quyền (Privilege control)",
"Tốc độ làm mới (Refresh rate)",
"Xác thực (Authentication)"
],
"a": 2
},
{
"id": 70,
"s": "fwdeploy",
"q": "Khi nào thì reverse proxy (proxy ngược) trở nên hữu ích?",
"o": [
"Để cấp quyền truy cập vào các máy chủ email nội bộ cho người dùng bên ngoài",
"Để hỗ trợ người dùng nội bộ truy cập vào Internet công cộng",
"Để cho phép người dùng nội bộ truy cập vào các máy chủ web bên ngoài",
"Để cung cấp quyền truy cập vào một máy chủ web nội bộ cho các thực thể bên ngoài"
],
"a": 3
},
{
"id": 71,
"s": "fwdeploy",
"q": "Sự kiện nào sau đây xuất hiện trong tập tin nhật ký tường lửa, cho thấy dấu hiệu của một máy chủ trái phép (rogue host) đang hoạt động bên trong mạng nội bộ?",
"o": [
"Các gói tin xuất phát từ một địa chỉ nội bộ chưa được gán",
"Các gói tin gửi đến một cổng không xác định trên một máy chủ nội bộ",
"Các gói tin xuất hiện theo chuỗi, cố gắng truy cập vào một loạt các cổng",
"Các gói tin hoàn toàn giống hệt nhau, cùng hướng đến một mục tiêu duy nhất"
],
"a": 0
},
{
"id": 72,
"s": "fwdeploy",
"q": "Chiến lược bảo mật nào dựa trên việc thắt chặt môi trường, sao cho người dùng chỉ có thể thực hiện các nhiệm vụ được giao mà không thể làm gì khác hơn?",
"o": [
"Thiết lập các điểm kiểm soát (chokepoints)",
"Đa dạng hóa các biện pháp phòng thủ",
"Nguyên tắc đặc quyền tối thiểu (principle of least privilege)",
"Phân tách nhiệm vụ (separation of duties)"
],
"a": 2
},
{
"id": 73,
"s": "fwdeploy",
"q": "Phát biểu nào sau đây là đúng về reverse proxy (proxy ngược)?",
"o": [
"Máy chủ reverse proxy có thể đóng vai trò là điểm cuối cho một đường hầm (tunnel) TLS.",
"Reverse proxy không thể được sử dụng cùng với các trang web bảo mật.",
"Reverse proxy có thể được sử dụng với các VPN IPSec ở chế độ đường hầm (tunnel mode).",
"Reverse proxy không thể hỗ trợ các đường hầm SSL đồng thời."
],
"a": 0
},
{
"id": 74,
"s": "fwdeploy",
"q": "Đâu là đặc điểm quan trọng nhất đối với hệ điều hành của một bastion host (máy chủ pháo đài)?",
"o": [
"Tận dụng kiến thức quản trị hệ điều hành sẵn có",
"Sự thuận tiện, dễ sử dụng vốn có",
"Khả năng chống lại các cuộc tấn công và các nỗ lực xâm nhập",
"Khả năng quản trị từ xa không giới hạn"
],
"a": 2
},
{
"id": 75,
"s": "fwdeploy",
"q": "Khi cân nhắc triển khai IDS hoặc IPS, vấn đề lớn nhất là gì?",
"o": [
"Thất bại trong việc phát hiện điểm bất thường",
"Cảnh báo dương tính giả (False positives)",
"Cảnh báo âm tính giả (False negatives)",
"Không thể vận hành ở tốc độ đường truyền (wire speed)"
],
"a": 2
},
{
"id": 76,
"s": "fwdeploy",
"q": "Quan điểm bảo mật nào tập trung vào việc sử dụng tường lửa như phương tiện chính để kiểm soát thông tin liên lạc?",
"o": [
"Điểm nghẽn",
"Sự tham gia toàn diện",
"An toàn tuyệt đối",
"Mắt xích yếu nhất"
],
"a": 0
},
{
"id": 77,
"s": "fwdeploy",
"q": "Thuật ngữ nào mô tả việc triển khai nhiều mạng con (subnet) nối tiếp nhau để tách biệt các tài nguyên riêng tư (private resources) khỏi các tài nguyên công khai (public resources)?",
"o": [
"Diverse (Đa dạng)",
"Separation (Tách biệt)",
"N-tier (N-tầng)",
"DMZ"
],
"a": 2
},
{
"id": 78,
"s": "fwconfig",
"q": "Hướng dẫn nào sau đây là quan trọng nhất đối với các quy tắc tường lửa?",
"o": [
"Đưa mọi địa chỉ và cổng có thể có vào một quy tắc trong tập hợp các quy tắc, nhằm đảm bảo rằng mọi loại hình giao tiếp đều được quy định cụ thể.",
"Đặt các quy tắc từ chối (Deny) cụ thể cho từng hệ thống riêng lẻ trước các quy tắc cho phép (Allow) áp dụng cho các dải địa chỉ bao gồm cả những hệ thống đó.",
"Đặt các quy tắc cho phép (Allow) chung cho từng hệ thống riêng lẻ trước các quy tắc từ chối (Deny) chung áp dụng cho các hệ thống nằm trong dải địa chỉ đó.",
"Đưa tất cả các quy tắc từ chối cụ thể đối với các công cụ điều khiển từ xa độc hại đã biết vào sau các quy tắc cho phép (Allow) cụ thể."
],
"a": 2
},
{
"id": 79,
"s": "fwconfig",
"q": "Hình thức mã hóa nào cho phép tường lửa lọc dựa trên địa chỉ nguồn và đích ban đầu? (Giả sử tường lửa nằm dọc theo đường dẫn giữa các điểm cuối phiên.)",
"o": [
"Chế độ đường hầm",
"Chế độ vận chuyển",
"Chế độ lưu lượng",
"Chế độ giao dịch"
],
"a": 1
},
{
"id": 80,
"s": "fwconfig",
"q": "Quy tắc nào sau đây là quy tắc từ chối mặc định (default-deny)?",
"o": [
"TCP ANY 192.168.42.0/24 ANY ANY Deny",
"TCP ANY ANY 192.168.42.0/24 ANY Deny",
"TCP ANY ANY ANY ANY Deny",
"DENY TCP ANY ANY ANY ANY"
],
"a": 1
},
{
"id": 81,
"s": "fwconfig",
"q": "Đâu là điểm yếu tiềm ẩn của tường lửa mà việc áp dụng bản vá (patch) không thể khắc phục được?",
"o": [
"Phân mảnh (Fragmentation)",
"Lỗi lập trình (Programming bug)",
"Lỗ hổng tràn bộ đệm (Buffer overflow vulnerability)",
"Tấn công từ chối dịch vụ (DoS) từ các nguồn bên ngoài"
],
"a": 2
},
{
"id": 82,
"s": "fwconfig",
"q": "Loại hình giao tiếp nào có thể được cải thiện bằng cách sử dụng bộ nhớ đệm trên tường lửa?",
"o": [
"Email",
"Tin nhắn tức thời",
"Truy cập từ xa",
"Web"
],
"a": 3
},
{
"id": 83,
"s": "fwconfig",
"q": "Yếu tố quan trọng nhất trong một bộ quy tắc tường lửa luôn là gì?",
"o": [
"Sử dụng địa chỉ cụ thể thay vì ANY",
"Liệt kê các ngoại lệ Deny sau các ngoại lệ Allow",
"Liệt kê các ngoại lệ đến (inbound) trước các ngoại lệ đi (outbound)",
"Liệt kê quy tắc cuối cùng là từ chối mặc định"
],
"a": 2
},
{
"id": 84,
"s": "fwconfig",
"q": "Yếu tố nào sau đây là yếu tố chính khi thiết lập các quy tắc tường lửa?",
"o": [
"Băng thông",
"Các tác vụ nghiệp vụ",
"Mức lưu lượng truy cập",
"Sở thích của người dùng"
],
"a": 0
},
{
"id": 85,
"s": "fwconfig",
"q": "Chính sách tường lửa không đáp ứng được điều nào sau đây?",
"o": [
"Hỗ trợ khắc phục sự cố",
"Phát hiện các thay đổi trong cài đặt đã triển khai",
"Đảm bảo lọc nhất quán trên toàn bộ cơ sở hạ tầng",
"Cân bằng tải mạng"
],
"a": 2
},
{
"id": 86,
"s": "fwconfig",
"q": "Quy tắc tường lửa nào sau đây ngăn chặn người dùng nội bộ truy cập vào các trang FTP công cộng?",
"o": [
"TCP 192.168.42.0/24 ANY ANY 21 Deny",
"TCP ANY ANY ANY FTP Deny",
"TCP 21 192.168.42.0/24 ANY ANY Deny",
"TCP ANY ANY 192.168.42.0/24 21 Deny"
],
"a": 0
},
{
"id": 87,
"s": "fwconfig",
"q": "Khi xây dựng một tập hợp các quy tắc, bạn nên đặt quy tắc từ chối mặc định (default-deny) ở đâu?",
"o": [
"Đầu tiên, trước bất kỳ quy tắc nào khác",
"Sau các quy tắc cho phép (Allow) cụ thể",
"Sau các quy tắc từ chối (Deny) cụ thể",
"Cuối cùng, sau tất cả các quy tắc khác"
],
"a": 2
},
{
"id": 88,
"s": "vpnfund",
"q": "Tính năng nào trong cơ chế mã hóa chế độ đường hầm (tunnel mode) không được hỗ trợ trong cơ chế mã hóa chế độ truyền tải (transport mode)?",
"o": [
"Một phần cuối (footer) được thêm vào để chứa giá trị băm (hash value).",
"Phần dữ liệu tải (payload) được mã hóa.",
"Địa chỉ nguồn được mã hóa, nhưng địa chỉ đích thì không.",
"Phần tiêu đề (header) được mã hóa."
],
"a": 3
},
{
"id": 89,
"s": "vpnfund",
"q": "Đâu là hai đặc điểm quan trọng nhất của cơ chế xác thực VPN?",
"o": [
"Đơn yếu tố và có thể phát lại (replayable)",
"Có khả năng mở rộng và có khả năng tương tác",
"Trong suốt (transparent) và hiệu quả",
"Có thể phát lại (replayable) và có khả năng mở rộng"
],
"a": 1
},
{
"id": 90,
"s": "vpnfund",
"q": "Hình thức mật mã nào được sử dụng để mã hóa phần lớn dữ liệu truyền giữa các điểm cuối VPN?",
"o": [
"Đối xứng (Symmetric)",
"Băm (Hashing)",
"Khóa công khai (Public key)",
"Bất đối xứng (Asymmetric)"
],
"a": 0
},
{
"id": 91,
"s": "vpnfund",
"q": "Trong số các loại VPN dưới đây, loại nào ngăn chặn việc lọc lưu lượng truy cập VPN?",
"o": [
"Edge router (Bộ định tuyến biên)",
"Extranet VPN",
"Corporate firewall (Tường lửa doanh nghiệp)",
"Host-to-site VPN"
],
"a": 2
},
{
"id": 92,
"s": "vpnfund",
"q": "Khi thiết kế cơ chế ủy quyền cho các VPN và người dùng VPN, bạn nên sử dụng nguyên tắc bảo mật chính nào?",
"o": [
"Tin cậy phân tán (Distributed trust)",
"Xác thực đa yếu tố (Multifactor)",
"Nguyên tắc đặc quyền tối thiểu (Principle of least privilege)",
"Cho phép theo mặc định, từ chối theo ngoại lệ (Grant by default, deny by exception)"
],
"a": 2
},
{
"id": 93,
"s": "vpnfund",
"q": "Công việc nào sau đây cần được thực hiện trước khi xây dựng chính sách VPN?",
"o": [
"Đánh giá rủi ro",
"Quản lý bản vá",
"Kiểm toán tài chính",
"Đào tạo nâng cao nhận thức"
],
"a": 0
},
{
"id": 94,
"s": "vpnfund",
"q": "Vấn đề kiểm soát truy cập VPN nào có thể được thực thi thông qua xác thực VPN?",
"o": [
"Kiểm soát quyền truy cập vào máy in",
"Hạn chế quyền truy cập vào Internet",
"Giới hạn quyền truy cập vào các tập tin",
"Chặn người dùng VPN không được ủy quyền"
],
"a": 3
},
{
"id": 95,
"s": "vpnfund",
"q": "Hình thức triển khai VPN nào yêu cầu xác thực bổ sung để truy cập các tài nguyên thông qua VPN?",
"o": [
"Tường lửa doanh nghiệp (Corporate firewall)",
"VPN kết nối giữa các mạng (Site-to-site VPN)",
"VPN kết nối từ máy trạm đến mạng (Host-to-site VPN)",
"Bộ định tuyến biên (Edge router)"
],
"a": 3
},
{
"id": 96,
"s": "vpnfund",
"q": "Điểm khác biệt chính giữa kết nối VPN và kết nối mạng LAN là gì?",
"o": [
"Các yếu tố xác thực",
"Quyền truy cập tài nguyên",
"Tốc độ",
"Bảo mật"
],
"a": 2
},
{
"id": 97,
"s": "vpnfund",
"q": "Đâu là một hạn chế khi triển khai VPN?",
"o": [
"Các mạng trung gian không an toàn.",
"VPN không thể chạy trên các hệ điều hành gốc.",
"Không thể có một VPN đáng tin cậy.",
"Các lỗ hổng bảo mật tồn tại tại các điểm cuối (endpoint)."
],
"a": 3
},
{
"id": 98,
"s": "vpnmgmt",
"q": "Câu nào sau đây không phải là một trong ba kiến trúc triển khai VPN phổ biến nhất?",
"o": [
"Bỏ qua",
"Vùng DMZ",
"Kết nối nội bộ",
"Đã sửa đổi"
],
"a": 3
},
{
"id": 99,
"s": "vpnmgmt",
"q": "Đâu không phải là mối đe dọa phổ biến đối với cả VPN phần mềm và VPN phần cứng?",
"o": [
"Tấn công qua cửa sau (Backdoor attack)",
"Tấn công từ chối dịch vụ (Denial of service)",
"Thiếu các bản vá lỗi (Missing patches)",
"Đường hầm phân tách (Split tunneling)"
],
"a": 3
},
{
"id": 100,
"s": "vpnmgmt",
"q": "Đâu là một trong những lỗ hổng phổ biến nhất và dễ bị khai thác nhất trên bất kỳ thiết bị mạng phần cứng nào?",
"o": [
"Mật khẩu mặc định yếu",
"Cổng tắc nguồn có thể tiếp cận được",
"Đường hầm (tunneling) mặc định",
"Không có xác thực đa yếu tố"
],
"a": 0
},
{
"id": 101,
"s": "vpnmgmt",
"q": "Đâu không phải là mối đe dọa phổ biến đối với cả VPN phần mềm và VPN phần cứng?",
"o": [
"Xác thực yếu",
"Bảo mật phía máy khách (client) yếu",
"Khóa mã hóa yếu",
"Tên người dùng yếu"
],
"a": 3
},
{
"id": 102,
"s": "vpnmgmt",
"q": "Đâu là lợi ích của giải pháp VPN thương mại so với các giải pháp mã nguồn mở?",
"o": [
"Chi phí thấp hơn",
"Hỗ trợ sản phẩm",
"Linh hoạt hơn",
"Quyền truy cập vào mã nguồn"
],
"a": 1
},
{
"id": 103,
"s": "vpnmgmt",
"q": "Mục nào sau đây không phải là một thành phần của chính sách VPN?",
"o": [
"Các định nghĩa",
"Giới thiệu",
"Phạm vi",
"Khắc phục sự cố"
],
"a": 3
},
{
"id": 104,
"s": "vpnmgmt",
"q": "Phát biểu nào sau đây không phải là một thực tiễn tốt nhất về VPN?",
"o": [
"Sao lưu cấu hình",
"Cho phép phân luồng đường hầm",
"Áp dụng quản lý lỗ hổng bảo mật",
"Lựa chọn dựa trên đánh giá tốt nhất"
],
"a": 1
},
{
"id": 105,
"s": "vpnmgmt",
"q": "Thuật ngữ nào sau đây dùng để chỉ mã độc xâm nhập vào mạng rồi đột ngột chuyển hướng đi sâu vào mạng bảo mật?",
"o": [
"Boomerang",
"Curving",
"Hairpinning",
"U-turning"
],
"a": 2
},
{
"id": 106,
"s": "vpnmgmt",
"q": "Thuật ngữ nào dùng để chỉ một mô hình triển khai VPN, trong đó lưu lượng truy cập giữa VPN và mạng nội bộ không đi qua tường lửa?",
"o": [
"Triển khai thay thế (Alternative deployment)",
"Triển khai bỏ qua tường lửa (Bypass deployment)",
"Triển khai khác biệt (Differential deployment)",
"Triển khai kết nối nội bộ (Internally connected deployment)"
],
"a": 1
},
{
"id": 107,
"s": "vpnmgmt",
"q": "Điều nào sau đây không phải là một phần của xác thực đa yếu tố?",
"o": [
"Something you are",
"Something you have",
"Something you know",
"Something you wear"
],
"a": 3
},
{
"id": 108,
"s": "vpntech",
"q": "IPSec hỗ trợ hai chế độ nào?",
"o": [
"Chuyển tiếp",
"Phân tán",
"Vận chuyển",
"Mã hóa"
],
"a": 2
},
{
"id": 109,
"s": "vpntech",
"q": "Chọn ưu điểm của SSL/TLS so với việc sử dụng IPSec VPN.",
"o": [
"Được triển khai phổ biến hơn trong môi trường doanh nghiệp",
"Yêu cầu ít quy tắc tường lửa hơn",
"Kiểm soát truy cập chi tiết (ở mức độ hạt nhân/cụ thể)",
"Thường có hỗ trợ ngay sau khi một hệ điều hành mới được phát hành"
],
"a": 1
},
{
"id": 110,
"s": "vpntech",
"q": "Giao thức nào sau đây thuộc IPSec, có chức năng thương thảo, thiết lập và quản lý các liên kết bảo mật (security associations)?",
"o": [
"Authentication Header (Tiêu đề xác thực)",
"Encapsulating Security Payload (Gói tin bảo mật được đóng gói)",
"Internet Key Exchange (Giao thức trao đổi khóa Internet)",
"Transportation Authentication (Xác thực truyền tải)"
],
"a": 2
},
{
"id": 111,
"s": "vpntech",
"q": "Điều nào sau đây không phải là một phần của mật mã IPSec IPv6?",
"o": [
"Bí mật thông tin",
"Xác thực nguồn gốc dữ liệu",
"Tính toàn vẹn dữ liệu",
"Dịch vụ phiên dịch"
],
"a": 3
},
{
"id": 112,
"s": "vpntech",
"q": "Đâu không phải là lợi ích của các môi trường SSL VPN ảo hóa?",
"o": [
"Tăng cường bảo mật cho các môi trường đa nhóm",
"Phân quyền quản lý",
"Tính linh hoạt cao hơn",
"Lắp đặt phần cứng dự phòng"
],
"a": 3
},
{
"id": 113,
"s": "vpntech",
"q": "Phát biểu nào sau đây là đúng về IPSec?",
"o": [
"Nó hỗ trợ các môi trường Windows và Linux, nhưng không hỗ trợ các hệ điều hành Apple Mac OS.",
"Nó cung cấp khả năng kết nối an toàn giữa các nút (node) trên mạng.",
"Nó được thiết lập sử dụng mã hóa 56-bit để đạt tốc độ cao.",
"Nó đã thay thế hoàn toàn nhu cầu sử dụng các VPN dựa trên SSL."
],
"a": 1
},
{
"id": 114,
"s": "vpntech",
"q": "Thành phần nào sau đây không phải là thành phần chính của giao thức SSH?",
"o": [
"Giao thức kết nối (Connection Protocol)",
"Giao thức bảo vệ gói dữ liệu (Datagram Protection Protocol)",
"Giao thức tầng truyền tải (Transport Layer Protocol)",
"Giao thức xác thực người dùng (User Authentication Protocol)"
],
"a": 1
},
{
"id": 115,
"s": "vpntech",
"q": "Thành phần nào sau đây được IPSec sử dụng, cung cấp khả năng bảo vệ tính toàn vẹn cho tiêu đề gói tin (packet header) và dữ liệu, cũng như thực hiện xác thực người dùng?",
"o": [
"Authentication Header (AH)",
"Encapsulating Security Payload (ESP)",
"Internet Key Exchange (IKE)",
"Secure Shell (SSH)"
],
"a": 0
},
{
"id": 116,
"s": "vpntech",
"q": "Đâu là hai loại NAT chính trong số các lựa chọn dưới đây?",
"o": [
"Động (Dynamic) và tĩnh (Static)",
"Chiều vào (Inbound) và chiều ra (Outbound)",
"Được mã hóa (Encrypted) và được lọc (Filtered)",
"Ẩn (Hidden) và được bảo vệ (Shielded)"
],
"a": 0
},
{
"id": 117,
"s": "vpntech",
"q": "Đâu không phải là lợi ích của SSL/TLS so với việc sử dụng IPSec VPN?",
"o": [
"Sự linh hoạt cho phía máy khách (client)",
"Đảm bảo thời gian hoạt động (uptime)",
"Chi phí thấp hơn",
"Không phụ thuộc vào nền tảng (platform independence)"
],
"a": 1
},
{
"id": 118,
"s": "vpnimpl",
"q": "Thuật ngữ khác để chỉ VPN là gì?",
"o": [
"Máy chủ bảo vệ (Bastion host)",
"Máy chủ chuyên dụng (Dedicated server)",
"Đường hầm mã hóa dữ liệu (Data-encrypted tunnel)",
"Vùng phi quân sự (DMZ)"
],
"a": 2
},
{
"id": 119,
"s": "vpnimpl",
"q": "Đâu là phần mềm truy cập từ xa miễn phí của Microsoft dành cho Windows Server và Windows 10?",
"o": [
"Remote Data Services",
"Remote Desktop Services",
"Remote Desktop System",
"Remote Dial-up System"
],
"a": 1
},
{
"id": 120,
"s": "vpnimpl",
"q": "Phương pháp nào sau đây là một trong những phương pháp chính để triển khai VPN truy cập từ xa?",
"o": [
"IKEv2",
"IPSec",
"TCP",
"SSH"
],
"a": 1
},
{
"id": 121,
"s": "vpnimpl",
"q": "Phát biểu nào sau đây đúng về Remote Desktop Services?",
"o": [
"Nó có thể lưu trữ nhiều phiên làm việc đồng thời.",
"Nó có thể hỗ trợ cấp địa chỉ động.",
"Nó có thể đồng bộ hóa nhiều máy chủ proxy.",
"Nó có thể thay thế các gói tin đang ngờ bằng các gói tin an toàn."
],
"a": 0
},
{
"id": 122,
"s": "vpnimpl",
"q": "Giao thức nào sau đây không hỗ trợ việc sử dụng VPN?",
"o": [
"IKEv2",
"L2TP",
"NAT-T",
"PPTP"
],
"a": 2
},
{
"id": 123,
"s": "vpnimpl",
"q": "Sản phẩm nào sau đây có khả năng khởi động khi nhận được một \"gói tin ma thuật\" (magic packet)?",
"o": [
"Awaken",
"TimeToWork",
"SystemOn",
"Wake-on-LAN"
],
"a": 3
},
{
"id": 124,
"s": "vpnimpl",
"q": "Bạn sử dụng lệnh nào để kiểm tra xem VPN OpenVPN có đang hoạt động hay không?",
"o": [
"ping",
"openVPN",
"VPN on",
"VPN verify"
],
"a": 0
},
{
"id": 125,
"s": "vpnimpl",
"q": "Công cụ nào sau đây là phương pháp đóng gói các gói tin IPSec ESP vào trong các gói tin UDP để truyền qua các bộ định tuyến (router) hoặc tường lửa có sử dụng NAT?",
"o": [
"Openswan",
"LogMeln",
"NAT-T",
"Protocol 50 ESP"
],
"a": 2
},
{
"id": 126,
"s": "fwsec",
"q": "Làm thế nào để biết tường lửa có đang hoạt động bình thường hay không?",
"o": [
"Xem xét tài liệu hướng dẫn",
"Xem xét cấu hình",
"Xem xét các tập tin nhật ký (log files)",
"Xem xét kết quả kiểm thử"
],
"a": 3
},
{
"id": 127,
"s": "fwsec",
"q": "Câu nào sau đây không phải là tác vụ được hoàn thành bằng cách sử dụng đường hầm?",
"o": [
"Cung cấp quyền truy cập cho người dùng bên ngoài vào mạng nội bộ",
"Vượt qua các hạn chế lọc gói tin",
"Đảm bảo mã hóa lưu lượng truy cập",
"Sử dụng các cổng mở cho các giao tiếp tiêu chuẩn"
],
"a": 2
},
{
"id": 128,
"s": "fwsec",
"q": "Công cụ VPN nào sau đây cung cấp hệ thống đường hầm ẩn danh, không mã hóa?",
"o": [
"Cryptcat",
"JanusVM",
"PacketIX VPN",
"Tor"
],
"a": 3
},
{
"id": 129,
"s": "fwsec",
"q": "Phương án nào sau đây là tốt nhất để giải quyết các sự cố xâm phạm tường lửa?",
"o": [
"Thêm các quy tắc bổ sung",
"Cài đặt lại cấu hình",
"Áp dụng các bản vá lỗi còn thiếu",
"Sử dụng phần mềm quét chống phần mềm độc hại"
],
"a": 2
},
{
"id": 130,
"s": "fwsec",
"q": "Một phần của quá trình khắc phục sự cố là xác định các cổng (port) đang mở. Công cụ nào sau đây hỗ trợ quét để kiểm tra xem các cổng đang mở hay đóng?",
"o": [
"Fport",
"Netstat",
"Nmap",
"Wireshark"
],
"a": 2
},
{
"id": 131,
"s": "fwsec",
"q": "Công cụ nào sau đây chủ yếu được sử dụng để đánh giá lỗ hổng mạng?",
"o": [
"Fport",
"Nessus",
"Netcat",
"Snort"
],
"a": 1
},
{
"id": 132,
"s": "fwsec",
"q": "Phương án nào sau đây không phải là phương pháp tối ưu trong quản lý tường lửa?",
"o": [
"Xây dựng danh mục kiểm tra (checklist)",
"Thiết lập chính sách bằng văn bản",
"Bảo đảm an toàn cho việc truy cập vật lý",
"Sử dụng cấu hình mặc định từ nhà cung cấp"
],
"a": 3
},
{
"id": 133,
"s": "fwsec",
"q": "Đâu là phương pháp thực hành tốt nhất trong việc quản lý tường lửa?",
"o": [
"Cài đặt thế hệ đầu tiên hoặc phiên bản phát hành đầu tiên của một sản phẩm tường lửa.",
"Ngay sau khi cài đặt tường lửa, hãy cài đặt các bản cập nhật hiện có từ nhà cung cấp.",
"Cài đặt các bản vá lỗi (patch) chưa chính thức (pre-release) lên các tường lửa đang vận hành ngay khi chúng có sẵn.",
"Vì các nhà cung cấp tường lửa đã kiểm thử mã nguồn để đảm bảo chất lượng, nên quản trị viên không cần phải thực hiện lại các bước kiểm thử trước khi cài đặt mã nguồn đó lên tường lửa."
],
"a": 1
},
{
"id": 134,
"s": "fwsec",
"q": "Công cụ nào sau đây là công cụ tốt nhất và đầu tiên nên sử dụng khi khắc phục sự cố tường lửa?",
"o": [
"Công cụ băm cáp (Crimping tools)",
"Công cụ kiểm thử mờ (Fuzzing tools)",
"Thông tin (information)",
"Mã nguồn (Source code)"
],
"a": 2
},
{
"id": 135,
"s": "fwsec",
"q": "Khi phát hiện tường lửa bị xâm phạm, bước đầu tiên cần thực hiện là gì?",
"o": [
"Bật các cảnh báo tường lửa",
"Ghi lại thông tin về sự cố",
"Vô hiệu hóa tường lửa",
"Cài đặt tường lửa mới"
],
"a": 2
},
{
"id": 136,
"s": "bestprac",
"q": "Phương án nào sau đây không phải là phương pháp thực hành tốt nhất trong quản lý bảo mật mạng?",
"o": [
"Tránh truy cập từ xa",
"Dựa vào các biện pháp phòng thủ đơn lẻ hoặc riêng biệt",
"Phân tách nhiệm vụ",
"Nguyên tắc đặc quyền tối thiểu"
],
"a": 1
},
{
"id": 137,
"s": "bestprac",
"q": "Mục đích của an ninh vật lý trong một tổ chức là gì?",
"o": [
"Ngăn chặn các cuộc tấn công từ bên ngoài thông qua VPN",
"Ngăn chặn các cuộc tấn công từ bên ngoài thông qua tường lửa",
"Ngăn chặn việc truy cập trái phép vào cơ sở vật chất và thiết bị",
"Ngăn chặn việc tạo thêm các tài khoản người dùng mới"
],
"a": 2
},
{
"id": 138,
"s": "bestprac",
"q": "Mục đích chính của việc đánh giá sau khi kết thúc dự án (post-mortem assessment review) là gì?",
"o": [
"Xác định các thiết bị và ngân sách cần thiết",
"Rút kinh nghiệm từ những sai lầm",
"Cắt giảm chi phí",
"Tìm hiểu về sự tuân thủ"
],
"a": 1
},
{
"id": 139,
"s": "bestprac",
"q": "Kỹ thuật nào sau đây không được coi là một phần của quá trình đánh giá bảo mật mạng?",
"o": [
"Ứng phó sự cố",
"Quét cấu hình",
"Kiểm thử xâm nhập",
"Đánh giá lỗ hổng bảo mật"
],
"a": 0
},
{
"id": 140,
"s": "bestprac",
"q": "Lựa chọn nào sau đây không phải là một lỗi phổ biến cần được đưa vào chương trình đào tạo người dùng?",
"o": [
"Làm hỏng hoàn toàn (biến thành \"cục gạch\") máy tính của công ty",
"Rời khỏi máy tính khi vẫn đang đăng nhập",
"Cài đặt phần mềm không được phê duyệt trên máy tính của công ty",
"Mở các tập tin đính kèm bất ngờ từ email"
],
"a": 0
},
{
"id": 141,
"s": "bestprac",
"q": "Phương án nào sau đây là biện pháp bảo hiểm duy nhất chống lại việc mất dữ liệu?",
"o": [
"Kiểm toán",
"Sao lưu",
"Cấu hình",
"Mã hóa"
],
"a": 1
},
{
"id": 142,
"s": "bestprac",
"q": "Phát biểu nào sau đây không phải là một bước hoặc giai đoạn trong kế hoạch ứng phó sự cố?",
"o": [
"Thu thập thông tin (Acquisition)",
"Ngăn chặn (Containment)",
"Diệt trừ (Eradication)",
"Phục hồi (Recovery)"
],
"a": 0
},
{
"id": 143,
"s": "bestprac",
"q": "Yếu tố nào sau đây là quan trọng nhất đối với hiệu quả của một chương trình quét vi-rút?",
"o": [
"Băng thông khả dụng trên mạng",
"Sản phẩm thương mại so với mã nguồn mở",
"Nền tảng của công cụ quét",
"Tính cập nhật kịp thời của cơ sở dữ liệu nhận dạng vi-rút"
],
"a": 3
},
{
"id": 144,
"s": "bestprac",
"q": "Phương án nào sau đây không phải là một phần của cách tiếp cận bảo mật hoàn chỉnh và toàn diện?",
"o": [
"Bảo vệ các tài sản",
"Đào tạo người dùng",
"Giám sát các nỗ lực vi phạm",
"Triển khai xác thực đơn yếu tố"
],
"a": 3
},
{
"id": 145,
"s": "bestprac",
"q": "Công cụ hoặc kỹ thuật nào sau đây không phải là công cụ/kỹ thuật quản lý bảo mật mạng?",
"o": [
"Tài liệu ghi lại các thay đổi",
"Kiểm kê thiết bị",
"Sơ đồ tổ chức logic",
"Các sản phẩm từng đạt giải thưởng"
],
"a": 3
},
{
"id": 146,
"s": "emerging",
"q": "Đâu không phải là lợi ích của hypervisor trong ảo hóa?",
"o": [
"Cải thiện hiệu năng",
"Khả năng hiển thị các vấn đề bảo mật",
"Dễ sử dụng",
"Kiểm tra nội dung chuyên sâu (deep-content inspection)"
],
"a": 3
},
{
"id": 147,
"s": "emerging",
"q": "Phương án nào sau đây không phải là một trong những cách tốt nhất để xem xét vấn đề bảo mật từ góc độ kinh doanh?",
"o": [
"Tuân thủ (Compliance)",
"Quản trị (Governance)",
"Rủi ro (Risk)",
"Quyền hạn (Permissions)"
],
"a": 3
},
{
"id": 148,
"s": "emerging",
"q": "Loại tường lửa nào sau đây không phải là loại tường lửa chuyên dụng?",
"o": [
"Ứng dụng",
"Bảo vệ dữ liệu",
"Động",
"Lai"
],
"a": 2
},
{
"id": 149,
"s": "emerging",
"q": "Yếu tố nào sau đây không góp phần làm mờ ranh giới mạng?",
"o": [
"BYOD (Mang thiết bị cá nhân vào nơi làm việc)",
"Điện toán đám mây",
"VPN (Mạng riêng ảo)",
"Địa chỉ cơ quan"
],
"a": 2
},
{
"id": 150,
"s": "emerging",
"q": "Loại tường lửa chuyên dụng nào sau đây được thiết kế để ngăn chặn rò rỉ dữ liệu?",
"o": [
"Ứng dụng",
"Bảo vệ dữ liệu",
"Cơ sở dữ liệu",
"Lai"
],
"a": 1
},
{
"id": 151,
"s": "emerging",
"q": "Đặc điểm nào sau đây không phải là đặc điểm sinh trắc học?",
"o": [
"Dấu vân tay (Fingerprint)",
"Chiều cao (Height)",
"Mẫu mống mắt (Iris pattern)",
"Mẫu giọng nói (Voice pattern)"
],
"a": 1
},
{
"id": 152,
"s": "emerging",
"q": "Nguyên tắc nào sau đây không phải là nguyên tắc bảo mật cốt lõi?",
"o": [
"Tính khả dụng (Availability)",
"Tính bí mật (Confidentiality)",
"Tính linh hoạt (Flexibility)",
"Tính toàn vẹn (Integrity)"
],
"a": 2
},
{
"id": 153,
"s": "emerging",
"q": "Các CIO có thể phải chịu trách nhiệm về các vi phạm an ninh trong việc tuân thủ quy định của chính phủ. Khi các CIO phàn nàn về vấn đề an ninh, điều nào sau đây là lời phàn nàn hàng đầu của họ?",
"o": [
"Thiếu các biện pháp",
"Chi phí",
"Thiếu tính linh hoạt",
"Thời gian ngừng hoạt động"
],
"a": 0
},
{
"id": 154,
"s": "emerging",
"q": "Câu nào sau đây là một ví dụ về đặc điểm sinh trắc học?",
"o": [
"Chữ ký",
"Mã thông báo",
"Mật khẩu",
"Thẻ thông minh"
],
"a": 0
},
{
"id": 155,
"s": "ethical",
"q": "Bộ Tư pháp Hoa Kỳ định nghĩa \"hacker\" là đối tượng nào sau đây?",
"o": [
"Một người truy cập vào máy tính hoặc mạng mà không có sự cho phép của chủ sở hữu",
"Một chuyên gia kiểm thử xâm nhập (penetration tester)",
"Một người sử dụng các dịch vụ điện thoại mà không thanh toán",
"Một người truy cập vào máy tính hoặc hệ thống mạng với sự cho phép của chủ sở hữu"
],
"a": 0
},
{
"id": 156,
"s": "ethical",
"q": "Chuyên gia kiểm thử xâm nhập (penetration tester) là ai trong số những đối tượng sau đây?",
"o": [
"Một người đột nhập vào máy tính hoặc mạng mà không có sự cho phép của chủ sở hữu",
"Một người sử dụng các dịch vụ điện thoại mà không thanh toán chi phí",
"Một chuyên gia bảo mật được thuê để đột nhập vào mạng nhằm phát hiện các lỗ hổng bảo mật",
"Một tin tặc đột nhập vào hệ thống mà không có sự cho phép nhưng không xóa hoặc phá hủy các tập tin"
],
"a": 2
},
{
"id": 157,
"s": "ethical",
"q": "Một nhóm gồm những cá nhân có các kỹ năng đa dạng, cùng phối hợp để tìm cách xâm nhập vào một mạng lưới, được gọi là gì?",
"o": [
"Green team (Nhóm Xanh lá)",
"Blue team (Nhóm Xanh dương)",
"Black team (Nhóm Đen)",
"Red team (Nhóm Đỏ)"
],
"a": 3
},
{
"id": 158,
"s": "ethical",
"q": "Trước khi sử dụng phần mềm tấn công (hacking software) qua Internet, bạn nên liên hệ với bên nào sau đây?",
"o": [
"Nhà cung cấp sản phẩm",
"Nhà cung cấp phần mềm của bạn",
"Cơ quan thực thi pháp luật tại địa phương để kiểm tra tính tuân thủ quy định",
"Cục Điều tra Liên bang (FBI)"
],
"a": 2
},
{
"id": 159,
"s": "ethical",
"q": "Tổ chức nào phát hành danh sách 25 lỗi phần mềm hàng đầu (Top 25)?",
"o": [
"SANS Institute",
"ISECOM",
"EC-Council",
"OPST"
],
"a": 0
},
{
"id": 160,
"s": "ethical",
"q": "Phát biểu nào sau đây là không đúng với một chuyên gia kiểm thử bảo mật?",
"o": [
"Không cần có kỹ năng lắng nghe tốt",
"Kiến thức về mạng và công nghệ máy tính",
"Kỹ năng giao tiếp bằng lời nói và văn viết tốt",
"Sự quan tâm đến việc bảo mật các mạng và hệ thống máy tính"
],
"a": 0
},
{
"id": 161,
"s": "attacks",
"q": "Mục đích chính của phần mềm độc hại (malware) là gì?",
"o": [
"Thu lợi tài chính hoặc gây phá hoại",
"Tìm hiểu mật khẩu",
"Phát hiện các cổng (port) đang mở",
"Xác định hệ điều hành"
],
"a": 0
},
{
"id": 162,
"s": "attacks",
"q": "Một ___________ máy tính dựa vào chương trình chủ để lan truyền khắp mạng lưới.",
"o": [
"sâu (worm)",
"vi-rút (virus)",
"trojan",
"botnet"
],
"a": 0
},
{
"id": 163,
"s": "attacks",
"q": "Một hình thức khai thác tấn công các hệ thống máy tính bằng cách chèn mã thực thi vào các vùng bộ nhớ — hệ quả từ việc viết mã kém chất lượng — được gọi là gì?",
"o": [
"Tràn bộ đệm (Buffer overflow)",
"Chương trình Trojan",
"Virus",
"Sâu máy tính (Worm)"
],
"a": 0
},
{
"id": 164,
"s": "attacks",
"q": "Loại mã khai thác nào sau đây có thể ẩn giấu phần mềm độc hại bên trong một ứng dụng hoặc trò chơi hợp lệ?",
"o": [
"Trojan",
"Virus macro",
"Sâu máy tính (Worm)",
"Tràn bộ đệm (Buffer overflow)"
],
"a": 0
},
{
"id": 165,
"s": "attacks",
"q": "Loại nào sau đây không tự gắn vào một chương trình chủ (host) nhưng vẫn có khả năng tự sao chép chính nó?",
"o": [
"Worm (Sâu máy tính)",
"Virus",
"Trojan",
"Buffer overflow (Tràn bộ đệm)"
],
"a": 0
},
{
"id": 166,
"s": "attacks",
"q": "Ví dụ nào sau đây là một ngôn ngữ lập trình macro?",
"o": [
"C11",
"Shell",
"Basic",
"Visual Basic for Applications"
],
"a": 3
},
{
"id": 167,
"s": "attacks",
"q": "Một thành phần phần mềm hoặc phần cứng ghi lại từng phím mà người dùng nhấn được gọi là gì?",
"o": [
"Key sniffer",
"Keylogger",
"Trojan",
"Buffer overflow"
],
"a": 1
},
{
"id": 168,
"s": "attacks",
"q": "Loại tấn công mạng nào dựa vào việc nhiều máy chủ cùng tham gia tấn công vào một hệ thống máy chủ đích?",
"o": [
"Tấn công Trojan",
"Tràn bộ đệm (Buffer overflow)",
"Tấn công từ chối dịch vụ (Denial-of-service attack)",
"Tấn công từ chối dịch vụ phân tán (Distributed denial-of-service attack)"
],
"a": 3
},
{
"id": 169,
"s": "attacks",
"q": "Kiểu khai thác nào được sử dụng để nâng cao quyền hạn của kẻ tấn công bằng cách chèn mã thực thi vào bộ nhớ của máy tính?",
"o": [
"Trojan",
"Tràn bộ đệm (Buffer overflow)",
"Ping of Death",
"Biến thiên bộ đệm (Buffer variance)"
],
"a": 1
},
{
"id": 170,
"s": "attacks",
"q": "Thành phần nào có thể được sử dụng để giảm nguy cơ Trojan hoặc rootkit gửi thông tin từ máy tính bị tấn công đến một máy chủ từ xa?",
"o": [
"Bộ giải mã Base-64",
"Phần mềm ghi lại thao tác phím (Keylogger)",
"Telnet",
"Tường lửa (Firewall)"
],
"a": 3
},
{
"id": 171,
"s": "attacks",
"q": "Để giảm nguy cơ bị virus tấn công vào mạng, bạn nên thực hiện những hành động nào sau đây?",
"o": [
"Sử dụng phần mềm diệt virus.",
"Hướng dẫn người dùng về việc mở các tập tin đính kèm từ email đáng ngờ.",
"Cập nhật thường xuyên các tập tin nhận dạng virus (virus signature files).",
"Tất cả các phương án trên."
],
"a": 3
},
{
"id": 172,
"s": "attacks",
"q": "Phương thức chính nào khiến phần mềm độc hại xâm nhập vào một tổ chức?",
"o": [
"Thiết bị lưu trữ USB",
"Email",
"Tràn bộ đệm (buffer overflow)",
"Cửa hậu (backdoor)"
],
"a": 1
},
{
"id": 173,
"s": "attacks",
"q": "Một đoạn mã khai thác (exploit) tạo điều kiện cho kẻ tấn công có thêm phương thức khác để xâm nhập vào mạng trong tương lai được gọi là gì?",
"o": [
"Rootkit",
"Worm (Sâu máy tính)",
"Backroot",
"Backend"
],
"a": 0
},
{
"id": 174,
"s": "attacks",
"q": "Đâu là nơi phù hợp để bắt đầu tìm kiếm các lỗ hổng bảo mật trong các sản phẩm của Microsoft?",
"o": [
"Các trang web về hack",
"Các bản tin bảo mật của Microsoft (Microsoft Security Bulletins)",
"Các thông tin về lỗ hổng bảo mật trên các nhóm tin (newsgroup)",
"Tài liệu hướng dẫn sử dụng"
],
"a": 1
},
{
"id": 175,
"s": "protection",
"q": "Loại giao thức định tuyến nào chỉ thông báo các đường dẫn mới cho các bộ định tuyến khác trong mạng?",
"o": [
"Giao thức định tuyến trạng thái đường liên kết (Link-state routing protocol)",
"Giao thức bảng định tuyến (Routing table protocol)",
"Giao thức định tuyến vectơ đường dẫn (Path-vector routing protocol)",
"Giao thức định tuyến vectơ khoảng cách (Distance-vector routing protocol)"
],
"a": 0
},
{
"id": 176,
"s": "protection",
"q": "Thành phần nào sau đây của Cisco lưu trữ cấu hình đang chạy (running configuration), bảng định tuyến và các bộ đệm (buffer) của bộ định tuyến (router)?",
"o": [
"NVRAM",
"RAM",
"ROM",
"Bộ nhớ Flash (Flash memory)"
],
"a": 1
},
{
"id": 177,
"s": "protection",
"q": "Nếu bộ nhớ flash của bộ định tuyến (router) Cisco bị hỏng, bộ định tuyến có thể khởi động từ thành phần nào sau đây?",
"o": [
"ROM",
"NVRAM",
"RAM",
"CD-ROM"
],
"a": 0
},
{
"id": 178,
"s": "protection",
"q": "Công cụ nào sau đây mô tả một công cụ thu thập nhật ký và cảnh báo từ nhiều thiết bị để phân tích bảo mật?",
"o": [
"Hệ thống quản lý nhật ký (LMS)",
"Hệ thống quản lý thông tin và sự kiện bảo mật (SIEM)",
"Hệ thống ngăn chặn xâm nhập dựa trên mạng (Network-based IPS)",
"Honeypot"
],
"a": 1
},
{
"id": 179,
"s": "protection",
"q": "Phát biểu nào sau đây mô tả không đúng mục đích chính của tường lửa (firewall)?",
"o": [
"Kiểm soát lưu lượng truy cập đi vào và rời khỏi mạng.",
"Ngăn chặn một số ứng dụng nhất định chạy.",
"Bảo vệ các phân đoạn mạng nội bộ.",
"Ngăn chặn việc khởi tạo dữ liệu điều khiển (command-and-control) từ bên trong mạng."
],
"a": 1
},
{
"id": 180,
"s": "protection",
"q": "Tường lửa sử dụng cơ chế nào sau đây để che giấu cấu trúc mạng nội bộ khỏi người dùng bên ngoài?",
"o": [
"Lọc gói tin (Packet filtering)",
"SPI",
"ACL",
"NAT"
],
"a": 3
},
{
"id": 181,
"s": "protection",
"q": "Tường lửa kiểm tra gói tin có trạng thái (stateful packet inspection firewall) theo dõi các kết nối mạng bằng cách sử dụng thành phần nào sau đây?",
"o": [
"Bảng trạng thái (state table)",
"Logic mờ (fuzzy logic)",
"Nguyên tắc đặc quyền tối thiểu (least-privileges principle)",
"Luồng gói tin tự trị (autonomous packet flow)"
],
"a": 0
},
{
"id": 182,
"s": "protection",
"q": "Một tường lửa chặn phiên kết nối Telnet rời khỏi mạng thông qua cổng TCP 443 sử dụng cơ chế nào sau đây?",
"o": [
"Kiểm tra trạng thái (Stateful inspection)",
"Kiểm tra không trạng thái (Stateless inspection)",
"Kiểm tra cấp thấp (Low-level inspection)",
"Kiểm tra lớp ứng dụng (Application layer inspection)"
],
"a": 3
},
{
"id": 183,
"s": "protection",
"q": "Các bộ lọc web có thể ngăn chặn loại hoạt động độc hại nào?",
"o": [
"Tấn công DDoS",
"Quét SYN (SYN scan)",
"Tải xuống tự động (Drive-by download)",
"Tấn công tràn ngập UDP (UDP flood)"
],
"a": 2
},
{
"id": 184,
"s": "protection",
"q": "Vùng phi quân sự (DMZ) còn được gọi là gì trong các tên gọi sau?",
"o": [
"Mạng biên (Perimeter network)",
"Mạng có trạng thái (Stateful network)",
"Mạng không trạng thái (Stateless network)",
"Bẫy mật (Honeypot)"
],
"a": 0
},
{
"id": 185,
"s": "protection",
"q": "Phương án nào sau đây mô tả một nhóm các chuyên gia có nhiệm vụ phát hiện và ứng phó với các sự cố bảo mật?",
"o": [
"Đội ứng cứu khẩn cấp máy tính (Computer Emergency Response Team - CERT)",
"Trung tâm điều hành mạng (Network Operations Center - NOC)",
"Nhóm đảm bảo dữ liệu (Data Assurance Group)",
"Trung tâm điều hành bảo mật (Security Operations Center - SOC)"
],
"a": 3
},
{
"id": 186,
"s": "protection",
"q": "Loại IDS nào có thể gửi danh sách truy cập (access list) tới bộ định tuyến (router) hoặc tường lửa (firewall) khi phát hiện hành vi xâm nhập trên mạng?",
"o": [
"Hệ thống chủ động (Active system)",
"Hệ thống thụ động (Passive system)",
"Hệ thống tường lửa (Firewall system)",
"Hệ thống dựa trên máy chủ (Host-based system)"
],
"a": 0
},
{
"id": 187,
"s": "protection",
"q": "Một \"honeypot\" (bẫy mật) có thể được sử dụng trong mạng vì lý do nào sau đây là không đúng?",
"o": [
"Dụ dỗ hoặc bẫy tin tặc để có thể thông báo cho cơ quan thực thi pháp luật.",
"Thu thập thông tin về các cuộc tấn công và mối đe dọa mới.",
"Đánh lạc hướng tin tặc, ngăn chúng tấn công vào các tài nguyên mạng hợp pháp.",
"Bảo vệ vùng DMZ khỏi các cuộc tấn công từ bên trong."
],
"a": 3
}
];
