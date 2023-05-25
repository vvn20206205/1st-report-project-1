const nodemailer = require("nodemailer");
require('dotenv').config();
const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD,
    },
});
const CreateNewAccount = async (req, res, next) => {
    const titleMail = "[Chào mừng tài khoản mới]"
    const {name,email,username,otp} = req.body; 
    const html2 = `<p> Chào mừng bạn đến với Vũ Văn Nghĩa 20206205! </p> <p> Bạn đã đăng kí tài khoản tại website: <a href="${process.env.LINK_HOST}">${process.env.LINK_HOST}</a> </p> <p> Tên đăng nhập: <strong> ${username} </strong> </p> <p> Email: <strong> ${email} </strong> </p> <p> Đây là mã xác nhận tài khoản của bạn: <strong> ${otp} </strong> </p> <p> Chúng tôi xin gửi mail này để cảm ơn sự quan tâm và sự tin tưởng của bạn vào sản phẩm của chúng tôi. </p>`
    const html1 = `<hr><p> Xin chào <strong> ${name} </strong>, </p>`
    const html3 = `<p> Hãy tham khảo các dịch vụ mà chúng tôi cung cấp, và liên hệ với chúng tôi nếu bạn có bất kỳ câu hỏi hoặc cần hỗ trợ nào. Đội ngũ chăm sóc khách hàng của chúng tôi sẵn sàng hỗ trợ bạn một cách tận tâm. </p> <br> <p> Trân trọng, </p> <p> <strong> Vũ Văn Nghĩa </strong> </p> <p> <strong> MSSV: 20206205 </strong> </p> <p> <strong> Số điện thoại: 0397562283 </strong> </p> <a style="background-color: #04AA6D; color: white; padding: 10px; text-decoration: none; border-radius: 12px;" href="${process.env.LINK_HOST}" target="_blank"> &#128073; Truy cập website của chúng tôi ngay</a> <br> <br> <hr> `
    let execute = await transporter.sendMail({
        to: email,
        subject: titleMail,
        html: html1 + html2 + html3
    });
    console.log(titleMail)
    res.status(200).json({
        message: titleMail
    })
}
const ResetPassword = async (req, res, next) => {
    const titleMail = "[Đặt lại mật khẩu]"
    const {name,email,otp} = req.body; 
    const html2 = `<p>Chúng tôi nhận được yêu cầu khôi phục mật khẩu từ bạn. </p> <p> Mã xác nhận của bạn là: <strong> ${otp} </strong> </p> <p> Vui lòng làm theo các bước sau để đặt lại mật khẩu: </p> <ol> <li> Truy cập vào trang đặt lại mật khẩu của chúng tôi (<a href="${process.env.LINK_HOST}">${process.env.LINK_HOST}</a>). </li> <li> Nhập username và mã xác nhận được cung cấp trong mail này (thời hạn 5 phút). </li> <li> Theo các hướng dẫn trên trang để đặt lại mật khẩu mới. </li> <li> Sau khi đặt lại mật khẩu thành công, bạn sẽ có thể đăng nhập vào tài khoản của mình bằng mật khẩu mới. </li> </ol> <p> Nếu bạn không yêu cầu việc khôi phục mật khẩu hoặc không nhớ đã thực hiện yêu cầu này, xin vui lòng bỏ qua email này hoặc liên hệ với chúng tôi ngay để chúng tôi có thể giúp bạn giải quyết tình huống này. </p>`
    const html1 = `<hr><p> Xin chào <strong> ${name} </strong>, </p>`
    const html3 = `<p> Hãy tham khảo các dịch vụ mà chúng tôi cung cấp, và liên hệ với chúng tôi nếu bạn có bất kỳ câu hỏi hoặc cần hỗ trợ nào. Đội ngũ chăm sóc khách hàng của chúng tôi sẵn sàng hỗ trợ bạn một cách tận tâm. </p> <br> <p> Trân trọng, </p> <p> <strong> Vũ Văn Nghĩa </strong> </p> <p> <strong> MSSV: 20206205 </strong> </p> <p> <strong> Số điện thoại: 0397562283 </strong> </p> <a style="background-color: #04AA6D; color: white; padding: 10px; text-decoration: none; border-radius: 12px;" href="${process.env.LINK_HOST}" target="_blank"> &#128073; Truy cập website của chúng tôi ngay</a> <br> <br> <hr> `
    let execute = await transporter.sendMail({
        to: email,
        subject: titleMail,
        html: html1 + html2 + html3
    });
    console.log(titleMail)
    res.status(200).json({
        message: titleMail
    })
}
const PaymentConfirmation = async (req, res, next) => {
    const titleMail = "[Xác nhận thanh toán hóa đơn]" 
    const {name,email,invoice_id,sum} = req.body; 

    var currentTime = new Date();
    var year = currentTime.getFullYear();
    var month = currentTime.getMonth() + 1;
    var day = currentTime.getDate();
    var hour = currentTime.getHours();
    var minute = currentTime.getMinutes();
    var second = currentTime.getSeconds();
    var time = day + '/' + month + '/' + year + ' ' + hour + ':' + minute + ':' + second;

    const html2 = `<p>Chúng tôi xác nhận rằng thanh toán của bạn đã được xử lý thành công và chúng tôi đã cập nhật trạng thái thanh toán trong hệ thống của chúng tôi.</p><p>Chúng tôi xin gửi các chi tiết hóa đơn để bạn có thể xem và kiểm tra.</p><p>Thông tin chi tiết hóa đơn:</p><ul><li>Số hóa đơn: <strong> ${invoice_id} </strong></li><li>Ngày phát hành: <strong> ${time} </strong></li><li>Tổng cộng: <strong> ${sum} </strong></li></ul><p></p><p></p><p></p><p>Hóa đơn này bao gồm các mục sau đây:</p><table style=" width: 100%"><tr><th style="text-align: left; background-color: #04AA6D;">Sản phẩm</th> <th style="text-align: left; background-color: #04AA6D;">Số lượng</th><th style="text-align: left; background-color: #04AA6D;">Giá</th></tr><tr><td>Sản phẩm 1</td><td>1</td> <td>$10.00</td></tr><tr><td>Sản phẩm 2</td><td>2</td><td>$15.00</td></tr><tr><td>Sản phẩm 3</td><td>3</td><td>$20.00</td></tr></table><p>Chúng tôi xin chân thành cảm ơn sự hợp tác và sự quan tâm của bạn.</p>`
    const html1 = `<hr><p> Xin chào <strong> ${name} </strong>, </p>`
    const html3 = `<p> Hãy tham khảo các dịch vụ mà chúng tôi cung cấp, và liên hệ với chúng tôi nếu bạn có bất kỳ câu hỏi hoặc cần hỗ trợ nào. Đội ngũ chăm sóc khách hàng của chúng tôi sẵn sàng hỗ trợ bạn một cách tận tâm. </p> <br> <p> Trân trọng, </p> <p> <strong> Vũ Văn Nghĩa </strong> </p> <p> <strong> MSSV: 20206205 </strong> </p> <p> <strong> Số điện thoại: 0397562283 </strong> </p> <a style="background-color: #04AA6D; color: white; padding: 10px; text-decoration: none; border-radius: 12px;" href="${process.env.LINK_HOST}" target="_blank"> &#128073; Truy cập website của chúng tôi ngay</a> <br> <br> <hr> `
    let execute = await transporter.sendMail({
        to: email,
        subject: titleMail,
        html: html1 + html2 + html3
    });
    console.log(titleMail)
    res.status(200).json({
        message: titleMail
    })
}
const SupportMessage1 = async (req, res, next) => {
    const titleMail = "[Tin nhắn hỗ trợ]"
    const {name,email,message} = req.body; 
    const html2 = `<p>Chúng tôi đã nhận được tin nhắn yêu cầu của bạn tại website: <ahref="${process.env.LINK_HOST}">${process.env.LINK_HOST}</a></p><p>Chúng tôi xin gửi mail này để hỗ trợ yêu cầu của bạn.</p><p>Đây là kết quả hỗ trợ của chúng tôi: <br> <i> ${message} </i></p><p>Chúng tôi rất vui sẵn sàng giúp đỡ bạn trong bất kỳ vấn đề nào.</p>`
    const html1 = `<hr><p> Xin chào <strong> ${name} </strong>, </p>`
    const html3 = `<p> Hãy tham khảo các dịch vụ mà chúng tôi cung cấp, và liên hệ với chúng tôi nếu bạn có bất kỳ câu hỏi hoặc cần hỗ trợ nào. Đội ngũ chăm sóc khách hàng của chúng tôi sẵn sàng hỗ trợ bạn một cách tận tâm. </p> <br> <p> Trân trọng, </p> <p> <strong> Vũ Văn Nghĩa </strong> </p> <p> <strong> MSSV: 20206205 </strong> </p> <p> <strong> Số điện thoại: 0397562283 </strong> </p> <a style="background-color: #04AA6D; color: white; padding: 10px; text-decoration: none; border-radius: 12px;" href="${process.env.LINK_HOST}" target="_blank"> &#128073; Truy cập website của chúng tôi ngay</a> <br> <br> <hr> `
    let execute = await transporter.sendMail({
        to: email,
        subject: titleMail,
        html: html1 + html2 + html3
    });
    console.log(titleMail)
    res.status(200).json({
        message: titleMail
    })
}
const SupportMessage2 = async (req, res, next) => {
    const titleMail = "[Thông báo hỗ trợ của khách hàng]"
    const {name,email,message} = req.body; 
    const html2 = `<p>Có tin nhắn yêu cầu hỗ trợ tại website: <ahref="${process.env.LINK_HOST}"> ${process.env.LINK_HOST}</a></p><p>Hãy truy cập để hỗ trợ yêu cầu của khách hàng.</p><p>Nội dung yêu cầu của khách hàng: <br> <i> ${message} </i></p>`
    const html1 = `<hr><p> Xin chào <strong> ${name} </strong>, </p>`
    const html3 = `<p> Hãy tham khảo các dịch vụ mà chúng tôi cung cấp, và liên hệ với chúng tôi nếu bạn có bất kỳ câu hỏi hoặc cần hỗ trợ nào. Đội ngũ chăm sóc khách hàng của chúng tôi sẵn sàng hỗ trợ bạn một cách tận tâm. </p> <br> <p> Trân trọng, </p> <p> <strong> Vũ Văn Nghĩa </strong> </p> <p> <strong> MSSV: 20206205 </strong> </p> <p> <strong> Số điện thoại: 0397562283 </strong> </p> <a style="background-color: #04AA6D; color: white; padding: 10px; text-decoration: none; border-radius: 12px;" href="${process.env.LINK_HOST}" target="_blank"> &#128073; Truy cập website của chúng tôi ngay</a> <br> <br> <hr> `
    let execute = await transporter.sendMail({
        to: email,
        subject: titleMail,
        html: html1 + html2 + html3
    });
    console.log(titleMail)
    res.status(200).json({
        message: titleMail
    })
}
const NotificationMessage = async (req, res, next) => {
    const titleMail = "[Tin nhắn thông báo]"
    const {name,email,title,content} = req.body; 

    var currentTime = new Date();
    var year = currentTime.getFullYear();
    var month = currentTime.getMonth() + 1;
    var day = currentTime.getDate();
    var hour = currentTime.getHours();
    var minute = currentTime.getMinutes();
    var second = currentTime.getSeconds();
    var time = day + '/' + month + '/' + year + ' ' + hour + ':' + minute + ':' + second;

    const html2 = `<p>Chúng tôi xin gửi mail này để thông báo về tin tức mới nhất và những cập nhật quan trọng .</p><p> [<strong> ${title} </strong>] </p><p> <i> ${time} </i> </p><p> ${content} </p>`
    const html1 = `<hr><p> Xin chào <strong> ${name} </strong>, </p>`
    const html3 = `<p> Hãy tham khảo các dịch vụ mà chúng tôi cung cấp, và liên hệ với chúng tôi nếu bạn có bất kỳ câu hỏi hoặc cần hỗ trợ nào. Đội ngũ chăm sóc khách hàng của chúng tôi sẵn sàng hỗ trợ bạn một cách tận tâm. </p> <br> <p> Trân trọng, </p> <p> <strong> Vũ Văn Nghĩa </strong> </p> <p> <strong> MSSV: 20206205 </strong> </p> <p> <strong> Số điện thoại: 0397562283 </strong> </p> <a style="background-color: #04AA6D; color: white; padding: 10px; text-decoration: none; border-radius: 12px;" href="${process.env.LINK_HOST}" target="_blank"> &#128073; Truy cập website của chúng tôi ngay</a> <br> <br> <hr> `
    let execute = await transporter.sendMail({
        to: email,
        subject: titleMail,
        html: html1 + html2 + html3
    });
    console.log(titleMail)
    res.status(200).json({
        message: titleMail
    })
}
module.exports = {
    CreateNewAccount,
    ResetPassword,
    PaymentConfirmation,
    SupportMessage1,
    SupportMessage2,
    NotificationMessage
} 