//you can do regex 
//for sort, limit, select, etc... chain the methods to find method


const Product = require('../models/product')

const getAllProductsStatic = async (req,res) => {
    const products = await Product.find({price: {$gt:30}})
    .sort('price')
    .select('name price')
    res.status(200).json({nbHits:products.length, products})
}
const getAllProducts = async (req,res) => {
    const { featured,company,name,sort,fields, numericFilters } = req.query; //no need checking for company about specific values, we handled that in the models folder in schema

    const queryObject = {} 
    if(featured){
        queryObject.featured = featured === 'true' ? true : false //bcz featured type is boolean
    }
    if(company){
        queryObject.company = company
    }
    if(name){
        queryObject.name = {$regex: name, $options: 'i'} //search queries, you do whatever u want, sky is the limit
    }

    if(numericFilters){

        //price>40,rating>=4  to  //price-$gt-40,rating-$gte-4

        const operatorMap = {
            '>':'$gt',
            '>=':'$gte',
            '=':'$eq',
            '<':'$lt',
            '<=':'$lte',
        }
        const regEx = /\b(<|>|>=|=|<|<=)\b/g
        let filters = numericFilters.replace(regEx, (match)=>`-${operatorMap[match]}-`) //price-$gt-40,rating-$gte-4

        const options = ['price','rating'] //must be one of properties of schema (of database) 
        //price-$gte-40,rating-$gt-4
        filters = filters.split(',').forEach(item => { //split to multiple numeric filters to handle each one individually
            const [field,operator,value] = item.split('-') //[price, $gte, 40]
            if(options.includes(field)){
                queryObject[field] = {[operator]: Number(value)} //remember: this is included in the find() method,
            }
        })
    }

    console.log(queryObject)
    //if no any prop, then this will send back all objects from database, bcz queryObj will be empty
    let result = Product.find(queryObject) //this is just a COMMAND!!!!! (so...)

    //sort
    if(sort){ //(name,price) ascending sort by name, if name matches for two values then sort by price ascending
        const sortList = sort.split(',').join(' ')
        result = result.sort(sortList) //... you are chaining the COMMAND!!!!! instead of ex: Product.find({}).sort('createdAt')
        //so why not just chain? well what if there is no sort in queryObject, this will throw errors
    } else {
        result = result.sort('createdAt')
    }

    //select
    if(fields) { //select specific fields, ex: select only price & name for all products
        const fieldsList = fields.split(',').join(' ')
        result = result.select(fieldsList) 
    }

    const page = Number(req.query.page) || 1
    const limit = Number(req.query.limit) || 10
    const skip = (page - 1) * limit //correct algorithm

    result = result.skip(skip).limit(limit) //first skip then limit, combining them together gives us the pageination (page numbering stuff)
    //23

    const products = await result
    res.status(200).json({nbHits:products.length, products})

}


module.exports = {
    getAllProducts,
    getAllProductsStatic
}

// throw new Error('testing async errors') //by express-async-errors package!. We don't use next() bcz in the docs it says to throw an err instead, this will go to the error handler we made (remember the err argument that is accessed anywhere ), the package handled this
