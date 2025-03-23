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

#### Type 1:

    const exists = await Category.exists({ slug });

#### Type 2:

    const result = await Category.exists({ _id : { $ne : categoryExists._id }, slug });
