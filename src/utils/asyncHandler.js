// we are goiing to create async function here which will be used in various files by just passing it there , instead of writting async code every time in every file


// how to make async function middleware using try catch async method
/* normal function 
const asyncHandler=()=>{}
*/
/* function passing function
const asyncHandler=(fn)=>()=>{}
*/
/* using async method
const asyncHandler=(fn)=>async()=>{}
*/


const asynHandler=(fn)=>async(req,res,next)=>{
    try {
        await fn(req,res,next)
        
    } catch (error) {
        res.status(error.code || 500).json({
            success: false,
            message: error.message
        })
    }
}

// promise method
/*const asyncHandler=(requestHandler)=>{
    //here async will directly return handler by promise
    (req,res,next)=>{
        Promise.resolve(requestHandler(req,res,next)).catch((err)=>next(err))
    }
}
    */

export {asynHandler}