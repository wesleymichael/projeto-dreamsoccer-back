export default function filterPlayer(req, res, next) {
    const { category, position, type, nationality } = req.query;
    const page = req.query.page ? parseInt(req.query.page) : 1;
    const validPosition = ["ATA", "M", "D", "G"];
    const validCategory = ["M", "F"];
    const validType = ["Legendary", "Silver", "Bronze"];
    const filter = {};
    const errors = [];

    if (page < 1 || isNaN(page)) {
        errors.push("Página informada inválida!");
    }

    if (category) {
        if (typeof category === "string") {
            if (validCategory.includes(category)) {
                const array = [category]
                filter.category = array;
            } else {
                errors.push("Variável \"category\" incorreta!");
            }
        } else{
            const array =[]
            category.forEach((element, i) => {
                if (validCategory.includes(element)) {
                    array.push(element);
                } else {
                    errors.push("Variável \"category\" incorreta!");
                }
            });
            filter.category = array
        }
    }

    if (position) {
        if (typeof position === "string") {
            if (validPosition.includes(position)) {
                const array = [position]
                filter.position = array;
            } else {
                errors.push("Variável \"position\" incorreta!");
            }
        } else{
            const array =[]
            position.forEach((element, i) => {
                if (validPosition.includes(element)) {
                    array.push(element);
                } else {
                    errors.push("Variável \"position\" incorreta!");
                }
            });
            filter.position = array
        }
    }

    if (type) {
        if (typeof type === "string") {
            if (validType.includes(type)) {
                const array = [type]
                filter.type = array;
            } else {
                errors.push("Variável \"type\" incorreta!");
            }
        } else{
            const array =[]
            type.forEach((element, i) => {
                if (validType.includes(element)) {
                    array.push(element);
                } else {
                    errors.push("Variável \"type\" incorreta!");
                }
            });
            filter.type = array
        }
    }
    if (nationality) {
        if (typeof nationality ==="string") {
            filter.nationality = nationality;
        } else {
            errors.push("Variável \"nationality\" incorreta!");
        }
    }

    if (errors.length !== 0) {
        return res.status(422).send(errors);
    }

    res.locals.page = page;
    res.locals.filter = filter;
    next();
}
