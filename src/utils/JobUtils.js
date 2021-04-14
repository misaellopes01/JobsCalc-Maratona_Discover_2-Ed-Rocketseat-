module.exports = {
    remainingDays(job){
        // Ajustes no job -- Calculo de tempo restante
        const remainingDay = (job["total-hours"] / job["daily-hours"]).toFixed()
    
        const createdDate = new Date(job.created_at)
        // getDay = dia da semana | getDate = dia do mês
        const dueDay = createdDate.getDate() + Number(remainingDay)
        // Calculo em milissegundos
        const dueDateInMs = createdDate.setDate(dueDay)
        const timeDiffInMs = dueDateInMs - Date.now()
        // Transformar mili em dias
        const dayInMs = 1000 * 60 * 60 * 24
        const dayDiff = Math.ceil(timeDiffInMs / dayInMs)
    
        return dayDiff
    },
    calculateBudget: (job, valueHour) => valueHour * job["total-hours"]
}