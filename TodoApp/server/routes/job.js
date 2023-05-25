const router = require('express-promise-router')()
const jobController = require('../controllers/job')

router.route('/')
    // Lấy tất cả
    .get(jobController.getAllJobs)
    // Thêm job 
    .post(jobController.addJob)

router.route('/:id')
    // Xem chi tiết theo id
    .get(jobController.getJobById)
    // Xóa theo id 
    .delete(jobController.deleteJobById)
    // Sửa job the id 
    .put(jobController.editJobById)

module.exports = router 