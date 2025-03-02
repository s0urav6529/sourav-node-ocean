# Session During transaction

For Recommended code

    https://onthor.medium.com/understanding-mongoose-transactions-and-rollbacks-f074078ff604

For code structure

    https://blog.tericcabrel.com/how-to-use-mongodb-transaction-in-node-js/


# Example 


    const conn = require("../models/connection"); // Database connection
    const Customer = require("../models/customer.model");
    const BillingAddress = require("../models/billingAddress.model");

    const registerCustomerWithAddress = async () => {

        const session = await conn.startSession();

        or 

        const session = await mongoose.startSession();

        try {

            session.startTransaction();

            const customer = await Customer.create(
                [
                    {
                        name: 'John Wick',
                        email: 'john.wick@example.com',
                    },
                ],
                { session }
            );

            await BillingAddress.create(
                [
                    {
                        address: '123 Continental Hotel, New York',
                        customer_id: customer[0]._id,
                    },
                ],
                { session }
            );

            // Commit the transaction
            await session.commitTransaction();
            console.log('Transaction successful: Customer and Billing Address created.');

        } catch (error) {

            // Rollback the transaction in case of an error
            await session.abortTransaction();
            console.error('Transaction failed:', error);
        } 
        finally {

            // Ending the session
            await session.endSession();
        }
        
    };