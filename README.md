# create

    await Category.create({ category: functions.reduceMultipleSpaces(category),
                            categoryDescription,
                            slug
                        });

# Find by id

#### Type 1:

    const category = await Category.findById({ _id : req.query.id })
                        .select("category categoryDescription categoryImage slug")
                        .lean();

#### Type 2:

    const _id = req.query.id;
    const category = await Category.findById( _id )
                        .select("category categoryDescription slug")
                        .lean();

# Exists

If a document exists, then it will return \_id field.

        { "_id": "65d8f3b5c9e8a123456789ab" }

otherwise it return null.

#### True or false

If you only need a boolean result.

    const exists = !!(await SubCategory.exists({ slug }));

This will return true or false.

#### Type 1:

    const exists = await Category.exists({ slug });

#### Type 2:

    const result = await Category.exists({ _id : { $ne : categoryExists._id }, slug });
