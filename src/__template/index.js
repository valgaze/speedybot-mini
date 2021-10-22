let client = null; // Data outside function handler (ex a DB connection or an incrementing value) can change within the handler code below and persist between Lamba invocations so long as the container is still "warm", see more for details: https://docs.aws.amazon.com/lambda/latest/dg/running-lambda-code.html

// HANDLER_MAP HERE

exports.handler = async (event, context) => {
    let data = {};

    // Lambda Proxy Integration
    if (event && event.body) {
        try {
            data = JSON.parse(event.body);
        } catch(e) { 
            return {
                statusCode: 400,
                body: JSON.stringify({message: 'There was an error parsing the JSON data posted to this endpoint', error:e})
            }
        }
    }

    try {

        // Do posts & stuff here

        // Echo back the data or perform transformations, pass on to another service, etc
        const response = {
            statusCode: 200,
            body: JSON.stringify({message: 'Data submitted', data})
        };

        return response;

    } catch(e) {
        // Report errors related with connection, auth, DB write, etc
        return {
          statusCode: 409,
          body: JSON.stringify({message: 'There was some type of catastrophic error', error:e})
      }
   }
};