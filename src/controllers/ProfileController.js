const Profile = require('../model/Profile')

module.exports = {
    async index(req, res){
        return res.render("profile", { profile: await Profile.get() })
    },
    async update(req, res){
        
        //req.body para pegar dados
        const data = req.body

        //Definir quantas semenas tem um ano: 52
        const weeksPerYear = 52

        //Remover as semanas de férias do ano, para pegar quantas semanas tem em 1 mês
        const weeksPerMonth = (weeksPerYear - data["vacation-per-year"] ) / 12

        //Quantas horas por semana estou trabalhando
        const weeksTotalHours = data["hours-per-day"] * data["days-per-week"]

        //Total de horas trabalhadas no mês
        const monthlyTotalHours = weeksTotalHours * weeksPerMonth

        //Valor da minha hora
        const valueHour = data["monthly-budget"] / monthlyTotalHours

        const profile = await Profile.get()
        await Profile.update({
            ...profile,
            ...req.body,
            "value-hour": valueHour
        })
        return res.redirect('/profile') 
    }
}