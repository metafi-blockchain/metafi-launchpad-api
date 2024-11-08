cần tạo file key
ssh-keygen -t rsa -b 4096 -m PEM -f auth.private.pem
openssl rsa -in auth.private.pem -pubout -out auth.public.pem

kubectl create secret generic private-key --from-file=auth.private.pem -n metafi-system


kubectl create secret generic: Lệnh này tạo một Secret loại generic trong Kubernetes. Secret là một đối tượng để lưu trữ và quản lý thông tin nhạy cảm, như mật khẩu, token hoặc khóa SSH.
	•	private-key: Đây là tên của Secret sẽ được tạo trong Kubernetes. Các pod có thể tham chiếu đến Secret này để truy xuất dữ liệu nhạy cảm.
	•	--from-file=auth.private.pem: Tùy chọn này chỉ định rằng nội dung của tệp private.pem sẽ được sử dụng để tạo Secret. Kubernetes sẽ đọc nội dung của tệp private.pem và mã hóa nó thành chuỗi base64, sau đó lưu trữ trong Secret. Trong Secret, khóa dữ liệu sẽ có tên là private.pem (cùng tên với tệp gốc).
	•	-n metafi-system: Tùy chọn này xác định namespace nơi Secret sẽ được tạo. Ở đây, Secret sẽ được tạo trong namespace metafi-system.

kubectl create secret generic public-key --from-file=auth.public.pem -n metafi-system