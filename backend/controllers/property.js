const Property = require('../models/Property')

exports.add = async (req, res) => {
    // console.log(req.body);

    const newProperty = new Property(req.body);

    // console.log(newProperty);
    try {
        const savedProperty = await newProperty.save();
        res.status(200).json(savedProperty)
    } catch (error) {
        res.status(500).json(error)
        console.log(error);

    }
}

exports.allProperties = async (req, res) =>{

    try {
        const allProperties = await Property.find({});
        res.status(200).json(allProperties)
    } catch (error) {
        res.status(500).json(error)
    }

}