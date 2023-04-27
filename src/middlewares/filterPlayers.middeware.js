export default function filterPlayer(req, res, next){
    const { category, position, type, nacionality } = req.query;
    const page = req.query.page ? parseInt(req.query.page) : 1;
    const validPosition = ["ATA", "M", "D", "G"];
    const validCategory = ["M", "F"];
    const validType = ["Legendary", "Silver", "Bronze"];

    const filter = {};
    const errors = [];

    if(page < 1 || isNaN(page)){
        errors.push("Página informada inválida!");
    }

    if (category){
        if ( validCategory.includes(category) ){
            filter.category = category;
        } else {
            errors.push("Variável \"category\" incorreta!");
        }   
    }

    if (position){
        if ( validPosition.includes(position) ){
            filter.position = position;
        } else {
            errors.push("Variável \"position\" incorreta!");
        }   
    }

    if (type){
        if ( validType.includes(type) ){
            filter.type = type;
        } else {
            errors.push("Variável \"type\" incorreta!");
        }   
    }

    if (nacionality) filter.nacionality = nacionality;

    if(errors.length !== 0){
        return res.status(422).send(errors); 
    }

    res.locals.page = page;
    res.locals.filter = filter;
    next();
}
