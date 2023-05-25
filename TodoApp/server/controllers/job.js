const Job = require('../models/job')

const getAllJobs = async (req, res, next) => {
    const jobs = await Job.findAll();

    return res.status(200).json({ jobs })
}
const getJobById = async (req, res, next) => {
    const { id } = req.params;
    const job = await Job.findByPk(id) || [];

    return  res.status(200).json({ job });
}
const deleteJobById = async (req, res, next) => {
    const { id } = req.params;
    const deletedJobCount = await Job.destroy({ where: { id } });

    const success = deletedJobCount !== 0;

    return res.status(200).json({ success });
}
const addJob = async (req, res, next) => {
    const { name } = req.body;
    const newJob = await Job.create({ name, time: new Date() });

    return res.status(201).json({ success: true });
}
const editJobById = async (req, res, next) => {
    const { id } = req.params;
    const { name } = req.body;
    const [updatedJobCount] = await Job.update({ name }, { where: { id } });

    const success = updatedJobCount !== 0;

    return res.status(200).json({ success });
}
module.exports = {
    getAllJobs,
    getJobById,
    deleteJobById,
    addJob,
    editJobById
} 