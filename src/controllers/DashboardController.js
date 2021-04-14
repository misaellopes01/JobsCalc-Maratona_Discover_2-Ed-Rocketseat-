const Job = require('../model/Job')
const JobUtils = require('../utils/JobUtils')
const Profile = require('../model/Profile')

module.exports = {
    async index(req, res){
        const jobs = await Job.get()
        const profile = await Profile.get()

        let statusCount = {
            progress: 0,
            done: 0,
            total: jobs.length
        }
        // Total de horas de cada job em progresso
        let jobTotalHours = 0

        const updatedJobs = jobs.map((job) => {
            
            const remaining = JobUtils.remainingDays(job)
            const status = remaining <= 0 ? 'done' : 'progress'
            // Somando a quantidade de status, ele pega o conteudo da const status
            // Que nesse caso será done ou progress e passa a referência no progress ou done do statusCount
            // Somando +1
            statusCount[status] += 1
            // Total de horas de cada job em progresso
            jobTotalHours = status === 'progress' ? jobTotalHours + Number(job["daily-hours"]) : jobTotalHours

            return {
                ...job,
                remaining,
                status,
                budget: JobUtils.calculateBudget(job, profile["value-hour"])
            }
        })

        // Quantidade de horas que quero trabalhar MENOS a quantidade de horas/dia de cada job em progress 
        const freeHours = profile["hours-per-day"] - jobTotalHours


        return res.render("index", { jobs: updatedJobs, profile: profile, statusCount: statusCount, freeHours: freeHours })
    }
}
