cần tạo file key


kubectl create secret generic private-key --from-file=private.pem -n enternal-kingdom


kubectl create secret generic: Lệnh này tạo một Secret loại generic trong Kubernetes. Secret là một đối tượng để lưu trữ và quản lý thông tin nhạy cảm, như mật khẩu, token hoặc khóa SSH.
	•	private-key: Đây là tên của Secret sẽ được tạo trong Kubernetes. Các pod có thể tham chiếu đến Secret này để truy xuất dữ liệu nhạy cảm.
	•	--from-file=private.pem: Tùy chọn này chỉ định rằng nội dung của tệp private.pem sẽ được sử dụng để tạo Secret. Kubernetes sẽ đọc nội dung của tệp private.pem và mã hóa nó thành chuỗi base64, sau đó lưu trữ trong Secret. Trong Secret, khóa dữ liệu sẽ có tên là private.pem (cùng tên với tệp gốc).
	•	-n enternal-kingdom: Tùy chọn này xác định namespace nơi Secret sẽ được tạo. Ở đây, Secret sẽ được tạo trong namespace enternal-kingdom.

kubectl create secret generic public-key --from-file=public.pem -n enternal-kingdom